import style from './Input.module.css';

export default function Input() {
	return (
		<p className={style['input']}>
			<label>
				<input type="text" name="search" placeholder="🔎 Search" />
			</label>{' '}
			⚙️ <button type="submit">Go</button>
		</p>
	);
}
