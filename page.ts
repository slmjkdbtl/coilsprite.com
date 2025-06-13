import { h, css, cc, csslib, classes, js, Handler } from "./www"
import scripts from "./scripts"

const styles = {
	"*": {
		"margin": "0",
		"padding": "0",
		"box-sizing": "border-box",
		"cursor": "url(/static/img/wand.png) 32 32, auto",
	},
	"html": {
		"width": "100%",
		"height": "100%",
	},
	"body": {
		"width": "100%",
		"height": "100%",
		"overflow-x": "hidden",
		"background": "url(/static/img/sky.jpg)",
		"background-size": "400px",
		"animation": "scroll 60s infinite linear",
	},
	"figure": {
		...cc("vstack g-16 align-center text-center"),
	},
	"p": {
		"::selection": {
			// TODO
		},
	},
	".bling": {
		"position": "absolute",
		"z-index": "1000",
		"pointer-events": "none",
	},
	"#mousetest": {
		"background": "white",
		"width": "300px",
		"height": "200px",
		"position": "absolute",
		"top": "100px",
		"left": "200px",
		"z-index": "1000",
		":hover": {
			"background": "blue",
		},
	},
	"@keyframes": {
		"scroll": {
			"from": {
				"background-position": "0 0",
			},
			"to": {
				"background-position": "400px 0",
			},
		}
	},
}

export type Opts = {
	title? : string,
	desc? : string,
}

export default function page(body: string[], opts: Opts = {}): Handler {
	return ({ res, req }) => {
		return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
			h("head", {}, [
				h("title", {}, opts.title ?? "coilsprite"),
				h("meta", { name: "description", content: opts.desc ?? "midorii's homepage", }),
				h("meta", { charset: "utf-8", }),
				h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
				h("link", { rel: "icon", href: "/static/img/midorii.png" }),
				h("style", {}, csslib()),
				h("style", {}, css(styles)),
				h("script", {}, scripts.bling),
				h("script", {}, scripts.player),
			]),
			h("body", {}, body),
		]))
	}
}
