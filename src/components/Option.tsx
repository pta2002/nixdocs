import Code from "./Code";
import "@fontsource/fira-code";
import style from './Option.module.scss';

export interface Props {
	name: string;
	description?: string;
	example?: string;
}

export default function Option({ name, description, example }: Props) {

	return <div id={name} class={style.option}>
		<h3><a href={`#${name}`}>{name}</a></h3>

		<div>
			{description}
		</div>

		{
			typeof example == 'string' && (
				<div>
					<span class={style.label}>Example:</span>
					<Code language="nix" code={example} />
				</div>
			)
		}
	</div>
}
