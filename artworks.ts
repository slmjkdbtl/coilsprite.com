import * as fs from "fs/promises"
import { h, css, js, Handler } from "./www"
import { head } from "./shared"

const styles = {
	".thumb": {
		"width": "200px",
		"height": "200px",
		"img": {
			"max-width": "100%",
			"max-height": "100%",
		},
	},
	"body": {
		// "padding": "32px",
		"font-family": "Monospace",
		"font-size": "24px",
	},
	".section": {
		":nth-child(odd)": {
			"background": "#dd6ba7",
		},
		":nth-child(even)": {
			"background": "#e9ba50",
		},
	},
}

const projects = [
	"posters_drawings",
	"east_of_mozart",
	"heal_we_bar",
]

const p: Record<string, string[]> = {}

for (const proj of projects) {
	const images = await fs.readdir(`static/${proj}`)
	p[proj] = images.sort()
}

const handler: Handler = async ({ res }) => {
	// const dir = await fs.readdir("static/artworks")
	// const files = dir.sort()
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "artworks - coilsprite"),
			h("meta", { name: "description", content: "midori's artworks", }),
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			// h("div", { class: "hstack g16 wrap" }, files.map((f) => {
				// return h("div", { class: "thumb flex center" }, [
					// h("img", { class: "present center", "data-present-scope": "artwork", src: `/static/artworks/${f}` }),
				// ])
			// })),
			h("div", { class: "section p32 stretch-x vstack g16" }, [
				h("p", {}, "Poster design / drawings"),
				h("div", { class: "hstack g16 wrap" }, p["posters_drawings"].map((f) => {
					return h("div", { class: "thumb flex center" }, [
						h("img", {
							class: "present center",
							src: `/static/posters_drawings/${f}`,
							"data-present-scope": "posters_drawings",
						}),
					])
				})),
			]),
			h("div", { class: "section p32 stretch-x vstack g16" }, [
				h("p", {}, "CD Design for East of Mozart"),
				h("div", { class: "hstack g16 wrap" }, p["east_of_mozart"].map((f) => {
					return h("div", { class: "thumb flex center" }, [
						h("img", {
							class: "present center",
							src: `/static/east_of_mozart/${f}`,
							"data-present-scope": "east_of_mozart",
						}),
					])
				})),
			]),
			h("div", { class: "section p32 stretch-x vstack g16" }, [
				h("p", {}, "Menu Design for Heal We Bar"),
				h("div", { class: "hstack g16 wrap" }, p["heal_we_bar"].map((f) => {
					return h("div", { class: "thumb flex center" }, [
						h("img", {
							class: "present center",
							src: `/static/heal_we_bar/${f}`,
							"data-present-scope": "east_of_mozart",
						}),
					])
				})),
			]),
			h("script", {}, await js("client/artworks.ts")),
		]),
	]))
}

export default handler
