function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, devicePixelRatio: number) {
	const { width, height } = canvas.getBoundingClientRect();
	const displayWidth = Math.floor(width * devicePixelRatio);
	const displayHeight = Math.floor(height * devicePixelRatio);

	if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}
}

export { resizeCanvasToDisplaySize };
