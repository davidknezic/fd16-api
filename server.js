import http from 'http'
import colors from 'colors'
import app from './lib'

const debug = require('debug')('fd16-api')

const running = 'running'.black.bgGreen
const host = '0.0.0.0'
const port = 8080

http.createServer(app).listen(port, host, function () {
  debug(`Server ${running} on ${`http://${host}:${port}`.cyan}`)
})
