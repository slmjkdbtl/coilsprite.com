import * as fs from "fs/promises"
import { h, css, cc, js, Handler } from "./www"
import { head } from "./shared"

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
			"background": "#ffffff9f",
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
			"border-radius": "4px",
		},
	},
}

type Project = {
	name: string,
	path: string,
	images: string[],
	color: string,
}

const projects: Project[] = [
	{
		name: "Poster design & drawings",
		path: "posters_drawings",
		images: [],
		color: "#078E3B",
	},
	{
		name: "CD Design for East of Mozart",
		path: "east_of_mozart",
		images: [],
		color: "#E46BBE",
	},
	{
		name: "Menu Design for Heal We Bar",
		path: "heal_we_bar",
		images: [],
		color: "#FE9479",
	},
]

for (const proj of projects) {
	const images = await fs.readdir(`static/${proj.path}`)
	proj.images = images.sort()
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "artworks - coilsprite"),
			h("meta", { name: "description", content: "midori's artworks", }),
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("main", {}, [
				h("div", { class: "vstack g-128" }, projects.map((p) => {
					return h("div", { class: "section" }, [
						h("img", { class: "title", src: `/static/img/${p.path}.png` }),
						h("div", { class: "images" }, [
							h("div", { class: "backdrop" }, []),
							...p.images.map((f) => {
								return h("img", {
									class: "present",
									src: `/static/${p.path}/${f}`,
									"data-present-scope": p.path,
								})
							})
						]),
					])
				})),
			]),
			h("script", {}, await js("client/artworks.ts")),
		]),
	]))
}

export default handler
