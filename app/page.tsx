import Image from 'next/image'
import { Fira_Sans } from '@next/font/google'
import styles from './page.module.scss'

import Text from './components/Text'


export default async function Home() {
  return (
    <main>
      <Text file="content/index.md" />
    </main>
  )
}
