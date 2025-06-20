import { useState } from 'react'
import { IngredientList } from './IngredientList'
import { Recipe } from './Recipe'
export const Main = () => {
  //states
  const [ingredients, setIngredients] = useState([])
  const [showRecipe, setShowRecipe] = useState(false)
  const [recipe, setRecipe] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  //function to handle form submission
  function handleFormSubmit(formData) {
    const ingredient = formData.get('ingredient')
    //updating state

    if (ingredient.length === 0) return
    setIngredients((prevIngredients) => [...prevIngredients, ingredient])
  }

  //function to handle display of generated recipe
  async function handleToggleRecipe() {
    //updating loading state
    setIsLoading((prevIsLoading) => !prevIsLoading)
    setShowRecipe(false)

    //try/catch
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`)

      //retrieving the data
      const { recipe: raw } = await response.json()

      //cleaning returned data
      const cleanedData = raw
        .replace(/^Generate a recipe[^\n]*\n*\n*/i, '')
        .trim()

      //updating state
      setRecipe(cleanedData)
      setShowRecipe(true)
    } catch (error) {
      console.error(error.message)
      setRecipe('❗Oops, Something went wrong.')
      setShowRecipe(true)
    } finally {
      setIsLoading((prevIsLoading) => !prevIsLoading)
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

      {/* loading indicator */}
      {isLoading && <p className="loading">Cooking up your recipe...</p>}
      {/* display recipe generated. */}
      {!isLoading && showRecipe && <Recipe recipe={recipe} />}
    </main>
  )
}
