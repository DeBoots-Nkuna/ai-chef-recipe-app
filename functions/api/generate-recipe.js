//function to communicate with API modal

export async function onRequestPost({ request, env }) {
  const { ingredients } = (await request.json()) ?? {}
  if (ingredients.length === 0) {
    return json({ error: 'Provide an array of ingredients.' }, 400)
  }

  //constructing prompt for the modal
  const prompt = `items: ${ingredients.join(',')}`

  //invoking Hugging Face AI Modal
  const hgFaceRes = await fetch(
    'https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      Authorization: `Bearer ${env.HUGGINGFACE_API_KEY}`,
      body: JSON.stringify({ inputs: prompt }),
    }
  )

  //checking status
  if (!hgFaceRes.ok) {
    const text = await hgFaceRes.text()
    return json({ error: 'HF API Error', details: text }, hgFaceRes.status)
  }

  //collecting returned recipe
  const [first] = await hgFaceRes.json()
  const recipe = first?.generated_text ?? ''

  return json.stringify({ recipe })

  function json(obj, status = 200) {
    return new Response(JSON.stringify(obj), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
