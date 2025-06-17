import { useState } from 'react'

export const Main = ({ handleFormSubmit }) => {
  return (
    <main>
      <form action={handleFormSubmit}>
        <div className="input-container">
          <input type="text" name="ingredient" />
          <button>+ Add ingredients</button>
        </div>
      </form>
    </main>
  )
}
