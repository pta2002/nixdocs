import highlight from "highlight.js";
export interface Props {
	language: string;
	code: string;
}

export default function Code({ language, code }: Props) {
	return <pre class="code">
		<code innerHTML={highlight.highlight(language, code).value} />
	</pre>
}