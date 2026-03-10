function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
	const devicePixelRatio = typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio, 2);
	const { width, height } = canvas.getBoundingClientRect();
	const displayWidth = Math.floor(width * devicePixelRatio);
	const displayHeight = Math.floor(height * devicePixelRatio);

	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}
}

export { resizeCanvasToDisplaySize };
