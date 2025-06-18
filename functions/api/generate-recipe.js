//api function

export async function onRequestPost({ request }) {
  // 1) Parse & validate
  const { ingredients } = (await request.json()) || {}
  if (!Array.isArray(ingredients) || !ingredients.length) {
    return new Response(
      JSON.stringify({ error: 'Please send an array of ingredients.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 2) Find a meal that uses those ingredients
  const filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.join(
    ','
  )}`
  const filterRes = await fetch(filterUrl)
  const filterData = await filterRes.json()
  if (!filterData.meals) {
    return new Response(JSON.stringify({ error: 'No recipes found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 3) Get full details for the first match
  const mealId = filterData.meals[0].idMeal
  const lookupRes = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  )
  const lookupData = await lookupRes.json()
  const meal = lookupData.meals[0]

  // 4) Build a simple JS object
  const recipe = {
    title: meal.strMeal,
    image: meal.strMealThumb,
    ingredients: [],
    instructions: meal.strInstructions,
  }

  // 5) Pull out up to 20 ingredient/measure pairs
  for (let i = 1; i <= 20; i++) {
    const ing = meal['strIngredient' + i]
    const meas = meal['strMeasure' + i]
    if (ing) {
      recipe.ingredients.push(`${meas.trim()} ${ing.trim()}`.trim())
    }
  }

  // 6) Return JSON
  return new Response(JSON.stringify(recipe), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
