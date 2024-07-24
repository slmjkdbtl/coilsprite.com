import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc, js, dataurl, Handler } from "./www"
import { head } from "./shared"

const qrs = [
	{ name: "小红书", path: "redbook" },
	{ name: "微信视频号", path: "wechat_channel" },
]

const styles = {
	"body": {
		"font-family": "APL2741",
		"font-size": "16px",
		"font-weight": "1000",
	},
	"main": {
		"margin": "0 auto",
		"max-width": "800px",
		"padding": "16px",
		"padding-bottom": "200px",
		...cc([
			"fill-x",
			"vstack",
			"g-64",
			"align-center",
		]),
	},
	"a": {
		"font-size": "24px",
	},
	".telephone": {
		"width": "100%",
	},
	"@font-face": [
		{
			"font-family": "APL2741",
			"src": `url(/static/fonts/APL2741.ttf)`,
			"font-display": "block",
		},
	],
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "contact - coilsprite"),
			h("meta", { name: "description", content: "midorii's contact", }),
			// @ts-ignore
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("main", {}, [
				h("img", { class: "telephone", src: "/static/img/telephone.png" }),
				h("a", { href: "https://www.instagram.com/coilsprite/" }, "instagram"),
				// h("div", { class: "vstack g-16" }, qrs.map((qr) => {
					// return h("figure", {}, [
						// h("img", { class: "w-120 fill-x", src: `/static/img/qr/${qr.path}.png` }),
						// h("figcaption", {}, qr.name),
					// ])
				// })),
			]),
		]),
	]))
}

export default handler
