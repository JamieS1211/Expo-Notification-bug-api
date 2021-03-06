/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */

/**
 * Module dependencies.
 */
const app = require("../dist")
const debug = require("debug")("livitayapi:server")
const http = require("http")

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3001")
console.info("Listening on port: " + port)
app.set("port", port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
    const tempPort = parseInt(val, 10)

    if (isNaN(tempPort)) {
        // named pipe
        return val
    }

    if (tempPort >= 0) {
        // port number
        return tempPort
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== "listen") {
        throw error
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + " is already in use")
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address()
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
    debug("Listening on " + bind)
}
