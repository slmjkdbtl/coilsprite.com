// TODO: embed image and create DOM in this script

const songPath = "/static/songs"

const songs = [
	"no animals in the lake",
	"the imagination of water",
	"our body is a power station",
	"spring behind the mountains",
	"immense blue pane",
	"trippy ticket",
]

let curSong = 0
const audio = new Audio()

function toSong(i: number) {
	curSong = i
	const paused = audio.paused
	audio.src = `${songPath}/${songs[curSong]}.mp3`
	audio.load()
	if (!paused) {
		audio.play()
	}
	const label = document.querySelector<HTMLImageElement>("#player .label p")
	if (label) {
		label.textContent = songs[curSong] + ".mp3"
	}
}

function preload(url: string) {
	const img = new Image()
	img.src = url
}

preload("/static/img/btn_pause.png")

function play() {
	audio.play()
	const btn = document.querySelector<HTMLImageElement>("#player .btn_play")
	const label = document.querySelector<HTMLDivElement>("#player .label")
	if (btn) {
		btn.src = "/static/img/btn_pause.png"
	}
	if (label) {
		label.classList.add("marquee")
	}
}

function pause() {
	audio.pause()
	const btn = document.querySelector<HTMLImageElement>("#player .btn_play")
	const label = document.querySelector<HTMLDivElement>("#player .label")
	if (btn) {
		btn.src = "/static/img/btn_play.png"
	}
	if (label) {
		label.classList.remove("marquee")
	}
}

document.addEventListener("DOMContentLoaded", () => {

	const player = document.querySelector<HTMLDivElement>("#player")
	const bg = player?.querySelector<HTMLImageElement>(".bg")
	const playBtn = player?.querySelector<HTMLImageElement>(".btn_play")
	const stopBtn = player?.querySelector<HTMLImageElement>(".btn_stop")
	const prevBtn = player?.querySelector<HTMLImageElement>(".btn_prev")
	const nextBtn = player?.querySelector<HTMLImageElement>(".btn_next")
	const time = player?.querySelector<HTMLParagraphElement>(".time")
	const label = player?.querySelector<HTMLParagraphElement>(".label")
	const handle = player?.querySelector<HTMLImageElement>(".progress_handle")

	bg?.addEventListener("mousedown", (e) => {

		if (!player) return

		e.preventDefault()
		const rect = bg.getBoundingClientRect()
		const offset = [rect.x - e.clientX, rect.y - e.clientY]

		function onmousemove(e: MouseEvent) {
			if (!player) return
			e.preventDefault()
			player.style.left = e.clientX + offset[0] + "px"
			player.style.top = e.clientY + offset[1] + "px"
			player.style.bottom = "unset"
			player.style.right = "unset"
		}

		function onmouseup(e: MouseEvent) {
			document.removeEventListener("mousemove", onmousemove)
			document.removeEventListener("mouseup", onmouseup)
		}

		document.addEventListener("mousemove", onmousemove)
		document.addEventListener("mouseup", onmouseup)

	})

	toSong(curSong)

	playBtn?.addEventListener("click", () => {
		if (audio.paused) {
			play()
		} else {
			pause()
		}
	})

	stopBtn?.addEventListener("click", () => {
		audio.currentTime = 0
	})

	prevBtn?.addEventListener("click", () => {
		curSong = curSong === 0 ? songs.length - 1 : curSong - 1
		toSong(curSong)
	})

	nextBtn?.addEventListener("click", () => {
		curSong = (curSong + 1) % songs.length
		toSong(curSong)
	})

	handle?.addEventListener("mousedown", () => {
		// TODO
	})

	setInterval(() => {
		if (time) {
			const min = Math.floor(audio.currentTime / 60)
			const secs = Math.floor(audio.currentTime - min * 60)
			time.textContent = `${String(min).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
		}
	}, 100)

})
