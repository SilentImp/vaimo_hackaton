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
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Transport = __webpack_require__(2);
	
	var _Transport2 = _interopRequireDefault(_Transport);
	
	var _Notifications = __webpack_require__(3);
	
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
	            var event_data = JSON.parse(event.data),
	                event_type = event_data.type;
	            switch (event_type) {
	                case "EVENT":
	                    this.constructor.dispatchEvent(event_data);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTNmMjUzMmM5MDM4YmNiNTkwY2QiLCJ3ZWJwYWNrOi8vLy4vc291cmNlL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zb3VyY2UvanMvVHJhbnNwb3J0LmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9qcy9Ob3RpZmljYXRpb25zLmpzIiwid2VicGFjazovLy8uL3NvdXJjZS9pbmRleC5qYWRlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7Ozs7QUFFQSx5QkFBYywwQkFBZDtBQUNBLCtCOzs7Ozs7QUNKQTs7Ozs7Ozs7OztBQUVBLEtBQU0sWUFBWSxJQUFaO0FBQU47S0FDTSxrQkFBa0IsSUFBbEI7Ozs7Ozs7S0FNQTs7Ozs7OztBQU1GLGNBTkUsU0FNRixDQUFZLEdBQVosRUFBaUI7K0JBTmYsV0FNZTs7QUFDYixhQUFJLE9BQU8sR0FBUCxLQUFlLFdBQWYsRUFBNEIsTUFBTSxJQUFJLEtBQUosQ0FBVSxvRUFBVixDQUFOLENBQWhDO0FBQ0EsY0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZhO0FBR2IsY0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFkLENBSGE7QUFJYixjQUFLLE9BQUwsR0FBZSxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLElBQWxCLENBQWYsQ0FKYTtBQUtiLGNBQUssT0FBTCxHQUFlLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBZixDQUxhO0FBTWIsY0FBSyxTQUFMLEdBQWlCLEtBQUss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QSxRQUFRO0FBQzVCLGlCQUFJLFdBQVcsU0FBWCxFQUFzQixPQUExQjtBQUNBLGlCQUFJLGFBQUosQ0FGNEI7QUFHNUIsb0JBQU0sQ0FBQyxPQUFPLEtBQUssb0JBQUwsQ0FBMEIsR0FBMUIsRUFBUCxDQUFELEtBQTZDLFdBQTdDLEVBQTBEO0FBQzVELHNCQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLElBQWxDLEVBRDREO2NBQWhFOzs7Ozs7Ozs7OzBDQVNxQixNQUFNO0FBQzNCLGlCQUFJLFlBQUosQ0FBaUIsS0FBSyxLQUFMLEVBQVksSUFBN0IsRUFEMkI7Ozs7WUF6RDdCOzs7bUJBZ0VTLGM7Ozs7OztBQ3ZFZix1RCIsImZpbGUiOiJqcy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDkzZjI1MzJjOTAzOGJjYjU5MGNkXG4gKiovIiwiaW1wb3J0IFRyYW5zcG9ydCBmcm9tICcuL1RyYW5zcG9ydC5qcyc7XG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL05vdGlmaWNhdGlvbnMuanMnO1xuXG5uZXcgVHJhbnNwb3J0KCd3czovLzE3OC43OS4xODEuMTU3OjgxODEnKTtcbm5ldyBOb3RpZmljYXRpb25zKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvanMvYXBwLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFJFQ0NPTkVDVCA9IHRydWUgLy8gU2hvdWxkIHdlIHJlY29ubmVjdCBvbiBkaXNjb25uZWN0XG4gICAgLCBSRUNPTk5FQ1RfREVMQVkgPSA1MDAwOyAvLyBXaGF0IGRlbGF5IGJldHdlZW4gcmVjb25uZWN0IGF0dGVtcHQgc2hvdWxkIGJlXG5cbi8qKlxuICogQGNsYXNzIFRyYW5zcG9ydCBjbGFzcywgaXQgc2hvdWxkIGFsbG93IGNvbm5lY3RcbiAqIGJhY2tlbmQgYW5kIGZyb250ZW5kIGFuZCBwYXNzIGRhdGEgYW5kIGNvbW1hbmRzXG4gKi9cbmNsYXNzIFRyYW5zcG9ydCB7XG5cbiAgICAvKipcbiAgICAgKiBAY29uc3RydWN0b3IgYmluZCBjb250ZXh0IGFuZCBjb25uZWN0IHRvIHNvY2tldCBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJpIOKAlCB3czovLyB1cmkgb2Ygc29ja2V0IHNlcnZlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSkge1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJ1bmRlZmllbmRcIikgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgOjo6IFlvdSBzaG91bGQgcGFzcyB3ZWIgc29ja2V0IHNlcnZlciB1cmwgYXMgYSBwYXJhbWV0ZXInKTtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIHRoaXMub25PcGVuID0gdGhpcy5vbk9wZW4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29ubmVjdCA9IHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uTWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbm5lY3QgdG8gc29ja2V0IGFuZCBhZGQgZXZlbnQgaGFuZGxlcnNcbiAgICAgKi9cbiAgICBjb25uZWN0ICgpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCh0aGlzLnVyaSk7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbm9wZW4gPSB0aGlzLm9uT3BlbjtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2U7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIGNsaWVudCBpcyBjb25uZWN0ZWQgd2Ugc2hvdWxkIHN1YnNjcmliZSB0byBicm9hZGNhc3RpbmdcbiAgICAgKi9cbiAgICBvbk9wZW4gKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc2VuZChKU09OLnN0cmluZ2lmeSh7Y29tbWFuZDpcIlNVQlNDUklCRVwifSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IG1lc3NhZ2Ugd2Ugc2hvdWxkIGNoZWNrIGlmIGl0IGNvbnRhaW5zIGFcbiAgICAgKiBjb21tYW5kIGFuZCBleGVjdXRlIGl0XG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICovXG4gICAgb25NZXNzYWdlIChldmVudCkge1xuICAgICAgICBjb25zdCBldmVudF9kYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKVxuICAgICAgICAgICAgICAsIGV2ZW50X3R5cGUgPSBldmVudF9kYXRhLnR5cGU7XG4gICAgICAgIHN3aXRjaCAoZXZlbnRfdHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIkVWRU5UXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5kaXNwYXRjaEV2ZW50KGV2ZW50X2RhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiBjb25uZWN0aW9uIGlzIGNsb3NlZCB3ZSBzaG91bGQgcmVjb25uZWN0XG4gICAgICovXG4gICAgb25DbG9zZSAoKSB7XG4gICAgICAgIGlmIChSRUNDT05FQ1QpIHNldFRpbWVvdXQodGhpcy5jb25uZWN0LCBSRUNPTk5FQ1RfREVMQVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIGV2ZW50IG9uIHRoZSBiYXNpcyBvZiBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1lc3NhZ2Ug4oCUwqBtZXNzYWdlIGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0XG4gICAgICogcGFja2FnZSBuYW1lLCBldmVudCB0eXBlIGFuZCBkYXRhLCBldmVudCB3aWxsIGNhcnJ5XG4gICAgICovXG4gICAgc3RhdGljIGRpc3BhdGNoRXZlbnQgKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3Qge3BhY2thZ2VfbmFtZSwgZXZlbnRfdHlwZSwgZXZlbnRfZGF0YX0gPSBtZXNzYWdlO1xuICAgICAgICBpZiAodHlwZW9mIHBhY2thZ2VfbmFtZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZXZlbnRfdHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgOjo6IFdyb25nIGV2ZW50IGRhdGEgZm9ybWF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZlbnRfbmFtZSA9IHBhY2thZ2VfbmFtZSArIFwiOjo6XCIgKyBldmVudF90eXBlXG4gICAgICAgICAgICAsIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50X25hbWUsIHsnZGV0YWlsJzogZXZlbnRfZGF0YSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnQ7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zb3VyY2UvanMvVHJhbnNwb3J0LmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IE5PVElGSUNBVElPTl9IWVNUT1JZX1NJWkUgPSAzO1xuXG4vKipcbiAqIEBjbGFzcyBUaGlzIGNsYXNzIHNob3cgbm90aWZpY2F0aW9ucyB3aGVuIGNhdGNoIGV2ZW50IG9mIHR5cGUgTk9USUZJQ0FUSU9OUzo6Ok5FV1xuICovXG5jbGFzcyBOb3RpZmljYXRpb25zIHtcblxuICAgIC8qKlxuICAgICAqIEBjb25zdHJ1Y3RvciBjaGVja3MgaWYgbm90aWZpY2F0aW9uIHN1cHBvcnRlZCBhbmQgbm90IGZvcmJpZGRlbixcbiAgICAgKiB0aGVuIGFkZCBldmVudCBsaXN0ZW5lclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgaWYoIXdpbmRvdy5Ob3RpZmljYXRpb24pIHJldHVybjtcbiAgICAgICAgaWYoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZGVuaWVkXCIpIHJldHVybjtcblxuICAgICAgICB0aGlzLnNob3dTYXZlZE5vdGlmaWNhdGlvbnMgPSB0aGlzLnNob3dTYXZlZE5vdGlmaWNhdGlvbnMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGVja1Blcm1pc3Npb24gPSB0aGlzLmNoZWNrUGVybWlzc2lvbi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uX2h5c3RvcnkgPSBbXTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTk9USUZJQ0FUSU9OUzo6Ok5FVycsIHRoaXMuY2hlY2tQZXJtaXNzaW9uKTtcblxuICAgICAgICAvLyBXZSBtYXkgcmVxdWVzdCBwZXJtaXNzaW9uIHJpZ2h0IG9uIGxvYWQsIGJ1dCBpdCdzIG5vdCBuaWNlIHRvIHRoZSB1c2VyXG4gICAgICAgIC8vIE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBlcm1pc3Npb24gdG8gc2hvdyBub3RpZmljYXRpb24gZ3JhbnRlZFxuICAgICAqIGlmIGl0IGlzIOKAlMKgc2hvdyBub3RpZmljYXRpb25cbiAgICAgKiBpZiBpdCdzIG5vdCDigJTCoHNhdmUgbm90aWZpY2F0aW9uIGFuZCByZXF1ZXN0IHBlcm1pc3Npb25cbiAgICAgKiBpZiBub3RpZmljYXRpb24gd2lsbCBiZSBncmFudGVkLCB0aGVuIG5vdGlmaWNhdGlvbiB3aWxsIGJlIHNob3duXG4gICAgICogQHBhcmFtIHtldmVudH0gZXZlbnQg4oCUIGN1c3RvbSBub3RpZmljYXRpb24gZXZlbnQsIGNvbnRhaW5zXG4gICAgICogbm90aWZpY2F0aW9uIG9wdGlvbnMgaW4gdGhlIGRldGFpbCBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGNoZWNrUGVybWlzc2lvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbl9oeXN0b3J5LnB1c2goZXZlbnQuZGV0YWlsKTtcbiAgICAgICAgICAgIGlmKHRoaXMubm90aWZpY2F0aW9uX2h5c3RvcnkubGVuZ3RoID4gTk9USUZJQ0FUSU9OX0hZU1RPUllfU0laRSkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uX2h5c3Rvcnkuc2hpZnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKCkudGhlbih0aGlzLnNob3dTYXZlZE5vdGlmaWNhdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3Iuc2hvd05vdGlmaWNhdGlvbihldmVudC5kZXRhaWwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgc2F2ZWQgbm90aWZpY2F0aW9uIGlmIHBlcm1pc3Npb24gd2FzIGdyYW50ZWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcmVzdWx0IOKAlMKgcmVzdWx0IG9mIHBlcm1pc3Npb24gcmVxdWVzdFxuICAgICAqL1xuICAgIHNob3dTYXZlZE5vdGlmaWNhdGlvbnMgKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBcImdyYW50ZWRcIikgcmV0dXJuO1xuICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgd2hpbGUoKGRhdGEgPSB0aGlzLm5vdGlmaWNhdGlvbl9oeXN0b3J5LnBvcCgpKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5zaG93Tm90aWZpY2F0aW9uKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBub3RpZmljYXRpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZGF0YSDigJTCoG5vdGlmaWNhdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgc3RhdGljIHNob3dOb3RpZmljYXRpb24gKGRhdGEpIHtcbiAgICAgICAgbmV3IE5vdGlmaWNhdGlvbihkYXRhLnRpdGxlLCBkYXRhKTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RpZmljYXRpb25zO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc291cmNlL2pzL05vdGlmaWNhdGlvbnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbmRleC5odG1sXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmlsZS1sb2FkZXI/bmFtZT1pbmRleC5odG1sIS4vfi9qYWRlLWh0bWwtbG9hZGVyIS4vc291cmNlL2luZGV4LmphZGVcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9