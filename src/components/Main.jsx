import { useState } from 'react'

export const Main = ({ handleFormSubmit }) => {
  const [ingredients, setIngredients] = useState([])

  function handleFormSubmit(formData) {
    const ingredient = formData.get('ingredient')

    //set the new ingredient to the state array

    setIngredients((prevIngredients) => [...prevIngredients, ingredient])
  }

  // ingredient list
  return (
    <main>
      <section>
        <form action={handleFormSubmit}>
          <input type="text" name="ingredient" placeholder="eg. chicken" />
          <button>+ Add ingredient</button>
        </form>
      </section>
    </main>
  )
}
