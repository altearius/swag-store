import clsx from 'clsx';
import styles from './Logo.module.css';

interface Props {
	readonly className?: string;
}

export default function Logo(p: Props) {
	return (
		<a href="/" className={clsx(styles['logo'], p.className)}>
			▲ Swag Store
		</a>
	);
}
