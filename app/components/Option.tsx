import style from './Option.module.scss'
import highlight from 'highlight.js'

interface Option {
  name: string,
  declarations: string[],
  default: any,
  description: string,
  example?: string,
  readOnly: boolean,
  type: string
}

export default function Option({ option }: { option: Option }) {
  let exampleHtml;
  if (option.example) {
    exampleHtml = highlight.highlight('nix', option.example.toString()).value
  }

  let defaultHtml;
  if (option.default !== undefined)
    defaultHtml = highlight.highlight('json', JSON.stringify(option.default)).value

  return <div id={option.name} className={style.option}>
    <h3 className={style.optionName}>
      <a href={`#${option.name}`}>{option.name}</a>
    </h3>
    <p>{option.description}</p>

    <p><span className={style.label}>Type:</span> {option.type}</p>

    {option.default !== undefined && <div>
      <h4>Default:</h4>

      <pre>
        <code className="language-nix" dangerouslySetInnerHTML={{ __html: defaultHtml }} />
      </pre>
    </div>}

    {option.example &&
      <div>
        <h4>Example:</h4>

        <pre>
          <code className="language-nix" dangerouslySetInnerHTML={{ __html: exampleHtml }} />
        </pre>
      </div>}
  </div>
}