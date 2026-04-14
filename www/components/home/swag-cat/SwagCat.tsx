import Image from 'next/image';
import robbery from './robber-robbery.gif';
import style from './SwagCat.module.css';

export default function SwagCat() {
	return (
		<div className={style['swag-cat']}>
			<Image src={robbery} alt="lil cat doing a swag" unoptimized />
		</div>
	);
}
