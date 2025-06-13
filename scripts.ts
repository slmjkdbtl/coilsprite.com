import { js } from "./www"
import "./client/bling" with { type: "text" }
import "./client/artworks" with { type: "text" }
import "./client/player" with { type: "text" }

export default {
	bling: await js("client/bling.ts"),
	artworks: await js("client/artworks.ts"),
	player: await js("client/player.ts"),
}
