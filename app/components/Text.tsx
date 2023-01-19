import { readFile } from 'fs/promises'
import { marked } from 'marked'
import highlight from 'highlight.js'

import style from './Text.module.scss'

export default async function Text({ file }: { file: string }) {
  marked.setOptions({
    highlight: function (code: string, lang: string) {
      return highlight.highlight(code, { language: lang }).value
    }
  })

  let content = await readFile(file)
  let htmlContent = marked.parse(content.toString())

  return <div className={style.text}>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  </div>
}