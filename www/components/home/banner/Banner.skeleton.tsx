import styles from './Banner.module.css';

export default function BannerSkeleton() {
	return (
		<section className={styles['banner']}>
			<div className="layout-max-width">
				<h2>&nbsp;</h2>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</div>
		</section>
	);
}
