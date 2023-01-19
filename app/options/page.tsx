import Option from "../components/Option";
import { readFile } from 'fs/promises';

export default async function Options() {
    let options = (await readFile('content/options.json')).toString()
    let parsedOptions = JSON.parse(options)

    return <>
        {Object.entries(parsedOptions).map(([name, opt]: [string, any]) =>
            <Option option={{
                name: name,
                declarations: opt.declarations,
                default: opt.default,
                description: opt.description,
                example: opt.example,
                readOnly: opt.readOnly,
                type: opt.type
            }}
                key={name} />
        )}
    </>
}