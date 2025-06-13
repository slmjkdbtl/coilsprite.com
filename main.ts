import {
	createServer,
	files,
	dir,
	route,
} from "./www"
import index from "./index"
import artworks from "./artworks"
import music from "./music"
import contact from "./contact"
import shop from "./shop"

const server = createServer()
console.log(`server starting at ${server.url.toString()}`)

server.use(files("/static", "static"))
server.use(route("GET", "/", index))
server.use(route("GET", "/music", music))
server.use(route("GET", "/artworks", artworks))
server.use(route("GET", "/contact", contact))
server.use(route("GET", "/shop", shop))
