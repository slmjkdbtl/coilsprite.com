import * as fs from "fs/promises"
import * as path from "path"
import { h, css, cc, js, dataurl, Handler } from "./www"
import { head } from "./shared"

async function readDir(p: string) {
	const files = await fs.readdir(p)
	return files.sort().map((f) => path.join(p, f))
}

const coilSprite = {
	bio: "A coil sprite, keen on capturing linear emotions, crawling forward on the road of fourth world music. Following her instincts and clumsily researching to make some fun music, integrating world music, atmosphere, sampling, electronic music, attempting to break the boundaries of traditional music and create a more novel music experience. Also trying to create some soft, peaceful moments and a garden that blooms inward.",
	bioZH: "一只线圈精灵，热衷于捕捉线性情绪，在第四世界音乐道路中匍匐前进着。跟随本能笨拙地研究着做点好玩的音乐，融入世界音乐、氛围、采样、电子乐，尝试打破传统音乐的界限，创造一种更新奇的音乐体验。也在试图制造一些柔软的、静谧的时刻和一座向内盛开的花园",
	gigs: await readDir("static/gigs"),
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
		"padding": "48px",
		"padding-bottom": "200px",
		...cc([
			"fill-x",
			"vstack",
			"g-64",
			"align-center",
		]),
	},
}

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			...await head(),
			h("title", {}, "contact - coilsprite"),
			h("meta", { name: "description", content: "midori's contact", }),
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