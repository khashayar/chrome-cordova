/*!
 * ngCordova
 * v0.0.1
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){
if (!window.cordova) {
    window.cordova = {};
}

if (!window.cordova.plugins) {
    window.cordova.plugins = {};
}

if (!window.plugins) {
    window.plugins = {};
}

/****************************************************************
 * Barcode Scanner
 */

var barcodeScanner = {};

barcodeScanner.scan = function (successCallback, errorCallback) {

    var data = {
        text: '102342340234',
        format: 'QR_CODE',
        cancelled: false
    };

    successCallback(data);
};

cordova.plugins.barcodeScanner = barcodeScanner;


/****************************************************************
 * Camera
 */

var Camera = {
    DestinationType: {
        DATA_URL: 0,      // Return image as base64-encoded string
        FILE_URI: 1,      // Return image file URI
        NATIVE_URI: 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
    },

    PictureSourceType: {
        PHOTOLIBRARY: 0,
        CAMERA: 1,
        SAVEDPHOTOALBUM: 2
    },

    EncodingType: {
        JPEG: 0,               // Return JPEG encoded image
        PNG: 1                 // Return PNG encoded image
    },

    MediaType: {
        PICTURE: 0,    // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
        VIDEO: 1,      // allow selection of video only, WILL ALWAYS RETURN FILE_URI
        ALLMEDIA: 2   // allow selection from all media types
    },

    Direction: {
        BACK: 0,      // Use the back-facing camera
        FRONT: 1      // Use the front-facing camera
    }
};

var camera = {};

camera.getPicture = function (successCallback, errorCallback, options) {

    var quality = options.quality || 50;
    var destinationType = options.destinationType || Camera.DestinationType.FILE_URI;
    var sourceType = options.sourceType || Camera.PictureSourceType.CAMERA;
    var targetWidth = options.targetWidth || -1;
    var targetHeight = options.targetHeight || -1;
    var encodingType = options.encodingType || Camera.EncodingType.JPEG;
    var mediaType = options.mediaType || Camera.MediaType.PICTURE;
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = options.popoverOptions || null;
    var cameraDirection = options.cameraDirection || Camera.Direction.BACK;

    var image = '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';
    successCallback(image);
};


window.navigator.camera = camera;
window.Camera = Camera;

/****************************************************************
 * Device
 */

function Device() {
    this.available = true;
    this.platform = 'iOS';
    this.version = '7.1';
    this.uuid = '599F9C00-92DC-4B5C-9464-7971F01F8370';
    this.cordova = '3.6.0';
    this.model = 'iPhone 5,1';
    this.name = 'iPhone 5,1 - deprecated';
}

window.device = new Device();

/****************************************************************
 * Device Motion
 */

var running = false;
var timers = {};

var accelerometer = {
    getCurrentAcceleration: function (successCallback, errorCallback, options) {

        var data = {
            x: -4.434294622159458,
            y: 19.345115933827113,
            z: -14.282339264520889,
            timestamp: (new Date()).getTime()
        };

        successCallback(data);
    },

    watchAcceleration: function (successCallback, errorCallback, options) {
        var frequency = (options && options.frequency && typeof options.frequency == 'number') ? options.frequency : 10000;

        var id = 12345;
        running = true;

        function getRandomInt(min, max) {
            return Math.random() * (max - min) + min;
        }

        var data = {
            x: getRandomInt(-4, 0),
            y: getRandomInt(10, 20),
            z: getRandomInt(-10, 0),
            timestamp: (new Date()).getTime()
        };

        timers[id] = {
            timer: window.setInterval(function () {
                successCallback(data);
            }, frequency)
        };

        return id;
    },

    clearWatch: function (id) {
        console.log('id: ' + id);
        console.log('timers id: ' + timers[id]);

        if (id && timers[id]) {
            running = false;
            window.clearInterval(timers[id].timer);
            delete timers[id];
        }
    }
};


navigator.accelerometer = accelerometer;

/****************************************************************
 * Device Orientation
 */

var running = false;
var timers = {};


function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

var compass = {};

compass.getCurrentHeading = function (successCallback, errorCallback, options) {

    var data = {
        magneticHeading: getRandomFloat(0, 359.99),
        trueHeading: getRandomFloat(0, 359.99),
        headingAccuracy: 5,
        timestamp: (new Date()).getTime()
    };

    successCallback(data);
};

compass.watchHeading = function (successCallback, errorCallback, options) {
    var frequency = (options && options.frequency && typeof options.frequency == 'number') ? options.frequency : 10000;

    var id = 12345;
    running = true;

    var data = {
        magneticHeading: getRandomFloat(0, 359.99),
        trueHeading: getRandomFloat(0, 359.99),
        headingAccuracy: 5,
        timestamp: (new Date()).getTime()
    };

    timers[id] = {
        timer: window.setInterval(function () {
            successCallback(data);
        }, frequency)
    };

    return id;
};

compass.clearWatch = function (id) {
    console.log('id: ' + id);
    console.log('timers id: ' + timers[id]);

    if (id && timers[id]) {
        running = false;
        window.clearInterval(timers[id].timer);
        delete timers[id];
    }
};


navigator.compass = compass;

/****************************************************************
 * Dialogs
 */

var notification = {};

notification.alert = function (message, callback, title, buttonName) {
    window.alert(message);
    callback();
};


notification.confirm = function (message, callback, title, buttonName) {
    if (window.confirm(message)) {
        callback(1);
    }
    else {
        callback(2);
    }
};

notification.prompt = function (message, callback, title, buttonName, defaultText) {
    var res = window.prompt(message, defaultText);
    if (res != null) {
        callback({input1: res, buttonIndex: 1});
    }
    else {
        callback({input1: res, buttonIndex: 2});
    }
};

notification.beep = function (frequency) {
    frequency = frequency || 3;
    window.alert('Beep x' + frequency);
};

window.navigator.notification = notification;





/****************************************************************
 * Flashlight
 */

function Flashlight() {
    this._isSwitchedOn = false;
}

Flashlight.prototype = {

    available: function (callback) {
        callback(true);
    },

    switchOn: function (successCallback, errorCallback) {
        this._isSwitchedOn = true;
        successCallback(true);
    },

    switchOff: function (successCallback, errorCallback) {
        this._isSwitchedOn = false;
        successCallback(true);
    },

    toggle: function (successCallback, errorCallback) {
        if (this._isSwitchedOn) {
            this.switchOff(successCallback, errorCallback);
        } else {
            this.switchOn(successCallback, errorCallback);
        }
    }
};

window.plugins.flashlight = new Flashlight();



/****************************************************************
 * Globalization
 */

var globalization = {};

globalization.getPreferredLanguage = function (successCallback, errorCallback) {
    successCallback({value: "EN"});
};

globalization.getLocaleName = function (successCallback, errorCallback) {
    successCallback({value: "en-US"});
};

globalization.getFirstDayOfWeek = function (successCallback, errorCallback) {
    successCallback({value: 1});
};

globalization.dateToString = function (date, successCallback, errorCallback) {

};

globalization.getCurrencyPattern = function (currencyCode, successCallback, errorCallback) {

};

window.navigator.globalization = globalization;

var Connection = {
    UNKNOWN: "unknown",
    ETHERNET: "ethernet",
    WIFI: "wifi",
    CELL_2G: "2g",
    CELL_3G: "3g",
    CELL_4G: "4g",
    CELL: "cellular",
    NONE: "none"
};


var connection = {};
connection.type = "Connection.WIFI";


window.navigator.connection = connection;
window.Connection = Connection;

})();