"use strict";

const NOTIFICATION_HYSTORY_SIZE = 3;

/**
 * @class This class show notifications when catch event of type NOTIFICATIONS:::NEW
 */
class Notifications {

    /**
     * @constructor checks if notification supported and not forbidden,
     * then add event listener
     */
    constructor () {
        if(!window.Notification) return;
        if(Notification.permission === "denied") return;

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
    checkPermission (event) {
        if(Notification.permission === "default") {
            this.notification_hystory.push(event.detail);
            if(this.notification_hystory.length > NOTIFICATION_HYSTORY_SIZE) {
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
    showSavedNotifications (result) {
        if (result !== "granted") return;
        let data;
        while((data = this.notification_hystory.pop()) !== "undefined") {
            this.constructor.showNotification(data);
        }
    }

    /**
     * Show notification
     * @param {object} data — notification options
     */
    static showNotification (data) {
        new Notification(data.title, data);
    }


}

export default Notifications;