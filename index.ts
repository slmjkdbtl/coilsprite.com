import { h, css, cc, js, Handler } from "./www"
import { head } from "./shared"

const styles = {
	"#content": {
		...cc("vstack fill-x relative"),
		"margin": "0 auto",
		"max-width": "800px",
		"padding-bottom": "100px",
	},
	"#title": {
		"margin-top": "48px",
		"max-width": "360px",
		"width": "80%",
	},
	".blocks": {
		...cc("fill-x vstack align-center justify-center relative"),
		"height": "780px",
		"@media": {
			"(max-width: 640px)": {
				"height": "auto",
			},
		},
	},
	".block": {
		"position": "absolute",
		"transition": "transform 0.2s",
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		"@media": {
			"(max-width: 640px)": {
				"width": "90%",
				"max-width": "400px",
				"position": "relative",
				"left": "unset !important",
				"right": "unset !important",
				"top": "unset !important",
				"bottom": "unset !important",
			},
		},
		".gfx": {
			"width": "100%",
			"@media": {
				"(max-width: 640px)": {
					"width": "100%",
				},
			},
		},
		".label": {
			"transition": "transform 0.2s",
			"position": "absolute",
		},
	},
	"#cd": {
		"left": "0",
		"top": "0",
		".label": {
			"left": "50%",
			"top": "58%",
			"width": "38%",
		},
		"@media": {
			"(max-width: 640px)": {
				"left": "-4% !important",
				"width": "110%",
			},
		},
	},
	"#shroooms": {
		"right": "0",
		"top": "40px",
		".label": {
			"left": "20%",
			"top": "60%",
			"width": "45%",
		},
	},
	"#shirt": {
		"left": "8%",
		"top": "400px",
		".label": {
			"width": "26%",
			"left": "45%",
			"top": "60%",
		},
	},
	"#phone": {
		"right": "20%",
		"top": "560px",
		"max-width": "240px",
		".label": {
			"width": "80%",
			"left": "5%",
			"top": "60%",
		},
		"@media": {
			"(max-width: 640px)": {
				"width": "70%",
			},
		},
	},
	"#rest": {
		"position": "absolute",
		"width": "480px",
		"right": "8%",
		"bottom": "0",
		"pointer-events": "none",
		"@media": {
			"(max-width: 840px)": {
				"display": "none",
			},
		},
	},
	"#pandasheep": {
		"position": "absolute",
		"width": "240px",
		"left": "12%",
		"bottom": "20px",
		"pointer-events": "none",
	},
	"#ground": {
		"margin-top": "160px",
		"position": "relative",
		"width": "100%",
		"height": "240px",
		"background": "url(/static/img/ground.png) no-repeat",
		"background-size": "1600px",
		"background-position": "center 0px",
		"@media": {
			"(min-width: 1420px)": {
				"display": "none",
			},
		},
	},
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "coilsprite"),
			h("meta", { name: "description", content: "midorii's homepage", }),
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("div", { id: "content", class: "vstack align-center" }, [
				h("img", { id: "title", src: "/static/img/title.png" }),
				h("div", { class: "blocks" }, [
					h("a", { id: "cd", class: "block", href: "/music", }, [
						h("img", { class: "gfx", src: "/static/img/cd.png" }),
						h("img", { class: "label", src: "/static/img/music.png" }),
					]),
					h("a", { id: "shroooms", class: "block", href: "/artworks", }, [
						h("img", { class: "gfx", src: "/static/img/shroooms.png" }),
						h("img", { class: "label", src: "/static/img/artworks.png" }),
					]),
					h("a", { id: "shirt", class: "block", href: "/shop", }, [
						h("img", { class: "gfx", src: "/static/img/shirt.png" }),
						h("img", { class: "label", src: "/static/img/shop.png" }),
					]),
					h("a", { id: "phone", class: "block", href: "/contact", }, [
						h("img", { class: "gfx", src: "/static/img/phone.png" }),
						h("img", { class: "label", src: "/static/img/contact.png" }),
					]),
				]),
			]),
			h("div", { id: "ground" }, [
				h("img", { id: "pandasheep", src: "/static/img/pandasheep.png" }),
				h("img", { id: "rest", src: "/static/img/rest.png" }),
			]),
			// h("div", { id: "mousetest" }, []),
		]),
	]))
}

export default handler
