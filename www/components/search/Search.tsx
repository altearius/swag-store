import clsx from 'clsx';
import style from './Search.module.css';
import Input from './input/Input';

export default function Search() {
	return (
		<main className={clsx(style['search'], 'layout-max-width')}>
			<h1>Products</h1>

			<form>
				<Input />
			</form>
		</main>
	);
}
