"use client"

import { useEffect, useState } from "react"
import style from "./page.module.scss"
import { Option as OptionT } from "../components/Option"
import Option from "../components/Option"
import Fuse from "fuse.js"

export default function Search() {
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState<OptionT[] | null>(null)
  const [results, setResults] = useState<OptionT[] | null>(null)
  const [fuseIndex, setFuseIndex] = useState<Fuse.FuseIndex<OptionT> | undefined>(undefined)
  const [page, setPage] = useState(0)
  const fuse = new Fuse(options || [], {
    keys: ['name', 'description']
  }, fuseIndex)

  // Load options
  useEffect(() => {
    fetch('/options.json')
      .then(res => res.json())
      .then(data => {
        setOptions(data)
        setFuseIndex(Fuse.createIndex(['name', 'description'], data))
      })
  }, [])

  // Search
  useEffect(() => {
    setPage(0)
    if (options === null) return
    if (search === '') {
      setResults(null)
      return
    }
    setResults(fuse.search(search).map(res => res.item))
  }, [search, options])

  return <main>
    <h2>Search {options === null ? "(loading...)" : `(${options.length} options)`}</h2>
    <div className={style.searchBox}>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
    </div>

    <div className={style.results}>
      <h2>Results</h2>
      {results == null ? <p>Enter a search term to begin.</p> : <>
        <p>{results.length} result{results.length !== 1 && 's'} for "{search}"</p>
        {results.slice(page * 10, page * 10 + 10).map(option => <Option option={option} key={option.name} />)}

        <div className={style.pagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {Math.ceil(results.length / 10)}</span>
          <button onClick={() => setPage(page + 1)} disabled={page * 10 + 10 >= results.length}>Next</button>
        </div>
      </>}
    </div>
  </main>
}