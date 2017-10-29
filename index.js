const http = require('http')
const App = require('./app/app.js')

const app = new App()
const PORT = 7000

const server = http.createServer(app.initServer()).listen(PORT, () => {
  console.log(`the server is running on PROT=${PORT}`)
})
