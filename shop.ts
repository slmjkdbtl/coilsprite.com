import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc } from "./www"
import page from "./page"

const styles = {
	"body": {
		"font-family": "APL2741",
		"font-size": "20px",
		"font-weight": "1000",
		"padding": "16px",
	},
	"main": {
		"margin": "0 auto",
		"max-width": "800px",
		"padding-top": "32px",
		"padding-bottom": "64px",
		...cc([
			"fill-x",
			"vstack",
			"g-48",
			"align-center",
			"text-center",
		]),
	},
	".logo": {
		"max-width": "240px",
		"width": "90%",
	},
	".shelf": {
		...cc("fill-x grid col-3 g-16"),
		"@media": {
			"(max-width: 640px)": {
				...cc("col-1"),
			},
		},
	},
	"@font-face": [
		{
			"font-family": "APL2741",
			"src": `url(/static/fonts/APL2741.ttf)`,
			"font-display": "block",
		},
	],
}

function range(a: number, b: number) {
	return Array.from({ length: b - a + 1 }, (val, i) => a + i)
}

export default page([
	// @ts-ignore
	h("style", {}, css(styles)),
	h("main", {}, [
		h("img", { class: "logo", src: "/static/img/shop/logo.png" }),
		h("div", { class: "vstack g-16 align-center" }, [
			h("img", { class: "w-80", src: "/static/img/qr/taobao.png" }),
			h("a", { href: "https://chilldrink.world.taobao.com/" }, "go to taobao store"),
		]),
		h("div", { class: "vstack g-16" }, [
			h("div", { class: "shelf" }, range(1, 9).map((i) => {
				return h("img", { class: "fill-x", src: `/static/img/shop/${i}.jpg` })
			})),
			h("img", { class: "fill-x", src: `/static/img/shop/10.jpg` }),
			h("div", { class: "shelf" }, range(11, 13).map((i) => {
				return h("img", { class: "fill-x", src: `/static/img/shop/${i}.jpg` })
			})),
			...range(14, 16).map((i) => {
				return h("img", { class: "fill-x", src: `/static/img/shop/${i}.jpg` })
			})
		]),
	]),
], {
	title: "shop - coilsprite",
	desc: "midorii's shop",
})
