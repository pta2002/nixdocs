import './globals.scss'
import { Fira_Sans } from '@next/font/google'
import styles from './layout.module.scss'

const fira = Fira_Sans({ weight: ['400'], subsets: ['latin'] })

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
      <body style={fira.style}>
        <div className='container'>
          <header className={styles.header}>
            <h1>NixVim</h1>
            <p>Configure Neovim entirely with Nix</p>

            <nav>
              <a href="#">Home</a>
              <a href="#">Documentation</a>
              <a href="/options">Options</a>
              <a href="#">Search</a>
            </nav>
          </header>

          {children}
        </div>
      </body>
    </html>
  )
}
