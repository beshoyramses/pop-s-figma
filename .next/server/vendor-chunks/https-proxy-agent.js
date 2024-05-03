"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/https-proxy-agent";
exports.ids = ["vendor-chunks/https-proxy-agent"];
exports.modules = {

/***/ "(ssr)/./node_modules/https-proxy-agent/dist/agent.js":
/*!******************************************************!*\
  !*** ./node_modules/https-proxy-agent/dist/agent.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst net_1 = __importDefault(__webpack_require__(/*! net */ \"net\"));\nconst tls_1 = __importDefault(__webpack_require__(/*! tls */ \"tls\"));\nconst url_1 = __importDefault(__webpack_require__(/*! url */ \"url\"));\nconst assert_1 = __importDefault(__webpack_require__(/*! assert */ \"assert\"));\nconst debug_1 = __importDefault(__webpack_require__(/*! debug */ \"(ssr)/./node_modules/debug/src/index.js\"));\nconst agent_base_1 = __webpack_require__(/*! agent-base */ \"(ssr)/./node_modules/agent-base/dist/src/index.js\");\nconst parse_proxy_response_1 = __importDefault(__webpack_require__(/*! ./parse-proxy-response */ \"(ssr)/./node_modules/https-proxy-agent/dist/parse-proxy-response.js\"));\nconst debug = debug_1.default('https-proxy-agent:agent');\n/**\n * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to\n * the specified \"HTTP(s) proxy server\" in order to proxy HTTPS requests.\n *\n * Outgoing HTTP requests are first tunneled through the proxy server using the\n * `CONNECT` HTTP request method to establish a connection to the proxy server,\n * and then the proxy server connects to the destination target and issues the\n * HTTP request from the proxy server.\n *\n * `https:` requests have their socket connection upgraded to TLS once\n * the connection to the proxy server has been established.\n *\n * @api public\n */\nclass HttpsProxyAgent extends agent_base_1.Agent {\n    constructor(_opts) {\n        let opts;\n        if (typeof _opts === 'string') {\n            opts = url_1.default.parse(_opts);\n        }\n        else {\n            opts = _opts;\n        }\n        if (!opts) {\n            throw new Error('an HTTP(S) proxy server `host` and `port` must be specified!');\n        }\n        debug('creating new HttpsProxyAgent instance: %o', opts);\n        super(opts);\n        const proxy = Object.assign({}, opts);\n        // If `true`, then connect to the proxy server over TLS.\n        // Defaults to `false`.\n        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);\n        // Prefer `hostname` over `host`, and set the `port` if needed.\n        proxy.host = proxy.hostname || proxy.host;\n        if (typeof proxy.port === 'string') {\n            proxy.port = parseInt(proxy.port, 10);\n        }\n        if (!proxy.port && proxy.host) {\n            proxy.port = this.secureProxy ? 443 : 80;\n        }\n        // ALPN is supported by Node.js >= v5.\n        // attempt to negotiate http/1.1 for proxy servers that support http/2\n        if (this.secureProxy && !('ALPNProtocols' in proxy)) {\n            proxy.ALPNProtocols = ['http 1.1'];\n        }\n        if (proxy.host && proxy.path) {\n            // If both a `host` and `path` are specified then it's most likely\n            // the result of a `url.parse()` call... we need to remove the\n            // `path` portion so that `net.connect()` doesn't attempt to open\n            // that as a Unix socket file.\n            delete proxy.path;\n            delete proxy.pathname;\n        }\n        this.proxy = proxy;\n    }\n    /**\n     * Called when the node-core HTTP client library is creating a\n     * new HTTP request.\n     *\n     * @api protected\n     */\n    callback(req, opts) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { proxy, secureProxy } = this;\n            // Create a socket connection to the proxy server.\n            let socket;\n            if (secureProxy) {\n                debug('Creating `tls.Socket`: %o', proxy);\n                socket = tls_1.default.connect(proxy);\n            }\n            else {\n                debug('Creating `net.Socket`: %o', proxy);\n                socket = net_1.default.connect(proxy);\n            }\n            const headers = Object.assign({}, proxy.headers);\n            const hostname = `${opts.host}:${opts.port}`;\n            let payload = `CONNECT ${hostname} HTTP/1.1\\r\\n`;\n            // Inject the `Proxy-Authorization` header if necessary.\n            if (proxy.auth) {\n                headers['Proxy-Authorization'] = `Basic ${Buffer.from(proxy.auth).toString('base64')}`;\n            }\n            // The `Host` header should only include the port\n            // number when it is not the default port.\n            let { host, port, secureEndpoint } = opts;\n            if (!isDefaultPort(port, secureEndpoint)) {\n                host += `:${port}`;\n            }\n            headers.Host = host;\n            headers.Connection = 'close';\n            for (const name of Object.keys(headers)) {\n                payload += `${name}: ${headers[name]}\\r\\n`;\n            }\n            const proxyResponsePromise = parse_proxy_response_1.default(socket);\n            socket.write(`${payload}\\r\\n`);\n            const { statusCode, buffered } = yield proxyResponsePromise;\n            if (statusCode === 200) {\n                req.once('socket', resume);\n                if (opts.secureEndpoint) {\n                    // The proxy is connecting to a TLS server, so upgrade\n                    // this socket connection to a TLS connection.\n                    debug('Upgrading socket connection to TLS');\n                    const servername = opts.servername || opts.host;\n                    return tls_1.default.connect(Object.assign(Object.assign({}, omit(opts, 'host', 'hostname', 'path', 'port')), { socket,\n                        servername }));\n                }\n                return socket;\n            }\n            // Some other status code that's not 200... need to re-play the HTTP\n            // header \"data\" events onto the socket once the HTTP machinery is\n            // attached so that the node core `http` can parse and handle the\n            // error status code.\n            // Close the original socket, and a new \"fake\" socket is returned\n            // instead, so that the proxy doesn't get the HTTP request\n            // written to it (which may contain `Authorization` headers or other\n            // sensitive data).\n            //\n            // See: https://hackerone.com/reports/541502\n            socket.destroy();\n            const fakeSocket = new net_1.default.Socket({ writable: false });\n            fakeSocket.readable = true;\n            // Need to wait for the \"socket\" event to re-play the \"data\" events.\n            req.once('socket', (s) => {\n                debug('replaying proxy buffer for failed request');\n                assert_1.default(s.listenerCount('data') > 0);\n                // Replay the \"buffered\" Buffer onto the fake `socket`, since at\n                // this point the HTTP module machinery has been hooked up for\n                // the user.\n                s.push(buffered);\n                s.push(null);\n            });\n            return fakeSocket;\n        });\n    }\n}\nexports[\"default\"] = HttpsProxyAgent;\nfunction resume(socket) {\n    socket.resume();\n}\nfunction isDefaultPort(port, secure) {\n    return Boolean((!secure && port === 80) || (secure && port === 443));\n}\nfunction isHTTPS(protocol) {\n    return typeof protocol === 'string' ? /^https:?$/i.test(protocol) : false;\n}\nfunction omit(obj, ...keys) {\n    const ret = {};\n    let key;\n    for (key in obj) {\n        if (!keys.includes(key)) {\n            ret[key] = obj[key];\n        }\n    }\n    return ret;\n}\n//# sourceMappingURL=agent.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaHR0cHMtcHJveHktYWdlbnQvZGlzdC9hZ2VudC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw4QkFBOEIsbUJBQU8sQ0FBQyxnQkFBSztBQUMzQyw4QkFBOEIsbUJBQU8sQ0FBQyxnQkFBSztBQUMzQyw4QkFBOEIsbUJBQU8sQ0FBQyxnQkFBSztBQUMzQyxpQ0FBaUMsbUJBQU8sQ0FBQyxzQkFBUTtBQUNqRCxnQ0FBZ0MsbUJBQU8sQ0FBQyxzREFBTztBQUMvQyxxQkFBcUIsbUJBQU8sQ0FBQyxxRUFBWTtBQUN6QywrQ0FBK0MsbUJBQU8sQ0FBQyxtR0FBd0I7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsZ0NBQWdDLFVBQVUsR0FBRyxVQUFVO0FBQ3ZELHFDQUFxQyxVQUFVO0FBQy9DO0FBQ0E7QUFDQSwwREFBMEQsMkNBQTJDO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2QkFBNkI7QUFDL0M7QUFDQSw0QkFBNEIsS0FBSztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixLQUFLLElBQUksY0FBYztBQUNyRDtBQUNBO0FBQ0EsNEJBQTRCLFFBQVE7QUFDcEMsb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxxREFBcUQ7QUFDcEksb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsaUJBQWlCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS8uL25vZGVfbW9kdWxlcy9odHRwcy1wcm94eS1hZ2VudC9kaXN0L2FnZW50LmpzP2VlMTAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG5ldF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJuZXRcIikpO1xuY29uc3QgdGxzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInRsc1wiKSk7XG5jb25zdCB1cmxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwidXJsXCIpKTtcbmNvbnN0IGFzc2VydF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJhc3NlcnRcIikpO1xuY29uc3QgZGVidWdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZGVidWdcIikpO1xuY29uc3QgYWdlbnRfYmFzZV8xID0gcmVxdWlyZShcImFnZW50LWJhc2VcIik7XG5jb25zdCBwYXJzZV9wcm94eV9yZXNwb25zZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLXByb3h5LXJlc3BvbnNlXCIpKTtcbmNvbnN0IGRlYnVnID0gZGVidWdfMS5kZWZhdWx0KCdodHRwcy1wcm94eS1hZ2VudDphZ2VudCcpO1xuLyoqXG4gKiBUaGUgYEh0dHBzUHJveHlBZ2VudGAgaW1wbGVtZW50cyBhbiBIVFRQIEFnZW50IHN1YmNsYXNzIHRoYXQgY29ubmVjdHMgdG9cbiAqIHRoZSBzcGVjaWZpZWQgXCJIVFRQKHMpIHByb3h5IHNlcnZlclwiIGluIG9yZGVyIHRvIHByb3h5IEhUVFBTIHJlcXVlc3RzLlxuICpcbiAqIE91dGdvaW5nIEhUVFAgcmVxdWVzdHMgYXJlIGZpcnN0IHR1bm5lbGVkIHRocm91Z2ggdGhlIHByb3h5IHNlcnZlciB1c2luZyB0aGVcbiAqIGBDT05ORUNUYCBIVFRQIHJlcXVlc3QgbWV0aG9kIHRvIGVzdGFibGlzaCBhIGNvbm5lY3Rpb24gdG8gdGhlIHByb3h5IHNlcnZlcixcbiAqIGFuZCB0aGVuIHRoZSBwcm94eSBzZXJ2ZXIgY29ubmVjdHMgdG8gdGhlIGRlc3RpbmF0aW9uIHRhcmdldCBhbmQgaXNzdWVzIHRoZVxuICogSFRUUCByZXF1ZXN0IGZyb20gdGhlIHByb3h5IHNlcnZlci5cbiAqXG4gKiBgaHR0cHM6YCByZXF1ZXN0cyBoYXZlIHRoZWlyIHNvY2tldCBjb25uZWN0aW9uIHVwZ3JhZGVkIHRvIFRMUyBvbmNlXG4gKiB0aGUgY29ubmVjdGlvbiB0byB0aGUgcHJveHkgc2VydmVyIGhhcyBiZWVuIGVzdGFibGlzaGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmNsYXNzIEh0dHBzUHJveHlBZ2VudCBleHRlbmRzIGFnZW50X2Jhc2VfMS5BZ2VudCB7XG4gICAgY29uc3RydWN0b3IoX29wdHMpIHtcbiAgICAgICAgbGV0IG9wdHM7XG4gICAgICAgIGlmICh0eXBlb2YgX29wdHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJsXzEuZGVmYXVsdC5wYXJzZShfb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvcHRzID0gX29wdHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FuIEhUVFAoUykgcHJveHkgc2VydmVyIGBob3N0YCBhbmQgYHBvcnRgIG11c3QgYmUgc3BlY2lmaWVkIScpO1xuICAgICAgICB9XG4gICAgICAgIGRlYnVnKCdjcmVhdGluZyBuZXcgSHR0cHNQcm94eUFnZW50IGluc3RhbmNlOiAlbycsIG9wdHMpO1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgY29uc3QgcHJveHkgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKTtcbiAgICAgICAgLy8gSWYgYHRydWVgLCB0aGVuIGNvbm5lY3QgdG8gdGhlIHByb3h5IHNlcnZlciBvdmVyIFRMUy5cbiAgICAgICAgLy8gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgICAgdGhpcy5zZWN1cmVQcm94eSA9IG9wdHMuc2VjdXJlUHJveHkgfHwgaXNIVFRQUyhwcm94eS5wcm90b2NvbCk7XG4gICAgICAgIC8vIFByZWZlciBgaG9zdG5hbWVgIG92ZXIgYGhvc3RgLCBhbmQgc2V0IHRoZSBgcG9ydGAgaWYgbmVlZGVkLlxuICAgICAgICBwcm94eS5ob3N0ID0gcHJveHkuaG9zdG5hbWUgfHwgcHJveHkuaG9zdDtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm94eS5wb3J0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcHJveHkucG9ydCA9IHBhcnNlSW50KHByb3h5LnBvcnQsIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByb3h5LnBvcnQgJiYgcHJveHkuaG9zdCkge1xuICAgICAgICAgICAgcHJveHkucG9ydCA9IHRoaXMuc2VjdXJlUHJveHkgPyA0NDMgOiA4MDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBTFBOIGlzIHN1cHBvcnRlZCBieSBOb2RlLmpzID49IHY1LlxuICAgICAgICAvLyBhdHRlbXB0IHRvIG5lZ290aWF0ZSBodHRwLzEuMSBmb3IgcHJveHkgc2VydmVycyB0aGF0IHN1cHBvcnQgaHR0cC8yXG4gICAgICAgIGlmICh0aGlzLnNlY3VyZVByb3h5ICYmICEoJ0FMUE5Qcm90b2NvbHMnIGluIHByb3h5KSkge1xuICAgICAgICAgICAgcHJveHkuQUxQTlByb3RvY29scyA9IFsnaHR0cCAxLjEnXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJveHkuaG9zdCAmJiBwcm94eS5wYXRoKSB7XG4gICAgICAgICAgICAvLyBJZiBib3RoIGEgYGhvc3RgIGFuZCBgcGF0aGAgYXJlIHNwZWNpZmllZCB0aGVuIGl0J3MgbW9zdCBsaWtlbHlcbiAgICAgICAgICAgIC8vIHRoZSByZXN1bHQgb2YgYSBgdXJsLnBhcnNlKClgIGNhbGwuLi4gd2UgbmVlZCB0byByZW1vdmUgdGhlXG4gICAgICAgICAgICAvLyBgcGF0aGAgcG9ydGlvbiBzbyB0aGF0IGBuZXQuY29ubmVjdCgpYCBkb2Vzbid0IGF0dGVtcHQgdG8gb3BlblxuICAgICAgICAgICAgLy8gdGhhdCBhcyBhIFVuaXggc29ja2V0IGZpbGUuXG4gICAgICAgICAgICBkZWxldGUgcHJveHkucGF0aDtcbiAgICAgICAgICAgIGRlbGV0ZSBwcm94eS5wYXRobmFtZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3h5ID0gcHJveHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBub2RlLWNvcmUgSFRUUCBjbGllbnQgbGlicmFyeSBpcyBjcmVhdGluZyBhXG4gICAgICogbmV3IEhUVFAgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJvdGVjdGVkXG4gICAgICovXG4gICAgY2FsbGJhY2socmVxLCBvcHRzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb3h5LCBzZWN1cmVQcm94eSB9ID0gdGhpcztcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNvY2tldCBjb25uZWN0aW9uIHRvIHRoZSBwcm94eSBzZXJ2ZXIuXG4gICAgICAgICAgICBsZXQgc29ja2V0O1xuICAgICAgICAgICAgaWYgKHNlY3VyZVByb3h5KSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ0NyZWF0aW5nIGB0bHMuU29ja2V0YDogJW8nLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgc29ja2V0ID0gdGxzXzEuZGVmYXVsdC5jb25uZWN0KHByb3h5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdDcmVhdGluZyBgbmV0LlNvY2tldGA6ICVvJywgcHJveHkpO1xuICAgICAgICAgICAgICAgIHNvY2tldCA9IG5ldF8xLmRlZmF1bHQuY29ubmVjdChwcm94eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJzID0gT2JqZWN0LmFzc2lnbih7fSwgcHJveHkuaGVhZGVycyk7XG4gICAgICAgICAgICBjb25zdCBob3N0bmFtZSA9IGAke29wdHMuaG9zdH06JHtvcHRzLnBvcnR9YDtcbiAgICAgICAgICAgIGxldCBwYXlsb2FkID0gYENPTk5FQ1QgJHtob3N0bmFtZX0gSFRUUC8xLjFcXHJcXG5gO1xuICAgICAgICAgICAgLy8gSW5qZWN0IHRoZSBgUHJveHktQXV0aG9yaXphdGlvbmAgaGVhZGVyIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGlmIChwcm94eS5hdXRoKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVyc1snUHJveHktQXV0aG9yaXphdGlvbiddID0gYEJhc2ljICR7QnVmZmVyLmZyb20ocHJveHkuYXV0aCkudG9TdHJpbmcoJ2Jhc2U2NCcpfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgYEhvc3RgIGhlYWRlciBzaG91bGQgb25seSBpbmNsdWRlIHRoZSBwb3J0XG4gICAgICAgICAgICAvLyBudW1iZXIgd2hlbiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgcG9ydC5cbiAgICAgICAgICAgIGxldCB7IGhvc3QsIHBvcnQsIHNlY3VyZUVuZHBvaW50IH0gPSBvcHRzO1xuICAgICAgICAgICAgaWYgKCFpc0RlZmF1bHRQb3J0KHBvcnQsIHNlY3VyZUVuZHBvaW50KSkge1xuICAgICAgICAgICAgICAgIGhvc3QgKz0gYDoke3BvcnR9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhlYWRlcnMuSG9zdCA9IGhvc3Q7XG4gICAgICAgICAgICBoZWFkZXJzLkNvbm5lY3Rpb24gPSAnY2xvc2UnO1xuICAgICAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlcnMpKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZCArPSBgJHtuYW1lfTogJHtoZWFkZXJzW25hbWVdfVxcclxcbmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcm94eVJlc3BvbnNlUHJvbWlzZSA9IHBhcnNlX3Byb3h5X3Jlc3BvbnNlXzEuZGVmYXVsdChzb2NrZXQpO1xuICAgICAgICAgICAgc29ja2V0LndyaXRlKGAke3BheWxvYWR9XFxyXFxuYCk7XG4gICAgICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUsIGJ1ZmZlcmVkIH0gPSB5aWVsZCBwcm94eVJlc3BvbnNlUHJvbWlzZTtcbiAgICAgICAgICAgIGlmIChzdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICByZXEub25jZSgnc29ja2V0JywgcmVzdW1lKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5zZWN1cmVFbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcHJveHkgaXMgY29ubmVjdGluZyB0byBhIFRMUyBzZXJ2ZXIsIHNvIHVwZ3JhZGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBzb2NrZXQgY29ubmVjdGlvbiB0byBhIFRMUyBjb25uZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnVXBncmFkaW5nIHNvY2tldCBjb25uZWN0aW9uIHRvIFRMUycpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2ZXJuYW1lID0gb3B0cy5zZXJ2ZXJuYW1lIHx8IG9wdHMuaG9zdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRsc18xLmRlZmF1bHQuY29ubmVjdChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9taXQob3B0cywgJ2hvc3QnLCAnaG9zdG5hbWUnLCAncGF0aCcsICdwb3J0JykpLCB7IHNvY2tldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlcm5hbWUgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gc29ja2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU29tZSBvdGhlciBzdGF0dXMgY29kZSB0aGF0J3Mgbm90IDIwMC4uLiBuZWVkIHRvIHJlLXBsYXkgdGhlIEhUVFBcbiAgICAgICAgICAgIC8vIGhlYWRlciBcImRhdGFcIiBldmVudHMgb250byB0aGUgc29ja2V0IG9uY2UgdGhlIEhUVFAgbWFjaGluZXJ5IGlzXG4gICAgICAgICAgICAvLyBhdHRhY2hlZCBzbyB0aGF0IHRoZSBub2RlIGNvcmUgYGh0dHBgIGNhbiBwYXJzZSBhbmQgaGFuZGxlIHRoZVxuICAgICAgICAgICAgLy8gZXJyb3Igc3RhdHVzIGNvZGUuXG4gICAgICAgICAgICAvLyBDbG9zZSB0aGUgb3JpZ2luYWwgc29ja2V0LCBhbmQgYSBuZXcgXCJmYWtlXCIgc29ja2V0IGlzIHJldHVybmVkXG4gICAgICAgICAgICAvLyBpbnN0ZWFkLCBzbyB0aGF0IHRoZSBwcm94eSBkb2Vzbid0IGdldCB0aGUgSFRUUCByZXF1ZXN0XG4gICAgICAgICAgICAvLyB3cml0dGVuIHRvIGl0ICh3aGljaCBtYXkgY29udGFpbiBgQXV0aG9yaXphdGlvbmAgaGVhZGVycyBvciBvdGhlclxuICAgICAgICAgICAgLy8gc2Vuc2l0aXZlIGRhdGEpLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9oYWNrZXJvbmUuY29tL3JlcG9ydHMvNTQxNTAyXG4gICAgICAgICAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgY29uc3QgZmFrZVNvY2tldCA9IG5ldyBuZXRfMS5kZWZhdWx0LlNvY2tldCh7IHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGZha2VTb2NrZXQucmVhZGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgLy8gTmVlZCB0byB3YWl0IGZvciB0aGUgXCJzb2NrZXRcIiBldmVudCB0byByZS1wbGF5IHRoZSBcImRhdGFcIiBldmVudHMuXG4gICAgICAgICAgICByZXEub25jZSgnc29ja2V0JywgKHMpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygncmVwbGF5aW5nIHByb3h5IGJ1ZmZlciBmb3IgZmFpbGVkIHJlcXVlc3QnKTtcbiAgICAgICAgICAgICAgICBhc3NlcnRfMS5kZWZhdWx0KHMubGlzdGVuZXJDb3VudCgnZGF0YScpID4gMCk7XG4gICAgICAgICAgICAgICAgLy8gUmVwbGF5IHRoZSBcImJ1ZmZlcmVkXCIgQnVmZmVyIG9udG8gdGhlIGZha2UgYHNvY2tldGAsIHNpbmNlIGF0XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBwb2ludCB0aGUgSFRUUCBtb2R1bGUgbWFjaGluZXJ5IGhhcyBiZWVuIGhvb2tlZCB1cCBmb3JcbiAgICAgICAgICAgICAgICAvLyB0aGUgdXNlci5cbiAgICAgICAgICAgICAgICBzLnB1c2goYnVmZmVyZWQpO1xuICAgICAgICAgICAgICAgIHMucHVzaChudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZha2VTb2NrZXQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEh0dHBzUHJveHlBZ2VudDtcbmZ1bmN0aW9uIHJlc3VtZShzb2NrZXQpIHtcbiAgICBzb2NrZXQucmVzdW1lKCk7XG59XG5mdW5jdGlvbiBpc0RlZmF1bHRQb3J0KHBvcnQsIHNlY3VyZSkge1xuICAgIHJldHVybiBCb29sZWFuKCghc2VjdXJlICYmIHBvcnQgPT09IDgwKSB8fCAoc2VjdXJlICYmIHBvcnQgPT09IDQ0MykpO1xufVxuZnVuY3Rpb24gaXNIVFRQUyhwcm90b2NvbCkge1xuICAgIHJldHVybiB0eXBlb2YgcHJvdG9jb2wgPT09ICdzdHJpbmcnID8gL15odHRwczo/JC9pLnRlc3QocHJvdG9jb2wpIDogZmFsc2U7XG59XG5mdW5jdGlvbiBvbWl0KG9iaiwgLi4ua2V5cykge1xuICAgIGNvbnN0IHJldCA9IHt9O1xuICAgIGxldCBrZXk7XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICgha2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICByZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZ2VudC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/https-proxy-agent/dist/agent.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/https-proxy-agent/dist/index.js":
/*!******************************************************!*\
  !*** ./node_modules/https-proxy-agent/dist/index.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nconst agent_1 = __importDefault(__webpack_require__(/*! ./agent */ \"(ssr)/./node_modules/https-proxy-agent/dist/agent.js\"));\nfunction createHttpsProxyAgent(opts) {\n    return new agent_1.default(opts);\n}\n(function (createHttpsProxyAgent) {\n    createHttpsProxyAgent.HttpsProxyAgent = agent_1.default;\n    createHttpsProxyAgent.prototype = agent_1.default.prototype;\n})(createHttpsProxyAgent || (createHttpsProxyAgent = {}));\nmodule.exports = createHttpsProxyAgent;\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaHR0cHMtcHJveHktYWdlbnQvZGlzdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsZ0NBQWdDLG1CQUFPLENBQUMscUVBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzREFBc0Q7QUFDdkQ7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLy4vbm9kZV9tb2R1bGVzL2h0dHBzLXByb3h5LWFnZW50L2Rpc3QvaW5kZXguanM/NDZmYyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbmNvbnN0IGFnZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vYWdlbnRcIikpO1xuZnVuY3Rpb24gY3JlYXRlSHR0cHNQcm94eUFnZW50KG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IGFnZW50XzEuZGVmYXVsdChvcHRzKTtcbn1cbihmdW5jdGlvbiAoY3JlYXRlSHR0cHNQcm94eUFnZW50KSB7XG4gICAgY3JlYXRlSHR0cHNQcm94eUFnZW50Lkh0dHBzUHJveHlBZ2VudCA9IGFnZW50XzEuZGVmYXVsdDtcbiAgICBjcmVhdGVIdHRwc1Byb3h5QWdlbnQucHJvdG90eXBlID0gYWdlbnRfMS5kZWZhdWx0LnByb3RvdHlwZTtcbn0pKGNyZWF0ZUh0dHBzUHJveHlBZ2VudCB8fCAoY3JlYXRlSHR0cHNQcm94eUFnZW50ID0ge30pKTtcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSHR0cHNQcm94eUFnZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/https-proxy-agent/dist/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/https-proxy-agent/dist/parse-proxy-response.js":
/*!*********************************************************************!*\
  !*** ./node_modules/https-proxy-agent/dist/parse-proxy-response.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst debug_1 = __importDefault(__webpack_require__(/*! debug */ \"(ssr)/./node_modules/debug/src/index.js\"));\nconst debug = debug_1.default('https-proxy-agent:parse-proxy-response');\nfunction parseProxyResponse(socket) {\n    return new Promise((resolve, reject) => {\n        // we need to buffer any HTTP traffic that happens with the proxy before we get\n        // the CONNECT response, so that if the response is anything other than an \"200\"\n        // response code, then we can re-play the \"data\" events on the socket once the\n        // HTTP parser is hooked up...\n        let buffersLength = 0;\n        const buffers = [];\n        function read() {\n            const b = socket.read();\n            if (b)\n                ondata(b);\n            else\n                socket.once('readable', read);\n        }\n        function cleanup() {\n            socket.removeListener('end', onend);\n            socket.removeListener('error', onerror);\n            socket.removeListener('close', onclose);\n            socket.removeListener('readable', read);\n        }\n        function onclose(err) {\n            debug('onclose had error %o', err);\n        }\n        function onend() {\n            debug('onend');\n        }\n        function onerror(err) {\n            cleanup();\n            debug('onerror %o', err);\n            reject(err);\n        }\n        function ondata(b) {\n            buffers.push(b);\n            buffersLength += b.length;\n            const buffered = Buffer.concat(buffers, buffersLength);\n            const endOfHeaders = buffered.indexOf('\\r\\n\\r\\n');\n            if (endOfHeaders === -1) {\n                // keep buffering\n                debug('have not received end of HTTP headers yet...');\n                read();\n                return;\n            }\n            const firstLine = buffered.toString('ascii', 0, buffered.indexOf('\\r\\n'));\n            const statusCode = +firstLine.split(' ')[1];\n            debug('got proxy server response: %o', firstLine);\n            resolve({\n                statusCode,\n                buffered\n            });\n        }\n        socket.on('error', onerror);\n        socket.on('close', onclose);\n        socket.on('end', onend);\n        read();\n    });\n}\nexports[\"default\"] = parseProxyResponse;\n//# sourceMappingURL=parse-proxy-response.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaHR0cHMtcHJveHktYWdlbnQvZGlzdC9wYXJzZS1wcm94eS1yZXNwb25zZS5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdDQUFnQyxtQkFBTyxDQUFDLHNEQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFlO0FBQ2YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS8uL25vZGVfbW9kdWxlcy9odHRwcy1wcm94eS1hZ2VudC9kaXN0L3BhcnNlLXByb3h5LXJlc3BvbnNlLmpzPzIwYzYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7XG5jb25zdCBkZWJ1ZyA9IGRlYnVnXzEuZGVmYXVsdCgnaHR0cHMtcHJveHktYWdlbnQ6cGFyc2UtcHJveHktcmVzcG9uc2UnKTtcbmZ1bmN0aW9uIHBhcnNlUHJveHlSZXNwb25zZShzb2NrZXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGJ1ZmZlciBhbnkgSFRUUCB0cmFmZmljIHRoYXQgaGFwcGVucyB3aXRoIHRoZSBwcm94eSBiZWZvcmUgd2UgZ2V0XG4gICAgICAgIC8vIHRoZSBDT05ORUNUIHJlc3BvbnNlLCBzbyB0aGF0IGlmIHRoZSByZXNwb25zZSBpcyBhbnl0aGluZyBvdGhlciB0aGFuIGFuIFwiMjAwXCJcbiAgICAgICAgLy8gcmVzcG9uc2UgY29kZSwgdGhlbiB3ZSBjYW4gcmUtcGxheSB0aGUgXCJkYXRhXCIgZXZlbnRzIG9uIHRoZSBzb2NrZXQgb25jZSB0aGVcbiAgICAgICAgLy8gSFRUUCBwYXJzZXIgaXMgaG9va2VkIHVwLi4uXG4gICAgICAgIGxldCBidWZmZXJzTGVuZ3RoID0gMDtcbiAgICAgICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgICAgICAgY29uc3QgYiA9IHNvY2tldC5yZWFkKCk7XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICBvbmRhdGEoYik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc29ja2V0Lm9uY2UoJ3JlYWRhYmxlJywgcmVhZCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZW5kJywgb25lbmQpO1xuICAgICAgICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdyZWFkYWJsZScsIHJlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uY2xvc2UoZXJyKSB7XG4gICAgICAgICAgICBkZWJ1Zygnb25jbG9zZSBoYWQgZXJyb3IgJW8nLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZW5kKCkge1xuICAgICAgICAgICAgZGVidWcoJ29uZW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25lcnJvcihlcnIpIHtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGRlYnVnKCdvbmVycm9yICVvJywgZXJyKTtcbiAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZGF0YShiKSB7XG4gICAgICAgICAgICBidWZmZXJzLnB1c2goYik7XG4gICAgICAgICAgICBidWZmZXJzTGVuZ3RoICs9IGIubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyZWQgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMsIGJ1ZmZlcnNMZW5ndGgpO1xuICAgICAgICAgICAgY29uc3QgZW5kT2ZIZWFkZXJzID0gYnVmZmVyZWQuaW5kZXhPZignXFxyXFxuXFxyXFxuJyk7XG4gICAgICAgICAgICBpZiAoZW5kT2ZIZWFkZXJzID09PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgYnVmZmVyaW5nXG4gICAgICAgICAgICAgICAgZGVidWcoJ2hhdmUgbm90IHJlY2VpdmVkIGVuZCBvZiBIVFRQIGhlYWRlcnMgeWV0Li4uJyk7XG4gICAgICAgICAgICAgICAgcmVhZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpcnN0TGluZSA9IGJ1ZmZlcmVkLnRvU3RyaW5nKCdhc2NpaScsIDAsIGJ1ZmZlcmVkLmluZGV4T2YoJ1xcclxcbicpKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSArZmlyc3RMaW5lLnNwbGl0KCcgJylbMV07XG4gICAgICAgICAgICBkZWJ1ZygnZ290IHByb3h5IHNlcnZlciByZXNwb25zZTogJW8nLCBmaXJzdExpbmUpO1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICBidWZmZXJlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc29ja2V0Lm9uKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICBzb2NrZXQub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgICAgIHNvY2tldC5vbignZW5kJywgb25lbmQpO1xuICAgICAgICByZWFkKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBwYXJzZVByb3h5UmVzcG9uc2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXJzZS1wcm94eS1yZXNwb25zZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/https-proxy-agent/dist/parse-proxy-response.js\n");

/***/ })

};
;