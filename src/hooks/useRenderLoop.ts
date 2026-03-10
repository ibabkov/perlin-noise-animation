import { useEffect, useRef } from 'react';

export const useRenderLoop = (callback: (time: number) => void) => {
	const requestIdRef = useRef<number | null>(null);

	useEffect(() => {
		const render = (time: number) => {
			callback(time);
			requestIdRef.current = requestAnimationFrame(render);
		};

		requestIdRef.current = requestAnimationFrame(render);

		return () => {
			if (requestIdRef.current) {
				cancelAnimationFrame(requestIdRef.current);
			}
		};
	}, [callback]);
};
