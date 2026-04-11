import styles from './Logo.module.css';

export default function Logo() {
	return (
		<a href="/" className={styles['logo']}>
			▲ Swag Store
		</a>
	);
}
