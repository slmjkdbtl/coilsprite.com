import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc, js, dataurl, Handler } from "./www"
import { head } from "./shared"

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
			]),
		]),
	]))
}

export default handler
