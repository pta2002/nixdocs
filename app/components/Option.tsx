import style from './Option.module.scss'

interface Option {
  declarations: string[],
  default: any,
  description: string,
  example: string,
  readOnly: boolean,
  type: string
}

export default function Option({ option }: { option: Option }) {
  return (<>hi</>)
}