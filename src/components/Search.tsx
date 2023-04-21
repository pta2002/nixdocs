import { createEffect, createMemo, createResource, createSignal, For, onMount } from "solid-js"
import Fuse from "fuse.js";
import Option from "./Option";
import style from "./Search.module.scss";

async function fetchOptions(): Promise<{ options: any, fuse: Fuse<any> }> {
  let res = await fetch('/options.json')

  let options = await res.json()
  let fuse = new Fuse(options, { keys: ['name', 'description'] }, Fuse.createIndex(['name', 'description'], options))
  return { options, fuse }
}

export default function Search() {
  const [search, setSearch] = createSignal('');
  const [options, { mutate, refetch }] = createResource(fetchOptions)

  const results = createMemo(() => {
    if (options.state === "ready") {
      let fuse = options().fuse;
      if (search() === '')
        return null;
      return fuse.search(search())
    }
  })

  return <>
    <h2>Search ({options.state === "ready" ? options().options.length + " option" + (options().options.length == 1 ? "" : "s") : "loading..."})</h2>

    <input type="text" placeholder="Search..." onInput={e => {
      setSearch(e.target.value)
    }} class={style.input} />

    {results() && <div>
      <h2>{results()?.length} result{results()?.length == 1 ? '' : 's'} for "{search()}" {results()?.length}</h2>
      <For each={results()}>
        {(result) => (
          <>
            <Option name={result.item.name} description={result.item.description} example={result.item.example} />
          </>
        )}
      </For>
    </div>}
  </>
}