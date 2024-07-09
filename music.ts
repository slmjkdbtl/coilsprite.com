import * as fs from "fs/promises"
import { h, css, cc, js, Handler } from "./www"
import { head } from "./shared"

const coilSprite = {
	bio: "A coil sprite, keen on capturing linear emotions, crawling forward on the road of fourth world music. Following her instincts and clumsily researching to make some fun music, integrating world music,atmosphere, sampling, electronic music, attempting to break the boundaries of traditional music and create a more novel music experience. Also trying to create some soft, peaceful moments and a garden that blooms inward.",
	bioZH: "一只线圈精灵，热衷于捕捉线性情绪，在第四世界音乐道路中匍匐前进着。跟随本能笨拙地研究着做点好玩的音乐，融入世界音乐、氛围、采样、电子乐，尝试打破传统音乐的界限，创造一种更新奇的音乐体验。也在试图制造一些柔软的、静谧的时刻和一座向内盛开的花园",
}

const blurJesus = {
	bioZH: "不乐基斯（Blur Jesus）是一个来上海的迷幻音乐组合。由一个线圈精灵（midorii）和一只迷幻牛仔猫（Aming）构成。用流动的音乐堆砌出模糊的词汇，编织着梦境的呓语。有时会在迷幻的电子海浪里跌宕起伏，有时会在各种原声乐器的指引下进入古老的咒语河流。轻盈梦幻与怪异狂乱随着他们的每一个舞步交替变幻着。从脚下的这一步开始，无数的选择不知道会去到哪里，直到下一步落下，他们就这样在未知中流淌着。",
}

const styles = {
	"body": {
		"font-family": "APL2741",
		"font-size": "16px",
	},
	"main": {
		"margin": "0 auto",
		"max-width": "800px",
		"padding": "0 48px",
		"padding-bottom": "48px",
		...cc([
			"fill-x",
			"vstack",
			"g-64",
			"align-center",
		]),
	},
	"#title": {
		"max-width": "360px",
		"width": "90%",
	},
	".biobox": {
		...cc("hstack g-48 align-center fill-x"),
		"@media": {
			"screen and (max-width: 600px)": {
				...cc("vstack"),
			},
		},
	},
	".bio": {
		"position": "relative",
		"flex": "1",
	},
	".photo": {
		"width": "0",
		"flex": "1",
		"@media": {
			"screen and (max-width: 600px)": {
				"width": "90%",
			},
		},
	},
	".gigs": {
		"max-width": "400px",
		"width": "90%",
	},
	".backdrop": {
		...cc([
			"center-abs",
			"z--8",
			"r-48",
		]),
		"width": "calc(100% + 80px)",
		"height": "calc(100% + 80px)",
		"filter": "blur(24px)",
		"background": "#9250e45f",
	},
	".disc": {
		"width": "160px",
		"height": "160px",
		"position": "relative",
		"&.play": {
			"img": {
				":nth-child(1)": {
					"animation": "disc1 infinite 0.2s linear",
				},
				":nth-child(2)": {
					"animation": "disc2 infinite 0.2s",
				},
			},
		},
		"img": {
			"width": "100%",
			"position": "absolute",
		},
	},
	"@font-face": [
		{
			"font-family": "APL2741",
			"src": "url(/static/fonts/APL2741.ttf)"
		},
	],
	"@keyframes": {
		"disc1": {
			"from": { "transform": "rotate(0deg)" },
			"to": { "transform": "rotate(360deg)" },
		},
		"disc2": {
			"0%": { "transform": "rotate(-2deg)" },
			"50%": { "transform": "rotate(2deg)" },
			"100%": { "transform": "rotate(-2deg)" },
		},
	},
}

function disc(songPath: string) {
	return h("div", { class: "disc", "data-song": songPath }, [
		h("img", { src: "/static/img/disc1.png" }),
		h("img", { src: "/static/img/disc2.png" }),
	])
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "music - coilsprite"),
			h("meta", { name: "description", content: "midori's music", }),
			// @ts-ignore
			h("style", {}, css(styles)),
		]),
		h("body", {}, [
			h("main", {}, [
				h("div", { class: "player" }, []),
				h("img", { id: "title", src: "/static/img/title.png" }),
				h("div", { class: "biobox" }, [
					h("img", { class: "photo", src: "/static/img/photo.png" }),
					h("div", { class: "bio" }, [
						h("div", { class: "backdrop" }, []),
						h("p", {}, coilSprite.bio),
					]),
				]),
				disc("/static/songs/the imagination of water.mp3"),
				h("figure", {}, [
					h("img", { class: "gigs", src: "/static/img/gigs.png" }),
					h("figcaption", {}, "Past Performances"),
				]),
			]),
			h("script", {}, await js("client/music.ts")),
		]),
	]))
}

export default handler
