import Link from 'next/link'

import './globals.scss'
import { Fira_Sans, Fira_Code } from '@next/font/google'
import styles from './layout.module.scss'

const fira = Fira_Sans({ weight: ['400', '600'], subsets: ['latin'] })
const fira_code = Fira_Code({ weight: ['400'], subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={fira.style} className={fira_code.variable}>
        <div className='container'>
          <header className={styles.header}>
            <h1>NixVim</h1>
            <p>Configure Neovim entirely with Nix</p>

            <nav>
              <Link href="/">Home</Link>
              <Link href="/">Documentation</Link>
              <Link href="/options">Options</Link>
              <Link href="/">Search</Link>
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  )
}
