import tween, { easings } from "./tween"

const TRAIL_FREQ = [48, 96]
const TRAIL_RANGE = 8

let trailFreq = randi(TRAIL_FREQ[0], TRAIL_FREQ[1])
let trailMeter = 0

function rand(x: number, y: number) {
	return x + Math.random() * (y - x)
}

function randi(x: number, y: number) {
	return Math.floor(rand(x, y))
}

function onMouseMove(e: MouseEvent) {
	const dx = e.movementX
	const dy = e.movementY
	trailMeter += Math.abs(dx) + Math.abs(dy)
	if (trailMeter >= trailFreq) {
		trailMeter -= trailFreq
		trailFreq = randi(TRAIL_FREQ[0], TRAIL_FREQ[1])
		spawnTrail(e.pageX + rand(-TRAIL_RANGE, TRAIL_RANGE), e.pageY + rand(-TRAIL_RANGE, TRAIL_RANGE))
	}
}

function wait(t: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, t * 1000)
	})
}

async function spawnTrail(x: number, y: number) {
	const bling = document.createElement("img")
	const s = rand(0.1, 0.5)
	const r = 0
	bling.src = "/static/img/bling.png"
	bling.classList.add("bling")
	bling.style.opacity = rand(0.2, 0.8) + ""
	bling.style.left = x - bling.width / 2 + "px"
	bling.style.top = y - bling.height / 2 + "px"
	document.body.appendChild(bling)
	const t = tween(0, s, 1, (s: number) => {
		bling.style.transform = `scale(${s}) rotate(${r}deg)`
	}, easings.easeOutElastic)
	await wait(0.5)
	t.cancel()
	await tween(s, 0, 1, (s: number) => {
		bling.style.transform = `scale(${s}) rotate(${r}deg)`
	}, easings.easeOutElastic)
	document.body.removeChild(bling)
}

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("mousemove", onMouseMove)
})
