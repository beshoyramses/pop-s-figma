"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/whatwg-mimetype";
exports.ids = ["vendor-chunks/whatwg-mimetype"];
exports.modules = {

/***/ "(ssr)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js":
/*!******************************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/mime-type-parameters.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {\n  asciiLowercase,\n  solelyContainsHTTPTokenCodePoints,\n  soleyContainsHTTPQuotedStringTokenCodePoints\n} = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = class MIMETypeParameters {\n  constructor(map) {\n    this._map = map;\n  }\n\n  get size() {\n    return this._map.size;\n  }\n\n  get(name) {\n    name = asciiLowercase(String(name));\n    return this._map.get(name);\n  }\n\n  has(name) {\n    name = asciiLowercase(String(name));\n    return this._map.has(name);\n  }\n\n  set(name, value) {\n    name = asciiLowercase(String(name));\n    value = String(value);\n\n    if (!solelyContainsHTTPTokenCodePoints(name)) {\n      throw new Error(`Invalid MIME type parameter name \"${name}\": only HTTP token code points are valid.`);\n    }\n    if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {\n      throw new Error(`Invalid MIME type parameter value \"${value}\": only HTTP quoted-string token code points are ` +\n                      `valid.`);\n    }\n\n    return this._map.set(name, value);\n  }\n\n  clear() {\n    this._map.clear();\n  }\n\n  delete(name) {\n    name = asciiLowercase(String(name));\n    return this._map.delete(name);\n  }\n\n  forEach(callbackFn, thisArg) {\n    this._map.forEach(callbackFn, thisArg);\n  }\n\n  keys() {\n    return this._map.keys();\n  }\n\n  values() {\n    return this._map.values();\n  }\n\n  entries() {\n    return this._map.entries();\n  }\n\n  [Symbol.iterator]() {\n    return this._map[Symbol.iterator]();\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9taW1lLXR5cGUtcGFyYW1ldGVycy5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxFQUFFLG1CQUFPLENBQUMscUVBQVk7O0FBRXhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyREFBMkQsS0FBSztBQUNoRTtBQUNBO0FBQ0EsNERBQTRELE1BQU07QUFDbEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS8uL25vZGVfbW9kdWxlcy93aGF0d2ctbWltZXR5cGUvbGliL21pbWUtdHlwZS1wYXJhbWV0ZXJzLmpzP2M5YjQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCB7XG4gIGFzY2lpTG93ZXJjYXNlLFxuICBzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHMsXG4gIHNvbGV5Q29udGFpbnNIVFRQUXVvdGVkU3RyaW5nVG9rZW5Db2RlUG9pbnRzXG59ID0gcmVxdWlyZShcIi4vdXRpbHMuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTUlNRVR5cGVQYXJhbWV0ZXJzIHtcbiAgY29uc3RydWN0b3IobWFwKSB7XG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICB9XG5cbiAgZ2V0IHNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5zaXplO1xuICB9XG5cbiAgZ2V0KG5hbWUpIHtcbiAgICBuYW1lID0gYXNjaWlMb3dlcmNhc2UoU3RyaW5nKG5hbWUpKTtcbiAgICByZXR1cm4gdGhpcy5fbWFwLmdldChuYW1lKTtcbiAgfVxuXG4gIGhhcyhuYW1lKSB7XG4gICAgbmFtZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyhuYW1lKSk7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5oYXMobmFtZSk7XG4gIH1cblxuICBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gYXNjaWlMb3dlcmNhc2UoU3RyaW5nKG5hbWUpKTtcbiAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG5cbiAgICBpZiAoIXNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyhuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIE1JTUUgdHlwZSBwYXJhbWV0ZXIgbmFtZSBcIiR7bmFtZX1cIjogb25seSBIVFRQIHRva2VuIGNvZGUgcG9pbnRzIGFyZSB2YWxpZC5gKTtcbiAgICB9XG4gICAgaWYgKCFzb2xleUNvbnRhaW5zSFRUUFF1b3RlZFN0cmluZ1Rva2VuQ29kZVBvaW50cyh2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBNSU1FIHR5cGUgcGFyYW1ldGVyIHZhbHVlIFwiJHt2YWx1ZX1cIjogb25seSBIVFRQIHF1b3RlZC1zdHJpbmcgdG9rZW4gY29kZSBwb2ludHMgYXJlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgIGB2YWxpZC5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fbWFwLnNldChuYW1lLCB2YWx1ZSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9tYXAuY2xlYXIoKTtcbiAgfVxuXG4gIGRlbGV0ZShuYW1lKSB7XG4gICAgbmFtZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyhuYW1lKSk7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUobmFtZSk7XG4gIH1cblxuICBmb3JFYWNoKGNhbGxiYWNrRm4sIHRoaXNBcmcpIHtcbiAgICB0aGlzLl9tYXAuZm9yRWFjaChjYWxsYmFja0ZuLCB0aGlzQXJnKTtcbiAgfVxuXG4gIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC52YWx1ZXMoKTtcbiAgfVxuXG4gIGVudHJpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/whatwg-mimetype/lib/mime-type.js":
/*!*******************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/mime-type.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst MIMETypeParameters = __webpack_require__(/*! ./mime-type-parameters.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/mime-type-parameters.js\");\nconst parse = __webpack_require__(/*! ./parser.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/parser.js\");\nconst serialize = __webpack_require__(/*! ./serializer.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/serializer.js\");\nconst {\n  asciiLowercase,\n  solelyContainsHTTPTokenCodePoints\n} = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = class MIMEType {\n  constructor(string) {\n    string = String(string);\n    const result = parse(string);\n    if (result === null) {\n      throw new Error(`Could not parse MIME type string \"${string}\"`);\n    }\n\n    this._type = result.type;\n    this._subtype = result.subtype;\n    this._parameters = new MIMETypeParameters(result.parameters);\n  }\n\n  static parse(string) {\n    try {\n      return new this(string);\n    } catch (e) {\n      return null;\n    }\n  }\n\n  get essence() {\n    return `${this.type}/${this.subtype}`;\n  }\n\n  get type() {\n    return this._type;\n  }\n\n  set type(value) {\n    value = asciiLowercase(String(value));\n\n    if (value.length === 0) {\n      throw new Error(\"Invalid type: must be a non-empty string\");\n    }\n    if (!solelyContainsHTTPTokenCodePoints(value)) {\n      throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);\n    }\n\n    this._type = value;\n  }\n\n  get subtype() {\n    return this._subtype;\n  }\n\n  set subtype(value) {\n    value = asciiLowercase(String(value));\n\n    if (value.length === 0) {\n      throw new Error(\"Invalid subtype: must be a non-empty string\");\n    }\n    if (!solelyContainsHTTPTokenCodePoints(value)) {\n      throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);\n    }\n\n    this._subtype = value;\n  }\n\n  get parameters() {\n    return this._parameters;\n  }\n\n  toString() {\n    // The serialize function works on both \"MIME type records\" (i.e. the results of parse) and on this class, since\n    // this class's interface is identical.\n    return serialize(this);\n  }\n\n  isJavaScript({ prohibitParameters = false } = {}) {\n    switch (this._type) {\n      case \"text\": {\n        switch (this._subtype) {\n          case \"ecmascript\":\n          case \"javascript\":\n          case \"javascript1.0\":\n          case \"javascript1.1\":\n          case \"javascript1.2\":\n          case \"javascript1.3\":\n          case \"javascript1.4\":\n          case \"javascript1.5\":\n          case \"jscript\":\n          case \"livescript\":\n          case \"x-ecmascript\":\n          case \"x-javascript\": {\n            return !prohibitParameters || this._parameters.size === 0;\n          }\n          default: {\n            return false;\n          }\n        }\n      }\n      case \"application\": {\n        switch (this._subtype) {\n          case \"ecmascript\":\n          case \"javascript\":\n          case \"x-ecmascript\":\n          case \"x-javascript\": {\n            return !prohibitParameters || this._parameters.size === 0;\n          }\n          default: {\n            return false;\n          }\n        }\n      }\n      default: {\n        return false;\n      }\n    }\n  }\n  isXML() {\n    return (this._subtype === \"xml\" && (this._type === \"text\" || this._type === \"application\")) ||\n           this._subtype.endsWith(\"+xml\");\n  }\n  isHTML() {\n    return this._subtype === \"html\" && this._type === \"text\";\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9taW1lLXR5cGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiwyQkFBMkIsbUJBQU8sQ0FBQyxtR0FBMkI7QUFDOUQsY0FBYyxtQkFBTyxDQUFDLHVFQUFhO0FBQ25DLGtCQUFrQixtQkFBTyxDQUFDLCtFQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxFQUFFLEVBQUUsbUJBQU8sQ0FBQyxxRUFBWTs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxPQUFPO0FBQ2xFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFjLFVBQVUsR0FBRyxhQUFhO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE1BQU07QUFDNUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxNQUFNO0FBQy9DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLDZCQUE2QixJQUFJO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLy4vbm9kZV9tb2R1bGVzL3doYXR3Zy1taW1ldHlwZS9saWIvbWltZS10eXBlLmpzP2I1YmUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBNSU1FVHlwZVBhcmFtZXRlcnMgPSByZXF1aXJlKFwiLi9taW1lLXR5cGUtcGFyYW1ldGVycy5qc1wiKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZShcIi4vcGFyc2VyLmpzXCIpO1xuY29uc3Qgc2VyaWFsaXplID0gcmVxdWlyZShcIi4vc2VyaWFsaXplci5qc1wiKTtcbmNvbnN0IHtcbiAgYXNjaWlMb3dlcmNhc2UsXG4gIHNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50c1xufSA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE1JTUVUeXBlIHtcbiAgY29uc3RydWN0b3Ioc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gU3RyaW5nKHN0cmluZyk7XG4gICAgY29uc3QgcmVzdWx0ID0gcGFyc2Uoc3RyaW5nKTtcbiAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBwYXJzZSBNSU1FIHR5cGUgc3RyaW5nIFwiJHtzdHJpbmd9XCJgKTtcbiAgICB9XG5cbiAgICB0aGlzLl90eXBlID0gcmVzdWx0LnR5cGU7XG4gICAgdGhpcy5fc3VidHlwZSA9IHJlc3VsdC5zdWJ0eXBlO1xuICAgIHRoaXMuX3BhcmFtZXRlcnMgPSBuZXcgTUlNRVR5cGVQYXJhbWV0ZXJzKHJlc3VsdC5wYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZShzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKHN0cmluZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVzc2VuY2UoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudHlwZX0vJHt0aGlzLnN1YnR5cGV9YDtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLl90eXBlO1xuICB9XG5cbiAgc2V0IHR5cGUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyh2YWx1ZSkpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB0eXBlOiBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZ1wiKTtcbiAgICB9XG4gICAgaWYgKCFzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHModmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdHlwZSAke3ZhbHVlfTogbXVzdCBjb250YWluIG9ubHkgSFRUUCB0b2tlbiBjb2RlIHBvaW50c2ApO1xuICAgIH1cblxuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBzdWJ0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9zdWJ0eXBlO1xuICB9XG5cbiAgc2V0IHN1YnR5cGUodmFsdWUpIHtcbiAgICB2YWx1ZSA9IGFzY2lpTG93ZXJjYXNlKFN0cmluZyh2YWx1ZSkpO1xuXG4gICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdWJ0eXBlOiBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZ1wiKTtcbiAgICB9XG4gICAgaWYgKCFzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHModmFsdWUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3VidHlwZSAke3ZhbHVlfTogbXVzdCBjb250YWluIG9ubHkgSFRUUCB0b2tlbiBjb2RlIHBvaW50c2ApO1xuICAgIH1cblxuICAgIHRoaXMuX3N1YnR5cGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYXJhbWV0ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbWV0ZXJzO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgLy8gVGhlIHNlcmlhbGl6ZSBmdW5jdGlvbiB3b3JrcyBvbiBib3RoIFwiTUlNRSB0eXBlIHJlY29yZHNcIiAoaS5lLiB0aGUgcmVzdWx0cyBvZiBwYXJzZSkgYW5kIG9uIHRoaXMgY2xhc3MsIHNpbmNlXG4gICAgLy8gdGhpcyBjbGFzcydzIGludGVyZmFjZSBpcyBpZGVudGljYWwuXG4gICAgcmV0dXJuIHNlcmlhbGl6ZSh0aGlzKTtcbiAgfVxuXG4gIGlzSmF2YVNjcmlwdCh7IHByb2hpYml0UGFyYW1ldGVycyA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHN3aXRjaCAodGhpcy5fdHlwZSkge1xuICAgICAgY2FzZSBcInRleHRcIjoge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX3N1YnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFwiZWNtYXNjcmlwdFwiOlxuICAgICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0XCI6XG4gICAgICAgICAgY2FzZSBcImphdmFzY3JpcHQxLjBcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdDEuMVwiOlxuICAgICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0MS4yXCI6XG4gICAgICAgICAgY2FzZSBcImphdmFzY3JpcHQxLjNcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdDEuNFwiOlxuICAgICAgICAgIGNhc2UgXCJqYXZhc2NyaXB0MS41XCI6XG4gICAgICAgICAgY2FzZSBcImpzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwibGl2ZXNjcmlwdFwiOlxuICAgICAgICAgIGNhc2UgXCJ4LWVjbWFzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwieC1qYXZhc2NyaXB0XCI6IHtcbiAgICAgICAgICAgIHJldHVybiAhcHJvaGliaXRQYXJhbWV0ZXJzIHx8IHRoaXMuX3BhcmFtZXRlcnMuc2l6ZSA9PT0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FzZSBcImFwcGxpY2F0aW9uXCI6IHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zdWJ0eXBlKSB7XG4gICAgICAgICAgY2FzZSBcImVjbWFzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwiamF2YXNjcmlwdFwiOlxuICAgICAgICAgIGNhc2UgXCJ4LWVjbWFzY3JpcHRcIjpcbiAgICAgICAgICBjYXNlIFwieC1qYXZhc2NyaXB0XCI6IHtcbiAgICAgICAgICAgIHJldHVybiAhcHJvaGliaXRQYXJhbWV0ZXJzIHx8IHRoaXMuX3BhcmFtZXRlcnMuc2l6ZSA9PT0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlzWE1MKCkge1xuICAgIHJldHVybiAodGhpcy5fc3VidHlwZSA9PT0gXCJ4bWxcIiAmJiAodGhpcy5fdHlwZSA9PT0gXCJ0ZXh0XCIgfHwgdGhpcy5fdHlwZSA9PT0gXCJhcHBsaWNhdGlvblwiKSkgfHxcbiAgICAgICAgICAgdGhpcy5fc3VidHlwZS5lbmRzV2l0aChcIit4bWxcIik7XG4gIH1cbiAgaXNIVE1MKCkge1xuICAgIHJldHVybiB0aGlzLl9zdWJ0eXBlID09PSBcImh0bWxcIiAmJiB0aGlzLl90eXBlID09PSBcInRleHRcIjtcbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/whatwg-mimetype/lib/mime-type.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/whatwg-mimetype/lib/parser.js":
/*!****************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/parser.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst {\n  removeLeadingAndTrailingHTTPWhitespace,\n  removeTrailingHTTPWhitespace,\n  isHTTPWhitespaceChar,\n  solelyContainsHTTPTokenCodePoints,\n  soleyContainsHTTPQuotedStringTokenCodePoints,\n  asciiLowercase,\n  collectAnHTTPQuotedString\n} = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = input => {\n  input = removeLeadingAndTrailingHTTPWhitespace(input);\n\n  let position = 0;\n  let type = \"\";\n  while (position < input.length && input[position] !== \"/\") {\n    type += input[position];\n    ++position;\n  }\n\n  if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {\n    return null;\n  }\n\n  if (position >= input.length) {\n    return null;\n  }\n\n  // Skips past \"/\"\n  ++position;\n\n  let subtype = \"\";\n  while (position < input.length && input[position] !== \";\") {\n    subtype += input[position];\n    ++position;\n  }\n\n  subtype = removeTrailingHTTPWhitespace(subtype);\n\n  if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {\n    return null;\n  }\n\n  const mimeType = {\n    type: asciiLowercase(type),\n    subtype: asciiLowercase(subtype),\n    parameters: new Map()\n  };\n\n  while (position < input.length) {\n    // Skip past \";\"\n    ++position;\n\n    while (isHTTPWhitespaceChar(input[position])) {\n      ++position;\n    }\n\n    let parameterName = \"\";\n    while (position < input.length && input[position] !== \";\" && input[position] !== \"=\") {\n      parameterName += input[position];\n      ++position;\n    }\n    parameterName = asciiLowercase(parameterName);\n\n    if (position < input.length) {\n      if (input[position] === \";\") {\n        continue;\n      }\n\n      // Skip past \"=\"\n      ++position;\n    }\n\n    let parameterValue = null;\n    if (input[position] === \"\\\"\") {\n      [parameterValue, position] = collectAnHTTPQuotedString(input, position);\n\n      while (position < input.length && input[position] !== \";\") {\n        ++position;\n      }\n    } else {\n      parameterValue = \"\";\n      while (position < input.length && input[position] !== \";\") {\n        parameterValue += input[position];\n        ++position;\n      }\n\n      parameterValue = removeTrailingHTTPWhitespace(parameterValue);\n\n      if (parameterValue === \"\") {\n        continue;\n      }\n    }\n\n    if (parameterName.length > 0 &&\n        solelyContainsHTTPTokenCodePoints(parameterName) &&\n        soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) &&\n        !mimeType.parameters.has(parameterName)) {\n      mimeType.parameters.set(parameterName, parameterValue);\n    }\n  }\n\n  return mimeType;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9wYXJzZXIuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxFQUFFLG1CQUFPLENBQUMscUVBQVk7O0FBRXhCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQ7QUFDOUQ7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLy4vbm9kZV9tb2R1bGVzL3doYXR3Zy1taW1ldHlwZS9saWIvcGFyc2VyLmpzPzI3NTQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCB7XG4gIHJlbW92ZUxlYWRpbmdBbmRUcmFpbGluZ0hUVFBXaGl0ZXNwYWNlLFxuICByZW1vdmVUcmFpbGluZ0hUVFBXaGl0ZXNwYWNlLFxuICBpc0hUVFBXaGl0ZXNwYWNlQ2hhcixcbiAgc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzLFxuICBzb2xleUNvbnRhaW5zSFRUUFF1b3RlZFN0cmluZ1Rva2VuQ29kZVBvaW50cyxcbiAgYXNjaWlMb3dlcmNhc2UsXG4gIGNvbGxlY3RBbkhUVFBRdW90ZWRTdHJpbmdcbn0gPSByZXF1aXJlKFwiLi91dGlscy5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnB1dCA9PiB7XG4gIGlucHV0ID0gcmVtb3ZlTGVhZGluZ0FuZFRyYWlsaW5nSFRUUFdoaXRlc3BhY2UoaW5wdXQpO1xuXG4gIGxldCBwb3NpdGlvbiA9IDA7XG4gIGxldCB0eXBlID0gXCJcIjtcbiAgd2hpbGUgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoICYmIGlucHV0W3Bvc2l0aW9uXSAhPT0gXCIvXCIpIHtcbiAgICB0eXBlICs9IGlucHV0W3Bvc2l0aW9uXTtcbiAgICArK3Bvc2l0aW9uO1xuICB9XG5cbiAgaWYgKHR5cGUubGVuZ3RoID09PSAwIHx8ICFzb2xlbHlDb250YWluc0hUVFBUb2tlbkNvZGVQb2ludHModHlwZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChwb3NpdGlvbiA+PSBpbnB1dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNraXBzIHBhc3QgXCIvXCJcbiAgKytwb3NpdGlvbjtcblxuICBsZXQgc3VidHlwZSA9IFwiXCI7XG4gIHdoaWxlIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiO1wiKSB7XG4gICAgc3VidHlwZSArPSBpbnB1dFtwb3NpdGlvbl07XG4gICAgKytwb3NpdGlvbjtcbiAgfVxuXG4gIHN1YnR5cGUgPSByZW1vdmVUcmFpbGluZ0hUVFBXaGl0ZXNwYWNlKHN1YnR5cGUpO1xuXG4gIGlmIChzdWJ0eXBlLmxlbmd0aCA9PT0gMCB8fCAhc29sZWx5Q29udGFpbnNIVFRQVG9rZW5Db2RlUG9pbnRzKHN1YnR5cGUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBtaW1lVHlwZSA9IHtcbiAgICB0eXBlOiBhc2NpaUxvd2VyY2FzZSh0eXBlKSxcbiAgICBzdWJ0eXBlOiBhc2NpaUxvd2VyY2FzZShzdWJ0eXBlKSxcbiAgICBwYXJhbWV0ZXJzOiBuZXcgTWFwKClcbiAgfTtcblxuICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAvLyBTa2lwIHBhc3QgXCI7XCJcbiAgICArK3Bvc2l0aW9uO1xuXG4gICAgd2hpbGUgKGlzSFRUUFdoaXRlc3BhY2VDaGFyKGlucHV0W3Bvc2l0aW9uXSkpIHtcbiAgICAgICsrcG9zaXRpb247XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtZXRlck5hbWUgPSBcIlwiO1xuICAgIHdoaWxlIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiO1wiICYmIGlucHV0W3Bvc2l0aW9uXSAhPT0gXCI9XCIpIHtcbiAgICAgIHBhcmFtZXRlck5hbWUgKz0gaW5wdXRbcG9zaXRpb25dO1xuICAgICAgKytwb3NpdGlvbjtcbiAgICB9XG4gICAgcGFyYW1ldGVyTmFtZSA9IGFzY2lpTG93ZXJjYXNlKHBhcmFtZXRlck5hbWUpO1xuXG4gICAgaWYgKHBvc2l0aW9uIDwgaW5wdXQubGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbcG9zaXRpb25dID09PSBcIjtcIikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2tpcCBwYXN0IFwiPVwiXG4gICAgICArK3Bvc2l0aW9uO1xuICAgIH1cblxuICAgIGxldCBwYXJhbWV0ZXJWYWx1ZSA9IG51bGw7XG4gICAgaWYgKGlucHV0W3Bvc2l0aW9uXSA9PT0gXCJcXFwiXCIpIHtcbiAgICAgIFtwYXJhbWV0ZXJWYWx1ZSwgcG9zaXRpb25dID0gY29sbGVjdEFuSFRUUFF1b3RlZFN0cmluZyhpbnB1dCwgcG9zaXRpb24pO1xuXG4gICAgICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbcG9zaXRpb25dICE9PSBcIjtcIikge1xuICAgICAgICArK3Bvc2l0aW9uO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJhbWV0ZXJWYWx1ZSA9IFwiXCI7XG4gICAgICB3aGlsZSAocG9zaXRpb24gPCBpbnB1dC5sZW5ndGggJiYgaW5wdXRbcG9zaXRpb25dICE9PSBcIjtcIikge1xuICAgICAgICBwYXJhbWV0ZXJWYWx1ZSArPSBpbnB1dFtwb3NpdGlvbl07XG4gICAgICAgICsrcG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIHBhcmFtZXRlclZhbHVlID0gcmVtb3ZlVHJhaWxpbmdIVFRQV2hpdGVzcGFjZShwYXJhbWV0ZXJWYWx1ZSk7XG5cbiAgICAgIGlmIChwYXJhbWV0ZXJWYWx1ZSA9PT0gXCJcIikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1ldGVyTmFtZS5sZW5ndGggPiAwICYmXG4gICAgICAgIHNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyhwYXJhbWV0ZXJOYW1lKSAmJlxuICAgICAgICBzb2xleUNvbnRhaW5zSFRUUFF1b3RlZFN0cmluZ1Rva2VuQ29kZVBvaW50cyhwYXJhbWV0ZXJWYWx1ZSkgJiZcbiAgICAgICAgIW1pbWVUeXBlLnBhcmFtZXRlcnMuaGFzKHBhcmFtZXRlck5hbWUpKSB7XG4gICAgICBtaW1lVHlwZS5wYXJhbWV0ZXJzLnNldChwYXJhbWV0ZXJOYW1lLCBwYXJhbWV0ZXJWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1pbWVUeXBlO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/whatwg-mimetype/lib/parser.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/whatwg-mimetype/lib/serializer.js":
/*!********************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/serializer.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst { solelyContainsHTTPTokenCodePoints } = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/whatwg-mimetype/lib/utils.js\");\n\nmodule.exports = mimeType => {\n  let serialization = `${mimeType.type}/${mimeType.subtype}`;\n\n  if (mimeType.parameters.size === 0) {\n    return serialization;\n  }\n\n  for (let [name, value] of mimeType.parameters) {\n    serialization += \";\";\n    serialization += name;\n    serialization += \"=\";\n\n    if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {\n      value = value.replace(/([\"\\\\])/ug, \"\\\\$1\");\n      value = `\"${value}\"`;\n    }\n\n    serialization += value;\n  }\n\n  return serialization;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9zZXJpYWxpemVyLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsUUFBUSxvQ0FBb0MsRUFBRSxtQkFBTyxDQUFDLHFFQUFZOztBQUVsRTtBQUNBLHlCQUF5QixjQUFjLEdBQUcsaUJBQWlCOztBQUUzRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLE1BQU07QUFDeEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi9zZXJpYWxpemVyLmpzPzdkZGMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCB7IHNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyB9ID0gcmVxdWlyZShcIi4vdXRpbHMuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gbWltZVR5cGUgPT4ge1xuICBsZXQgc2VyaWFsaXphdGlvbiA9IGAke21pbWVUeXBlLnR5cGV9LyR7bWltZVR5cGUuc3VidHlwZX1gO1xuXG4gIGlmIChtaW1lVHlwZS5wYXJhbWV0ZXJzLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gc2VyaWFsaXphdGlvbjtcbiAgfVxuXG4gIGZvciAobGV0IFtuYW1lLCB2YWx1ZV0gb2YgbWltZVR5cGUucGFyYW1ldGVycykge1xuICAgIHNlcmlhbGl6YXRpb24gKz0gXCI7XCI7XG4gICAgc2VyaWFsaXphdGlvbiArPSBuYW1lO1xuICAgIHNlcmlhbGl6YXRpb24gKz0gXCI9XCI7XG5cbiAgICBpZiAoIXNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoLyhbXCJcXFxcXSkvdWcsIFwiXFxcXCQxXCIpO1xuICAgICAgdmFsdWUgPSBgXCIke3ZhbHVlfVwiYDtcbiAgICB9XG5cbiAgICBzZXJpYWxpemF0aW9uICs9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHNlcmlhbGl6YXRpb247XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/whatwg-mimetype/lib/serializer.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/whatwg-mimetype/lib/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/whatwg-mimetype/lib/utils.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nexports.removeLeadingAndTrailingHTTPWhitespace = string => {\n  return string.replace(/^[ \\t\\n\\r]+/u, \"\").replace(/[ \\t\\n\\r]+$/u, \"\");\n};\n\nexports.removeTrailingHTTPWhitespace = string => {\n  return string.replace(/[ \\t\\n\\r]+$/u, \"\");\n};\n\nexports.isHTTPWhitespaceChar = char => {\n  return char === \" \" || char === \"\\t\" || char === \"\\n\" || char === \"\\r\";\n};\n\nexports.solelyContainsHTTPTokenCodePoints = string => {\n  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);\n};\n\nexports.soleyContainsHTTPQuotedStringTokenCodePoints = string => {\n  return /^[\\t\\u0020-\\u007E\\u0080-\\u00FF]*$/u.test(string);\n};\n\nexports.asciiLowercase = string => {\n  return string.replace(/[A-Z]/ug, l => l.toLowerCase());\n};\n\n// This variant only implements it with the extract-value flag set.\nexports.collectAnHTTPQuotedString = (input, position) => {\n  let value = \"\";\n\n  position++;\n\n  while (true) {\n    while (position < input.length && input[position] !== \"\\\"\" && input[position] !== \"\\\\\") {\n      value += input[position];\n      ++position;\n    }\n\n    if (position >= input.length) {\n      break;\n    }\n\n    const quoteOrBackslash = input[position];\n    ++position;\n\n    if (quoteOrBackslash === \"\\\\\") {\n      if (position >= input.length) {\n        value += \"\\\\\";\n        break;\n      }\n\n      value += input[position];\n      ++position;\n    } else {\n      break;\n    }\n  }\n\n  return [value, position];\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hhdHdnLW1pbWV0eXBlL2xpYi91dGlscy5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiw4Q0FBOEM7QUFDOUM7QUFDQTs7QUFFQSxvQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQSx5Q0FBeUM7QUFDekM7QUFDQTs7QUFFQSxvREFBb0Q7QUFDcEQ7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLy4vbm9kZV9tb2R1bGVzL3doYXR3Zy1taW1ldHlwZS9saWIvdXRpbHMuanM/YmU3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5yZW1vdmVMZWFkaW5nQW5kVHJhaWxpbmdIVFRQV2hpdGVzcGFjZSA9IHN0cmluZyA9PiB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlsgXFx0XFxuXFxyXSsvdSwgXCJcIikucmVwbGFjZSgvWyBcXHRcXG5cXHJdKyQvdSwgXCJcIik7XG59O1xuXG5leHBvcnRzLnJlbW92ZVRyYWlsaW5nSFRUUFdoaXRlc3BhY2UgPSBzdHJpbmcgPT4ge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1sgXFx0XFxuXFxyXSskL3UsIFwiXCIpO1xufTtcblxuZXhwb3J0cy5pc0hUVFBXaGl0ZXNwYWNlQ2hhciA9IGNoYXIgPT4ge1xuICByZXR1cm4gY2hhciA9PT0gXCIgXCIgfHwgY2hhciA9PT0gXCJcXHRcIiB8fCBjaGFyID09PSBcIlxcblwiIHx8IGNoYXIgPT09IFwiXFxyXCI7XG59O1xuXG5leHBvcnRzLnNvbGVseUNvbnRhaW5zSFRUUFRva2VuQ29kZVBvaW50cyA9IHN0cmluZyA9PiB7XG4gIHJldHVybiAvXlstISMkJSYnKisuXl9gfH5BLVphLXowLTldKiQvdS50ZXN0KHN0cmluZyk7XG59O1xuXG5leHBvcnRzLnNvbGV5Q29udGFpbnNIVFRQUXVvdGVkU3RyaW5nVG9rZW5Db2RlUG9pbnRzID0gc3RyaW5nID0+IHtcbiAgcmV0dXJuIC9eW1xcdFxcdTAwMjAtXFx1MDA3RVxcdTAwODAtXFx1MDBGRl0qJC91LnRlc3Qoc3RyaW5nKTtcbn07XG5cbmV4cG9ydHMuYXNjaWlMb3dlcmNhc2UgPSBzdHJpbmcgPT4ge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tBLVpdL3VnLCBsID0+IGwudG9Mb3dlckNhc2UoKSk7XG59O1xuXG4vLyBUaGlzIHZhcmlhbnQgb25seSBpbXBsZW1lbnRzIGl0IHdpdGggdGhlIGV4dHJhY3QtdmFsdWUgZmxhZyBzZXQuXG5leHBvcnRzLmNvbGxlY3RBbkhUVFBRdW90ZWRTdHJpbmcgPSAoaW5wdXQsIHBvc2l0aW9uKSA9PiB7XG4gIGxldCB2YWx1ZSA9IFwiXCI7XG5cbiAgcG9zaXRpb24rKztcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHdoaWxlIChwb3NpdGlvbiA8IGlucHV0Lmxlbmd0aCAmJiBpbnB1dFtwb3NpdGlvbl0gIT09IFwiXFxcIlwiICYmIGlucHV0W3Bvc2l0aW9uXSAhPT0gXCJcXFxcXCIpIHtcbiAgICAgIHZhbHVlICs9IGlucHV0W3Bvc2l0aW9uXTtcbiAgICAgICsrcG9zaXRpb247XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uID49IGlucHV0Lmxlbmd0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgcXVvdGVPckJhY2tzbGFzaCA9IGlucHV0W3Bvc2l0aW9uXTtcbiAgICArK3Bvc2l0aW9uO1xuXG4gICAgaWYgKHF1b3RlT3JCYWNrc2xhc2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICBpZiAocG9zaXRpb24gPj0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlICs9IFwiXFxcXFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFsdWUgKz0gaW5wdXRbcG9zaXRpb25dO1xuICAgICAgKytwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFt2YWx1ZSwgcG9zaXRpb25dO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/whatwg-mimetype/lib/utils.js\n");

/***/ })

};
;