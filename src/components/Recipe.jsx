import ReactMarkdown from 'react-markdown'

export const Recipe = (props) => {
  return (
    <section className="suggested-recipe-container">
      <h2>HeyChef Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  )
}
