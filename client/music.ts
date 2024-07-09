type AudioState = {
	disc: HTMLElement,
	audio: HTMLAudioElement,
	playing: boolean,
}

const discs = document.querySelectorAll<HTMLElement>(".disc")
const audioState: Map<HTMLElement, AudioState> = new Map()

function pause(state: AudioState) {
	state.disc.classList.remove("play")
	state.audio.pause()
	state.playing = false
}

function play(state: AudioState) {
	state.disc.classList.add("play")
	state.audio.play()
	state.playing = true
}

discs.forEach((disc) => {
	const songPath = disc.dataset["song"]
	if (!songPath) return
	const audio = new Audio(songPath)
	audioState.set(disc, {
		disc,
		audio,
		playing: false,
	})
	disc.addEventListener("click", () => {
		const state = audioState.get(disc)
		if (!state) return
		audioState.forEach((state2) => {
			if (state2.playing && state2.disc !== disc) {
				pause(state2)
			}
		})
		if (state.playing) {
			pause(state)
		} else {
			play(state)
		}
	})
})
