import { useState } from 'react'
import { IngredientList } from './IngredientList'
import { Recipe } from './Recipe'
export const Main = () => {
  //states
  const [ingredients, setIngredients] = useState([])
  const [showRecipe, setShowRecipe] = useState(false)
  const [recipe, setRecipe] = useState('')

  //function to handle form submission
  function handleFormSubmit(formData) {
    const ingredient = formData.get('ingredient')
    //updating state
    setIngredients((prevIngredients) => [...prevIngredients, ingredient])
  }

  //function to handle display of generated recipe
  async function handleToggleRecipe() {
    console.log('Generate Recipe Button clicked with recipes: ', ingredients)

    //try/catch
    try {
      const response = await fetch('/functions/generate-recipe.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`)

      //retrieving the data
      const data = await response.json()
      console.log('Recipe from AI: ', data.recipe)

      //updating state
      setRecipe(data.recipe)
      setShowRecipe((prevShowRecipe) => !prevShowRecipe)
    } catch (error) {
      console.error(error.message)

      setRecipe('Oops! Something went wrong')
      setShowRecipe((prevShowRecipe) => !prevShowRecipe)
    }
  }

  return (
    <main>
      <section>
        <form action={handleFormSubmit}>
          <input type="text" name="ingredient" placeholder="eg. chicken" />
          <button>+ Add ingredient</button>
        </form>
      </section>
      {/* displaying list of ingredients */}
      {ingredients.length > 0 && (
        <IngredientList
          ingredients={ingredients}
          toggleRecipe={handleToggleRecipe}
        />
      )}
      {/* display recipe generated. */}
      {showRecipe && <Recipe recipe={recipe} />}
    </main>
  )
}
