"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/http-proxy-agent";
exports.ids = ["vendor-chunks/http-proxy-agent"];
exports.modules = {

/***/ "(ssr)/./node_modules/http-proxy-agent/dist/agent.js":
/*!*****************************************************!*\
  !*** ./node_modules/http-proxy-agent/dist/agent.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst net_1 = __importDefault(__webpack_require__(/*! net */ \"net\"));\nconst tls_1 = __importDefault(__webpack_require__(/*! tls */ \"tls\"));\nconst url_1 = __importDefault(__webpack_require__(/*! url */ \"url\"));\nconst debug_1 = __importDefault(__webpack_require__(/*! debug */ \"(ssr)/./node_modules/debug/src/index.js\"));\nconst once_1 = __importDefault(__webpack_require__(/*! @tootallnate/once */ \"(ssr)/./node_modules/@tootallnate/once/dist/index.js\"));\nconst agent_base_1 = __webpack_require__(/*! agent-base */ \"(ssr)/./node_modules/agent-base/dist/src/index.js\");\nconst debug = (0, debug_1.default)('http-proxy-agent');\nfunction isHTTPS(protocol) {\n    return typeof protocol === 'string' ? /^https:?$/i.test(protocol) : false;\n}\n/**\n * The `HttpProxyAgent` implements an HTTP Agent subclass that connects\n * to the specified \"HTTP proxy server\" in order to proxy HTTP requests.\n *\n * @api public\n */\nclass HttpProxyAgent extends agent_base_1.Agent {\n    constructor(_opts) {\n        let opts;\n        if (typeof _opts === 'string') {\n            opts = url_1.default.parse(_opts);\n        }\n        else {\n            opts = _opts;\n        }\n        if (!opts) {\n            throw new Error('an HTTP(S) proxy server `host` and `port` must be specified!');\n        }\n        debug('Creating new HttpProxyAgent instance: %o', opts);\n        super(opts);\n        const proxy = Object.assign({}, opts);\n        // If `true`, then connect to the proxy server over TLS.\n        // Defaults to `false`.\n        this.secureProxy = opts.secureProxy || isHTTPS(proxy.protocol);\n        // Prefer `hostname` over `host`, and set the `port` if needed.\n        proxy.host = proxy.hostname || proxy.host;\n        if (typeof proxy.port === 'string') {\n            proxy.port = parseInt(proxy.port, 10);\n        }\n        if (!proxy.port && proxy.host) {\n            proxy.port = this.secureProxy ? 443 : 80;\n        }\n        if (proxy.host && proxy.path) {\n            // If both a `host` and `path` are specified then it's most likely\n            // the result of a `url.parse()` call... we need to remove the\n            // `path` portion so that `net.connect()` doesn't attempt to open\n            // that as a Unix socket file.\n            delete proxy.path;\n            delete proxy.pathname;\n        }\n        this.proxy = proxy;\n    }\n    /**\n     * Called when the node-core HTTP client library is creating a\n     * new HTTP request.\n     *\n     * @api protected\n     */\n    callback(req, opts) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { proxy, secureProxy } = this;\n            const parsed = url_1.default.parse(req.path);\n            if (!parsed.protocol) {\n                parsed.protocol = 'http:';\n            }\n            if (!parsed.hostname) {\n                parsed.hostname = opts.hostname || opts.host || null;\n            }\n            if (parsed.port == null && typeof opts.port) {\n                parsed.port = String(opts.port);\n            }\n            if (parsed.port === '80') {\n                // if port is 80, then we can remove the port so that the\n                // \":80\" portion is not on the produced URL\n                parsed.port = '';\n            }\n            // Change the `http.ClientRequest` instance's \"path\" field\n            // to the absolute path of the URL that will be requested.\n            req.path = url_1.default.format(parsed);\n            // Inject the `Proxy-Authorization` header if necessary.\n            if (proxy.auth) {\n                req.setHeader('Proxy-Authorization', `Basic ${Buffer.from(proxy.auth).toString('base64')}`);\n            }\n            // Create a socket connection to the proxy server.\n            let socket;\n            if (secureProxy) {\n                debug('Creating `tls.Socket`: %o', proxy);\n                socket = tls_1.default.connect(proxy);\n            }\n            else {\n                debug('Creating `net.Socket`: %o', proxy);\n                socket = net_1.default.connect(proxy);\n            }\n            // At this point, the http ClientRequest's internal `_header` field\n            // might have already been set. If this is the case then we'll need\n            // to re-generate the string since we just changed the `req.path`.\n            if (req._header) {\n                let first;\n                let endOfHeaders;\n                debug('Regenerating stored HTTP header string for request');\n                req._header = null;\n                req._implicitHeader();\n                if (req.output && req.output.length > 0) {\n                    // Node < 12\n                    debug('Patching connection write() output buffer with updated header');\n                    first = req.output[0];\n                    endOfHeaders = first.indexOf('\\r\\n\\r\\n') + 4;\n                    req.output[0] = req._header + first.substring(endOfHeaders);\n                    debug('Output buffer: %o', req.output);\n                }\n                else if (req.outputData && req.outputData.length > 0) {\n                    // Node >= 12\n                    debug('Patching connection write() output buffer with updated header');\n                    first = req.outputData[0].data;\n                    endOfHeaders = first.indexOf('\\r\\n\\r\\n') + 4;\n                    req.outputData[0].data =\n                        req._header + first.substring(endOfHeaders);\n                    debug('Output buffer: %o', req.outputData[0].data);\n                }\n            }\n            // Wait for the socket's `connect` event, so that this `callback()`\n            // function throws instead of the `http` request machinery. This is\n            // important for i.e. `PacProxyAgent` which determines a failed proxy\n            // connection via the `callback()` function throwing.\n            yield (0, once_1.default)(socket, 'connect');\n            return socket;\n        });\n    }\n}\nexports[\"default\"] = HttpProxyAgent;\n//# sourceMappingURL=agent.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaHR0cC1wcm94eS1hZ2VudC9kaXN0L2FnZW50LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQSw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDhCQUE4QixtQkFBTyxDQUFDLGdCQUFLO0FBQzNDLDhCQUE4QixtQkFBTyxDQUFDLGdCQUFLO0FBQzNDLDhCQUE4QixtQkFBTyxDQUFDLGdCQUFLO0FBQzNDLGdDQUFnQyxtQkFBTyxDQUFDLHNEQUFPO0FBQy9DLCtCQUErQixtQkFBTyxDQUFDLCtFQUFtQjtBQUMxRCxxQkFBcUIsbUJBQU8sQ0FBQyxxRUFBWTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCwyQ0FBMkM7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0JBQWU7QUFDZiIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLy4vbm9kZV9tb2R1bGVzL2h0dHAtcHJveHktYWdlbnQvZGlzdC9hZ2VudC5qcz9lYTUwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBuZXRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwibmV0XCIpKTtcbmNvbnN0IHRsc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ0bHNcIikpO1xuY29uc3QgdXJsXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInVybFwiKSk7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7XG5jb25zdCBvbmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkB0b290YWxsbmF0ZS9vbmNlXCIpKTtcbmNvbnN0IGFnZW50X2Jhc2VfMSA9IHJlcXVpcmUoXCJhZ2VudC1iYXNlXCIpO1xuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KSgnaHR0cC1wcm94eS1hZ2VudCcpO1xuZnVuY3Rpb24gaXNIVFRQUyhwcm90b2NvbCkge1xuICAgIHJldHVybiB0eXBlb2YgcHJvdG9jb2wgPT09ICdzdHJpbmcnID8gL15odHRwczo/JC9pLnRlc3QocHJvdG9jb2wpIDogZmFsc2U7XG59XG4vKipcbiAqIFRoZSBgSHR0cFByb3h5QWdlbnRgIGltcGxlbWVudHMgYW4gSFRUUCBBZ2VudCBzdWJjbGFzcyB0aGF0IGNvbm5lY3RzXG4gKiB0byB0aGUgc3BlY2lmaWVkIFwiSFRUUCBwcm94eSBzZXJ2ZXJcIiBpbiBvcmRlciB0byBwcm94eSBIVFRQIHJlcXVlc3RzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmNsYXNzIEh0dHBQcm94eUFnZW50IGV4dGVuZHMgYWdlbnRfYmFzZV8xLkFnZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihfb3B0cykge1xuICAgICAgICBsZXQgb3B0cztcbiAgICAgICAgaWYgKHR5cGVvZiBfb3B0cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmxfMS5kZWZhdWx0LnBhcnNlKF9vcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMgPSBfb3B0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYW4gSFRUUChTKSBwcm94eSBzZXJ2ZXIgYGhvc3RgIGFuZCBgcG9ydGAgbXVzdCBiZSBzcGVjaWZpZWQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVidWcoJ0NyZWF0aW5nIG5ldyBIdHRwUHJveHlBZ2VudCBpbnN0YW5jZTogJW8nLCBvcHRzKTtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIGNvbnN0IHByb3h5ID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cyk7XG4gICAgICAgIC8vIElmIGB0cnVlYCwgdGhlbiBjb25uZWN0IHRvIHRoZSBwcm94eSBzZXJ2ZXIgb3ZlciBUTFMuXG4gICAgICAgIC8vIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAgICAgIHRoaXMuc2VjdXJlUHJveHkgPSBvcHRzLnNlY3VyZVByb3h5IHx8IGlzSFRUUFMocHJveHkucHJvdG9jb2wpO1xuICAgICAgICAvLyBQcmVmZXIgYGhvc3RuYW1lYCBvdmVyIGBob3N0YCwgYW5kIHNldCB0aGUgYHBvcnRgIGlmIG5lZWRlZC5cbiAgICAgICAgcHJveHkuaG9zdCA9IHByb3h5Lmhvc3RuYW1lIHx8IHByb3h5Lmhvc3Q7XG4gICAgICAgIGlmICh0eXBlb2YgcHJveHkucG9ydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHByb3h5LnBvcnQgPSBwYXJzZUludChwcm94eS5wb3J0LCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFwcm94eS5wb3J0ICYmIHByb3h5Lmhvc3QpIHtcbiAgICAgICAgICAgIHByb3h5LnBvcnQgPSB0aGlzLnNlY3VyZVByb3h5ID8gNDQzIDogODA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3h5Lmhvc3QgJiYgcHJveHkucGF0aCkge1xuICAgICAgICAgICAgLy8gSWYgYm90aCBhIGBob3N0YCBhbmQgYHBhdGhgIGFyZSBzcGVjaWZpZWQgdGhlbiBpdCdzIG1vc3QgbGlrZWx5XG4gICAgICAgICAgICAvLyB0aGUgcmVzdWx0IG9mIGEgYHVybC5wYXJzZSgpYCBjYWxsLi4uIHdlIG5lZWQgdG8gcmVtb3ZlIHRoZVxuICAgICAgICAgICAgLy8gYHBhdGhgIHBvcnRpb24gc28gdGhhdCBgbmV0LmNvbm5lY3QoKWAgZG9lc24ndCBhdHRlbXB0IHRvIG9wZW5cbiAgICAgICAgICAgIC8vIHRoYXQgYXMgYSBVbml4IHNvY2tldCBmaWxlLlxuICAgICAgICAgICAgZGVsZXRlIHByb3h5LnBhdGg7XG4gICAgICAgICAgICBkZWxldGUgcHJveHkucGF0aG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm94eSA9IHByb3h5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgbm9kZS1jb3JlIEhUVFAgY2xpZW50IGxpYnJhcnkgaXMgY3JlYXRpbmcgYVxuICAgICAqIG5ldyBIVFRQIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNhbGxiYWNrKHJlcSwgb3B0cykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgeyBwcm94eSwgc2VjdXJlUHJveHkgfSA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB1cmxfMS5kZWZhdWx0LnBhcnNlKHJlcS5wYXRoKTtcbiAgICAgICAgICAgIGlmICghcGFyc2VkLnByb3RvY29sKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnByb3RvY29sID0gJ2h0dHA6JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFyc2VkLmhvc3RuYW1lKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZSB8fCBvcHRzLmhvc3QgfHwgbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJzZWQucG9ydCA9PSBudWxsICYmIHR5cGVvZiBvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZWQucG9ydCA9IFN0cmluZyhvcHRzLnBvcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcnNlZC5wb3J0ID09PSAnODAnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgcG9ydCBpcyA4MCwgdGhlbiB3ZSBjYW4gcmVtb3ZlIHRoZSBwb3J0IHNvIHRoYXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gXCI6ODBcIiBwb3J0aW9uIGlzIG5vdCBvbiB0aGUgcHJvZHVjZWQgVVJMXG4gICAgICAgICAgICAgICAgcGFyc2VkLnBvcnQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgYGh0dHAuQ2xpZW50UmVxdWVzdGAgaW5zdGFuY2UncyBcInBhdGhcIiBmaWVsZFxuICAgICAgICAgICAgLy8gdG8gdGhlIGFic29sdXRlIHBhdGggb2YgdGhlIFVSTCB0aGF0IHdpbGwgYmUgcmVxdWVzdGVkLlxuICAgICAgICAgICAgcmVxLnBhdGggPSB1cmxfMS5kZWZhdWx0LmZvcm1hdChwYXJzZWQpO1xuICAgICAgICAgICAgLy8gSW5qZWN0IHRoZSBgUHJveHktQXV0aG9yaXphdGlvbmAgaGVhZGVyIGlmIG5lY2Vzc2FyeS5cbiAgICAgICAgICAgIGlmIChwcm94eS5hdXRoKSB7XG4gICAgICAgICAgICAgICAgcmVxLnNldEhlYWRlcignUHJveHktQXV0aG9yaXphdGlvbicsIGBCYXNpYyAke0J1ZmZlci5mcm9tKHByb3h5LmF1dGgpLnRvU3RyaW5nKCdiYXNlNjQnKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNvY2tldCBjb25uZWN0aW9uIHRvIHRoZSBwcm94eSBzZXJ2ZXIuXG4gICAgICAgICAgICBsZXQgc29ja2V0O1xuICAgICAgICAgICAgaWYgKHNlY3VyZVByb3h5KSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ0NyZWF0aW5nIGB0bHMuU29ja2V0YDogJW8nLCBwcm94eSk7XG4gICAgICAgICAgICAgICAgc29ja2V0ID0gdGxzXzEuZGVmYXVsdC5jb25uZWN0KHByb3h5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdDcmVhdGluZyBgbmV0LlNvY2tldGA6ICVvJywgcHJveHkpO1xuICAgICAgICAgICAgICAgIHNvY2tldCA9IG5ldF8xLmRlZmF1bHQuY29ubmVjdChwcm94eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgaHR0cCBDbGllbnRSZXF1ZXN0J3MgaW50ZXJuYWwgYF9oZWFkZXJgIGZpZWxkXG4gICAgICAgICAgICAvLyBtaWdodCBoYXZlIGFscmVhZHkgYmVlbiBzZXQuIElmIHRoaXMgaXMgdGhlIGNhc2UgdGhlbiB3ZSdsbCBuZWVkXG4gICAgICAgICAgICAvLyB0byByZS1nZW5lcmF0ZSB0aGUgc3RyaW5nIHNpbmNlIHdlIGp1c3QgY2hhbmdlZCB0aGUgYHJlcS5wYXRoYC5cbiAgICAgICAgICAgIGlmIChyZXEuX2hlYWRlcikge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdDtcbiAgICAgICAgICAgICAgICBsZXQgZW5kT2ZIZWFkZXJzO1xuICAgICAgICAgICAgICAgIGRlYnVnKCdSZWdlbmVyYXRpbmcgc3RvcmVkIEhUVFAgaGVhZGVyIHN0cmluZyBmb3IgcmVxdWVzdCcpO1xuICAgICAgICAgICAgICAgIHJlcS5faGVhZGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXEuX2ltcGxpY2l0SGVhZGVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcS5vdXRwdXQgJiYgcmVxLm91dHB1dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vZGUgPCAxMlxuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygnUGF0Y2hpbmcgY29ubmVjdGlvbiB3cml0ZSgpIG91dHB1dCBidWZmZXIgd2l0aCB1cGRhdGVkIGhlYWRlcicpO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IHJlcS5vdXRwdXRbMF07XG4gICAgICAgICAgICAgICAgICAgIGVuZE9mSGVhZGVycyA9IGZpcnN0LmluZGV4T2YoJ1xcclxcblxcclxcbicpICsgNDtcbiAgICAgICAgICAgICAgICAgICAgcmVxLm91dHB1dFswXSA9IHJlcS5faGVhZGVyICsgZmlyc3Quc3Vic3RyaW5nKGVuZE9mSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdPdXRwdXQgYnVmZmVyOiAlbycsIHJlcS5vdXRwdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXEub3V0cHV0RGF0YSAmJiByZXEub3V0cHV0RGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vZGUgPj0gMTJcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ1BhdGNoaW5nIGNvbm5lY3Rpb24gd3JpdGUoKSBvdXRwdXQgYnVmZmVyIHdpdGggdXBkYXRlZCBoZWFkZXInKTtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSByZXEub3V0cHV0RGF0YVswXS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBlbmRPZkhlYWRlcnMgPSBmaXJzdC5pbmRleE9mKCdcXHJcXG5cXHJcXG4nKSArIDQ7XG4gICAgICAgICAgICAgICAgICAgIHJlcS5vdXRwdXREYXRhWzBdLmRhdGEgPVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxLl9oZWFkZXIgKyBmaXJzdC5zdWJzdHJpbmcoZW5kT2ZIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ091dHB1dCBidWZmZXI6ICVvJywgcmVxLm91dHB1dERhdGFbMF0uZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2FpdCBmb3IgdGhlIHNvY2tldCdzIGBjb25uZWN0YCBldmVudCwgc28gdGhhdCB0aGlzIGBjYWxsYmFjaygpYFxuICAgICAgICAgICAgLy8gZnVuY3Rpb24gdGhyb3dzIGluc3RlYWQgb2YgdGhlIGBodHRwYCByZXF1ZXN0IG1hY2hpbmVyeS4gVGhpcyBpc1xuICAgICAgICAgICAgLy8gaW1wb3J0YW50IGZvciBpLmUuIGBQYWNQcm94eUFnZW50YCB3aGljaCBkZXRlcm1pbmVzIGEgZmFpbGVkIHByb3h5XG4gICAgICAgICAgICAvLyBjb25uZWN0aW9uIHZpYSB0aGUgYGNhbGxiYWNrKClgIGZ1bmN0aW9uIHRocm93aW5nLlxuICAgICAgICAgICAgeWllbGQgKDAsIG9uY2VfMS5kZWZhdWx0KShzb2NrZXQsICdjb25uZWN0Jyk7XG4gICAgICAgICAgICByZXR1cm4gc29ja2V0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBIdHRwUHJveHlBZ2VudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFnZW50LmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/http-proxy-agent/dist/agent.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/http-proxy-agent/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/http-proxy-agent/dist/index.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nconst agent_1 = __importDefault(__webpack_require__(/*! ./agent */ \"(ssr)/./node_modules/http-proxy-agent/dist/agent.js\"));\nfunction createHttpProxyAgent(opts) {\n    return new agent_1.default(opts);\n}\n(function (createHttpProxyAgent) {\n    createHttpProxyAgent.HttpProxyAgent = agent_1.default;\n    createHttpProxyAgent.prototype = agent_1.default.prototype;\n})(createHttpProxyAgent || (createHttpProxyAgent = {}));\nmodule.exports = createHttpProxyAgent;\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaHR0cC1wcm94eS1hZ2VudC9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2I7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQSxnQ0FBZ0MsbUJBQU8sQ0FBQyxvRUFBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9EQUFvRDtBQUNyRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEvLi9ub2RlX21vZHVsZXMvaHR0cC1wcm94eS1hZ2VudC9kaXN0L2luZGV4LmpzPzUwYWMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5jb25zdCBhZ2VudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2FnZW50XCIpKTtcbmZ1bmN0aW9uIGNyZWF0ZUh0dHBQcm94eUFnZW50KG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IGFnZW50XzEuZGVmYXVsdChvcHRzKTtcbn1cbihmdW5jdGlvbiAoY3JlYXRlSHR0cFByb3h5QWdlbnQpIHtcbiAgICBjcmVhdGVIdHRwUHJveHlBZ2VudC5IdHRwUHJveHlBZ2VudCA9IGFnZW50XzEuZGVmYXVsdDtcbiAgICBjcmVhdGVIdHRwUHJveHlBZ2VudC5wcm90b3R5cGUgPSBhZ2VudF8xLmRlZmF1bHQucHJvdG90eXBlO1xufSkoY3JlYXRlSHR0cFByb3h5QWdlbnQgfHwgKGNyZWF0ZUh0dHBQcm94eUFnZW50ID0ge30pKTtcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSHR0cFByb3h5QWdlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/http-proxy-agent/dist/index.js\n");

/***/ })

};
;