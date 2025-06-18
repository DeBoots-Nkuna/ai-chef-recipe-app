//function to communicate with API modal

export async function onRequestPost({ request, env }) {
  //parsing and validating ingredients
  const { ingredients } = (await request.json()) ?? {}
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return json({ error: 'Provide an array of ingredients.' }, 400)
  }

  //constructing prompt for the modal
  const prompt = `Generate a recipe using only: ${ingredients.join(', ')} `

  //collecting tokens
  const tokens = (env.HUGGINGFACE_API_KEY || '').trim()

  //invoking Hugging Face Interference API
  const hgFaceRes = await fetch(
    'https://api-inference.huggingface.co/models/google/flan-t5-small',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokens}`,
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  )

  //checking status
  if (!hgFaceRes.ok) {
    const details = await hgFaceRes.text()
    return json({ error: 'HF API Error', details }, hgFaceRes.status)
  }

  //collecting returned recipe
  const [first] = await hgFaceRes.json()
  const recipe = first?.generated_text ?? ''

  return json({ recipe })

  //helper JSON response function
  function json(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// demo api modal, usage limited
//'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1'
