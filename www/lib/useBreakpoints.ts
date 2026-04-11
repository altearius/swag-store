import { useSyncExternalStore } from 'react';

export interface Breakpoint {
	/**
	 * | Breakpoint | Min Width (px) | Min Width (rem) |
	 * |:----------:|---------------:|----------------:|
	 * |     xs     |            0px |            0rem |
	 * |     sm     |          640px |           40rem |
	 * |     md     |          768px |           48rem |
	 * |     lg     |         1024px |           64rem |
	 * |     xl     |         1280px |           80rem |
	 * |    2xl     |         1536px |           96rem |
	 */
	readonly bp: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	readonly width: number;
}

export default function useBreakpoints(): Breakpoint {
	const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	return {
		// A deeply nested ternary is generally a code smell, but this one seems
		// reasonably clear.
		bp:
			width >= 1536
				? '2xl'
				: width >= 1280
					? 'xl'
					: width >= 1024
						? 'lg'
						: width >= 768
							? 'md'
							: width >= 640
								? 'sm'
								: 'xs',
		width,
	};
}

function getServerSnapshot() {
	return 412; // Default to xs width on server
}

function getSnapshot() {
	return window.innerWidth;
}

function subscribe(callback: () => void) {
	let rafId: number | undefined;

	const handleResize = () => {
		if (rafId !== undefined) {
			cancelAnimationFrame(rafId);
		}

		rafId = requestAnimationFrame(() => {
			rafId = undefined;
			callback();
		});
	};

	window.addEventListener('resize', handleResize);

	return () => {
		window.removeEventListener('resize', handleResize);

		if (rafId !== undefined) {
			cancelAnimationFrame(rafId);
		}
	};
}
