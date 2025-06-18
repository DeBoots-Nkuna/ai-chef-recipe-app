import ReactMarkdown from 'react-markdown'

export const Recipe = (props) => {
  return (
    <section>
      <h2>HeyChef Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  )
}
