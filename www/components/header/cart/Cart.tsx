'use client';

import useCart from '../../../cart/useCart';

interface Props {
	readonly className?: string | undefined;
}

export default function Cart(p: Props) {
	const { contents } = useCart();
	const itemCount = contents?.totalItems ?? 0;

	return (
		<span className={p.className}>
			🛒{itemCount > 0 ? <span className="item-count">{itemCount}</span> : null}
		</span>
	);
}
