import clsx from 'clsx';
import Link from 'next/link';
import styles from './Logo.module.css';

interface Props {
	readonly className?: string | undefined;
}

export default function Logo(p: Props) {
	return (
		<Link href="/" className={clsx(styles['logo'], p.className)}>
			▲ Swag Store
		</Link>
	);
}
