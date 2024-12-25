import React, { useEffect, useRef } from 'react';

import type { Uniform } from '../components/ShaderCanvas';

export const useCoordinates = (ref: React.RefObject<HTMLCanvasElement | null>) => {
	const uniformRef = useRef<Uniform<[number, number]>>({
		type: '2f',
		value: [-1, -1],
	});
	const windowRef = useRef<[number, number]>([0, 0]);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (!ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const normalizedX = (event.clientX - rect.left) / rect.width;
			const normalizedY = (event.clientY - rect.top) / rect.height;

			windowRef.current = [rect.width, rect.height];
			uniformRef.current.value = [normalizedX, 1 - normalizedY];
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (!ref.current) return;
			const touch = event.touches[0];
			const rect = ref.current.getBoundingClientRect();
			const normalizedX = (touch.clientX - rect.left) / rect.width;
			const normalizedY = (touch.clientY - rect.top) / rect.height;

			windowRef.current = [rect.width, rect.height];
			uniformRef.current.value = [normalizedX, 1 - normalizedY];
		};

		const handleResize = () => {
			if (!ref.current) return;
			const rect = ref.current.getBoundingClientRect();

			uniformRef.current.value = [
				(uniformRef.current.value[0] * windowRef.current[0]) / rect.width,
				(uniformRef.current.value[1] * windowRef.current[1]) / rect.height,
			];
			windowRef.current = [rect.width, rect.height];
		};

		const element = ref.current;
		if (element) {
			element.addEventListener('mousemove', handleMouseMove);
			element.addEventListener('touchmove', handleTouchMove);
			window.addEventListener('resize', handleResize);

			return () => {
				element.removeEventListener('mousemove', handleMouseMove);
				element.removeEventListener('touchmove', handleTouchMove);
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [ref]);

	return uniformRef.current;
};
