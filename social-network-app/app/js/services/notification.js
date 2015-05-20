"use strict";

app.factory('notification', ['userData', 'notyModule', function (userData, notyModule) {

    function showSuccessfulLogin(username) {

        var notificationType = "success";
        var message = "User: " + username + ", login successfully!";
        createNotification(notificationType, message);
    };

    function showSuccessfulRegister(username) {

        var notificationType = "success";
        var message = "User: " + username + ", register successfully!";
        createNotification(notificationType, message);
    };

    function createNotification(notificationType, message) {

        var notification = noty({
            layout: 'top',
            type: notificationType,
            text: message,
            timeout: 3000
        });

        return notification;
    };
    
    return {
        showSuccessfulLogin: showSuccessfulLogin,
        showSuccessfulRegister: showSuccessfulRegister
    };
}]);