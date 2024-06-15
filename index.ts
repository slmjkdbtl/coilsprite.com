import { h, css, csslib, js, Handler } from "./www"

const styles = {
	"*": {
		"margin": "0",
		"padding": "0",
		"box-sizing": "border-box",
		"cursor": "url(/static/img/wand.png) 32 32, default",
	},
	"html": {
		"width": "100%",
		"height": "100%",
	},
	"body": {
		"cursor": "url(/static/img/wand.png)",
		"width": "100%",
		"height": "100%",
		"background": "url(/static/img/sky.jpg)",
		// "background": "url(/static/img/shroomkingdom.jpg) no-repeat",
		// "background-size": "cover",
		// "background": "linear-gradient(#cc00ff, #ffffff)",
		// "background": "linear-gradient(#9511ba, #000000)",
		// "background": "#000000",
	},
	"img": {
		// "image-rendering": "pixelated",
	},
	"#ch": {
		"position": "absolute",
		"left": "540px",
		"top": "220px",
	},
	"#midori": {
		"position": "absolute",
		"left": "20px",
		"bottom": "20px",
	},
	"#talk": {
		"position": "absolute",
		"left": "120px",
		"bottom": "120px",
		"animation": "talk 1s infinite",
		"transform-origin": "bottom left",
	},
	".bling": {
		"position": "absolute",
		"z-index": "1000",
	},
	"#title": {
		"position": "absolute",
		"left": "50%",
		"top": "40px",
		"transform": "translateX(-50%)",
		"width": "360px",
	},
	"#cd": {
		"position": "absolute",
		"left": "0px",
		"top": "220px",
		"transition": "0.2s",
		"width": "320px",
		":hover": {
			"transform": "scale(1.05)",
		},
	},
	"#shirt": {
		"position": "absolute",
		"left": "60px",
		"top": "560px",
		"transition": "0.2s",
		"width": "320px",
		":hover": {
			"transform": "scale(1.05)",
		},
	},
	"#shroooms": {
		"position": "absolute",
		"right": "0",
		"top": "240px",
		"transition": "0.2s",
		"width": "420px",
		":hover": {
			"transform": "scale(1.05)",
		},
	},
	"main": {
		"position": "relative",
		"margin": "0 auto",
		"width": "720px",
		"background": "red",
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
		"talk": {
			"0%": {
				"transform": "scale(1.0)",
			},
			"50%": {
				"transform": "scale(1.05) rotate(1deg)",
			},
			"100%": {
				"transform": "scale(1.0)",
			},
		},
	},
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			h("title", {}, "coilsprite"),
			h("meta", { charset: "utf-8", }),
			h("meta", { name: "description", content: "midori's homepage", }),
			h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
			h("link", { rel: "icon", href: "/static/img/midori@10x.png" }),
			h("style", {}, csslib()),
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("main", {}, [
				h("img", { id: "title", src: "/static/img/title.png" }),
				h("img", { id: "cd", onclick: "alert(\"TODO: show music\")", src: "/static/img/cd.png" }),
				h("img", { id: "shirt", onclick: "alert(\"TODO: show xxx\")", src: "/static/img/shirt.png" }),
				h("img", { id: "shroooms", onclick: "alert(\"TODO: show bio\")", src: "/static/img/shroooms.png" }),
			]),
			// h("div", { id: "mousetest" }, []),
			// h("div", { id: "ch" }, [
				// h("img", { id: "midori", src: "/static/img/midori.png" }),
				// h("img", { id: "talk", src: "/static/img/talk.png" }),
			// ]),
			h("script", {}, await js("client/index.ts")),
		]),
	]))
}

export default handler
