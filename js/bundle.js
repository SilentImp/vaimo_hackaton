/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Transport = __webpack_require__(2);
	
	var _Transport2 = _interopRequireDefault(_Transport);
	
	var _Notifications = __webpack_require__(4);
	
	var _Notifications2 = _interopRequireDefault(_Notifications);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _Transport2.default('ws://178.79.181.157:8181');
	new _Notifications2.default();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RECCONECT = true // Should we reconnect on disconnect
	,
	    RECONNECT_DELAY = 5000; // What delay between reconnect attempt should be
	
	/**
	 * @class Transport class, it should allow connect
	 * backend and frontend and pass data and commands
	 */
	
	var Transport = function () {
	
	    /**
	     * @constructor bind context and connect to socket server
	     * @param {string} uri — ws:// uri of socket server
	     */
	
	    function Transport(uri) {
	        _classCallCheck(this, Transport);
	
	        if (typeof uri === "undefiend") throw new Error('Transport ::: You should pass web socket server url as a parameter');
	        this.uri = uri;
	        this.onOpen = this.onOpen.bind(this);
	        this.onClose = this.onClose.bind(this);
	        this.connect = this.connect.bind(this);
	        this.onMessage = this.onMessage.bind(this);
	        this.connect();
	    }
	
	    /**
	     * Connect to socket and add event handlers
	     */
	
	
	    _createClass(Transport, [{
	        key: "connect",
	        value: function connect() {
	            this.connection = new WebSocket(this.uri);
	            this.connection.onopen = this.onOpen;
	            this.connection.onclose = this.onClose;
	            this.connection.onmessage = this.onMessage;
	        }
	
	        /**
	         * When client is connected we should subscribe to broadcasting
	         */
	
	    }, {
	        key: "onOpen",
	        value: function onOpen() {
	            this.connection.send(JSON.stringify({ command: "SUBSCRIBE" }));
	        }
	
	        /**
	         * When we get message we should check if it contains a
	         * command and execute it
	         * @param event
	         */
	
	    }, {
	        key: "onMessage",
	        value: function onMessage(event) {
	            var data = JSON.parse(event.data);
	            switch (data.type) {
	                case "EVENT":
	                    this.constructor.dispatchEvent(data);
	                    break;
	            }
	        }
	
	        /**
	         * When connection is closed we should reconnect
	         */
	
	    }, {
	        key: "onClose",
	        value: function onClose() {
	            if (RECCONECT) setTimeout(this.connect, RECONNECT_DELAY);
	        }
	
	        /**
	         * Dispatch event on the basis of message
	         * @param {object} message — message contains information about
	         * package name, event type and data, event will carry
	         */
	
	    }], [{
	        key: "dispatchEvent",
	        value: function dispatchEvent(message) {
	            var package_name = message.package_name;
	            var event_type = message.event_type;
	            var event_data = message.event_data;
	
	            if (typeof package_name === "undefined" || typeof event_type === "undefined") {
	                throw new Error('Transport ::: Wrong event data format');
	            }
	            var event_name = package_name + ":::" + event_type,
	                event = new CustomEvent(event_name, { 'detail': event_data });
	            document.dispatchEvent(event);
	        }
	    }]);
	
	    return Transport;
	}();
	
	exports.default = Transport;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NOTIFICATION_HYSTORY_SIZE = 3;
	
	/**
	 * @class This class show notifications when catch event of type NOTIFICATIONS:::NEW
	 */
	
	var Notifications = function () {
	
	    /**
	     * @constructor checks if notification supported and not forbidden,
	     * then add event listener
	     */
	
	    function Notifications() {
	        _classCallCheck(this, Notifications);
	
	        if (!window.Notification) return;
	        if (Notification.permission === "denied") return;
	
	        this.showSavedNotifications = this.showSavedNotifications.bind(this);
	        this.checkPermission = this.checkPermission.bind(this);
	
	        this.notification_hystory = [];
	        document.addEventListener('NOTIFICATIONS:::NEW', this.checkPermission);
	
	        // We may request permission right on load, but it's not nice to the user
	        // Notification.requestPermission();
	    }
	
	    /**
	     * Check if permission to show notification granted
	     * if it is — show notification
	     * if it's not — save notification and request permission
	     * if notification will be granted, then notification will be shown
	     * @param {event} event — custom notification event, contains
	     * notification options in the detail property
	     */
	
	
	    _createClass(Notifications, [{
	        key: "checkPermission",
	        value: function checkPermission(event) {
	            if (Notification.permission === "default") {
	                this.notification_hystory.push(event.detail);
	                if (this.notification_hystory.length > NOTIFICATION_HYSTORY_SIZE) {
	                    this.notification_hystory.shift();
	                }
	
	                Notification.requestPermission().then(this.showSavedNotifications);
	                return;
	            }
	            this.constructor.showNotification(event.detail);
	        }
	
	        /**
	         * Show saved notification if permission was granted
	         * @param {string} result — result of permission request
	         */
	
	    }, {
	        key: "showSavedNotifications",
	        value: function showSavedNotifications(result) {
	            if (result !== "granted") return;
	            var data = void 0;
	            while ((data = this.notification_hystory.pop()) !== "undefined") {
	                this.constructor.showNotification(data);
	            }
	        }
	
	        /**
	         * Show notification
	         * @param {object} data — notification options
	         */
	
	    }], [{
	        key: "showNotification",
	        value: function showNotification(data) {
	            new Notification(data.title, data);
	        }
	    }]);
	
	    return Notifications;
	}();
	
	exports.default = Notifications;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTI1M2UzZmFlZDYwMjllNjdlZjkiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvanMvVHJhbnNwb3J0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9pbmRleC5qYWRlIiwid2VicGFjazovLy8uL3NvdXJjZS9qcy9Ob3RpZmljYXRpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7Ozs7QUFFQSx5QkFBYywwQkFBZDtBQUNBLCtCOzs7Ozs7QUNKQTs7Ozs7Ozs7OztBQUVBLEtBQU0sWUFBWSxJQUFaO0FBQU47S0FDTSxrQkFBa0IsSUFBbEI7Ozs7Ozs7S0FNQTs7Ozs7OztBQU1GLGNBTkUsU0FNRixDQUFZLEdBQVosRUFBaUI7K0JBTmYsV0FNZTs7QUFDYixhQUFJLE9BQU8sR0FBUCxLQUFlLFdBQWYsRUFBNEIsTUFBTSxJQUFJLEtBQUosQ0FBVSxvRUFBVixDQUFOLENBQWhDO0FBQ0EsY0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZhO0FBR2IsY0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFkLENBSGE7QUFJYixjQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWYsQ0FKYTtBQUtiLGNBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZixDQUxhO0FBTWIsY0FBSyxTQUFMLEdBQWlCLEtBQUss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QUFRO0FBQzVCLGlCQUFJLFdBQVcsU0FBWCxFQUFzQixPQUExQjtBQUNBLGlCQUFJLGFBQUosQ0FGNEI7QUFHNUIsb0JBQU0sQ0FBQyxPQUFPLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsRUFBUCxDQUFELEtBQTZDLFdBQTdDLEVBQTBEO0FBQzVELHNCQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLElBQWxDLEVBRDREO2NBQWhFOzs7Ozs7Ozs7OzBDQVNxQixNQUFNO0FBQzNCLGlCQUFJLFlBQUosQ0FBaUIsS0FBSyxLQUFMLEVBQVksSUFBN0IsRUFEMkI7Ozs7WUF6RDdCOzs7bUJBZ0VTLGMiLCJmaWxlIjoianMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1MjUzZTNmYWVkNjAyOWU2N2VmOVxuICoqLyIsImltcG9ydCBUcmFuc3BvcnQgZnJvbSAnLi9UcmFuc3BvcnQuanMnO1xuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi9Ob3RpZmljYXRpb25zLmpzJztcblxubmV3IFRyYW5zcG9ydCgnd3M6Ly8xNzguNzkuMTgxLjE1Nzo4MTgxJyk7XG5uZXcgTm90aWZpY2F0aW9ucygpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2pzL2FwcC5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBSRUNDT05FQ1QgPSB0cnVlIC8vIFNob3VsZCB3ZSByZWNvbm5lY3Qgb24gZGlzY29ubmVjdFxuICAgICwgUkVDT05ORUNUX0RFTEFZID0gNTAwMDsgLy8gV2hhdCBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdCBhdHRlbXB0IHNob3VsZCBiZVxuXG4vKipcbiAqIEBjbGFzcyBUcmFuc3BvcnQgY2xhc3MsIGl0IHNob3VsZCBhbGxvdyBjb25uZWN0XG4gKiBiYWNrZW5kIGFuZCBmcm9udGVuZCBhbmQgcGFzcyBkYXRhIGFuZCBjb21tYW5kc1xuICovXG5jbGFzcyBUcmFuc3BvcnQge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yIGJpbmQgY29udGV4dCBhbmQgY29ubmVjdCB0byBzb2NrZXQgc2VydmVyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVyaSDigJQgd3M6Ly8gdXJpIG9mIHNvY2tldCBzZXJ2ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwidW5kZWZpZW5kXCIpIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IDo6OiBZb3Ugc2hvdWxkIHBhc3Mgd2ViIHNvY2tldCBzZXJ2ZXIgdXJsIGFzIGEgcGFyYW1ldGVyJyk7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICB0aGlzLm9uT3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3QgPSB0aGlzLmNvbm5lY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25uZWN0IHRvIHNvY2tldCBhbmQgYWRkIGV2ZW50IGhhbmRsZXJzXG4gICAgICovXG4gICAgY29ubmVjdCAoKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQodGhpcy51cmkpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25vcGVuID0gdGhpcy5vbk9wZW47XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbmNsb3NlID0gdGhpcy5vbkNsb3NlO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24ub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBjbGllbnQgaXMgY29ubmVjdGVkIHdlIHNob3VsZCBzdWJzY3JpYmUgdG8gYnJvYWRjYXN0aW5nXG4gICAgICovXG4gICAgb25PcGVuICgpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQ6XCJTVUJTQ1JJQkVcIn0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBtZXNzYWdlIHdlIHNob3VsZCBjaGVjayBpZiBpdCBjb250YWlucyBhXG4gICAgICogY29tbWFuZCBhbmQgZXhlY3V0ZSBpdFxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIG9uTWVzc2FnZSAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiRVZFTlRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmRpc3BhdGNoRXZlbnQoZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNvbm5lY3Rpb24gaXMgY2xvc2VkIHdlIHNob3VsZCByZWNvbm5lY3RcbiAgICAgKi9cbiAgICBvbkNsb3NlICgpIHtcbiAgICAgICAgaWYgKFJFQ0NPTkVDVCkgc2V0VGltZW91dCh0aGlzLmNvbm5lY3QsIFJFQ09OTkVDVF9ERUxBWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggZXZlbnQgb24gdGhlIGJhc2lzIG9mIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWVzc2FnZSDigJTCoG1lc3NhZ2UgY29udGFpbnMgaW5mb3JtYXRpb24gYWJvdXRcbiAgICAgKiBwYWNrYWdlIG5hbWUsIGV2ZW50IHR5cGUgYW5kIGRhdGEsIGV2ZW50IHdpbGwgY2FycnlcbiAgICAgKi9cbiAgICBzdGF0aWMgZGlzcGF0Y2hFdmVudCAobWVzc2FnZSkge1xuICAgICAgICBjb25zdCB7cGFja2FnZV9uYW1lLCBldmVudF90eXBlLCBldmVudF9kYXRhfSA9IG1lc3NhZ2U7XG4gICAgICAgIGlmICh0eXBlb2YgcGFja2FnZV9uYW1lID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBldmVudF90eXBlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCA6OjogV3JvbmcgZXZlbnQgZGF0YSBmb3JtYXQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudF9uYW1lID0gcGFja2FnZV9uYW1lICsgXCI6OjpcIiArIGV2ZW50X3R5cGVcbiAgICAgICAgICAgICwgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnRfbmFtZSwgeydkZXRhaWwnOiBldmVudF9kYXRhIH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYW5zcG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NvdXJjZS9qcy9UcmFuc3BvcnQuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmlsZS1sb2FkZXI/bmFtZT1pbmRleC5odG1sIS4vfi9qYWRlLWh0bWwtbG9hZGVyIS4vc291cmNlL2luZGV4LmphZGVcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgTk9USUZJQ0FUSU9OX0hZU1RPUllfU0laRSA9IDM7XG5cbi8qKlxuICogQGNsYXNzIFRoaXMgY2xhc3Mgc2hvdyBub3RpZmljYXRpb25zIHdoZW4gY2F0Y2ggZXZlbnQgb2YgdHlwZSBOT1RJRklDQVRJT05TOjo6TkVXXG4gKi9cbmNsYXNzIE5vdGlmaWNhdGlvbnMge1xuXG4gICAgLyoqXG4gICAgICogQGNvbnN0cnVjdG9yIGNoZWNrcyBpZiBub3RpZmljYXRpb24gc3VwcG9ydGVkIGFuZCBub3QgZm9yYmlkZGVuLFxuICAgICAqIHRoZW4gYWRkIGV2ZW50IGxpc3RlbmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBpZighd2luZG93Lk5vdGlmaWNhdGlvbikgcmV0dXJuO1xuICAgICAgICBpZihOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJkZW5pZWRcIikgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc2hvd1NhdmVkTm90aWZpY2F0aW9ucyA9IHRoaXMuc2hvd1NhdmVkTm90aWZpY2F0aW9ucy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoZWNrUGVybWlzc2lvbiA9IHRoaXMuY2hlY2tQZXJtaXNzaW9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25faHlzdG9yeSA9IFtdO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdOT1RJRklDQVRJT05TOjo6TkVXJywgdGhpcy5jaGVja1Blcm1pc3Npb24pO1xuXG4gICAgICAgIC8vIFdlIG1heSByZXF1ZXN0IHBlcm1pc3Npb24gcmlnaHQgb24gbG9hZCwgYnV0IGl0J3Mgbm90IG5pY2UgdG8gdGhlIHVzZXJcbiAgICAgICAgLy8gTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcGVybWlzc2lvbiB0byBzaG93IG5vdGlmaWNhdGlvbiBncmFudGVkXG4gICAgICogaWYgaXQgaXMg4oCUwqBzaG93IG5vdGlmaWNhdGlvblxuICAgICAqIGlmIGl0J3Mgbm90IOKAlMKgc2F2ZSBub3RpZmljYXRpb24gYW5kIHJlcXVlc3QgcGVybWlzc2lvblxuICAgICAqIGlmIG5vdGlmaWNhdGlvbiB3aWxsIGJlIGdyYW50ZWQsIHRoZW4gbm90aWZpY2F0aW9uIHdpbGwgYmUgc2hvd25cbiAgICAgKiBAcGFyYW0ge2V2ZW50fSBldmVudCDigJQgY3VzdG9tIG5vdGlmaWNhdGlvbiBldmVudCwgY29udGFpbnNcbiAgICAgKiBub3RpZmljYXRpb24gb3B0aW9ucyBpbiB0aGUgZGV0YWlsIHByb3BlcnR5XG4gICAgICovXG4gICAgY2hlY2tQZXJtaXNzaW9uIChldmVudCkge1xuICAgICAgICBpZihOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uX2h5c3RvcnkucHVzaChldmVudC5kZXRhaWwpO1xuICAgICAgICAgICAgaWYodGhpcy5ub3RpZmljYXRpb25faHlzdG9yeS5sZW5ndGggPiBOT1RJRklDQVRJT05fSFlTVE9SWV9TSVpFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25faHlzdG9yeS5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oKS50aGVuKHRoaXMuc2hvd1NhdmVkTm90aWZpY2F0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5zaG93Tm90aWZpY2F0aW9uKGV2ZW50LmRldGFpbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzYXZlZCBub3RpZmljYXRpb24gaWYgcGVybWlzc2lvbiB3YXMgZ3JhbnRlZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXN1bHQg4oCUwqByZXN1bHQgb2YgcGVybWlzc2lvbiByZXF1ZXN0XG4gICAgICovXG4gICAgc2hvd1NhdmVkTm90aWZpY2F0aW9ucyAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IFwiZ3JhbnRlZFwiKSByZXR1cm47XG4gICAgICAgIGxldCBkYXRhO1xuICAgICAgICB3aGlsZSgoZGF0YSA9IHRoaXMubm90aWZpY2F0aW9uX2h5c3RvcnkucG9wKCkpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLnNob3dOb3RpZmljYXRpb24oZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IG5vdGlmaWNhdGlvblxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIOKAlMKgbm90aWZpY2F0aW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2hvd05vdGlmaWNhdGlvbiAoZGF0YSkge1xuICAgICAgICBuZXcgTm90aWZpY2F0aW9uKGRhdGEudGl0bGUsIGRhdGEpO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbnM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvanMvTm90aWZpY2F0aW9ucy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=