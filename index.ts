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
		"width": "800px",
		// "@media": {
			// "screen and (max-width: 960px)": {
				// "width": "100%",
			// },
		// },
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
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		".label": {
			"transition": "0.2s",
			"position": "absolute",
			"left": "190px",
			"top": "190px",
		},
		// ".gfx": {
			// "@media": {
				// "screen and (max-width: 960px)": {
					// "width": "100%",
					// "max-width": "480px",
				// },
			// },
		// },
		// "@media": {
			// "screen and (max-width: 960px)": {
				// "position": "relative",
				// "width": "100%",
			// },
		// },
	},
	"#shroooms": {
		"position": "absolute",
		"right": "0",
		"top": "300px",
		"transition": "0.2s",
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		".label": {
			"transition": "0.2s",
			"position": "absolute",
			"left": "100px",
			"top": "320px",
		},
		// "@media": {
			// "screen and (max-width: 960px)": {
				// "position": "relative",
				// "width": "100%",
			// },
		// },
	},
	"#shirt": {
		"position": "absolute",
		"left": "60px",
		"top": "680px",
		"transition": "0.2s",
		"width": "320px",
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		".label": {
			"transition": "0.2s",
			"position": "absolute",
			"left": "160px",
			"top": "180px",
		},
		// "@media": {
			// "screen and (max-width: 960px)": {
				// "position": "relative",
				// "width": "100%",
			// },
		// },
	},
	"#phone": {
		"position": "absolute",
		"right": "160px",
		"top": "880px",
		"transition": "0.2s",
		"width": "200px",
		":hover": {
			"transform": "scale(1.05)",
			".label": {
				"transform": "scale(1.1)",
			},
		},
		".label": {
			"transition": "0.2s",
			"position": "absolute",
			"left": "10px",
			"top": "130px",
		},
		// "@media": {
			// "screen and (max-width: 960px)": {
				// "position": "relative",
				// "width": "100%",
			// },
		// },
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
				h("div", { id: "content" }, [
					h("img", { id: "title", src: "/static/img/title.png" }),
					h("div", { class: "stretch-x vstack align-center justify-center g32" }, [
						h("a", { id: "cd", href: "/music", }, [
							h("img", { class: "gfx", src: "/static/img/cd.png" }),
							h("img", { class: "label", src: "/static/img/music.png" }),
						]),
						h("a", { id: "shroooms", href: "/artworks", }, [
							h("img", { class: "gfx", src: "/static/img/shroooms.png" }),
							h("img", { class: "label", src: "/static/img/artworks.png" }),
						]),
						h("a", { id: "shirt", href: "/shop", }, [
							h("img", { class: "gfx", src: "/static/img/shirt.png" }),
							h("img", { class: "label", src: "/static/img/shop.png" }),
						]),
						h("a", { id: "phone", href: "/contact", }, [
							h("img", { class: "gfx", src: "/static/img/phone.png" }),
							h("img", { class: "label", src: "/static/img/contact.png" }),
						]),
					]),
				]),
				h("img", { id: "ground", src: "/static/img/ground.png" }),
				h("img", { id: "pandasheep", src: "/static/img/pandasheep.png" }),
				h("img", { id: "rest", src: "/static/img/rest.png" }),
			]),
			// h("div", { id: "mousetest" }, []),
		]),
	]))
}

export default handler
