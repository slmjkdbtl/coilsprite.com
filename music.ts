import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc } from "./www"
import page from "./page"

const coilSprite = {
	bio: "A coil sprite, keen on capturing linear emotions, crawling forward on the road of fourth world music. Following her instincts and clumsily researching to make some fun music, integrating world music, experimental, atmosphere, sampling, electronic music, attempting to break the boundaries of traditional music and create a more novel music experience. Also trying to create some soft, peaceful moments and a garden that blooms inward.",
	bioZH: "一只线圈精灵，热衷于捕捉线性情绪，在第四世界音乐道路中匍匐前进着。跟随本能笨拙地研究着做点好玩的音乐，融入世界音乐、氛围、采样、电子乐，尝试打破传统音乐的界限，创造一种更新奇的音乐体验。也在试图制造一些柔软的、静谧的时刻和一座向内盛开的花园",
}

const blurJesus = {
	bio: "Blur Jesus is a psychedelic music group from Shanghai. Composed of midorii（coil sprite） and Aming（a psychedelic cowboy cat） Using flowing music to pile up vague vocabulary and weave dreamlike babbling. Sometimes it will fluctuate in the psychedelic electronic waves, and sometimes enter the ancient spell river under the guidance of various acoustic instruments. Light dreams and strange madness alternate with each of their dance steps. Starting from this step at the foot, countless choices do not know where they will go, until the next step falls, and they flow in the unknown.",
	bioZH: "不乐基斯（Blur Jesus）是一个来上海的迷幻音乐组合。由一个线圈精灵（midorii）和一只迷幻牛仔猫（Aming）构成。用流动的音乐堆砌出模糊的词汇，编织着梦境的呓语。有时会在迷幻的电子海浪里跌宕起伏，有时会在各种原声乐器的指引下进入古老的咒语河流。轻盈梦幻与怪异狂乱随着他们的每一个舞步交替变幻着。从脚下的这一步开始，无数的选择不知道会去到哪里，直到下一步落下，他们就这样在未知中流淌着。",
}

const styles = {
	"body": {
		"font-family": "APL2741",
		"font-size": "16px",
		"padding": "48px",
	},
	"main": {
		"margin": "0 auto",
		"max-width": "800px",
		"padding-bottom": "200px",
		...cc([
			"fill-x",
			"vstack",
			"g-64",
			"align-center",
		]),
		"@media": {
			"(max-width: 640px)": {
				"max-width": "480px",
			},
		},
	},
	"p,figcaption": {
		"font-weight": "1000",
	},
	"#title": {
		"max-width": "360px",
		"width": "100%",
	},
	".biobox": {
		...cc("hstack g-48 align-center fill-x"),
		"&.reverse": {
			...cc("hstack-reverse"),
		},
		"@media": {
			"(max-width: 640px)": {
				...cc("vstack"),
			},
		},
	},
	".bio": {
		"position": "relative",
		"flex": "1",
	},
	".bio2": {
		"position": "relative",
		"width": "80%",
		"@media": {
			"(max-width: 640px)": {
				"width": "100%",
			},
		},
	},
	".photo": {
		"width": "0",
		"flex": "1",
		"@media": {
			"(max-width: 640px)": {
				"width": "90%",
			},
		},
	},
	".photo2": {
		"width": "70%",
		"@media": {
			"(max-width: 640px)": {
				"width": "90%",
			},
		},
	},
	".gigs": {
		"max-width": "480px",
		"width": "90%",
	},
	".gigs2": {
		...cc("grid colw-200 g-16"),
		"img": {
			"width": "100%",
		},
	},
	".backdrop": {
		...cc([
			"center-abs",
			"z--8",
			"r-48",
		]),
		"width": "calc(100% + 90px)",
		"height": "calc(100% + 90px)",
		"filter": "blur(24px)",
		"background": "#ffffffaf",
	},
	"#player": {
		"position": "fixed",
		"bottom": "20px",
		"left": "20px",
		"font-family": "f04b03",
		"color": "#75004f",
		"max-width": "280px",
		"width": "calc(100% - 40px)",
		".bg": {
			"width": "100%",
		},
		".label": {
			"position": "absolute",
			"width": "54%",
			"height": "14%",
			"font-size": "100%",
			"overflow": "hidden",
			"white-space": "nowrap",
			"top": "30%",
			"left": "39%",
			"padding": "0 8px",
			...cc("flex align-center container"),
			"&.marquee": {
				"p": {
					"animation": "marquee 10s infinite linear",
				},
			},
		},
		".progress": {
			...cc("hstack g-8 absolute"),
			"top": "54%",
			"left": "42%",
		},
		".buttons": {
			...cc("hstack g-8 absolute"),
			"top": "70%",
			"left": "40%",
			"width": "54%",
			"img": {
				"width": "0",
				"flex": "1",
			},
		},
	},
	"video": {
		"max-width": "480px",
		"width": "100%",
	},
	"@keyframes": {
		"marquee": {
			"0%": {
				"transform": "translateX(0)",
			},
			"30%": {
				"transform": "translateX(0)",
			},
			"70%": {
				"transform": "translateX(calc(-100% + 100cqw))",
			},
			"100%": {
				"transform": "translateX(calc(-100% + 100cqw))",
			},
		},
	},
	"@font-face": [
		{
			"font-family": "f04b03",
			"src": "url(/static/fonts/04b03.ttf)",
			"font-display": "block",
		},
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
		h("img", { id: "title", src: "/static/img/title.png" }),
		h("div", { class: "biobox" }, [
			h("img", { class: "photo", src: "/static/img/music/photo.png" }),
			h("div", { class: "bio" }, [
				h("div", { class: "backdrop" }, []),
				h("p", {}, coilSprite.bio),
			]),
		]),
		h("figure", {}, [
			h("img", { class: "gigs", src: "/static/img/music/gigs.png" }),
			h("figcaption", {}, "Past Performances"),
		]),
		h("figure", {}, [
			h("video", { src: "/static/video/gig.mp4", controls: true, }, []),
			h("figcaption", {}, "Performance at ShuangDa Festival 2024"),
		]),
		h("figure", {}, [
			h("img", { src: "/static/img/qr/wechat_channel.png", class: "w-120" }),
			h("figcaption", {}, "Wechat Channel for more videos"),
		]),
		h("div", { class: "vstack g-32 align-center" }, [
			h("img", { class: "photo2", src: "/static/img/music/photo2.png" }),
			h("a", { href: "https://open.spotify.com/artist/22rOgTC7Iad90v7EP6Fn77?si=g6ug47RXTWK8oivSpVKV4A" }, [
				h("img", { class: "w-120", src: "/static/img/music/spotify.png" }),
			]),
			h("div", { class: "bio2" }, [
				h("div", { class: "backdrop" }, []),
				h("p", {}, blurJesus.bio + " " + h("a", { href: "/static/blurjesus.pdf" }, "View bio pdf")),
			]),
		]),
	]),
	h("div", { id: "player" }, [
		h("img", { class: "bg", src: "/static/img/music/player_bg.png" }),
		h("div", { class: "label" }, [
			h("p", {}, ""),
		]),
		h("div", { class: "progress" }, [
			h("p", { class: "time" }, "00:00"),
			h("img", { class: "progress_handle", src: "/static/img/music/progress_handle.png" }),
		]),
		h("div", { class: "buttons" }, ["stop", "prev", "play", "next"].map((b) => {
			return h("img", { class: `btn_${b}`, src: `/static/img/music/btn_${b}.png` })
		})),
	]),
], {
	title: "music - coilsprite",
	desc: "midorii's music",
})
