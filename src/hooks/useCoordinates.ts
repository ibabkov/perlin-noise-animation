import React, { useEffect, useRef } from 'react';

import type { Uniform } from '../components/ShaderCanvas';

export const useCoordinates = (ref: React.RefObject<HTMLCanvasElement>) => {
	const uniformRef = useRef<Uniform<[number, number]>>({
		type: '2f',
		value: [-1, -1],
	});

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (!ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const normalizedX = (event.clientX - rect.left) / rect.width;
			const normalizedY = (event.clientY - rect.top) / rect.height;

			uniformRef.current.value = [normalizedX, 1 - normalizedY];
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (!ref.current) return;
			const touch = event.touches[0];
			const rect = ref.current.getBoundingClientRect();
			const normalizedX = (touch.clientX - rect.left) / rect.width;
			const normalizedY = (touch.clientY - rect.top) / rect.height;

			uniformRef.current.value = [normalizedX, 1 - normalizedY];
		};

		const element = ref.current;
		if (element) {
			element.addEventListener('mousemove', handleMouseMove);
			element.addEventListener('touchmove', handleTouchMove);

			return () => {
				element.removeEventListener('mousemove', handleMouseMove);
				element.removeEventListener('touchmove', handleTouchMove);
			};
		}
	}, [ref]);

	return uniformRef.current;
};
