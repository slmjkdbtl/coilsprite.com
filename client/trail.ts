export type TrailOpts = {
	width?: number,
	height?: number,
}

export default (opts: TrailOpts = {}) => {

	function onMouseMove(e: MouseEvent) {
		// console.log(e.offsetX)
	}

	document.body.addEventListener("mousemove", onMouseMove)

	function cleanup() {
		document.body.removeEventListener("mousemove", onMouseMove)
	}

	return {
		cleanup,
	}

}
