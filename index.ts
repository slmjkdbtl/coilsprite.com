import { h, css, cc, js, Handler } from "./www"
import { head } from "./shared"

const styles = {
	"main": {
		"width": "100%",
		"position": "relative",
	},
	"#content": {
		"position": "relative",
		"margin": "0 auto",
		"max-width": "800px",
		"width": "100%",
		"padding-bottom": "100px",
	},
	"#title": {
		"position": "absolute",
		"left": "50%",
		"top": "40px",
		"transform": "translateX(-50%)",
		"max-width": "360px",
		"width": "80%",
		"@media": {
			"screen and (max-width: 600px)": {
				"position": "static",
				"transform": "translateX(0)",
				"margin-top": "40px",
			},
		},
	},
	".block": {
		"position": "absolute",
		"transition": "0.2s",
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		".gfx": {
			"@media": {
				"screen and (max-width: 600px)": {
					"width": "100%",
				},
			},
		},
		".label": {
			"transition": "0.2s",
			"position": "absolute",
			"@media": {
				"screen and (max-width: 600px)": {
					"position": "static",
					"max-width": "40%",
				},
			},
		},
		"@media": {
			"screen and (max-width: 600px)": {
				"width": "100%",
				"position": "static",
				...cc("vstack align-center"),
			},
		},
	},
	"#cd": {
		"left": "0px",
		"top": "220px",
		".label": {
			"left": "180px",
			"top": "200px",
		},
	},
	"#shroooms": {
		"right": "0",
		"top": "280px",
		".label": {
			"left": "100px",
			"top": "320px",
		},
	},
	"#shirt": {
		"left": "60px",
		"top": "640px",
		".label": {
			"left": "160px",
			"top": "180px",
		},
	},
	"#phone": {
		"right": "160px",
		"top": "800px",
		".label": {
			"left": "10px",
			"top": "130px",
		},
	},
	"#rest": {
		"position": "absolute",
		"width": "480px",
		"right": "120px",
		"bottom": "0",
		"pointer-events": "none",
	},
	"#pandasheep": {
		"position": "absolute",
		"width": "240px",
		"left": "120px",
		"bottom": "20px",
		"pointer-events": "none",
	},
	"#ground": {
		"position": "absolute",
		"min-width": "calc(100vw + 20%)",
		"left": "50%",
		"transform": "translate(-50%, 0)",
		"bottom": "-10%",
		"pointer-events": "none",
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
				h("div", { id: "content", class: "vstack align-center" }, [
					h("img", { id: "title", src: "/static/img/title.png" }),
					h("div", { class: "fill-x vstack align-center justify-center g-32" }, [
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
				// h("img", { id: "ground", src: "/static/img/ground.png" }),
				// h("img", { id: "pandasheep", src: "/static/img/pandasheep.png" }),
				// h("img", { id: "rest", src: "/static/img/rest.png" }),
			]),
			// h("div", { id: "mousetest" }, []),
		]),
	]))
}

export default handler
