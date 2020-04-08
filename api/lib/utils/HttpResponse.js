"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var HttpResponse = /*#__PURE__*/function () {
  function HttpResponse() {
    (0, _classCallCheck2["default"])(this, HttpResponse);
  }

  (0, _createClass2["default"])(HttpResponse, null, [{
    key: "sendResponse",

    /**
     * @param  {Response} response
     * @param  {object} data
     * @param  {string} success
     * @param  {number} statusCode
     * @param  {string} message
     * @returns {response}
     */
    value: function sendResponse(response, success, statusCode, message, data) {
      var body = {
        data: data,
        message: message,
        success: success
      };

      if (!data) {
        delete body.data;
      }

      if (!message) {
        delete body.message;
      }

      return response.status(statusCode || 200).send(body);
    }
    /**
     * @param {any} response:Response
     * @param {any} success:string
     * @param {any} statusCode:number
     * @param {any} message:string
     * @param {any} error
     * @returns {response}
     */

  }, {
    key: "sendErrorResponse",
    value: function sendErrorResponse(response, statusCode, message, error) {
      return response.status(statusCode || 500).send({
        message: error.message ? error.message : message,
        success: false
      });
    }
  }]);
  return HttpResponse;
}();

exports["default"] = HttpResponse;