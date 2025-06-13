import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc } from "./www"
import page from "./page"

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

export default page([
	// @ts-ignore
	h("style", {}, css(styles)),
	h("main", {}, [
		h("img", { class: "telephone", src: "/static/img/telephone.png" }),
		h("a", { href: "https://www.instagram.com/coilsprite/" }, "instagram"),
	]),
], {
	title: "contact - coilsprite",
	desc: "midorii's contacts",
})
