import { h, js, Handler } from "./www"

const handler: Handler = async ({ res }) => {
	return res.sendHTML("<!DOCTYPE html>" + h("html", { lang: "en" }, [
		h("head", {}, [
			h("title", {}, "shrooom"),
			h("meta", { charset: "utf-8", }),
			h("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
			h("link", { rel: "icon", href: "/static/img/midorii.png" }),
		]),
		h("body", {}, [
			h("script", {}, await js("client/shrooom.ts")),
		]),
	]))
}

export default handler
