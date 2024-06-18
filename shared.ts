import { h, css, csslib, js, } from "./www"

const styles = {
	"*": {
		"margin": "0",
		"padding": "0",
		"box-sizing": "border-box",
		"cursor": "url(/static/img/wand.png) 32 32, default",
	},
	"html": {
		"width": "100%",
	},
	"body": {
		"width": "100%",
		"overflow-x": "hidden",
		"background": "url(/static/img/sky.jpg)",
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
}

export async function head() {
	return [
		h("meta", { charset: "utf-8", }),
		h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
		h("link", { rel: "icon", href: "/static/img/midorii.png" }),
		h("style", {}, csslib()),
		h("style", {}, css(styles)),
		h("script", {}, await js("client/bling.ts")),
	]
}
