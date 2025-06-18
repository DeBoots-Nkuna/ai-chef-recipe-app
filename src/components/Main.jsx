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
  function handleToggleRecipe() {
    console.log('Generate Recipe Button clicked with recipes: ', ingredients)
    setShowRecipe((prevShowRecipe) => !prevShowRecipe)
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
