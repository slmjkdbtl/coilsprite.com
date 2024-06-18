import {
	createServer,
	files,
	dir,
	route,
} from "./www"
import index from "./index"
import artworks from "./artworks"

const server = createServer()
console.log(`server starting at ${server.url.toString()}`)

server.use(files("/static", "static"))
server.use(route("GET", "/", index))
server.use(route("GET", "/artworks", artworks))

server.error(({ req, res }, err) => {
	console.error(`Time: ${new Date()}`)
	console.error(`Request: ${req.method} ${req.url}`)
	console.error("")
	console.error(err)
	res.sendText("server error", { status: 500 })
})

server.notFound(({ res }) => res.sendText("404", { status: 404 }))
