interface Props {
	readonly className?: string;
}

export default function Cart(p: Props) {
	return <span className={p.className}>🛒</span>;
}
