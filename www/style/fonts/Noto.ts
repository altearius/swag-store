import localFont from 'next/font/local';

const Noto = localFont({
	display: 'block',
	src: [
		{ path: 'NotoSans-VariableFont_wdth,wght.ttf' },
		{ path: 'NotoSans-Italic-VariableFont_wdth,wght.ttf', style: 'italic' },
	],
	variable: '--font-noto',
});

export default Noto;
