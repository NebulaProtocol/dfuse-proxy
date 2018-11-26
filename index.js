var httpProxy = require('http-proxy')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

function init () {
    var proxy = httpProxy.createProxyServer({
        changeOrigin: true,
        target: process.env.TARGET
    })

    proxy.on('proxyReq', function (proxyReq, req, res, options) {
        proxyReq.setHeader('Authorization', 'Bearer ' + process.env.API_TOKEN)
    })

    proxy.on('open', function (proxySocket) {
        console.log('Client open')
    })

    proxy.on('close', function (res, socket, head) {
        console.log('Client disconnected')
        init()
    })

    console.log('listening on port ' + process.env.PORT)
    proxy.listen(process.env.PORT)
}

init()