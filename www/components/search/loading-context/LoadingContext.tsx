'use client';

import type { ReactNode } from 'react';
import { createContext, useTransition } from 'react';

interface Context {
	readonly isPending: boolean;
	readonly startTransition: ReturnType<typeof useTransition>[1];
}

export const LoadingContext = createContext<Context>({
	isPending: false,
	startTransition: () => {},
});

interface Props {
	readonly children: ReactNode;
}

export default function LoadingProvider(p: Props) {
	const [isPending, startTransition] = useTransition();

	return (
		<LoadingContext.Provider value={{ isPending, startTransition }}>
			{p.children}
		</LoadingContext.Provider>
	);
}
