const songPath = "/static/songs"

const songs = [
	"immense blue pane",
	"no animals in the lake",
	"our body is a power station",
	"spring behind the mountains",
	"the imagination of water",
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
	const label = document.querySelector<HTMLImageElement>("#player #label")
	if (label) {
		label.textContent = songs[curSong] + ".mp3"
	}
}

function play() {
	audio.play()
	const btn = document.querySelector<HTMLImageElement>("#player #btn_play")
	if (btn) {
		btn.src = "/static/img/btn_pause.png"
	}
}

function pause() {
	audio.pause()
	const btn = document.querySelector<HTMLImageElement>("#player #btn_play")
	if (btn) {
		btn.src = "/static/img/btn_play.png"
	}
}

document.addEventListener("DOMContentLoaded", () => {

	const player = document.querySelector<HTMLDivElement>("#player")
	const playBtn = player?.querySelector<HTMLImageElement>("#btn_play")
	const stopBtn = player?.querySelector<HTMLImageElement>("#btn_stop")
	const prevBtn = player?.querySelector<HTMLImageElement>("#btn_prev")
	const nextBtn = player?.querySelector<HTMLImageElement>("#btn_next")
	const time = player?.querySelector<HTMLParagraphElement>("#time")
	const label = player?.querySelector<HTMLParagraphElement>("#label")

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

	setInterval(() => {
		if (time) {
			const min = Math.floor(audio.currentTime / 60)
			const secs = Math.floor(audio.currentTime - min * 60)
			time.textContent = `${String(min).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
		}
	}, 100)

})
