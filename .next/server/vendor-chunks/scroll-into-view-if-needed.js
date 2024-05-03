"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/scroll-into-view-if-needed";
exports.ids = ["vendor-chunks/scroll-into-view-if-needed"];
exports.modules = {

/***/ "(ssr)/./node_modules/scroll-into-view-if-needed/es/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/scroll-into-view-if-needed/es/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! compute-scroll-into-view */ \"(ssr)/./node_modules/compute-scroll-into-view/dist/index.mjs\");\n\nfunction isOptionsObject(options) {\n  return options === Object(options) && Object.keys(options).length !== 0;\n}\nfunction defaultBehavior(actions, behavior) {\n  if (behavior === void 0) {\n    behavior = 'auto';\n  }\n  var canSmoothScroll = ('scrollBehavior' in document.body.style);\n  actions.forEach(function (_ref) {\n    var el = _ref.el,\n      top = _ref.top,\n      left = _ref.left;\n    if (el.scroll && canSmoothScroll) {\n      el.scroll({\n        top: top,\n        left: left,\n        behavior: behavior\n      });\n    } else {\n      el.scrollTop = top;\n      el.scrollLeft = left;\n    }\n  });\n}\nfunction getOptions(options) {\n  if (options === false) {\n    return {\n      block: 'end',\n      inline: 'nearest'\n    };\n  }\n  if (isOptionsObject(options)) {\n    return options;\n  }\n  return {\n    block: 'start',\n    inline: 'nearest'\n  };\n}\nfunction scrollIntoView(target, options) {\n  var isTargetAttached = target.isConnected || target.ownerDocument.documentElement.contains(target);\n  if (isOptionsObject(options) && typeof options.behavior === 'function') {\n    return options.behavior(isTargetAttached ? (0,compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, options) : []);\n  }\n  if (!isTargetAttached) {\n    return;\n  }\n  var computeOptions = getOptions(options);\n  return defaultBehavior((0,compute_scroll_into_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, computeOptions), computeOptions.behavior);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (scrollIntoView);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2Nyb2xsLWludG8tdmlldy1pZi1uZWVkZWQvZXMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLG9FQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0VBQU87QUFDaEM7QUFDQSxpRUFBZSxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEvLi9ub2RlX21vZHVsZXMvc2Nyb2xsLWludG8tdmlldy1pZi1uZWVkZWQvZXMvaW5kZXguanM/OTlhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29tcHV0ZSBmcm9tICdjb21wdXRlLXNjcm9sbC1pbnRvLXZpZXcnO1xuZnVuY3Rpb24gaXNPcHRpb25zT2JqZWN0KG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMgPT09IE9iamVjdChvcHRpb25zKSAmJiBPYmplY3Qua2V5cyhvcHRpb25zKS5sZW5ndGggIT09IDA7XG59XG5mdW5jdGlvbiBkZWZhdWx0QmVoYXZpb3IoYWN0aW9ucywgYmVoYXZpb3IpIHtcbiAgaWYgKGJlaGF2aW9yID09PSB2b2lkIDApIHtcbiAgICBiZWhhdmlvciA9ICdhdXRvJztcbiAgfVxuICB2YXIgY2FuU21vb3RoU2Nyb2xsID0gKCdzY3JvbGxCZWhhdmlvcicgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSk7XG4gIGFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBlbCA9IF9yZWYuZWwsXG4gICAgICB0b3AgPSBfcmVmLnRvcCxcbiAgICAgIGxlZnQgPSBfcmVmLmxlZnQ7XG4gICAgaWYgKGVsLnNjcm9sbCAmJiBjYW5TbW9vdGhTY3JvbGwpIHtcbiAgICAgIGVsLnNjcm9sbCh7XG4gICAgICAgIHRvcDogdG9wLFxuICAgICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgICBiZWhhdmlvcjogYmVoYXZpb3JcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zY3JvbGxUb3AgPSB0b3A7XG4gICAgICBlbC5zY3JvbGxMZWZ0ID0gbGVmdDtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gZ2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSBmYWxzZSkge1xuICAgIHJldHVybiB7XG4gICAgICBibG9jazogJ2VuZCcsXG4gICAgICBpbmxpbmU6ICduZWFyZXN0J1xuICAgIH07XG4gIH1cbiAgaWYgKGlzT3B0aW9uc09iamVjdChvcHRpb25zKSkge1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIHJldHVybiB7XG4gICAgYmxvY2s6ICdzdGFydCcsXG4gICAgaW5saW5lOiAnbmVhcmVzdCdcbiAgfTtcbn1cbmZ1bmN0aW9uIHNjcm9sbEludG9WaWV3KHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgaXNUYXJnZXRBdHRhY2hlZCA9IHRhcmdldC5pc0Nvbm5lY3RlZCB8fCB0YXJnZXQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgaWYgKGlzT3B0aW9uc09iamVjdChvcHRpb25zKSAmJiB0eXBlb2Ygb3B0aW9ucy5iZWhhdmlvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRpb25zLmJlaGF2aW9yKGlzVGFyZ2V0QXR0YWNoZWQgPyBjb21wdXRlKHRhcmdldCwgb3B0aW9ucykgOiBbXSk7XG4gIH1cbiAgaWYgKCFpc1RhcmdldEF0dGFjaGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjb21wdXRlT3B0aW9ucyA9IGdldE9wdGlvbnMob3B0aW9ucyk7XG4gIHJldHVybiBkZWZhdWx0QmVoYXZpb3IoY29tcHV0ZSh0YXJnZXQsIGNvbXB1dGVPcHRpb25zKSwgY29tcHV0ZU9wdGlvbnMuYmVoYXZpb3IpO1xufVxuZXhwb3J0IGRlZmF1bHQgc2Nyb2xsSW50b1ZpZXc7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/scroll-into-view-if-needed/es/index.js\n");

/***/ })

};
;