export const IngredientList = ({ ingredients, toggleRecipe }) => {
  // ingredient list
  const ingredientList = ingredients.map((ingredient) => {
    return <li key={ingredient}>{ingredient}</li>
  })
  return (
    <section className="ingredients-section">
      <h2>Ingredients on hand:</h2>
      <ul>{ingredientList}</ul>

      {ingredients.length > 3 && (
        <div className="recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients</p>
          </div>
          <button className="recipe-btn" onClick={toggleRecipe}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  )
}
