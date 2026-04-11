interface Props {
	readonly className?: string | undefined;
}

export default function Cart(p: Props) {
	return <span className={p.className}>🛒</span>;
}
