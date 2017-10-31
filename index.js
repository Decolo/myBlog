const http = require('http')
const App = require('./app/app.js')
const staticPublic = require('./app/staticPublic')
const apiServer = require('./app/api')
const urlParser = require('./app/urlParser')
const viewServer = require('./app/viewServer')

const app = new App()
app.use(urlParser)
app.use(apiServer)
app.use(staticPublic)
app.use(viewServer)

const PORT = 7000

const server = http.createServer(app.initServer()).listen(PORT, () => {
  console.log(`the server is running on PROT=${PORT}`)
})
