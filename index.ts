import { h, css, js, Handler } from "./www"
import { head } from "./shared"

const styles = {
	"main": {
		"width": "100%",
		"height": "1600px",
		"min-height": "100vh",
		"overflow": "hidden",
		"position": "relative",
	},
	"#content": {
		"position": "relative",
		"margin": "0 auto",
		"width": "720px",
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
		"width": "400px",
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
		"width": "400px",
		":hover": {
			"transform": "scale(1.05)",
		},
	},
	"#phone": {
		"position": "absolute",
		"right": "160px",
		"top": "680px",
		"transition": "0.2s",
		"width": "200px",
		":hover": {
			"transform": "scale(1.1)",
		},
	},
	"#rest": {
		"position": "absolute",
		"width": "480px",
		"right": "120px",
		"bottom": "0",
	},
	"#ground": {
		"position": "absolute",
		"min-width": "calc(100vw + 20%)",
		"left": "50%",
		"transform": "translate(-50%, 0)",
		"bottom": "-10%",
	},
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "coilsprite"),
			h("meta", { name: "description", content: "midori's homepage", }),
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("main", {}, [
				h("div", { id: "content" }, [
					h("img", { id: "title", src: "/static/img/title.png" }),
					h("a", { href: "/music", }, [
						h("img", { id: "cd", src: "/static/img/cd.png" }),
					]),
					h("a", { href: "/shop", }, [
						h("img", { id: "shirt", src: "/static/img/shirt.png" }),
					]),
					h("a", { href: "/artworks", }, [
						h("img", { id: "shroooms", src: "/static/img/shroooms.png" }),
					]),
					h("a", { href: "/contact", }, [
						h("img", { id: "phone", src: "/static/img/phone.png" }),
					]),
				]),
				h("img", { id: "ground", src: "/static/img/ground.png" }),
				h("img", { id: "rest", src: "/static/img/rest.png" }),
			]),
			// h("div", { id: "mousetest" }, []),
		]),
	]))
}

export default handler
