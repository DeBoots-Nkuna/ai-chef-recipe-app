import ReactMarkdown from 'react-markdown'

export const Recipe = ({ recipe }) => {
  return (
    <section className="suggested-recipe-container">
      <h2>HeyChef Recommends:</h2>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%' }} />

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </section>
  )
}
