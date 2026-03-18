import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { company, userId } = await request.json()

    // Check usage
    const { data: usage } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .single()

    // If no usage record create one
    if (!usage) {
      await supabase.from('usage').insert({
        user_id: userId,
        research_count: 0
      })
    }

    const currentCount = usage?.research_count || 0

    // Check if user has active subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    const hasActivePlan = !!subscription

    // If no plan and used free research already — block
    if (!hasActivePlan && currentCount >= 1) {
      return Response.json({
        success: false,
        limitReached: true,
        error: 'Free limit reached'
      }, { status: 403 })
    }

    // Do the research
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `You are a B2B sales intelligence assistant. Research the company "${company}" and provide:

1. A 2-3 sentence company summary focusing on their current situation
2. 4 buying signals that suggest they might need sales tools
3. A short personalized cold email (5-6 lines max)

Respond in this exact JSON format with no extra text outside the JSON:
{
  "summary": "company summary here",
  "signals": ["signal 1", "signal 2", "signal 3", "signal 4"],
  "email": "cold email here"
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
    })

    const text = completion.choices[0].message.content
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const data = JSON.parse(jsonMatch[0])

    // Update usage count
    await supabase
      .from('usage')
      .upsert({
        user_id: userId,
        research_count: currentCount + 1
      }, { onConflict: 'user_id' })

    return Response.json({ success: true, data })

  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}