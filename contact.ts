import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc, js, dataurl, Handler } from "./www"
import { head } from "./shared"

// qrencode $url -s 16 -o output.png
// magick input.png -transparent white -trim output.png
const links = [
	{ name: "wechat_channel", url: "https://weixin.qq.com/f/MBOLmESbZlq1pBZK8qC0jko" },
	{ name: "redbook", url: "http://xhslink.com/3DNnmQ" },
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
		"padding": "48px",
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
				h("a", { href: "https://www.instagram.com/coilsprite/" }, "instagram"),
				h("figure", {}, [
					h("img", { class: "gigs", src: "/static/img/qr/redbook.png" }),
					h("figcaption", {}, "小红书"),
				]),
				h("figure", {}, [
					h("img", { class: "gigs", src: "/static/img/qr/wechat_channel.png" }),
					h("figcaption", {}, "微信视频号"),
				]),
			]),
		]),
	]))
}

export default handler
