import * as fs from "fs/promises"
import { h, css, cc } from "./www"
import page from "./page"
import scripts from "./scripts"

const styles = {
	"body": {
		"font-family": "Monospace",
		"font-size": "24px",
		"overflow-x": "hidden",
	},
	"main": {
		"margin": "0 auto",
		"max-width": "800px",
		"padding": "64px 16px",
		...cc([
			"fill-x",
			"vstack",
			"g-64",
		]),
		"@media": {
			"(max-width: 800px)": {
				"overflow-x": "hidden",
			},
		},
	},
	".section": {
		...cc([
			"fill-x",
			"vstack",
			"g-32",
			"align-center",
		]),
	},
	".title": {
		"width": "100%",
		"max-width": "600px",
	},
	".images": {
		".backdrop": {
			...cc([
				"center-abs",
				"z--8",
				"r-16",
			]),
			"width": "calc(100% + 120px)",
			"height": "calc(100% + 120px)",
			"filter": "blur(32px)",
			"background": "#ffffffaf",
		},
		...cc([
			"relative",
			"grid",
			"fill-x",
			"colw-160",
			"g-16",
			"align-center",
			"justify-center",
		]),
		"img": {
			"max-width": "100%",
			"max-height": "100%",
			"transition": "0.2s",
		},
	},
}

type Project = {
	name: string,
	path: string,
	images: string[],
}

const projects: Project[] = [
	{
		name: "Poster design & drawings",
		path: "posters_drawings",
		images: [],
	},
	{
		name: "CD Design for East of Mozart",
		path: "east_of_mozart",
		images: [],
	},
	{
		name: "Menu Design for Heal We Bar",
		path: "heal_we_bar",
		images: [],
	},
]

for (const proj of projects) {
	const images = await fs.readdir(`static/img/artworks/${proj.path}`)
	proj.images = images.sort()
}

export default page([
	h("style", {}, css(styles)),
	h("main", {}, [
		h("div", { class: "vstack g-128" }, projects.map((p) => {
			return h("div", { class: "section" }, [
				h("img", { class: "title", src: `/static/img/artworks/${p.path}.png` }),
				h("div", { class: "images" }, [
					h("div", { class: "backdrop" }, []),
					...p.images.map((f) => {
						return h("img", {
							class: "present",
							src: `/static/img/artworks/${p.path}/${f}`,
							"data-present-scope": p.path,
						})
					})
				]),
			])
		})),
	]),
	h("script", {}, scripts.artworks),
], {
	title: "artworks - coilsprite",
	desc: "midorii's artworks",
})
