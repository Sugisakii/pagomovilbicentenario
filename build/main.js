webpackJsonp([0],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return P2PServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_catch__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components







var P2PServiceProvider = /** @class */ (function () {
    function P2PServiceProvider(http, alertCtrl, loadingCtrl, app) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        // Ambiente de Produccion
        this.baseUrl = "https://pagop2p.bicentenariobu.com.ve/WebApiP2PPro";
        // Ambiente de Calidad
        // public baseUrl = "http://10.112.2.65/WebApiP2PApk";
        // Ambiente de Desarrollo
        // public baseUrl = "http://10.112.2.203/WebApiP2PApk";
        // Ambiente de Desarrollo
        // public baseUrl = "http://10.112.23.8/WebApiP2PApk";
        // Version de la Aplicacion
        this.appVersion = "1.3.5";
        this.seed = "!*8ZHMp$jdW6b&hA!k*?94&T+Vnf2d*4g+4y$5CA_xhR6=RugXQ-+Lg2%$c$p$-GDb2d2TqneAvGZw&znV2r9Lx588KarqeFZMB?!MVKV6nNAJr2TE4^6TEhYAN^mc_B";
        this.onViewMsgPresent = false;
        this.SESSION_EXPIRED = "995";
        this.timeout = 35000;
        this.accountInfo = {
            balance: "0,00",
            dailyLimit: "0,00",
            monthLimit: "0,00"
        };
    }
    P2PServiceProvider.prototype.displayMessage = function (titulo, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: titulo,
            subTitle: message,
            buttons: ['OK']
        });
        this.onViewMsgPresent = true;
        alert.onDidDismiss(function () { _this.onViewMsgPresent = false; });
        alert.present();
    };
    P2PServiceProvider.prototype.showPasswordHelp = function (forbiddenWords) {
        var helpMessage = "<p>Debe contener: <ul> <li>Mínimo 8 caracteres y máximo 16 caracteres</li>" +
            "<li>Al menos una letra mayúscula y una minúscula</li>" +
            "<li>Al menos un número</li>" +
            "<li>Al menos un caracter especial</li></ul></p>" +
            "<p>No debe contener: <ul><li>3 caracteres iguales consecutivos</li>" +
            "<li>Su nombre de usuario</li>" +
            "<li>Su Documento de Identificación</li>" +
            "<li>Sus nombres o apellidos</li>" +
            "<li>Espacios en blanco</li>" +
            "<li>Alguna de las siguientes palabras:<ul>";
        for (var i = 0; i < forbiddenWords.length; i++) {
            helpMessage += "<li>" + forbiddenWords[i].palabra + "</li>";
        }
        helpMessage += "</ul></li></ul></p>";
        var alert = this.alertCtrl.create({
            title: "Ayuda",
            message: helpMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    P2PServiceProvider.prototype.validatePassword = function (userName, name, userDoc, forbiddenWords, validRegex, password) {
        if (password.toLowerCase().indexOf(userName.toLowerCase()) >= 0) {
            return false;
        }
        if (password.indexOf(userDoc.substring(1)) >= 0) {
            return false;
        }
        var nameStr = name.replace(',', '').split(' ');
        for (var i = 0; i < nameStr.length; i++) {
            if (password.toLowerCase().indexOf(nameStr[i].toLowerCase()) >= 0) {
                return false;
            }
        }
        for (var i = 0; i < forbiddenWords.length; i++) {
            if (password.toLowerCase().indexOf(forbiddenWords[i].palabra.toLowerCase()) >= 0) {
                return false;
            }
        }
        var regexp = new RegExp(validRegex);
        return regexp.test(password);
    };
    P2PServiceProvider.prototype.showAffiliationFieldsHelp = function (forbiddenWords, withSpaces) {
        var helpMessage = "<p>Debe contener: <ul> <li>Mínimo 4 caracteres y máximo 16 caracteres</li></ul></p>" +
            "<p>No debe contener: <ul><li>Caracteres especiales</li>" +
            "<li>Su Documento de Identificación</li>" +
            "<li>Sus nombres o apellidos</li>";
        if (withSpaces)
            helpMessage += "<li>Espacios en blanco</li>";
        helpMessage += "<li>Alguna de las siguientes palabras:<ul>";
        for (var i = 0; i < forbiddenWords.length; i++) {
            helpMessage += "<li>" + forbiddenWords[i].palabra + "</li>";
        }
        helpMessage += "</ul></li></ul></p>";
        var alert = this.alertCtrl.create({
            title: "Ayuda",
            message: helpMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    P2PServiceProvider.prototype.showAffiliationUsernameHelp = function (forbiddenWords, withSpaces) {
        var helpMessage = "<p>Debe contener: <ul> <li>Mínimo 4 caracteres y máximo 16 caracteres</li></ul></p>" +
            "<p>No debe contener: <ul><li>Caracteres especiales</li>" +
            "<li>Su Documento de Identificación</li>";
        if (withSpaces)
            helpMessage += "<li>Espacios en blanco</li>";
        helpMessage += "<li>Alguna de las siguientes palabras:<ul>";
        for (var i = 0; i < forbiddenWords.length; i++) {
            helpMessage += "<li>" + forbiddenWords[i].palabra + "</li>";
        }
        helpMessage += "</ul></li></ul></p>";
        var alert = this.alertCtrl.create({
            title: "Ayuda",
            message: helpMessage,
            buttons: ['OK']
        });
        alert.present();
    };
    P2PServiceProvider.prototype.validateAffiliationFields = function (name, userDoc, forbiddenWords, fieldValue) {
        if (fieldValue.indexOf(userDoc.substring(1)) >= 0) {
            return false;
        }
        var nameStr = name.replace(',', '').split(' ');
        for (var i = 0; i < nameStr.length; i++) {
            if (fieldValue.toLowerCase().indexOf(nameStr[i].toLowerCase()) >= 0) {
                return false;
            }
        }
        for (var i = 0; i < forbiddenWords.length; i++) {
            if (fieldValue.toLowerCase().indexOf(forbiddenWords[i].palabra.toLowerCase()) >= 0) {
                return false;
            }
        }
        return true;
    };
    P2PServiceProvider.prototype.validateAffiliationUsername = function (userDoc, forbiddenWords, fieldValue) {
        if (fieldValue.indexOf(userDoc.substring(1)) >= 0) {
            return false;
        }
        for (var i = 0; i < forbiddenWords.length; i++) {
            if (fieldValue.toLowerCase().indexOf(forbiddenWords[i].palabra.toLowerCase()) >= 0) {
                return false;
            }
        }
        return true;
    };
    P2PServiceProvider.prototype.tokenRequest = function (user, password) {
        var _this = this;
        this.user = user;
        this.password = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](password).toString();
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */];
        myHeaders.set('Accept', 'application/json; charset=utf-8');
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            var body = 'grant_type=password&username=' + user + '&password=' + _this.password;
            _this.http.post(_this.baseUrl + '/Token', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.data = data;
                _this.token = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                else {
                    try {
                        _this.displayMessage("Error", JSON.parse(errorResponse._body).Message);
                    }
                    catch (e) {
                        _this.displayMessage("Error", "Ha ocurrido un error, intente nuevamente");
                    }
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.loginRequest = function (loginObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var body = loginObject;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/Loginmovil', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                console.log(data);
                _this.loginData = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.logoutRequest = function () {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Account/Logout', null, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.paymentsRequest = function (paymentsObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var body = paymentsObject;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Movimientos/ListasMovEmiRec', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.sentPayments = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.paymentP2PRequest = function (p2pObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        p2pObject.firma = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](this.seed + p2pObject.username + p2pObject.codinstreceptor
            + p2pObject.tlfdestino + p2pObject.identificacion + p2pObject.monto).toString().toUpperCase();
        var body = p2pObject;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Finance/Pagop2p', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.p2pData = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.changePasswordRequest = function (changePasswordObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var body = changePasswordObject;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Account/ChangePassword', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.changePasswordData = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.questionRequest = function (questionObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            var body = questionObject;
            _this.http.post(_this.baseUrl + '/api/Afiliacion/BuscarDesafio', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.questionRequestData = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.resetPasswordRequest = function (resetObject) {
        var _this = this;
        this.data = null;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            var body = resetObject;
            _this.http.post(_this.baseUrl + '/api/Account/ResetPassword', body, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                _this.resetRequestData = data;
                _this.data = data;
                resolve(_this.data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.getAffiliationDocTypes = function () {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */];
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.baseUrl + '/api/Afiliacion/TiposAfiliados', opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.getClientPhones = function (id, idType) {
        var _this = this;
        var clientInfo = { "Tipo": idType, "Cedula": id.toString().trim() };
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/BuscarTelefonos', clientInfo, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.getAffiliationCode = function (clientIdType, clientID, phone) {
        var _this = this;
        var securityFirm = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](this.seed + '' + clientIdType + clientID + phone).toString().toUpperCase();
        var clientInfo = { "Tipo": clientIdType, "Cedula": clientID, "Telefono": phone, "Firma": securityFirm };
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/GenerarToken', clientInfo, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.validAffiliationCode = function (clientInfo, validCode) {
        var _this = this;
        var securityFirm = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](this.seed + '' + clientInfo.docType + clientInfo.docNumber
            + clientInfo.accountLast + validCode.toUpperCase()).toString().toUpperCase();
        var requestData = {
            "Tipo": clientInfo.docType, "Cedula": clientInfo.docNumber,
            "Cuenta": clientInfo.accountLast, "Otp": validCode.toUpperCase(), "Firma": securityFirm
        };
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/ValidarToken', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.sendUserAffiliation = function (affiliationData) {
        var _this = this;
        var affiliationKey = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](affiliationData.psw).toString();
        var securityKey = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](affiliationData.securityKey).toString();
        var securityAnswer = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](affiliationData.questionAns).toString();
        var securityFirm = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](this.seed + affiliationData.userName + affiliationData.userName + affiliationKey + '04' +
            affiliationData.docType + affiliationData.docNumber + affiliationData.userType + affiliationData.name +
            affiliationData.id + affiliationData.email + affiliationData.account + affiliationData.phone + securityKey +
            affiliationData.questionSec + securityAnswer + '0' + affiliationData.validationKey).toString().toUpperCase();
        var requestData = {
            "ususesion": affiliationData.userName, "canal": "04", "fechahora_disp": new Date(),
            "id_cliente": affiliationData.id, "clase_persona": affiliationData.userType,
            "tipo": affiliationData.docType, "cedula": affiliationData.docNumber, "nombre": affiliationData.name,
            "nro_cuenta": affiliationData.account, "email": affiliationData.email, "abonado": affiliationData.phone,
            "username": affiliationData.userName, "password": affiliationKey, "token": securityKey, "Firma": securityFirm,
            "pregunta_desafio": affiliationData.questionSec, "respuesta_desafio": securityAnswer, "tipo_limites": "0",
            "min_trn_sms": "0", "max_trn_sms": "0", "min_trn_app": "0", "max_trn_app": "0", "lim_diario_sms": "0",
            "lim_diario_app": "0", "lim_mensual_sms": "0", "lim_mensual_app": "0", "otp": affiliationData.validationKey
        };
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Account/Register', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.searchFrecuentList = function () {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = { "canal": "04", "username": this.user };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/PagosFrecuentes/BuscarFrecuentes', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.modifyFrecuentList = function (info, isDelete) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8',
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = {
            "canal": "04", "username": this.user, "tipo": info.tipo, "cedula": info.cedula,
            "nombre": info.nombre, "telefono": info.telefono, "banco": info.banco
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/PagosFrecuentes/' + (isDelete ? 'EliminarFrecuentes' : 'IncluirFrecuentes'), requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.companyBalanceRequest = function () {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = { username: this.user, canal: '04' };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/P2C/ListasMovRecTot', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.companyTranBalanceRequest = function (fromDate, toDate, reference) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = {
            username: this.user,
            modo: (fromDate != null && toDate != null) ? 1 : 0,
            horamindesde: fromDate,
            horaminhasta: toDate,
            ultimo: reference == null ? 0 : reference,
            canal: '04'
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/P2C/ListasMovRecDet', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.companyPhoneBalanceRequest = function (phone, reference) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Authorization': "Bearer " + this.token.access_token
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = {
            username: this.user,
            modo: 2,
            telefono: phone,
            ultimo: reference == null ? 0 : reference,
            canal: '04'
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/P2C/ListasMovRecTlf', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.userSecurityChangeRequest = function (username) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        var requestData = {
            usuario: username,
            canal: '04'
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/GenerarOTP', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.userSecurityChangeQA = function (username, userQuestion, userAnswer, secureCode) {
        var _this = this;
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
            'Accept': 'application/json; charset=utf-8'
        });
        var opt = {
            headers: myHeaders
        };
        var secureFirm = __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](this.seed + username.trim() + userQuestion.trim()
            + __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](userAnswer.trim()).toString().toUpperCase()
            + '04' + secureCode.trim()).toString().toUpperCase();
        var requestData = {
            username: username.trim(),
            pregunta_desafio: userQuestion.trim(),
            respuesta_desafio: __WEBPACK_IMPORTED_MODULE_5_crypto_js__["SHA512"](userAnswer.trim()).toString().toUpperCase(),
            otp: secureCode.trim(),
            firma: secureFirm,
            canal: '04'
        };
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.baseUrl + '/api/Afiliacion/modificarDesafio', requestData, opt)
                .timeout(_this.timeout)
                .subscribe(function (data) {
                resolve(data);
            }, function (errorResponse) {
                if (errorResponse.status == 0) {
                    _this.displayMessage("Error", "Fallo en la conexión");
                }
                else if (errorResponse.name && (errorResponse.name == "TimeoutError")) {
                    _this.displayMessage("Error", "Fallo en la conexión, tiempo límite excedido.");
                }
                resolve(errorResponse);
            });
        });
    };
    P2PServiceProvider.prototype.logout = function () {
        this.displayMessage("Aviso", "La sesión ha caducado, por favor ingrese nuevamente");
        this.app.getActiveNav().popToRoot();
    };
    P2PServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* App */]])
    ], P2PServiceProvider);
    return P2PServiceProvider;
}());

//# sourceMappingURL=p2p-service.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AffiliationTermsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AffiliationTermsPage = /** @class */ (function () {
    function AffiliationTermsPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    AffiliationTermsPage.prototype.takeTermsAction = function (action) {
        var resp = { id: action };
        this.viewCtrl.dismiss(resp);
    };
    AffiliationTermsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-affiliation-terms',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\affiliation-terms\affiliation-terms.html"*/'<ion-header>\n\n  <ion-navbar color="primary" hideBackButton="true">\n\n    <ion-title>\n\n      Términos de Afiliación\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <p text-center style="font-weight:bold">TÉRMINOS Y CONDICIONES DEL SERVICIO TU PAGO MÓVIL</p>\n\n  <p>\n\n      Los términos y condiciones que se detallan a continuación, expresan de forma directa las condiciones de uso del servicio TU PAGO MÓVIL, por lo cual es necesario que antes de continuar con el proceso de instalación de la aplicación, lo lea con detenimiento para conocer los derechos y obligaciones que posee.\n\n      <br/>\n\n      <b>1)	DEFINICIONES:</b> A los efectos de interpretar el presente contrato se ha establecido las siguientes definiciones, las cuales tendrán el significado que se indica en la presente cláusula, pudiendo ser utilizados tanto en plural como en singular, masculino, femenino o cualquier forma verbal según el contexto en que se presente:  A) EL BANCO: Es BANCO BICENTENARIO DEL PUEBLO, DE LA CLASE OBRERA, MUJER Y COMUNAS, BANCO UNIVERSAL, C.A., sociedad mercantil adscrita al MINISTERIO DEL PODER POPULAR DE ECONOMÍA Y FINANZAS conforme al Decreto N° 2.651 de fecha 4 de enero de 2017, publicado en la Gaceta Oficial de la República Bolivariana de Venezuela N° 41.067 de esa misma fecha, domiciliada en Caracas; B) EL CLIENTE: Es toda persona natural o firma personal titular de cuenta(s) colocación(es) crédito(s) línea(s) de crédito, así como de cualquier otro producto financiero que EL BANCO ofrezca actualmente o en el futuro. Este término, comprende a los cuentahabientes, prestatarios, usuarios, personas autorizadas de conformidad con lo dispuesto en la oferta pública de servicios bancarios; AFILIACIÓN: Incorporación de productos y servicios a la Banca TU PAGO MÓVIL BICENTENARIO, por parte de LOS CLIENTES, para efecto de realizar operaciones o transacciones. C) DESAFILIACIÓN: Proceso mediante el cual  EL CLIENTE solicita a  EL BANCO sea desincorporado del servicio ofrecido a través de Banca TU PAGO MÓVIL BICENTENARIO;  D) AUTENTICACIÓN: Conjunto de técnicas y procedimientos tecnológicos utilizados para verificar la identidad de EL CLIENTE; E) BANCA MÓVIL: Canal electrónico ofrecido por EL BANCO a LOS CLIENTES para facilitar el acceso a través de mensajes de texto basados para las transferencias interbancarias; F) AFILIACIÓN AL SERVICIO BANCA TU PAGO MÓVIL BICENTENARIO: Formulario impreso o suministrado a través de la Banca en línea creado por EL BANCO, a través del cual EL CLIENTE suministra los datos e información requeridos, para poder obtener y hacer uso de los servicios ofrecidos por EL BANCO, a través de la Banca TU PAGO MÓVIL BICENTENARIO; G) TU PAGO MÓVIL BICENTENARIO: Servicios ofrecidos por EL BANCO, el cual provee a personas naturales y/o firmas personas, a través de una red de servicio interbancarios con la funcionalidad de realizar pagos rápidos y en líneas, de montos con límites establecidos. Igualmente EL CLIENTE deberá contar con un equipo móvil el cual tenga capacidad para procesar Mensajería de Texto (SMS) a los fines de tramitar transacciones y notificaciones vía SMS, según las especificaciones emitidas por la Asociación Bancaria de Venezuela y de acuerdo a la normativa emitida por la Superintendencia de las Instituciones del Sector Bancario (SUDEBAN); H) PAGO MÓVIL P2P: Es el servicio ofrecido por EL BANCO con la finalidad que LOS CLIENTES realicen pagos a través de una red de servicio interbancario, utilizando únicamente el número móvil asociado al cliente como medio autorizado para movilizar los fondos; I) SMS: Es el servicio de notificación de operaciones vía mensajes de texto que EL BANCO pone a disposición de sus CLIENTES; J) OPERADORES DE TELEFONÍA MÓVIL: Empresas de Telefonía Móvil Celular Operativas en Venezuela, entre las cuales se encuentra Digitel, Movistar, Movilnet; K) CONTENIDO DEL MENSAJE DE TEXTO: Es la información contentiva del mensaje de texto, la cual será suministrada por EL BANCO a EL CLIENTE.; M) APLICACIONES MÓVILES: Es una aplicación informática diseñada para ser ejecutada en teléfonos inteligentes, tabletas y otros dispositivos móviles y que permite al usuario efectuar una operaciones bancarias,  facilitando las gestiones  o actividades de  pagos interbancarios el cual se descargara a través de Play Store para teléfonos de sistema Android y Apple store para los teléfonos de sistema Apple o cualquier otro sistema operativo en el cual la entidad financiera adapta la aplicación del servicio TU PAGO MÓVIL BICENTENARIO . \n\n      <br/>\n\n      <b>2)	OBJETO:</b> El Servicio TU PAGO MÓVIL BICENTENARIO, tiene como finalidad enviar y/o recibir pagos móviles interbancarios de persona a persona pudiendo esta persona estar representada en una firma personal (dinero electrónico) a través de una aplicación móvil o mensajería de texto, en el cual los CLIENTES deberán previamente afiliarse al servicio, mediante los canales que disponga el banco para dicha afiliación. El proceso de afiliación debe garantizar el cumplimiento de la regulación actual de Banca Electrónica. De esta manera, la relación entre EL BANCO y EL CLIENTE empezara a regir y, por ende, se entenderán aceptadas por EL CLIENTE, al suscribir el presente contrato de los servicios de TU PAGO MÓVIL BICENTENARIO, autorizara automáticamente el uso de la cuenta seleccionada por EL CLIENTE para respaldar las operaciones de Banca TU PAGO MÓVIL BICENTENARIO. \n\n      <br/>\n\n      <b>3)	USO DEL SERVICIO TU PAGO MOVIL:</b> El producto está orientado a pagos interbancarios rápidos y en líneas con un límite de monto previamente establecido. De igual manera, los emisores y beneficiarios del Servicio de Pago Móvil P2P, serán notificados de la transacción por sus respectivos bancos de acuerdo a la normativa vigente. La utilización del servicios de TU PAGO MÓVIL BICENTENARIO, se considerará efectuado exclusivamente por EL CLIENTE, en consecuencia EL CLIENTE, autoriza expresa e irrevocablemente a EL BANCO a proporcionar los servicios requeridos, en el entendido que en todo caso se presumirá que el servicio ha sido solicitado por este último, sin que en tal sentido nada pueda reclamar a EL BANCO, de esta forma, EL CLIENTE es responsable por la guarda y custodia de su línea telefónica la cual está afiliada al servicio de TU PAGO MÓVIL BICENTENARIO, por lo que en caso de robo, hurto, pérdida del mismo EL BANCO queda exento de responsabilidad sobre las operaciones que se efectúen desde el mismo. De igual forma EL CLIENTE deberá notificar a EL BANCO, a la mayor brevedad posible la perdida de la guarda y custodia de su línea telefónica. EL CLIENTE haciendo uso del servicio de TU PAGO MÓVIL BICENTENARIO, podrá procesar pagos a terceras personas con su saldo disponible de su cuenta, a través del teléfono móvil afiliado y conforme a lo previsto en esta oferta, siempre y cuando EL CLIENTE suministre correctamente el número de móvil, dos últimos dígitos de la cédula de identidad del Beneficiario, banco beneficiario,  monto del pago, concepto del pago, así como cualquier otra información adicional requerida por EL BANCO para cada operación. \n\n      <br/>\n\n      <b>4)	FORMA DE AFILIACIÓN DEL SERVICIO TU PAGO MOVIL:</b> La Afiliación del servicio Pago Móvil P2P, se realizara a través de un número móvil con su número de identificación (cédula de identidad, pasaporte, RIF), con datos necesarios para enviar y/o recibir pagos móviles persona a persona. El cliente del banco emisor, dispondrá de un medio de pago (cuenta de depósito, billetera electrónica, u otro), el cual estará asociado a su número móvil como identificador en el sistema del servicio TU PAGO MÓVIL BICENTENARIO, de esta manera, únicamente se utilizara el número del móvil para el envío de los pagos. De las operaciones realizadas por EL CLIENTE, EL BANCO llevará un registro computarizado en el cual se expresará el número de la cuenta involucrada en ella, el día, la hora, el tipo de operación, su monto y cualquier otra información adicional que sea procedente. \n\n      <br/>\n\n      <b>5)	OBLIGACIONES DEL CLIENTE:</b> 1.- Los fondos para procesar las transacciones deberá ser provistos por EL CLIENTE y estar disponibles en la cuenta afiliada al servicio para el momento en que este realice el respectivo débito. EL BANCO no estará obligado a cumplir con las instrucciones impartidas y a realizar las operaciones financieras transmitidas por medio de mensajes de datos, si  EL CLIENTE no cuenta con la provisión de fondos suficientes para realizarlas; 2.- Mantener el móvil y clave en la mejor Custodia y Secreto posible, utilizándola adecuadamente y con la mayor prudencia igualmente posible; y 3.- EL CLIENTE asume toda la responsabilidad que acarrea el uso de este servicio y libera a EL BANCO de toda responsabilidad por errores en el monto de abonos o cargos a su cuenta o a las cuentas de destino, por cuanto toda la información es ingresada y remitida por EL CLIENTE, sin participación de EL BANCO; 4.- Si  EL CLIENTE posee dos o más cuentas bancarias en nuestra entidad financiera deberá elegir solo una cuenta para el goce del servicio Banca TU PAGO MÓVIL BICENTENARIO; 5.- En caso de robo o extravió de la línea telefónica afiliada al servicio TU PAGO MÓVIL BICENTENARIO  EL CLIENTE deberá  notificar al banco a través de Call Center o la red de agencias los medios que determine EL BANCO para su suspensión del servicio del  cual está afiliado. \n\n      <br/>\n\n      <b>6)	DERECHOS DEL CLIENTE:</b> La relación contractual originada de este contrato quedará sin ningún efecto cuando EL CLIENTE decida cerrar la cuenta o el instrumento que tenga afiliado al servicio TU PAGO MÓVIL BICENTENARIO. \n\n      <br/>\n\n      <b>7)	DERECHOS DEL BANCO:</b> EL BANCO podrá suspender o revocar, en cualquier momento, la concesión de uso de TU PAGO MÓVIL BICENTENARIO, ofrecido por EL BANCO, notificando previamente a EL CLIENTE de dicha suspensión o revocación, por cualquier medio de notificación permitidos por la Ley. EL BANCO no será responsable ante EL CLIENTE si por alguna causa extraña no imputable a él o por algún hecho fortuito o de fuerza mayor, se viese en la necesidad de suspender temporal o definitivamente el servicio de Banca TU PAGO MÓVIL BICENTENARIO, ofrecidos por EL BANCO. \n\n      <br/>\n\n      <b>8)	OBLIGACIONES DEL BANCO:</b> 1.- Comprometerse a procesar e instrumentar las transacciones financieras ordenadas por EL CLIENTE por medio de mensajes de datos. Los pagos a cuentas de EL BANCO se harán efectivos en la fecha valor que indique el archivo  de pago; 2.- EL BANCO cargará automáticamente en la cuenta de EL CLIENTE, el monto que corresponda por concepto de impuestos o contribuciones de obligatoria retención, derivados de las operaciones realizadas a través del uso de Banca TU PAGO MÓVIL BICENTENARIO; y 3.- EL BANCO rechazará cualquier transacción que no cumpla con lo establecido en las características del producto. En estos casos EL BANCO le notificará a  EL CLIENTE de inmediato, a través del sistema TU PAGO MÓVIL BICENTENARIO. EL CLIENTE deberá corregir el error presentado para poder validar la información de la transacción; 4.- El BANCO deberá afiliar la cuenta seleccionada por EL CLIENTE para el servicio TU PAGO MÓVIL BICENTENARIO; 5.- EL BANCO deberá suspender el servicio de Banca TU PAGO MÓVIL BICENTENARIO, una vez sea notificado por EL CLIENTE a través del Call Center o la red de agencias los medios que determine el banco para su suspensión. \n\n      <br/>\n\n      <b>9)	TARIFAS Y/O COMISIONES:</b> Las tarifas y/o comisiones estarán fijadas por EL BANCO o por cualquier autoridad competente que lo determine, pudiendo ser modificadas de la misma manera cada vez que EL BANCO lo considere conveniente y serán del conocimiento EL CLIENTE a través de la información disponible a través de la página de web y en las Agencias de Atención al Público de EL BANCO o por cualquier otro medio electrónico o físico que EL BANCO determinase a tales fines. EL CLIENTE se obliga a pagar a EL BANCO la contraprestación que éste estableciere según lo up supra expresado. EL BANCO queda pleno e irrevocablemente autorizado para debitar o hacer debitar al momento de la ejecución de la operación bancaria, sin previo aviso el monto de dichas tarifas y/o comisiones en la cuenta afiliada por EL CLIENTE en EL BANCO, asimismo EL BANCO tendrá la potestad de no ejecutar la operación de pago si EL CLIENTE no cuenta con el monto para el débito de las tarifas y/o comisiones fijadas  por EL BANCO. \n\n      <br/>\n\n      <b>10)	MODIFICACIÓN DE LAS CONDICIONES:</b> EL BANCO podrá modificar todo o en parte los términos de esta oferta y deberá notificar a EL CLIENTE de tales modificaciones a través de los diferentes medios que EL BANCO considere idóneos, previa aprobación de la Superintendencia de las Instituciones del Sector Bancaria (SUDEBAN). Es convenio expreso entre las partes, que si EL CLIENTE continúa haciendo uso de los servicios de TU PAGO MÓVIL BICENTENARIO, conforme a los nuevos términos de la presente oferta publica, ello significa que ha aceptado las nuevas condiciones. \n\n      <br/>\n\n      <b>11)	DECLARACIÓN JURADA:</b> EL CLIENTE, bajo fe de juramento declara que los fondos utilizados para la ejecución de cualquier transacción a través de los servicios de TU PAGO MÓVIL BICENTENARIO, se originan y se manejarán en operaciones lícitas, con apego a la legislación venezolana sobre prevención, control y fiscalización de las operaciones de legitimación de capitales; así mismo, EL CLIENTE asume toda la responsabilidad que acarrea el uso de este servicios y libera a EL BANCO de responsabilidad por errores en el monto de abonos o cargos a la cuenta destino. \n\n      <br/>\n\n      <b>12)	SEGURIDAD TECNOLÓGICA:</b> EL BANCO mantendrá sistemas de seguridad bancaria adecuados, a fin de evitar la comisión de delitos que afecten el pago de EL CLIENTE, así como también brindará atención y oportuna respuesta a EL CLIENTE que denuncie pagos no reconocidos u omisiones presentadas en su cuenta, así como cualesquiera otros reclamos que pudieren formular. \n\n      <br/>\n\n      <b>13)	CONFIDENCIALIDAD:</b> El BANCO respetará el derecho constitucional a la información sobre los datos de EL CLIENTE y tiene prohibido informar los antecedentes financieros personales de EL CLIENTE a cualquier empresa o institución exceptuando al mismo CLIENTE, a la Superintendencia de las Instituciones del Sector Bancario, al Banco Central de Venezuela y demás entes autorizados por ley, salvo que EL CLIENTE de su autorización por escrito. \n\n      <br/>\n\n      <b>14)	DOMICILIO ESPECIAL:</b> Para todos los efectos derivados y consecuencias legales del presente contrato las partes eligen como domicilio especial la ciudad de Caracas a la Jurisdicción de cuyos Tribunales competentes expresamente se someten, sin perjuicio para “EL BANCO”, de acudir a cualquier otro que fuere competente de conformidad con la Ley. \n\n      <br/>\n\n      <b>15)	NOTIFICACIONES:</b> Cualquier notificación, aviso o comunicación que EL CLIENTE haya de dirigir a EL BANCO en relación con las condiciones generales dispuestas, deberá hacerlo por escrito, en duplicado y por intermedio de las agencias. Tal notificación, aviso o comunicación EL CLIENTE debe entregarlo a un funcionario autorizado de la respectiva agencia, quien dejará constancia, tanto en el original como en la copia del documento respectivo, del día y la hora en que lo reciba, devolviendo el duplicado a EL CLIENTE y conservando para EL BANCO el original. Cualquier notificación, aviso o comunicación que  EL BANCO tenga que hacer a  EL CLIENTE, lo enviará a la dirección que éste tenga registrada en su sistema y tal notificación, aviso o comunicación se considerará válida por el hecho comprobado de haberse remitido a dicha dirección física o electrónica, sin que sea necesario ningún acuse de recibo.\n\n  </p>\n\n  <p text-center style="font-weight:bold">“BANCO BICENTENARIO DEL PUEBLO”</p>\n\n  \n\n  <ion-row>\n\n    <ion-col>\n\n      <button ion-button block color="secondary" (click)="takeTermsAction(1)">Aceptar</button>\n\n    </ion-col>\n\n    <ion-col>\n\n      <button ion-button block color="primary" (click)="takeTermsAction(0)">Cancelar</button>\n\n    </ion-col>\n\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\affiliation-terms\affiliation-terms.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], AffiliationTermsPage);
    return AffiliationTermsPage;
}());

//# sourceMappingURL=affiliation-terms.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AffiliationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__affiliation_terms_affiliation_terms__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AffiliationPage = /** @class */ (function () {
    function AffiliationPage(navCtrl, navParams, p2pServiceProvider, modalCtrl, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        var receiveData = navParams.get("clientInfo");
        this.clientInfo = {
            id: receiveData.id, userType: 'N', name: receiveData.name,
            docType: receiveData.docType, docNumber: receiveData.docNumber,
            email: receiveData.email, phone: receiveData.phone, validationKey: receiveData.validationKey,
            account: '', userName: '', psw: '', pswConfirm: '', securityKey: '', questionSec: '', questionAns: ''
        };
        this.accounts = receiveData.accounts;
        this.regexPsw = receiveData.regexPsw;
        this.forbidden = receiveData.forbidden;
    }
    AffiliationPage.prototype.displayMessage = function (title, subtitle, textBt) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: [textBt]
        });
        alert.present();
    };
    AffiliationPage.prototype.cancelAffiliation = function () {
        this.navCtrl.popToRoot();
    };
    AffiliationPage.prototype.showPasswordHelp = function () {
        this.p2pServiceProvider.showPasswordHelp(this.forbidden);
    };
    AffiliationPage.prototype.showUserNameHelp = function () {
        this.p2pServiceProvider.showAffiliationUsernameHelp(this.forbidden, true);
    };
    AffiliationPage.prototype.showSecurityHelp = function () {
        this.p2pServiceProvider.showAffiliationFieldsHelp(this.forbidden, false);
    };
    AffiliationPage.prototype.sendAffiliation = function () {
        var _this = this;
        if (this.clientInfo.account == "") {
            this.displayMessage("Error", "Debe seleccionar un número de cuenta.", "Cerrar");
        }
        else if (this.clientInfo.userName == "" || this.clientInfo.userName.length < 4
            || (new RegExp(/^[a-z0-9]+$/gi).test(this.clientInfo.userName)) == false
            || this.p2pServiceProvider.validateAffiliationUsername(this.clientInfo.docType + '' + this.clientInfo.docNumber, this.forbidden, this.clientInfo.userName) == false) {
            var alert_1 = this.alertCtrl.create({
                title: "Error",
                subTitle: "El usuario no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showUserNameHelp();
                        }
                    }]
            });
            alert_1.present();
        }
        else if (this.clientInfo.psw == "" || this.clientInfo.pswConfirm == "") {
            this.displayMessage("Error", "Debe ingresar la clave y su confirmación", "Cerrar");
        }
        else if (this.clientInfo.questionSec == "" || this.clientInfo.questionSec.length < 4
            || (new RegExp(/^[a-z0-9\s]+$/gi).test(this.clientInfo.questionSec)) == false
            || this.p2pServiceProvider.validateAffiliationFields(this.clientInfo.name, this.clientInfo.docType + '' + this.clientInfo.docNumber, this.forbidden, this.clientInfo.questionSec) == false) {
            var alert_2 = this.alertCtrl.create({
                title: "Error",
                subTitle: "La pregunta secreta no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showSecurityHelp();
                        }
                    }]
            });
            alert_2.present();
        }
        else if (this.clientInfo.questionAns == "" || this.clientInfo.questionAns.length < 4
            || (new RegExp(/^[a-z0-9\s]+$/gi).test(this.clientInfo.questionAns)) == false || this.p2pServiceProvider.validateAffiliationFields(this.clientInfo.name, this.clientInfo.docType + '' + this.clientInfo.docNumber, this.forbidden, this.clientInfo.questionAns) == false) {
            var alert_3 = this.alertCtrl.create({
                title: "Error",
                subTitle: "La respuesta secreta no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showSecurityHelp();
                        }
                    }]
            });
            alert_3.present();
        }
        else if (this.clientInfo.securityKey.length == 0) {
            this.displayMessage("Error", "Debe ingresar la Clave Tu Pago Móvil (SMS).", "Cerrar");
        }
        else if (this.clientInfo.psw != this.clientInfo.pswConfirm) {
            this.displayMessage("Error", "La confirmación de la clave debe ser igual a la clave ingresada.", "Cerrar");
        }
        else if (new RegExp('[0-9]{4}').test(this.clientInfo.securityKey) == false) {
            this.displayMessage("Error", "La Clave Tu Pago Móvil (SMS) debe ser de 4 números.", "Cerrar");
        }
        else if (this.p2pServiceProvider.validatePassword(this.clientInfo.userName, this.clientInfo.name, this.clientInfo.docType + '' + this.clientInfo.docNumber, this.forbidden, this.regexPsw, this.clientInfo.psw) == false) {
            var alert_4 = this.alertCtrl.create({
                title: "Error",
                subTitle: "La nueva contraseña no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showPasswordHelp();
                        }
                    }]
            });
            alert_4.present();
        }
        else {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__affiliation_terms_affiliation_terms__["a" /* AffiliationTermsPage */]);
            modal.onDidDismiss(function (resp) {
                if (resp.id == 1) {
                    //ACCEPTED
                    var loader_1 = _this.loadingCtrl.create({
                        content: "Procesando...",
                    });
                    loader_1.present().then(function () {
                        _this.p2pServiceProvider.sendUserAffiliation(_this.clientInfo).then(function (data) {
                            var res = data;
                            if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                                loader_1.dismiss();
                                _this.displayMessage("Afiliación", "Usuario afiliado exitosamente", "OK");
                                _this.navCtrl.popToRoot();
                            }
                            else {
                                if (res.cod_respuesta && res.descripcion_respuesta) {
                                    _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta, "Cerrar");
                                }
                                else {
                                    _this.displayMessage("Error", "Error de comunicación, mensaje no disponible", "Cerrar");
                                }
                                loader_1.dismiss();
                            }
                        });
                    });
                }
            });
            modal.present();
        }
    };
    AffiliationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-affiliation',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\affiliation\affiliation.html"*/'<ion-header>\n  <ion-navbar color="primary" hideBackButton="true">\n    <ion-title> Afiliación </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-title>Datos de Afiliación</ion-title>\n\n  <ion-list>\n    <ion-item>\n      <ion-label color="primary" floating>Nombre</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="clientInfo.name"\n        disabled="true"\n      ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" floating>Correo</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="clientInfo.email"\n        disabled="true"\n      ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" floating>Cuenta</ion-label>\n      <ion-select interface="popover" [(ngModel)]="clientInfo.account">\n        <ion-option value="" disabled="true">Número de Cuenta</ion-option>\n        <ion-option *ngFor="let item of accounts" value="{{item.id}}">{{item.id}}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Usuario</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="clientInfo.userName"\n        maxlength="16"\n        [valid-input-as]="3"\n      ></ion-input>\n      <button ion-button item-right (click)="showUserNameHelp()">?</button>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Clave</ion-label>\n      <ion-input\n        type="password"\n        [(ngModel)]="clientInfo.psw"\n        maxlength="16"\n        [valid-input-as]="0"\n      ></ion-input>\n      <button ion-button item-right (click)="showPasswordHelp()">?</button>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirmación de Clave</ion-label>\n      <ion-input\n        type="password"\n        [(ngModel)]="clientInfo.pswConfirm"\n        maxlength="16"\n        [valid-input-as]="0"\n      ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Pregunta Secreta</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="clientInfo.questionSec"\n        maxlength="16"\n        [valid-input-as]="0"\n      ></ion-input>\n      <button ion-button item-right (click)="showSecurityHelp()">?</button>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Respuesta Secreta</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="clientInfo.questionAns"\n        maxlength="16"\n        [valid-input-as]="4"\n      ></ion-input>\n      <button ion-button item-right (click)="showSecurityHelp()">?</button>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Clave Tu Pago Móvil (SMS)</ion-label>\n      <ion-input\n        type="tel"\n        [(ngModel)]="clientInfo.securityKey"\n        maxlength="4"\n        style="-webkit-text-security: disc"\n      ></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button block color="secondary" (click)="sendAffiliation()">\n        Afiliar\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button block color="primary" (click)="cancelAffiliation()">\n        Cancelar\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n\n<ion-footer class="hideElementOnKeyboardShown">\n  <ion-toolbar>\n    <small>Comercializado por</small><br /><small\n      ><b>Corporación Unidigital C.A. J-40148330-5.</b></small\n    >\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\affiliation\affiliation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */]])
    ], AffiliationPage);
    return AffiliationPage;
}());

//# sourceMappingURL=affiliation.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components






var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, alertCtrl, p2pServiceProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.loadingCtrl = loadingCtrl;
        this.counter = 300;
        this.change = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            securityCode: ''
        };
        this.username = navParams.get('username');
        this.loginData = navParams.get('loginData');
    }
    ChangePasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.userSecurityChangeRequest(_this.username.toLowerCase())
                .then(function (data) {
                var userSecurityData = data;
                if (userSecurityData._body == null && userSecurityData.name == null && parseInt(userSecurityData.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.counter = 300;
                    _this.countDown = __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].timer(0, 1000).take(_this.counter)
                        .map(function () { return _this.counter = _this.counter == 0 ? 0 : (_this.counter % 100) == 0 ? (_this.counter - 41) : (_this.counter - 1); });
                }
                else {
                    if (userSecurityData._body == null && userSecurityData.name == null) {
                        _this.displayMessage("Error", userSecurityData.cod_respuesta + ' - ' + userSecurityData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ChangePasswordPage.prototype.validate = function () {
        var _this = this;
        if (this.change.oldPassword == '' || this.change.newPassword == '' || this.change.newPasswordConfirm == '') {
            this.displayMessage("Error", "Complete los campos correctamente.");
        }
        else if (this.change.securityCode.trim().length < 8) {
            this.displayMessage("Error", "El código de seguridad debe contener mínimo 8 letras y/o números");
        }
        else if (!this.change.securityCode.match('^[a-zA-Z0-9]*$')) {
            this.displayMessage("Error", "El código de seguridad debe solo contener letras y/o números");
        }
        else if (this.change.newPassword != this.change.newPasswordConfirm) {
            this.displayMessage("Error", "Las contraseñas no coinciden");
        }
        else if (this.p2pServiceProvider.validatePassword(this.username, this.loginData.nombre_afiliado, this.loginData.cedula, this.loginData.lista_palabras, this.loginData.expresion_regular, this.change.newPassword) == false) {
            var alert_1 = this.alertCtrl.create({
                title: "Error",
                subTitle: "La nueva contraseña no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showPasswordHelp();
                        }
                    }]
            });
            alert_1.present();
        }
        else {
            this.changePasswordRequest();
        }
    };
    ChangePasswordPage.prototype.changePasswordRequest = function () {
        var _this = this;
        var changePasswordObject = {
            "username": this.username,
            "oldpassword": __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](this.change.oldPassword).toString(),
            "newpassword": __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](this.change.newPassword).toString(),
            "canal": "04", "otp": this.change.securityCode,
            "fechahora_disp": new Date()
        };
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.changePasswordRequest(changePasswordObject)
                .then(function (data) {
                _this.changePasswordResult = data;
                if (_this.changePasswordResult._body == null && _this.changePasswordResult.name == null && _this.changePasswordResult.cod_respuesta == "000") {
                    _this.displayMessage("Aviso", "Operación Exitosa");
                    _this.logout();
                }
                else {
                    if (_this.changePasswordResult._body == null && _this.changePasswordResult.name == null) {
                        _this.displayMessage("Error", (_this.changePasswordResult.cod_respuesta) + ' - ' + _this.changePasswordResult.descripcion_respuesta);
                        if (_this.changePasswordResult.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                            _this.navCtrl.popToRoot();
                        }
                    }
                }
                loader.dismiss();
            });
        });
    };
    ChangePasswordPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ChangePasswordPage.prototype.logout = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.logoutRequest()
                .then(function (data) {
                loader.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                _this.navCtrl.popToRoot();
            });
        });
    };
    ChangePasswordPage.prototype.showPasswordHelp = function () {
        this.p2pServiceProvider.showPasswordHelp(this.loginData.lista_palabras);
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-change-password',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\change-password\change-password.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Cambiar Contraseña\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label floating>Ingrese contraseña actual</ion-label>\n\n      <ion-input type="password" [(ngModel)]="change.oldPassword" name="oldPassword" maxlength="16" [valid-input-as]="0"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Ingrese nueva contraseña</ion-label>\n\n      <ion-input type="password" [(ngModel)]="change.newPassword" name="newPassword" maxlength="16" [valid-input-as]="0"></ion-input>\n\n      <button ion-button item-right (click)="showPasswordHelp()">  ?  </button>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Confirme su nueva contraseña</ion-label>\n\n      <ion-input type="password" [(ngModel)]="change.newPasswordConfirm" name="newPasswordConfirm" maxlength="16" [valid-input-as]="0"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Código de Seguridad</ion-label>\n\n      <ion-input type="text" [(ngModel)]="change.securityCode" maxlength="12" [valid-input-as]="3"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item *ngIf="\'\'+(countDown | async) as timeView" text-center>\n\n      <ion-row>\n\n        <ion-col *ngIf="timeView > 0">\n\n          {{ (timeView < 100 ? \'0\' : timeView.substr(0,1)) +\':\'+ (timeView < 100 ? timeView : timeView.substr(1,3)) }}\n\n        </ion-col>\n\n        <ion-col *ngIf="timeView == 0">\n\n          <button ion-button class="round-bt" (click)="ionViewDidLoad()">\n\n            <ion-icon name="refresh"></ion-icon>\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <small *ngIf="timeView > 0">Tiempo restante para validar información</small>\n\n          <small *ngIf="timeView == 0">Reenviar código de seguridad</small>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button block color="secondary" (click)="validate()">Enviar</button>\n\n\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n		<small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\change-password\change-password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientQaRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ClientQaRequestPage = /** @class */ (function () {
    function ClientQaRequestPage(navCtrl, navParams, alertCtrl, platform, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.counter = 300;
        this.securityInfo = {
            username: '',
            userId: '',
            baseRegExp: '',
            forbidden: ''
        };
        this.navCtrl.swipeBackEnabled = false;
        this.securityCode = '';
        this.securityQuestion = '';
        this.securityAnswer = '';
        this.securityInfo.username = navParams.get('usuario');
        this.securityInfo.baseRegExp = navParams.get('expresion_regular');
        this.securityInfo.userId = navParams.get('cedula');
        this.securityInfo.forbidden = navParams.get('lista_palabras');
        if (navParams.get('isLoginCall'))
            this.resendValidCode();
    }
    ClientQaRequestPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.countDown = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].timer(0, 1000).take(this.counter)
            .map(function () { return _this.counter = _this.counter == 0 ? 0 : (_this.counter % 100) == 0 ? (_this.counter - 41) : (_this.counter - 1); });
    };
    ClientQaRequestPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ClientQaRequestPage.prototype.showSecurityHelp = function () {
        this.p2pServiceProvider.showAffiliationFieldsHelp(this.securityInfo.forbidden, false);
    };
    ClientQaRequestPage.prototype.validateSecurityChange = function () {
        var validCode = false;
        if (this.securityCode && this.securityCode.length >= 8 && this.securityCode.match('^[a-zA-Z0-9]*$')) {
            validCode = true;
        }
        if (validCode) {
            if (this.securityQuestion == '' || this.securityQuestion.length < 4 ||
                (new RegExp(/^[a-z0-9\s]+$/gi).test(this.securityQuestion)) == false ||
                this.p2pServiceProvider.validateAffiliationFields(this.securityInfo.username, this.securityInfo.userId, this.securityInfo.forbidden, this.securityQuestion) == false) {
                this.displayMessage("Error", "La pregunta secreta no cumple con los requisitos");
            }
            else if (this.securityAnswer == '' || this.securityAnswer.length < 4 ||
                (new RegExp(/^[a-z0-9\s]+$/gi).test(this.securityAnswer)) == false ||
                this.p2pServiceProvider.validateAffiliationFields(this.securityInfo.username, this.securityInfo.userId, this.securityInfo.forbidden, this.securityAnswer) == false) {
                this.displayMessage("Error", "La respuesta secreta no cumple con los requisitos");
            }
            else {
                this.userSecurityChange();
            }
        }
        else {
            this.displayMessage("Error", "El código de seguridad debe solo contener letras y/o números");
        }
    };
    ClientQaRequestPage.prototype.resendValidCode = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.userSecurityChangeRequest(_this.securityInfo.username.toLowerCase())
                .then(function (data) {
                var userSecurityData = data;
                if (userSecurityData._body == null && userSecurityData.name == null && parseInt(userSecurityData.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.counter = 300;
                    _this.ionViewDidLoad();
                }
                else {
                    if (userSecurityData._body == null && userSecurityData.name == null) {
                        _this.displayMessage("Error", userSecurityData.cod_respuesta + ' - ' + userSecurityData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ClientQaRequestPage.prototype.userSecurityChange = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.userSecurityChangeQA(_this.securityInfo.username.toLowerCase(), _this.securityQuestion, _this.securityAnswer, _this.securityCode)
                .then(function (data) {
                var userSecurityData = data;
                if (userSecurityData._body == null && userSecurityData.name == null && parseInt(userSecurityData.cod_respuesta) == 0) {
                    _this.displayMessage("Aviso", "Operación Exitosa");
                    loader.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                    _this.navCtrl.popToRoot();
                }
                else {
                    if (userSecurityData._body == null && userSecurityData.name == null) {
                        _this.displayMessage("Error", userSecurityData.cod_respuesta + ' - ' + userSecurityData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ClientQaRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-client-qa-request',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\client-qa-request\client-qa-request.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title> Modificar Pregunta Secreta </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating><strong>Usuario</strong></ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="securityInfo.username"\n        disabled="true"\n      ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Código de Seguridad</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="securityCode"\n        maxlength="12"\n        [valid-input-as]="3"\n      ></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Pregunta Secreta</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="securityQuestion"\n        maxlength="16"\n        [valid-input-as]="0"\n      ></ion-input>\n      <button ion-button item-right (click)="showSecurityHelp()">?</button>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Respuesta Secreta</ion-label>\n      <ion-input\n        type="text"\n        [(ngModel)]="securityAnswer"\n        maxlength="16"\n        [valid-input-as]="4"\n      ></ion-input>\n      <button ion-button item-right (click)="showSecurityHelp()">?</button>\n    </ion-item>\n\n    <ion-item *ngIf="\'\'+(countDown | async) as timeView" text-center>\n      <ion-row>\n        <ion-col *ngIf="timeView > 0">\n          {{ (timeView < 100 ? \'0\' : timeView.substr(0,1)) +\':\'+ (timeView < 100\n          ? timeView : timeView.substr(1,3)) }}\n        </ion-col>\n        <ion-col *ngIf="timeView == 0">\n          <button ion-button class="round-bt" (click)="resendValidCode()">\n            <ion-icon name="refresh"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <small *ngIf="timeView > 0">Tiempo restante para validar información</small>\n          <small *ngIf="timeView == 0">Reenviar código de seguridad</small>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n  </ion-list>\n\n  <ion-row>\n    <ion-col>\n      <button\n        ion-button\n        block\n        color="secondary"\n        (click)="validateSecurityChange()"\n      >\n        Aceptar\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n\n<ion-footer class="hideElementOnKeyboardShown">\n  <ion-toolbar>\n    <small>Comercializado por</small>\n    <br />\n    <small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\client-qa-request\client-qa-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], ClientQaRequestPage);
    return ClientQaRequestPage;
}());

//# sourceMappingURL=client-qa-request.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientidRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__phone_chooser_phone_chooser__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientidRequestPage = /** @class */ (function () {
    function ClientidRequestPage(navCtrl, navParams, alertCtrl, platform, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.docTypeList();
        this.navCtrl.swipeBackEnabled = false;
    }
    ClientidRequestPage.prototype.ionViewWillLeave = function () {
        console.log(typeof this.unregisterBackAction == 'function');
        if (this.unregisterBackAction && typeof this.unregisterBackAction == 'function') {
            this.unregisterBackAction();
        }
    };
    ClientidRequestPage.prototype.cancelAffiliation = function () {
        this.ionViewWillLeave();
        this.navCtrl.popToRoot();
    };
    ClientidRequestPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ClientidRequestPage.prototype.docTypeList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Espere por favor",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.getAffiliationDocTypes().then(function (data) {
                var res = data;
                if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.typesList = res.TiposAfiliados;
                }
                else {
                    if (res.cod_respuesta && res.descripcion_respuesta) {
                        _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                    }
                    else {
                        _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ClientidRequestPage.prototype.validClientID = function () {
        var _this = this;
        //VALID DATA
        if (!this.idType || this.idType.toString() == "" || !this.id || this.id.toString().length < 6) {
            this.displayMessage("Error", "Debe ingresar un documento de identificación válido");
        }
        else if (isNaN(this.id.valueOf()) || this.id.toString().trim().length == 0) {
            this.displayMessage("Error", "Debe ingresar solo números en el número de documento");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Procesando...",
            });
            this.p2pServiceProvider.onViewMsgPresent = true;
            loader_1.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
            loader_1.present().then(function () {
                _this.p2pServiceProvider.getClientPhones(_this.id, _this.idType).then(function (data) {
                    var res = data;
                    console.log("Valid res " + res + " with property " + res.Telefonos);
                    if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                        loader_1.dismiss();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__phone_chooser_phone_chooser__["a" /* PhoneChooserPage */], { clientId: _this.id, clientIdType: _this.idType, phones: res.Telefonos });
                    }
                    else {
                        if (res.cod_respuesta && res.descripcion_respuesta) {
                            _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                        }
                        else {
                            _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                        }
                        loader_1.dismiss();
                        _this.cancelAffiliation();
                    }
                });
            });
        }
    };
    ClientidRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-clientid-request',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\clientid-request\clientid-request.html"*/'<ion-header>\n  <ion-navbar color="primary" hideBackButton="true">\n    <ion-title> Afiliación </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row>\n    <ion-col><h5>Documento de Identificación</h5></ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-select interface="popover" [(ngModel)]="idType">\n        <ion-option value="" disabled="true" selected="true">Documento</ion-option>\n        <ion-option *ngFor="let item of typesList" value="{{item.codigo}}">{{item.codigo}}</ion-option>\n      </ion-select>\n    </ion-col>\n    <ion-col>\n      <ion-input\n        type="tel"\n        [(ngModel)]="id"\n        name="idNumber"\n        placeholder="N° Documento"\n        maxlength="9"\n        [valid-input-as]="0"\n      ></ion-input>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <small text-wrap class="msgInfo">*Tenga al alcance los productos que posee con el banco</small>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col>\n      <button ion-button block color="secondary" (click)="validClientID()">\n        Continuar\n      </button>\n    </ion-col>\n    <ion-col>\n      <button ion-button block color="primary" (click)="cancelAffiliation()">\n        Cancelar\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n\n<ion-footer class="hideElementOnKeyboardShown">\n  <ion-toolbar>\n    <small>Comercializado por</small>\n    <br />\n    <small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\clientid-request\clientid-request.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], ClientidRequestPage);
    return ClientidRequestPage;
}());

//# sourceMappingURL=clientid-request.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneChooserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__verify_affiliation_verify_affiliation__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PhoneChooserPage = /** @class */ (function () {
    function PhoneChooserPage(navCtrl, navParams, formBuilder, loadingCtrl, p2pServiceProvider, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.alertCtrl = alertCtrl;
        this.clientID = navParams.get('clientId');
        this.clientIdType = navParams.get('clientIdType');
        this.chooseForm = this.formBuilder.group({ phoneChoose: '' });
        this.phones = this.navParams.get("phones");
    }
    PhoneChooserPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Cerrar']
        });
        alert.present();
    };
    PhoneChooserPage.prototype.cancelAffiliation = function () {
        this.navCtrl.popToRoot();
    };
    PhoneChooserPage.prototype.notifyPhoneChoose = function () {
        var _this = this;
        if (this.chooseForm.get('phoneChoose').value.length == 0) {
            this.displayMessage("Error", "Debe seleccionar un teléfono");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Procesando...",
            });
            loader_1.present().then(function () {
                _this.p2pServiceProvider.getAffiliationCode(_this.clientIdType, _this.clientID, _this.chooseForm.get('phoneChoose').value)
                    .then(function (data) {
                    var res = data;
                    if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                        loader_1.dismiss();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__verify_affiliation_verify_affiliation__["a" /* VerifyAffiliationPage */], {
                            clientId: _this.clientID, clientIdType: _this.clientIdType,
                            clientPhone: _this.chooseForm.get('phoneChoose').value
                        });
                    }
                    else {
                        if (res.cod_respuesta && res.descripcion_respuesta) {
                            _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                        }
                        else {
                            _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                        }
                        loader_1.dismiss();
                    }
                });
            });
        }
    };
    PhoneChooserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-phone-chooser',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\phone-chooser\phone-chooser.html"*/'<ion-header>\n\n    <ion-navbar color="primary" hideBackButton="true">\n\n      <ion-title>\n\n        Afiliación\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content padding>\n\n    <h5>Seleccione un teléfono</h5>\n\n\n\n    <form [formGroup]="chooseForm">\n\n    <ion-list radio-group formControlName="phoneChoose">\n\n      <ion-item *ngFor="let item of phones">\n\n        <ion-label>{{item.Texto}}</ion-label>\n\n        <ion-radio value="{{item.Texto}}"></ion-radio>\n\n      </ion-item>\n\n      <ion-item>\n\n        <small text-wrap class="msgInfo">*Le será enviado un código de seguridad al teléfono que seleccione</small>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button block color="secondary" (click)="notifyPhoneChoose()">Continuar</button>\n\n      </ion-col>\n\n      <ion-col>\n\n          <button ion-button block color="primary" (click)="cancelAffiliation()">Cancelar</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </form>\n\n  </ion-content>\n\n  \n\n  <ion-footer class="hideElementOnKeyboardShown">\n\n    <ion-toolbar>\n\n      <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n    </ion-toolbar>\n\n  </ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\phone-chooser\phone-chooser.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_alert_alert_controller__["a" /* AlertController */]])
    ], PhoneChooserPage);
    return PhoneChooserPage;
}());

//# sourceMappingURL=phone-chooser.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerifyAffiliationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__affiliation_affiliation__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var VerifyAffiliationPage = /** @class */ (function () {
    function VerifyAffiliationPage(navCtrl, navParams, p2pServiceProvider, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.counter = 300;
        this.clientInfo = {
            docType: navParams.get('clientIdType'),
            docNumber: navParams.get('clientId'),
            phone: navParams.get('clientPhone'),
            id: '',
            name: '',
            email: '',
            accountLast: '',
            accounts: [],
            regexPsw: "",
            forbidden: [],
            validationKey: ''
        };
    }
    VerifyAffiliationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.countDown = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].timer(0, 1000).take(this.counter)
            .map(function () { return _this.counter = _this.counter == 0 ? 0 : (_this.counter % 100) == 0 ? (_this.counter - 41) : (_this.counter - 1); });
    };
    VerifyAffiliationPage.prototype.cancelAffiliation = function () {
        this.navCtrl.popToRoot();
    };
    VerifyAffiliationPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Cerrar']
        });
        alert.present();
    };
    VerifyAffiliationPage.prototype.sendVerificationData = function () {
        var _this = this;
        if (this.validCode && this.idAccount && this.validCode.length >= 8 && this.idAccount.toString().trim().length == 4 &&
            !isNaN(this.idAccount.valueOf()) && this.idAccount.toString() != '0000' && this.validCode.match('^[a-zA-Z0-9]*$')) {
            this.clientInfo.accountLast = this.idAccount.toString();
            this.clientInfo.validationKey = this.validCode.toUpperCase();
            var loader_1 = this.loadingCtrl.create({
                content: "Procesando...",
            });
            loader_1.present().then(function () {
                _this.p2pServiceProvider.validAffiliationCode(_this.clientInfo, _this.validCode)
                    .then(function (data) {
                    var res = data;
                    if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                        _this.clientInfo.id = res.nro_cliente;
                        _this.clientInfo.name = res.nombre;
                        _this.clientInfo.email = res.email;
                        _this.clientInfo.forbidden = res.PalabrasRestringidas;
                        _this.clientInfo.regexPsw = res.expresion_regular;
                        var accountList = [{ id: res.cuentas[0] }];
                        var accountID = 1;
                        while (accountID < res.cuentas.length) {
                            accountList.push({ id: res.cuentas[accountID] });
                            accountID++;
                        }
                        _this.clientInfo.accounts = accountList;
                        loader_1.dismiss();
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__affiliation_affiliation__["a" /* AffiliationPage */], { clientInfo: _this.clientInfo });
                    }
                    else {
                        if (res.cod_respuesta && res.descripcion_respuesta) {
                            _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                        }
                        else {
                            _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                        }
                        loader_1.dismiss();
                    }
                });
            });
        }
        else if (this.idAccount && (isNaN(this.idAccount.valueOf()) || this.idAccount.toString() == '0000')) {
            this.displayMessage("Error", "Debe ingresar un código de cuenta valido.");
        }
        else if (this.validCode && !(this.validCode.match('^[a-zA-Z0-9]*$'))) {
            this.displayMessage("Error", "El código de validación debe solo contener letras y/o números.");
        }
        else {
            this.displayMessage("Error", "Debe completar los datos correctamente");
        }
    };
    VerifyAffiliationPage.prototype.resendValidCode = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.getAffiliationCode(_this.clientInfo.docType, _this.clientInfo.docNumber, _this.clientInfo.phone)
                .then(function (data) {
                var res = data;
                if (res.cod_respuesta && !isNaN(res.cod_respuesta) && parseInt(res.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.counter = 300;
                    _this.ionViewDidLoad();
                }
                else {
                    if (res.cod_respuesta && res.descripcion_respuesta) {
                        _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                    }
                    else {
                        _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                    }
                    loader.dismiss();
                }
            });
        });
    };
    VerifyAffiliationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-verify-affiliation',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\verify-affiliation\verify-affiliation.html"*/'<ion-header>\n\n    <ion-navbar color="primary" hideBackButton="true">\n\n      <ion-title>\n\n        Afiliación\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n  \n\n  \n\n  <ion-content padding>\n\n    <h5>Datos de verificación</h5>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-label floating>Código de Seguridad</ion-label>\n\n        <ion-input type="text" [(ngModel)]="validCode" maxlength="12" [valid-input-as]="3"></ion-input>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-label floating text-wrap>Ultimos 4 dígitos de una de sus cuentas</ion-label>\n\n        <ion-input type="tel" [(ngModel)]="idAccount" maxlength="4"></ion-input>\n\n      </ion-item>\n\n      <ion-item *ngIf="\'\'+(countDown | async) as timeView" text-center>\n\n        <ion-row>\n\n          <ion-col *ngIf="timeView > 0">\n\n            {{ (timeView < 100 ? \'0\' : timeView.substr(0,1)) +\':\'+ (timeView < 100 ? timeView : timeView.substr(1,3)) }}  \n\n          </ion-col>\n\n          <ion-col *ngIf="timeView == 0">\n\n            <button ion-button class="round-bt" (click)="resendValidCode()">\n\n                <ion-icon name="refresh"></ion-icon>\n\n            </button>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col>\n\n            <small *ngIf="timeView > 0">Tiempo restante para validar información</small>\n\n            <small *ngIf="timeView == 0">Reenviar código de seguridad</small>\n\n          </ion-col>  \n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-row>\n\n      <ion-col>\n\n        <button ion-button block color="secondary" (click)="sendVerificationData()">Continuar</button>\n\n      </ion-col>\n\n      <ion-col>\n\n          <button ion-button block color="primary" (click)="cancelAffiliation()">Cancelar</button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-content>\n\n  \n\n  <ion-footer class="hideElementOnKeyboardShown">\n\n    <ion-toolbar>\n\n      <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n    </ion-toolbar>\n\n  </ion-footer>\n\n\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\verify-affiliation\verify-affiliation.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], VerifyAffiliationPage);
    return VerifyAffiliationPage;
}());

//# sourceMappingURL=verify-affiliation.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OptionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_password_change_password__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__company_balance_company_balance__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__company_received_company_received__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__payment_order_payment_order__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__received_payments_received_payments__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sent_payments_sent_payments__ = __webpack_require__(545);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components










var OptionsPage = /** @class */ (function () {
    function OptionsPage(navCtrl, navParams, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.loginData = navParams.get('loginData');
        this.password = navParams.get('password');
        this.username = navParams.get('username');
        this.p2pServiceProvider.accountInfo.balance = this.formatAmount(Number(this.loginData.saldo_disponible).toFixed(2));
        this.p2pServiceProvider.accountInfo.dailyLimit = this.formatAmount(Number(this.loginData.limite_diario - this.loginData.acum_diario).toFixed(2));
        this.p2pServiceProvider.accountInfo.monthLimit = this.formatAmount(Number(this.loginData.limite_mensual - this.loginData.acum_mensual).toFixed(2));
    }
    OptionsPage.prototype.isCompany = function () {
        //0: Natural 1: Company
        return this.loginData.tipo_afiliado == 1;
    };
    OptionsPage.prototype.formatAmount = function (amount) {
        return amount.replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    OptionsPage.prototype.nextPage = function (option) {
        var args = {
            loginData: this.loginData,
            username: this.username,
            password: this.password
        };
        switch (option) {
            case 1:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__payment_order_payment_order__["a" /* PaymentOrderPage */], args);
                break;
            case 2:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__sent_payments_sent_payments__["a" /* SentPaymentsPage */], args);
                break;
            case 3:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__received_payments_received_payments__["a" /* ReceivedPaymentsPage */], args);
                break;
            case 4:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__change_password_change_password__["a" /* ChangePasswordPage */], args);
                break;
            case 5:
                this.logout();
                break;
            case 6:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__company_balance_company_balance__["a" /* CompanyBalancePage */], args);
                break;
            case 7:
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__company_received_company_received__["a" /* CompanyReceivedPage */], args);
                break;
        }
    };
    OptionsPage.prototype.logout = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present().then(function () {
            _this.p2pServiceProvider.logoutRequest()
                .then(function (data) {
                loader.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]);
                _this.navCtrl.popToRoot();
            });
        });
    };
    OptionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-options',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\options\options.html"*/'<ion-header>\n\n  <ion-navbar color="primary" hideBackButton="true">\n\n    <ion-title>\n\n      Tu Pago Móvil\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n  <div class="container">\n\n    <img src="assets/images/logo_bicentenario.png" alt="">\n\n  </div>\n\n\n\n   <ion-card *ngIf="!isCompany()" class="card-balance">\n\n    <ion-card-content>\n\n      <ion-list>\n\n          <ion-item style="min-height:0;margin-top:0px;margin-bottom:0px;font-size:1.3rem;">\n\n              <ion-label style="margin-top:7px;margin-bottom:7px;">Saldo Disponible</ion-label>\n\n              <ion-badge style="margin-top:0px;margin-bottom:0px;background-color:#FFFFFF;color:#4D4D4D;" item-end>{{ this.p2pServiceProvider.accountInfo.balance }}</ion-badge>\n\n          </ion-item>\n\n          <ion-item style="min-height:0;margin-top:0px;margin-bottom:0px;font-size:1.3rem;">\n\n            <ion-label style="margin-top:7px;margin-bottom:7px;">Límite Diario</ion-label>\n\n            <ion-badge style="margin-top:0px;margin-bottom:0px;background-color:#FFFFFF;color:#4D4D4D;" item-end>{{ this.p2pServiceProvider.accountInfo.dailyLimit }}</ion-badge>\n\n          </ion-item>\n\n          <ion-item style="min-height:0;margin-top:0px;margin-bottom:0px;font-size:1.3rem;">\n\n              <ion-label style="margin-top:7px;margin-bottom:7px;">Límite Mensual</ion-label>\n\n              <ion-badge style="margin-top:0px;margin-bottom:0px;background-color:#FFFFFF;color:#4D4D4D;" item-end>{{ this.p2pServiceProvider.accountInfo.monthLimit }}</ion-badge>\n\n          </ion-item>\n\n      </ion-list>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card-content>\n\n    <ion-list no-line *ngIf="!isCompany()">\n\n      <button ion-button block (click)="nextPage(1);" color="grey-dark">Ordenar Pago</button>\n\n      <button ion-button block (click)="nextPage(2);" color="blue-dark">Pagos Emitidos</button>\n\n      <button ion-button block (click)="nextPage(3);" color="primary">Pagos Recibidos</button>\n\n      <button ion-button block (click)="nextPage(4);" color="secondary">Cambiar Contraseña</button>\n\n      <button ion-button block (click)="nextPage(5);" color="primary" id="exitButton">Salir</button>\n\n    </ion-list>\n\n    <ion-list no-line *ngIf="isCompany()">\n\n      <button ion-button block (click)="nextPage(6);" color="primary">Totales</button>\n\n      <button ion-button block (click)="nextPage(7);" color="primary">Pagos Recibidos</button>\n\n      <button ion-button block (click)="nextPage(4);" color="blue-dark">Cambiar Contraseña</button>\n\n      <button ion-button block (click)="nextPage(5);" color="primary" id="exitButton">Salir</button>\n\n    </ion-list>\n\n  </ion-card-content>\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n		<small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\options\options.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], OptionsPage);
    return OptionsPage;
}());

//# sourceMappingURL=options.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_qa_request_client_qa_request__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reset_password_reset_password__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components





var QuestionRequestPage = /** @class */ (function () {
    function QuestionRequestPage(navCtrl, navParams, alertCtrl, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.user = {
            username: ''
        };
        this.typeRequest = navParams.get('typeRequest');
        switch (this.typeRequest) {
            case 0:
                this.pageTitle = 'Recuperar Contraseña';
                break;
            case 1:
                this.pageTitle = 'Modificar Pregunta Secreta';
                break;
            default: this.pageTitle = '';
        }
    }
    QuestionRequestPage.prototype.validate = function () {
        if (this.user.username != '') {
            this.userSecurityChangeRequest();
        }
        else {
            this.displayMessage("Error", "Introduzca un nombre de usuario");
        }
    };
    QuestionRequestPage.prototype.userSecurityChangeRequest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.userSecurityChangeRequest(_this.user.username.toLowerCase())
                .then(function (data) {
                _this.userSecurityData = data;
                if (_this.userSecurityData._body == null && _this.userSecurityData.name == null && parseInt(_this.userSecurityData.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.questionRequest();
                }
                else {
                    if (_this.userSecurityData._body == null && _this.userSecurityData.name == null) {
                        _this.displayMessage("Error", _this.userSecurityData.cod_respuesta + ' - ' + _this.userSecurityData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    QuestionRequestPage.prototype.questionRequest = function () {
        var _this = this;
        var questionRequestObject = {
            username: this.user.username.toLowerCase(),
            canal: "04",
            fechahora_disp: new Date()
        };
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.questionRequest(questionRequestObject)
                .then(function (data) {
                _this.questionRequestData = data;
                if (_this.questionRequestData._body == null && _this.questionRequestData.name == null && _this.questionRequestData.cod_respuesta == "000") {
                    loader.dismiss();
                    switch (_this.typeRequest) {
                        case 0:
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__reset_password_reset_password__["a" /* ResetPasswordPage */], _this.questionRequestData);
                            break;
                        case 1:
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__client_qa_request_client_qa_request__["a" /* ClientQaRequestPage */], _this.questionRequestData);
                            break;
                    }
                }
                else {
                    if (_this.questionRequestData._body == null && _this.questionRequestData.name == null) {
                        _this.displayMessage("Error", _this.questionRequestData.cod_respuesta + ' - ' + _this.questionRequestData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    QuestionRequestPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    QuestionRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-question-request',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\question-request\question-request.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>{{ pageTitle }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n\n\n    <ion-item>\n\n      <ion-label floating>Ingrese su nombre de usuario</ion-label>\n\n      <ion-input type="text" [(ngModel)]="user.username" name="username" [valid-input-as]="0"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n  </ion-list>\n\n  <button ion-button block color="secondary" (click)="validate()">Continuar</button>\n\n\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\question-request\question-request.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], QuestionRequestPage);
    return QuestionRequestPage;
}());

//# sourceMappingURL=question-request.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components






var ResetPasswordPage = /** @class */ (function () {
    function ResetPasswordPage(navCtrl, navParams, alertCtrl, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.questionObject = {
            username: '',
            pregunta: '',
            expresion_regular: '',
            cedula: '',
            nombre_afiliado: '',
            lista_palabras: [{ palabra: '' }]
        };
        this.reset = {
            codigo: '',
            newPasswordConfirm: '',
            newPassword: '',
            respuesta: ''
        };
        this.counter = 300;
        this.questionObject.username = navParams.get('usuario');
        this.questionObject.pregunta = navParams.get('pregunta');
        this.questionObject.expresion_regular = navParams.get('expresion_regular');
        this.questionObject.cedula = navParams.get('cedula');
        this.questionObject.nombre_afiliado = navParams.get('nombre_afiliado');
        this.questionObject.lista_palabras = navParams.get('lista_palabras');
    }
    ResetPasswordPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.countDown = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].timer(0, 1000).take(this.counter)
            .map(function () { return _this.counter = _this.counter == 0 ? 0 : (_this.counter % 100) == 0 ? (_this.counter - 41) : (_this.counter - 1); });
    };
    ResetPasswordPage.prototype.showPasswordHelp = function () {
        this.p2pServiceProvider.showPasswordHelp(this.questionObject.lista_palabras);
    };
    ResetPasswordPage.prototype.validate = function () {
        var _this = this;
        if (this.reset.newPassword == '' || this.reset.newPasswordConfirm == '' && this.reset.respuesta == '') {
            this.displayMessage("Error", "Complete todos los campos correctamente.");
        }
        else if (this.reset.codigo.trim().length < 8) {
            this.displayMessage("Error", "El código de seguridad debe contener mínimo 8 letras y/o números");
        }
        else if (!this.reset.codigo.match('^[a-zA-Z0-9]*$')) {
            this.displayMessage("Error", "El código de seguridad debe solo contener letras y/o números");
        }
        else if (this.reset.newPassword != this.reset.newPasswordConfirm) {
            this.displayMessage("Error", "Las contraseñas deben ser iguales.");
        }
        else if (this.p2pServiceProvider.validatePassword(this.questionObject.username, this.questionObject.nombre_afiliado, this.questionObject.cedula, this.questionObject.lista_palabras, this.questionObject.expresion_regular, this.reset.newPassword) == false) {
            var alert_1 = this.alertCtrl.create({
                title: "Error",
                subTitle: "La nueva contraseña no cumple con los requisitos.",
                buttons: [{
                        text: 'OK'
                    }, {
                        text: 'AYUDA',
                        handler: function () {
                            _this.showPasswordHelp();
                        }
                    }]
            });
            alert_1.present();
        }
        else {
            this.resetRequest();
        }
    };
    ResetPasswordPage.prototype.resetRequest = function () {
        var _this = this;
        var resetRequestObject = {
            username: this.questionObject.username,
            newpassword: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](this.reset.newPassword).toString(),
            respuesta: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](this.reset.respuesta).toString().toUpperCase(),
            canal: "04", otp: this.reset.codigo,
            fechahora_disp: new Date()
        };
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.resetPasswordRequest(resetRequestObject)
                .then(function (data) {
                _this.resetRequestData = data;
                if (_this.resetRequestData._body == null && _this.resetRequestData.name == null && _this.resetRequestData.cod_respuesta == "000") {
                    _this.displayMessage("Aviso", "Operación Exitosa");
                    loader.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                    _this.navCtrl.popToRoot();
                }
                else {
                    if (_this.resetRequestData._body == null && _this.resetRequestData.name == null) {
                        _this.displayMessage("Error", _this.resetRequestData.cod_respuesta + ' - ' + _this.resetRequestData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ResetPasswordPage.prototype.resendValidCode = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.userSecurityChangeRequest(_this.questionObject.username.toLowerCase())
                .then(function (data) {
                var userSecurityData = data;
                if (userSecurityData._body == null && userSecurityData.name == null && parseInt(userSecurityData.cod_respuesta) == 0) {
                    loader.dismiss();
                    _this.counter = 300;
                    _this.ionViewDidLoad();
                }
                else {
                    if (userSecurityData._body == null && userSecurityData.name == null) {
                        _this.displayMessage("Error", userSecurityData.cod_respuesta + ' - ' + userSecurityData.descripcion_respuesta);
                    }
                    loader.dismiss();
                }
            });
        });
    };
    ResetPasswordPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ResetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-reset-password',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\reset-password\reset-password.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Recuperar Contraseña\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div class="container">\n\n    <img src="assets/images/logo_bicentenario.png" alt="">\n\n  </div>\n\n\n\n  <ion-list>\n\n\n\n    <ion-item no-lines>\n\n      <ion-label><strong>Pregunta Secreta:</strong></ion-label>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-label>{{questionObject.pregunta}}</ion-label>\n\n    </ion-item>\n\n    \n\n    <ion-item>\n\n      <ion-label floating><strong>Respuesta Secreta</strong></ion-label>\n\n      <ion-input type="password" [(ngModel)]="reset.respuesta" name="newPassword" [valid-input-as]="0"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating><strong> Ingrese una nueva contraseña</strong></ion-label>\n\n      <ion-input type="password" [(ngModel)]="reset.newPassword" name="newPassword" maxlength="16" [valid-input-as]="0"></ion-input>\n\n      <button ion-button item-right (click)="showPasswordHelp()">  ?  </button>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label floating><strong> Confirme su nueva contraseña</strong></ion-label>\n\n      <ion-input type="password" [(ngModel)]="reset.newPasswordConfirm" name="newPasswordConfirm" maxlength="16" [valid-input-as]="0"></ion-input>\n\n    </ion-item>\n\n    \n\n    <ion-item>\n\n        <ion-label floating><strong>Código de Seguridad</strong></ion-label>\n\n        <ion-input type="text" [(ngModel)]="reset.codigo" name="codigo" [valid-input-as]="3"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item *ngIf="\'\'+(countDown | async) as timeView" text-center>\n\n      <ion-row>\n\n        <ion-col *ngIf="timeView > 0">\n\n          {{ (timeView < 100 ? \'0\' : timeView.substr(0,1)) +\':\'+ (timeView < 100 ? timeView : timeView.substr(1,3)) }}  \n\n        </ion-col>\n\n        <ion-col *ngIf="timeView == 0">\n\n          <button ion-button class="round-bt" (click)="resendValidCode()">\n\n              <ion-icon name="refresh"></ion-icon>\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col>\n\n          <small *ngIf="timeView > 0">Tiempo restante para validar información</small>\n\n          <small *ngIf="timeView == 0">Reenviar código de seguridad</small>\n\n        </ion-col>  \n\n      </ion-row>\n\n    </ion-item>\n\n  </ion-list>\n\n  <button ion-button block color="secondary" (click)="validate()">Continuar</button>\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\reset-password\reset-password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 193;

/***/ }),

/***/ 404:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 404;

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__change_password_change_password__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__client_qa_request_client_qa_request__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__clientid_request_clientid_request__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__options_options__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__question_request_question_request__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, loadingCtrl, p2pServiceProvider, alertCtrl, navParams, platform, toastCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.formLoginData = {
            username: "",
            password: ""
        };
        this.username = "";
        this.password = "";
        this.isenabled = false;
        this.enableButtons(true);
        if (navParams.get("affiliationMsg")) {
            var toast = this.toastCtrl.create({
                message: 'Usuario afiliado exitosamente',
                showCloseButton: true
            });
            toast.present();
        }
    }
    HomePage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.validate = function () {
        if (this.formLoginData.username != '' && this.formLoginData.password != '') {
            this.tokenRequest();
        }
        else {
            this.displayMessage('Error', 'Complete todos los campos correctamente');
        }
    };
    HomePage.prototype.tokenRequest = function () {
        var _this = this;
        this.enableButtons(false);
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.tokenRequest(_this.formLoginData.username.toLowerCase(), _this.formLoginData.password)
                .then(function (data) {
                var res = data;
                _this.username = _this.formLoginData.username.toLowerCase();
                _this.password = _this.formLoginData.password;
                if (res._body != null || res.name != null) {
                    loader.dismiss();
                }
                else {
                    loader.dismiss();
                    _this.loginInApi();
                    _this.username = _this.formLoginData.username.toLowerCase();
                    _this.password = _this.formLoginData.password;
                }
            });
            _this.enableButtons(true);
        });
    };
    HomePage.prototype.loginInApi = function () {
        var _this = this;
        this.enableButtons(false);
        var loginObject = {
            username: this.username,
            password: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](this.password).toString(),
            canal: "04",
            fechahora_disp: new Date(),
            version: this.p2pServiceProvider.appVersion
        };
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.loginRequest(loginObject)
                .then(function (data) {
                _this.loginResponse = data;
                if (_this.loginResponse._body != null || _this.loginResponse.name != null) {
                    loader.dismiss(); // Otros errores
                }
                else {
                    loader.dismiss();
                    _this.clearForm();
                    _this.p2pServiceProvider.loginData = data;
                    _this.enableButtons(true);
                    if (_this.p2pServiceProvider.loginData.cod_respuesta == "107") {
                        _this.displayMessage("Aviso", _this.p2pServiceProvider.loginData.descripcion_respuesta);
                        var loginData = data;
                        loginData.isLoginCall = true;
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__change_password_change_password__["a" /* ChangePasswordPage */], {
                            loginData: loginData,
                            password: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](_this.password).toString(),
                            username: _this.username
                        });
                    }
                    else if (_this.loginResponse.cod_respuesta == "900") {
                        var alert_1 = _this.alertCtrl.create({
                            title: "Atención",
                            message: _this.loginResponse.descripcion_respuesta,
                            buttons: [
                                {
                                    text: 'OK',
                                    handler: function () {
                                        _this.platform.exitApp();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                    }
                    else if (_this.loginResponse.cod_respuesta == "123") {
                        _this.displayMessage("Aviso", _this.p2pServiceProvider.loginData.descripcion_respuesta);
                        var loginData = data;
                        loginData.usuario = _this.username;
                        loginData.isLoginCall = true;
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__client_qa_request_client_qa_request__["a" /* ClientQaRequestPage */], loginData);
                    }
                    else {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__options_options__["a" /* OptionsPage */], {
                            loginData: data,
                            password: __WEBPACK_IMPORTED_MODULE_1_crypto_js__["SHA512"](_this.password).toString(),
                            username: _this.username
                        });
                    }
                }
            });
        });
    };
    HomePage.prototype.goToResetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__question_request_question_request__["a" /* QuestionRequestPage */], { typeRequest: 0 });
    };
    HomePage.prototype.enableButtons = function (active) {
        if (active) {
            this.isenabled = true;
        }
        else {
            this.isenabled = false;
        }
    };
    HomePage.prototype.clearForm = function () {
        this.formLoginData.username = '';
        this.formLoginData.password = '';
    };
    HomePage.prototype.getViewAffiliation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__clientid_request_clientid_request__["a" /* ClientidRequestPage */]);
    };
    HomePage.prototype.goToChangeQA = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__question_request_question_request__["a" /* QuestionRequestPage */], { typeRequest: 1 });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\home\home.html"*/'<ion-header>\n\n	<ion-navbar color="primary">\n\n		<ion-title>\n\n			Bienvenido\n\n		</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="background">\n\n	<div class="container">\n\n		<img src="assets/images/logo_bicentenario.png" alt="">\n\n	</div>\n\n\n\n	<ion-card>\n\n		<ion-card-content>\n\n			<ion-list no-line>\n\n				<ion-item>\n\n					<ion-label floating>Usuario</ion-label>\n\n					<ion-input [(ngModel)]="formLoginData.username" type="text" maxlength="16" [valid-input-as]="0"></ion-input>\n\n				</ion-item>\n\n				<ion-item>\n\n					<ion-label floating>Contraseña</ion-label>\n\n					<ion-input [(ngModel)]="formLoginData.password" type="password" maxlength="16" [valid-input-as]="0"></ion-input>\n\n				</ion-item>\n\n				<button ion-button block (click)="validate();" color="secondary" [disabled]="!isenabled" [ngClass]="{class:isenabled,class2:!isenabled}">Ingresar</button>\n\n			</ion-list>\n\n\n\n\n\n		</ion-card-content>\n\n	</ion-card>\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<div text-center style="margin:1ex">\n\n		<button ion-button block (click)="getViewAffiliation();" color="primary" [disabled]="!isenabled">AFILIARSE</button>\n\n		<small>\n\n			<a href="#" (click)="goToResetPassword();"> ¿ OLVIDASTE TU CONTRASEÑA ? </a><br />\n\n			<a href="#" (click)="goToChangeQA();"> CAMBIAR PREGUNTA SECRETA </a>\n\n		</small>\n\n	</div>\n\n\n\n	<ion-toolbar>\n\n		<small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b><br>v1.3.5</small>\n\n	</ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 538:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyBalancePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_interval__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_observable_interval__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompanyBalancePage = /** @class */ (function () {
    function CompanyBalancePage(alertCtrl, loadingCtrl, navCtrl, navParams, p2pServiceProvider) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.accountBalance = "0,00";
    }
    CompanyBalancePage.prototype.ionViewDidLoad = function () { this.getCompanyBalance(); };
    CompanyBalancePage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['CERRAR']
        });
        alert.present();
    };
    CompanyBalancePage.prototype.getCompanyBalance = function () {
        var _this = this;
        this.isFreezeTime = true;
        __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].interval(11000).subscribe(function () { return _this.isFreezeTime = false; });
        var response;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present();
        this.p2pServiceProvider
            .companyBalanceRequest()
            .then(function (data) {
            loader.dismiss();
            response = data;
            if (response && parseInt(response.cod_respuesta) == 0) {
                if (response.monto != undefined)
                    _this.accountBalance = _this.formatAmount(response.monto.toString());
            }
            else if (response.cod_respuesta && response.descripcion_respuesta) {
                _this.displayMessage("Error", response.cod_respuesta + ' - ' + response.descripcion_respuesta);
            }
            else {
                _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
            }
        });
    };
    CompanyBalancePage.prototype.formatAmount = function (amount) {
        var formatRes = amount.toString().replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formatRes.indexOf(',') < 0 ? formatRes + ',00' : formatRes;
    };
    CompanyBalancePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-company-balance',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\company-balance\company-balance.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Totales\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-card-header color="white" text-center>Total Pagos Recibidos</ion-card-header>\n\n    <ion-row>\n\n      <ion-col col-3 text-center class="icon-border"><ion-icon name="stats"></ion-icon></ion-col>\n\n      <ion-col class="card-data">{{accountBalance}} Bs.</ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n\n\n  <div class="bt-dimen"><button ion-button block [disabled]="isFreezeTime" (click)="getCompanyBalance()">ACTUALIZAR</button></div>\n\n</ion-content>\n\n\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\company-balance\company-balance.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], CompanyBalancePage);
    return CompanyBalancePage;
}());

//# sourceMappingURL=company-balance.js.map

/***/ }),

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyReceivedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompanyReceivedPage = /** @class */ (function () {
    function CompanyReceivedPage(alertCtrl, dateView, loadingCtrl, navCtrl, navParams, p2pServiceProvider) {
        this.alertCtrl = alertCtrl;
        this.dateView = dateView;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.onGetMore = false;
        this.noResult = false;
        this.viewFilter = 0;
        this.payments = [];
        this.loginData = this.navParams.get('loginData');
    }
    CompanyReceivedPage.prototype.ionViewDidLoad = function () { this.getReceivedPayments(null, null, 0); };
    CompanyReceivedPage.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['CERRAR']
        });
        alert.present();
    };
    CompanyReceivedPage.prototype.formatAmount = function (amount) {
        var formatRes = amount.toString().replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formatRes.indexOf(',') < 0 ? formatRes + ',00' : formatRes;
    };
    CompanyReceivedPage.prototype.getBankName = function (code) {
        var bank = this.loginData.lista_bancos.filter(function (item) { return item.codigo == code; });
        return bank == null || bank.length == 0 ? '' : bank[0].nombre;
    };
    CompanyReceivedPage.prototype.maskPhone = function (phone) {
        if (phone.length > 10) {
            phone = phone.substring(0, 4) + 'XXX' + phone.substring(7, phone.length + 1);
        }
        return phone;
    };
    CompanyReceivedPage.prototype.getDividerFormat = function (date) {
        console.log("Date reference: " + date);
        if (parseInt(date) >= 1300) {
            date = (parseInt(date) - 1300).toString();
            switch (date.length) {
                case 3: return date.substring(0, 1) + ':' + date.substring(1, 3) + ' pm';
                case 4: return date.substring(0, 2) + ':' + date.substring(2, 4) + ' pm';
            }
        }
        switch (date.length) {
            case 3: return date.substring(0, 1) + ':' + date.substring(1, 3) + ' am';
            case 4: return date.substring(0, 2) + ':' + date.substring(2, 4) + ' am';
        }
    };
    CompanyReceivedPage.prototype.filterByDate = function () {
        var minDate = this.beginDate.substring(this.beginDate.indexOf('T') + 1, this.beginDate.indexOf('T') + 6);
        var maxDate = this.topDate.substring(this.topDate.indexOf('T') + 1, this.topDate.indexOf('T') + 6);
        minDate = minDate.replace(':', '');
        maxDate = maxDate.replace(':', '');
        if (parseInt(minDate) > parseInt(maxDate)) {
            this.displayMessage('Error', 'La hora hasta debe ser mayor a la hora desde.');
        }
        else {
            this.onGetMore = false;
            this.getReceivedPayments(minDate, maxDate, 0);
        }
    };
    CompanyReceivedPage.prototype.filterByPhone = function () {
        console.log("Filter me by Phone");
        if (this.phonecode == undefined || this.phonecode.length == 0) {
            this.displayMessage('Error', 'Debe seleccionar un prefijo válido.');
        }
        else if (this.phone == undefined || this.phone.toString().trim().length < 7 || (new RegExp(/^[0-9]+$/gi).test(this.phone.toString())) == false) {
            this.displayMessage("Error", "El número de teléfono debe contener mínimo 7 dígitos numéricos");
        }
        else {
            console.log("Aquí vamos a consultar con el teléfono");
            this.onGetMore = false;
            this.getPhoneReceivedPayments(0);
        }
    };
    CompanyReceivedPage.prototype.detailView = function (index) {
        var alert = this.alertCtrl.create({
            title: 'Detalle del Pago',
            message: '<b>Transacción Exitosa</b><hr/>' +
                '<b id="dateHead">Banco:</b> ' + this.payments[index].bank + '<br/>' +
                '<b id="dateHead">Fecha:</b> ' + this.dateView.transform(this.payments[index].tranDate, 'DATETIME') + '<br/>' +
                '<b id="dateHead">Monto:</b> ' + this.payments[index].formatAmount + ' Bs.<br/>' +
                '<b id="dateHead">Concepto:</b> ' + this.payments[index].concept + '<br/>' +
                '<b id="dateHead">Ref. Quantum:</b> ' + this.payments[index].traceQuantum + '<br/>' +
                '<b id="dateHead">Ref. Suiche:</b> ' + this.payments[index].switchCode,
            buttons: ['CERRAR']
        });
        alert.present();
    };
    CompanyReceivedPage.prototype.getPayments = function (id) {
        if (this.viewFilter != id) {
            this.viewFilter = id;
            switch (id) {
                case 0:
                    this.onGetMore = false;
                    this.getReceivedPayments(null, null, 0);
                    break;
                case 1:
                    var thisMoment = new Date();
                    var hourFormat = thisMoment.getHours() < 10 ? '0' + thisMoment.getHours() : thisMoment.getHours().toString();
                    hourFormat += ":" + thisMoment.getMinutes();
                    this.beginDate = hourFormat;
                    var nextHour = new Date(thisMoment.getTime() + 3600000);
                    hourFormat = nextHour.getHours() < 10 ? '0' + nextHour.getHours() : nextHour.getHours().toString();
                    hourFormat += ":" + thisMoment.getMinutes();
                    this.topDate = hourFormat;
                    break;
                case 2:
                    this.phonecode = '';
                    this.phone = '';
                    break;
            }
        }
    };
    CompanyReceivedPage.prototype.getMorePayments = function (reference) {
        this.onGetMore = true;
        switch (this.viewFilter) {
            case 0:
                this.getReceivedPayments(null, null, reference);
                break;
            case 1:
                var minDate = this.beginDate.substring(this.beginDate.indexOf('T') + 1, this.beginDate.indexOf('T') + 6);
                var maxDate = this.topDate.substring(this.topDate.indexOf('T') + 1, this.topDate.indexOf('T') + 6);
                this.getReceivedPayments(minDate.replace(':', ''), maxDate.replace(':', ''), reference);
                break;
            case 2:
                this.getPhoneReceivedPayments(reference);
                break;
        }
    };
    /***** SERVICES *****/
    CompanyReceivedPage.prototype.getReceivedPayments = function (minDate, maxDate, reference) {
        var _this = this;
        var response;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present();
        this.p2pServiceProvider.companyTranBalanceRequest(minDate, maxDate, reference)
            .then(function (data) {
            loader.dismiss();
            response = data;
            if (_this.onGetMore == false)
                _this.payments = [];
            if (response && parseInt(response.cod_respuesta) == 0) {
                if (response.lista_mov && response.lista_mov.length > 0) {
                    _this.noResult = false;
                    for (var _i = 0, _a = response.lista_mov; _i < _a.length; _i++) {
                        var data_1 = _a[_i];
                        var element = {
                            id: data_1.id,
                            bank: _this.getBankName(data_1.codigo_banco),
                            bankCode: data_1.codigo_banco,
                            amount: data_1.monto,
                            formatAmount: _this.formatAmount(data_1.monto),
                            phone: data_1.telefono,
                            concept: data_1.concepto,
                            tranDate: data_1.fecha_tran,
                            traceQuantum: data_1.trace_quantum,
                            switchCode: data_1.codigo_suiche
                        };
                        _this.payments.push(element);
                    }
                }
                else {
                    _this.noResult = true;
                }
            }
            else if (response.cod_respuesta && response.descripcion_respuesta) {
                _this.noResult = true;
                _this.displayMessage("Error", response.cod_respuesta + ' - ' + response.descripcion_respuesta);
            }
            else {
                _this.noResult = true;
                _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
            }
        });
    };
    CompanyReceivedPage.prototype.getPhoneReceivedPayments = function (reference) {
        var _this = this;
        var response;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present();
        this.p2pServiceProvider.companyPhoneBalanceRequest(this.phonecode + this.phone, reference)
            .then(function (data) {
            loader.dismiss();
            response = data;
            console.log("Active getMore ? " + _this.onGetMore);
            if (_this.onGetMore == false)
                _this.payments = [];
            if (response && parseInt(response.cod_respuesta) == 0) {
                if (response.lista_mov && response.lista_mov.length > 0) {
                    _this.noResult = false;
                    for (var _i = 0, _a = response.lista_mov; _i < _a.length; _i++) {
                        var data_2 = _a[_i];
                        var element = {
                            id: data_2.id,
                            bank: _this.getBankName(data_2.codigo_banco),
                            bankCode: data_2.codigo_banco,
                            amount: data_2.monto,
                            formatAmount: _this.formatAmount(data_2.monto),
                            phone: data_2.telefono,
                            concept: data_2.concepto,
                            tranDate: data_2.fecha_tran,
                            traceQuantum: data_2.trace_quantum,
                            switchCode: data_2.codigo_suiche
                        };
                        _this.payments.push(element);
                    }
                }
                else {
                    _this.noResult = true;
                }
            }
            else if (response.cod_respuesta && response.descripcion_respuesta) {
                _this.noResult = true;
                _this.displayMessage("Error", response.cod_respuesta + ' - ' + response.descripcion_respuesta);
            }
            else {
                _this.noResult = true;
                _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
            }
        });
    };
    CompanyReceivedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-company-received',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\company-received\company-received.html"*/'<ion-header>\n\n    <ion-navbar color="primary">\n\n      <ion-title>\n\n        Pagos Recibidos\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n    <ion-content padding>\n\n      <ion-segment class="section-bar" [ngClass]="{\'section-bar-fit\': viewFilter != 0 }">\n\n        <ion-row>\n\n          <ion-col col-4 text-center [ngClass]="{\'selected-start\': viewFilter == 0, \'unselected-sec\': viewFilter != 0}" (click)="getPayments(0)">TODOS</ion-col>\n\n          <ion-col col-4 text-center [ngClass]="{\'selected-sec\': viewFilter == 1, \'unselected-sec\': viewFilter != 1}" (click)="getPayments(1)">RANGO</ion-col>\n\n          <ion-col col-4 text-center [ngClass]="{\'selected-end\': viewFilter == 2, \'unselected-sec\': viewFilter != 2}" (click)="getPayments(2)">TLF</ion-col>\n\n        </ion-row>\n\n      </ion-segment>\n\n\n\n      <div [ngSwitch]="viewFilter" [ngClass]="{\'section-bar-input\': viewFilter != 0 }">\n\n        <!-- BY DATE -->\n\n        <ion-row *ngSwitchCase="1" class="section-input-row">\n\n          <ion-col col-5>\n\n            <ion-datetime displayFormat="h:mm a" [(ngModel)]="beginDate" cancelText="Cerrar" doneText="Aceptar"></ion-datetime>\n\n          </ion-col>\n\n          <ion-col col-5>\n\n            <ion-datetime displayFormat="h:mm a" [(ngModel)]="topDate" cancelText="Cerrar" doneText="Aceptar"></ion-datetime>\n\n          </ion-col>\n\n          <ion-col col-2 text-center style="padding:0;"><ion-icon name="search" color="primary" style="vertical-align: -webkit-baseline-middle;" (click)="filterByDate()"></ion-icon></ion-col>\n\n        </ion-row>\n\n        <!-- BY PHONE -->\n\n        <ion-row *ngSwitchCase="2" class="section-input-row">\n\n          <ion-col col-4>\n\n            <ion-select interface="popover" [(ngModel)]="phonecode">\n\n              <ion-option value="" disabled="true" selected>Prefijo</ion-option>\n\n              <ion-option *ngFor="let operator of loginData.lista_operadoras" value="{{operator.codigo}}">{{operator.codigo}}</ion-option>\n\n            </ion-select>\n\n          </ion-col>\n\n          <ion-col>\n\n            <ion-input type="tel" placeholder="Teléfono" [(ngModel)]="phone" minlength="7" maxlength="7"\n\n              onkeypress=\'return event.charCode >= 48 && event.charCode <= 57\'></ion-input>\n\n          </ion-col>\n\n          <ion-col col-3 text-center style="padding:0;"><ion-icon name="search" color="primary" style="vertical-align: -webkit-baseline-middle;" (click)="filterByPhone()"></ion-icon></ion-col>\n\n        </ion-row>\n\n      </div>\n\n\n\n      <ion-list *ngFor="let e of payments; let i = index; let isLast = last;">\n\n        <ion-item class="bottom-limit" (click)="detailView(i)">\n\n            <ion-icon name="checkmark-circle-outline" item-start></ion-icon>\n\n            <ion-row>\n\n              <ion-col col-9><p>{{ e.bank }}</p></ion-col>\n\n              <ion-col item-end style="margin:0;padding:0;text-align:right;">\n\n                <small class="hour-detail">{{ e.tranDate | dateview: \'TIME\' }}</small>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col><p>{{ e.phone }}</p></ion-col>\n\n              <ion-col item-end style="margin:0;text-align:right;"><p>{{ e.formatAmount }} Bs.</p></ion-col>\n\n            </ion-row>\n\n        </ion-item>\n\n        <ion-item *ngIf="isLast" text-center>\n\n          <div *ngIf="noResult && onGetMore" class="text-result" style="padding-top:0;">\n\n            No se encontraron más resultados<hr/>\n\n          </div>\n\n          <div *ngIf="!noResult" (click)="getMorePayments(e.id)">\n\n            <ion-icon name="arrow-down" color="primary"></ion-icon>\n\n          </div>\n\n        </ion-item>\n\n      </ion-list>\n\n\n\n      <div *ngIf="noResult && !onGetMore" class="text-result">\n\n        No se encontraron resultados para su busqueda<hr/>\n\n      </div>\n\n    </ion-content>\n\n\n\n    <ion-footer class="hideElementOnKeyboardShown">\n\n      <ion-toolbar>\n\n        <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n      </ion-toolbar>\n\n    </ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\company-received\company-received.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], CompanyReceivedPage);
    return CompanyReceivedPage;
}());

//# sourceMappingURL=company-received.js.map

/***/ }),

/***/ 540:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentOrderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__frecuent_selection_frecuent_selection__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order_detail_order_detail__ = __webpack_require__(543);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components






var PaymentOrderPage = /** @class */ (function () {
    function PaymentOrderPage(navCtrl, navParams, modalCtrl, alertCtrl, loadingCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.order = {
            bankName: '',
            code: '',
            phone: '',
            idType: '',
            idNumber: '',
            amount: '',
            concept: ''
        };
        this.username = navParams.get('username');
        this.loginData = navParams.get('loginData');
    }
    PaymentOrderPage.prototype.validate = function () {
        if (this.order.amount.trim().length == 0 || this.order.amount == "0,00") {
            this.displayMessage("Error", "Debe ingresar un monto válido mayor a cero");
        }
        else if (this.order.amount.trim() != "" && this.order.bankName != "" && this.order.code != ""
            && this.order.idNumber != "" && this.order.idType != "" && this.order.phone != ""
            && (new RegExp(/^\d{1,3}[\.(?=\d{3})]*,\d{1,2}/g)).test(this.order.amount) == true
            && !isNaN(Number(this.order.amount.replace(/\./g, "").replace(",", ".")))) {
            this.logForm();
        }
        else {
            this.displayMessage("Error", "Complete los campos correctamente.");
        }
    };
    PaymentOrderPage.prototype.logForm = function () {
        this.goToOrderDetail(this.order);
    };
    PaymentOrderPage.prototype.goToOrderDetail = function (order) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__order_detail_order_detail__["a" /* OrderDetailPage */], {
            bankName: order.bankName,
            code: order.code,
            phone: order.phone,
            idType: order.idType,
            idNumber: order.idNumber,
            amount: Number(order.amount.replace(/\./g, "").replace(",", ".")).toFixed(2),
            concept: order.concept,
            username: this.username,
            loginData: this.loginData,
        });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                if (data.status == true && data.response.cod_respuesta == "000") {
                    var summary = "<p><b>Banco:</b> " + order.bankName + "</p>"
                        + "<p><b>Teléfono:</b> " + order.code + "-" + order.phone + "</p>"
                        + "<p><b>Documento:</b> " + order.idType + "-" + order.idNumber + "</p>"
                        + "<p><b>Monto:</b> " + order.amount + "</p>"
                        + "<p><b>Referencia:</b> " + data.response.cod_aprobacion + "</p>";
                    _this.p2pServiceProvider.accountInfo.balance = _this.formatAmount(Number(data.response.saldo_disponible).toFixed(2));
                    _this.p2pServiceProvider.accountInfo.dailyLimit = _this.formatAmount(Number(_this.loginData.limite_diario - data.response.acu_diario).toFixed(2));
                    _this.p2pServiceProvider.accountInfo.monthLimit = _this.formatAmount(Number(_this.loginData.limite_mensual - data.response.acu_mensual).toFixed(2));
                    var alert_1 = _this.alertCtrl.create({
                        title: "Pago Exitoso",
                        message: summary,
                        buttons: [
                            {
                                text: 'Cerrar Sesión',
                                handler: function () {
                                    _this.logout();
                                }
                            },
                            {
                                text: 'Continuar',
                                handler: function () {
                                    _this.navCtrl.pop();
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                else if (data.status == true && data.response.cod_respuesta != "000" && data.response.name == null) {
                    _this.displayMessage("Error", data.response.cod_respuesta + ' - ' + data.response.descripcion_respuesta);
                    if (data.response.ind_act && data.response.ind_act == 0) {
                        _this.p2pServiceProvider.accountInfo.balance = _this.formatAmount(Number(data.response.saldo_disponible).toFixed(2));
                    }
                    if (data.response.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                        _this.navCtrl.popToRoot();
                    }
                }
            }
        });
    };
    PaymentOrderPage.prototype.displayMessage = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    };
    PaymentOrderPage.prototype.formatAmount = function (number) {
        return number.replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    PaymentOrderPage.prototype.getFrecuentView = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__frecuent_selection_frecuent_selection__["a" /* FrecuentSelectionPage */]);
        modal.onDidDismiss(function (data) {
            var frecuentData = data;
            if (frecuentData && frecuentData.bank) {
                //HAS DATA => LOAD FRECUENT PAYMENT DATA
                _this.order.bankName = frecuentData.bank;
                _this.order.idType = frecuentData.documentType;
                _this.order.idNumber = frecuentData.documentID;
                _this.order.code = frecuentData.phoneCode;
                _this.order.phone = frecuentData.phone;
            }
            else if (frecuentData && frecuentData.cod_respuesta && frecuentData.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                _this.navCtrl.popToRoot();
            }
        });
        modal.present();
    };
    PaymentOrderPage.prototype.logout = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.logoutRequest()
                .then(function (data) {
                loader.dismiss();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]);
                _this.navCtrl.popToRoot();
            });
        });
    };
    PaymentOrderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment-order',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\payment-order\payment-order.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Ordenar Pago\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <ion-list>\n\n    <ion-grid>\n\n\n\n      <ion-row>\n\n        <ion-col col-10>\n\n          <ion-item>\n\n            <ion-select [(ngModel)]="order.bankName" interface="popover">\n\n              <ion-option value="" disabled="true" selected="true">Banco Receptor</ion-option>\n\n              <ion-option *ngFor="let bank of loginData.lista_bancos" value="{{bank.nombre}}">{{bank.nombre}}</ion-option>\n\n            </ion-select>\n\n          </ion-item>\n\n        </ion-col>\n\n\n\n        <ion-col col-2>\n\n          <button ion-fab style="background-color:transparent" (click)="getFrecuentView()">\n\n            <ion-icon name="contacts" color="primary"></ion-icon></button>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-select interface="popover" [(ngModel)]="order.code" name="code">\n\n            <ion-option value="" disabled="true">Prefijo</ion-option>\n\n            <ion-option *ngFor="let operator of loginData.lista_operadoras" value="{{operator.codigo}}">{{operator.codigo}}</ion-option>\n\n          </ion-select>\n\n        </ion-col>\n\n        <ion-col>\n\n          <ion-input type="tel" placeholder="Teléfono" [(ngModel)]="order.phone" name="phone" minlength="7" maxlength="7" onkeypress=\'return event.charCode >= 48 && event.charCode <= 57\'></ion-input>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col col-6>\n\n          <ion-select interface="popover" [(ngModel)]="order.idType">\n\n            <ion-option value="" disabled="true">Documento</ion-option>\n\n            <ion-option *ngFor="let id of loginData.lista_tipoafi" value="{{id.codigo}}">{{id.codigo}}</ion-option>\n\n          </ion-select>\n\n        </ion-col>\n\n        <ion-col>\n\n          <ion-input type="tel" placeholder="N° Documento" [(ngModel)]="order.idNumber" name="idNumber" maxlength="10"\n\n            [valid-input-as]="0" onkeypress=\'return event.charCode >= 48 && event.charCode <= 57\' ></ion-input>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-item>\n\n            <ion-label stacked>Monto a pagar</ion-label>\n\n            <ion-input type="tel" name="amount" amount-formatter [(ngModel)]="order.amount" maxlength="15" placeholder="Ej: 5000 | 2500.75"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-item>\n\n            <ion-label stacked>Concepto</ion-label>\n\n            <ion-input type="text" [(ngModel)]="order.concept" name="concept" maxlength="34" [valid-input-as]="0"></ion-input>\n\n          </ion-item>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </ion-grid>\n\n\n\n    <button class="send" ion-button block color="secondary" (click)="validate()">Enviar</button>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\payment-order\payment-order.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], PaymentOrderPage);
    return PaymentOrderPage;
}());

//# sourceMappingURL=payment-order.js.map

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrecuentSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__frecuent_addition_frecuent_addition__ = __webpack_require__(542);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FrecuentSelectionPage = /** @class */ (function () {
    function FrecuentSelectionPage(alertCtrl, loadingCtrl, modalCtrl, navCtrl, navParams, p2pServiceProvider, viewCtrl) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.viewCtrl = viewCtrl;
        this.contactCero = false;
    }
    FrecuentSelectionPage.prototype.ionViewDidLoad = function () {
        this.searchFrecuentList();
    };
    FrecuentSelectionPage.prototype.ionViewDidLeave = function () {
        this.p2pServiceProvider.onViewMsgPresent = false;
    };
    FrecuentSelectionPage.prototype.getBankName = function (obj) {
        for (var _i = 0, _a = this.p2pServiceProvider.loginData.lista_bancos; _i < _a.length; _i++) {
            var elmt = _a[_i];
            if (elmt.codigo == obj.banco) {
                return elmt.nombre;
            }
        }
    };
    FrecuentSelectionPage.prototype.displayMessage = function (title, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.onDidDismiss(function () {
            _this.p2pServiceProvider.onViewMsgPresent = false;
        });
        alert.present();
    };
    FrecuentSelectionPage.prototype.searchFrecuentList = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.contactCero = false;
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.present().then(function () {
            _this.p2pServiceProvider.searchFrecuentList().then(function (data) {
                var res = data;
                loader.dismiss();
                if (res.cod_respuesta && res.descripcion_respuesta) {
                    if (isNaN(res.cod_respuesta) || parseInt(res.cod_respuesta) != 0) {
                        //ERROR
                        _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                        if (res.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                            _this.viewCtrl.dismiss({ cod_respuesta: res.cod_respuesta });
                        }
                    }
                    else {
                        //HANDLE RESPONSE
                        if (!res.lista_frecuentes || res.lista_frecuentes.length == 0) {
                            _this.contactCero = true;
                        }
                        else {
                            res.lista_frecuentes.forEach(function (element) {
                                element.bancoDesc = _this.getBankName(element);
                            });
                        }
                        _this.frecuentList = res.lista_frecuentes;
                        _this.p2pServiceProvider.onViewMsgPresent = false;
                    }
                }
                else {
                    _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                }
            });
        });
    };
    FrecuentSelectionPage.prototype.selectFrecuent = function (item) {
        var frecuentData = { bank: item.bancoDesc, completeName: item.nombre, documentType: item.tipo, documentID: item.cedula,
            phoneCode: item.telefono.substring(0, 4), phone: item.telefono.substring(4, item.telefono.length) };
        this.viewCtrl.dismiss(frecuentData);
    };
    FrecuentSelectionPage.prototype.deleteFrecuent = function (item) {
        var _this = this;
        this.p2pServiceProvider.onViewMsgPresent = true;
        var alert = this.alertCtrl.create({ enableBackdropDismiss: false,
            title: "Confirmación", subTitle: "Eliminar de pagos frecuentes los siguientes datos",
            message: "<p><strong>Nombre: </strong>" + item.nombre + "</p><p><strong>Banco: </strong>" + item.bancoDesc
                + "</p><p><strong>Documento: </strong>" + item.tipo + "-" + item.cedula
                + "</p><p><strong>Teléfono: </strong>" + item.telefono + "</p>",
            buttons: [{ text: 'NO' }, { text: 'SI', handler: function () {
                        var loader = _this.loadingCtrl.create({
                            content: "Procesando...",
                        });
                        loader.present().then(function () {
                            _this.p2pServiceProvider.modifyFrecuentList(item, true).then(function (data) {
                                var res = data;
                                loader.dismiss();
                                if (res.cod_respuesta && res.descripcion_respuesta) {
                                    if (isNaN(res.cod_respuesta) || parseInt(res.cod_respuesta) != 0) {
                                        //ERROR
                                        _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                                        if (res.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                                            _this.viewCtrl.dismiss({ cod_respuesta: res.cod_respuesta });
                                        }
                                    }
                                    else {
                                        //HANDLE RESPONSE
                                        var alert_1 = _this.alertCtrl.create({
                                            title: "Exito",
                                            subTitle: "Pago frecuente eliminado exitosamente",
                                            buttons: ['OK']
                                        });
                                        alert_1.onDidDismiss(function () {
                                            _this.searchFrecuentList();
                                        });
                                        alert_1.present();
                                    }
                                }
                                else {
                                    _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                                }
                            });
                        });
                    }
                }]
        });
        alert.present();
    };
    FrecuentSelectionPage.prototype.showAddFrecuentView = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__frecuent_addition_frecuent_addition__["a" /* FrecuentAdditionPage */]);
        modal.onDidDismiss(function (data) {
            var res = data;
            if (res && res.updateView == true) {
                _this.searchFrecuentList();
            }
            else if (res && res.cod_respuesta && res.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                _this.viewCtrl.dismiss({ cod_respuesta: res.cod_respuesta });
            }
        });
        modal.present();
    };
    FrecuentSelectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-frecuent-selection',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\frecuent-selection\frecuent-selection.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Contactos Frecuentes\n\n    </ion-title>\n\n\n\n    <ion-buttons end>\n\n      <button (click)="viewCtrl.dismiss();">\n\n        <ion-icon name="close-circle"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <p *ngIf="contactCero">No posee contactos frecuentes</p>\n\n\n\n  <ion-card *ngFor="let item of frecuentList" class="frecuent-card">\n\n    <ion-row>\n\n      <ion-col (click)="selectFrecuent(item)">\n\n          <ion-row>\n\n              <ion-col>\n\n                  <ion-title>{{item.nombre}}</ion-title>\n\n              </ion-col>\n\n          </ion-row>\n\n\n\n          <ion-row>\n\n              <ion-col>\n\n                  <ion-card-content class="compact">\n\n                      <div><span>{{item.bancoDesc}}</span></div>\n\n                      <span>{{item.telefono}}</span>  |  <span>{{item.tipo}}-{{item.cedula}}</span>\n\n                  </ion-card-content>\n\n              </ion-col>\n\n          </ion-row>\n\n      </ion-col>\n\n      <ion-col col-1>\n\n          <strong><ion-icon name="trash" color="primary" (click)="deleteFrecuent(item)"></ion-icon></strong>  \n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n\n\n  <ion-fab right bottom>\n\n    <button ion-fab (click)="showAddFrecuentView()"><ion-icon name="person-add"></ion-icon></button>\n\n  </ion-fab>\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\frecuent-selection\frecuent-selection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], FrecuentSelectionPage);
    return FrecuentSelectionPage;
}());

//# sourceMappingURL=frecuent-selection.js.map

/***/ }),

/***/ 542:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrecuentAdditionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FrecuentAdditionPage = /** @class */ (function () {
    function FrecuentAdditionPage(alertCtrl, loadingCtrl, navCtrl, navParams, p2pServiceProvider, viewCtrl) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.p2pServiceProvider = p2pServiceProvider;
        this.viewCtrl = viewCtrl;
    }
    FrecuentAdditionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FrecuentAdditionPage');
        this.bankList = this.p2pServiceProvider.loginData.lista_bancos;
        this.docTypes = this.p2pServiceProvider.loginData.lista_tipoafi;
        this.prefixList = this.p2pServiceProvider.loginData.lista_operadoras;
    };
    FrecuentAdditionPage.prototype.ionViewDidLeave = function () {
        this.p2pServiceProvider.onViewMsgPresent = false;
    };
    FrecuentAdditionPage.prototype.dismissAdditionView = function (doResearch) {
        this.viewCtrl.dismiss({ updateView: doResearch });
    };
    FrecuentAdditionPage.prototype.displayMessage = function (title, message) {
        var _this = this;
        this.p2pServiceProvider.onViewMsgPresent = true;
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.onDidDismiss(function () {
            _this.p2pServiceProvider.onViewMsgPresent = false;
        });
        alert.present();
    };
    FrecuentAdditionPage.prototype.validAdditionData = function () {
        var _this = this;
        if (!this.contactBank || this.contactBank.trim().length < 4) {
            this.displayMessage("Error", "Debe seleccionar un banco");
        }
        else if (!this.contactPrefix) {
            this.displayMessage("Error", "Debe ingresar el prefijo del número de teléfono");
        }
        else if (!this.contactPhone || isNaN(this.contactPhone.valueOf())) {
            this.displayMessage("Error", "Debe ingresar un número de teléfono valido");
        }
        else if (!this.contactType || this.contactType.trim().length == 0 ||
            !this.contactID || this.contactID.toString().trim().length == 0) {
            this.displayMessage("Error", "Debe ingresar un documento válido");
        }
        else if (isNaN(this.contactID.valueOf())) {
            this.displayMessage("Error", "Debe ingresar solo números en el número de documento");
        }
        else if (!this.contactName || this.contactName.trim().length == 0 || this.contactName.trim().length < 4 ||
            (new RegExp(/^[a-z0-9ñÑ\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC\u00C1\u00C9\u00CD\u00D3\u00DA\u00DC\s]+$/gi).test(this.contactName)) == false) {
            this.displayMessage("Error", "El nombre debe contener como mínimo 4 caracteres");
        }
        else if (this.contactPhone.toString().trim().length < 7 || (new RegExp(/^[0-9]+$/gi).test(this.contactPhone.toString())) == false) {
            this.displayMessage("Error", "El número de teléfono debe contener mínimo 7 dígitos numéricos");
        }
        else if (this.contactID.toString().length < 6 || (new RegExp(/^[0-9]+$/gi).test(this.contactID.toString())) == false) {
            this.displayMessage("Error", "El número de documento debe contener mínimo 6 dígitos numéricos");
        }
        else {
            var loader_1 = this.loadingCtrl.create({
                content: "Procesando...",
            });
            this.p2pServiceProvider.onViewMsgPresent = true;
            var requestBody_1 = { banco: this.contactBank,
                telefono: this.contactPrefix + this.contactPhone,
                tipo: this.contactType,
                cedula: this.contactID,
                nombre: this.contactName };
            loader_1.present().then(function () {
                _this.p2pServiceProvider.modifyFrecuentList(requestBody_1, false).then(function (data) {
                    var res = data;
                    loader_1.dismiss();
                    if (res.cod_respuesta && res.descripcion_respuesta) {
                        if (isNaN(res.cod_respuesta) || parseInt(res.cod_respuesta) != 0) {
                            //ERROR
                            _this.displayMessage("Error", res.cod_respuesta + ' - ' + res.descripcion_respuesta);
                            if (res.cod_respuesta == _this.p2pServiceProvider.SESSION_EXPIRED) {
                                _this.viewCtrl.dismiss({ cod_respuesta: res.cod_respuesta });
                            }
                        }
                        else {
                            //HANDLE RESPONSE
                            _this.dismissAdditionView(true);
                        }
                    }
                    else {
                        _this.displayMessage("Error", "Error de comunicación, mensaje no disponible");
                    }
                });
            });
        }
    };
    FrecuentAdditionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-frecuent-addition',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\frecuent-addition\frecuent-addition.html"*/'\n\n  <ion-content class="main-view">\n\n      <div class="overlay"></div>\n\n      <ion-scroll class="modal_content" scrollY="true">\n\n        <ion-navbar color="primary">\n\n          <ion-title>Nuevo Contacto</ion-title>\n\n        </ion-navbar>\n\n  \n\n        <ion-row>\n\n          <ion-col>\n\n            <strong>\n\n            <ion-select interface="popover" class="full-select" [(ngModel)]="contactBank">\n\n              <ion-option value="" disabled="true" selected="true">Banco Receptor</ion-option>\n\n              <ion-option *ngFor="let item of bankList" value="{{item.codigo}}">{{item.nombre}}</ion-option>\n\n            </ion-select>\n\n            </strong>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col class="padding-box">\n\n            <ion-label stacked><strong>Nombre Contacto</strong></ion-label>\n\n            <ion-input type="text" maxlength="20" [(ngModel)]="contactName" placeholder="Ingrese el nombre del contacto" [valid-input-as]="0"></ion-input>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-select interface="popover" [(ngModel)]="contactPrefix">\n\n              <ion-option value="" disabled="true" selected="true">Prefijo</ion-option>\n\n              <ion-option *ngFor="let item of prefixList" value="{{item.codigo}}">{{item.codigo}}</ion-option>\n\n            </ion-select>\n\n          </ion-col>\n\n  \n\n          <ion-col>\n\n            <ion-input type="tel" maxlength="7" [(ngModel)]="contactPhone" placeholder="Número" [valid-input-as]="0"></ion-input>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col col-6>\n\n            <ion-select interface="popover" [(ngModel)]="contactType">\n\n              <ion-option value="" disabled="true" selected="true">Documento</ion-option>\n\n              <ion-option *ngFor="let item of docTypes" value="{{item.codigo}}">{{item.codigo}}</ion-option>\n\n            </ion-select>\n\n          </ion-col>\n\n  \n\n          <ion-col>\n\n            <ion-input type="tel" maxlength="10" [(ngModel)]="contactID" placeholder="N° Documento" [valid-input-as]="0"></ion-input>\n\n          </ion-col>\n\n        </ion-row>\n\n        \n\n        <ion-row>\n\n          <ion-col>\n\n            <button ion-button block color="secondary" (click)="validAdditionData();">Agregar</button>\n\n          </ion-col>\n\n          <ion-col>\n\n            <button ion-button block color="primary" (click)="viewCtrl.dismiss();">Cancelar</button>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-scroll>\n\n    </ion-content>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\frecuent-addition\frecuent-addition.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_loading_loading_controller__["a" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]])
    ], FrecuentAdditionPage);
    return FrecuentAdditionPage;
}());

//# sourceMappingURL=frecuent-addition.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderDetailPage = /** @class */ (function () {
    function OrderDetailPage(navCtrl, navParams, viewCrtl, loadingCtrl, alertCtrl, p2pServiceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCrtl = viewCrtl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.bankName = this.navParams.get('bankName');
        this.code = this.navParams.get('code');
        this.phone = this.navParams.get('phone');
        this.idType = this.navParams.get('idType');
        this.idNumber = this.navParams.get('idNumber');
        this.amount = this.navParams.get('amount');
        if (this.navParams.get('concept') != null) {
            this.concept = this.navParams.get('concept');
        }
        this.username = navParams.get('username');
        this.loginData = navParams.get('loginData');
    }
    OrderDetailPage.prototype.close = function () {
        this.viewCrtl.dismiss({
            status: false
        });
    };
    OrderDetailPage.prototype.getBankCode = function (bankName) {
        var code = "";
        for (var _i = 0, _a = this.loginData.lista_bancos; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.nombre == bankName) {
                code = i.codigo;
            }
        }
        return code;
    };
    OrderDetailPage.prototype.paymentRequest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present().then(function () {
            var p2pObject = {
                "username": _this.username,
                "canal": "04",
                "codinstreceptor": _this.getBankCode(_this.bankName),
                "tlfdestino": _this.code + _this.phone,
                "concepto": _this.concept,
                "identificacion": _this.idType + _this.idNumber,
                "monto": _this.amount
            };
            _this.p2pServiceProvider.paymentP2PRequest(p2pObject)
                .then(function (data) {
                _this.p2pResponse = data;
                _this.viewCrtl.dismiss({
                    response: _this.p2pResponse,
                    status: true
                });
                loader.dismiss();
            });
        });
    };
    OrderDetailPage.prototype.formatAmount = function (number) {
        return number.replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    OrderDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-order-detail',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\order-detail\order-detail.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>Confirmar Pago</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="close()">\n\n        <ion-icon name="close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="container">\n\n    <img src="assets/images/logo_bicentenario.png" alt="">\n\n  </div>\n\n\n\n  <ion-list no-lines>\n\n    <ion-label class="no-margin">Banco Receptor</ion-label>\n\n    <ion-item class="no-margin">\n\n      <p>{{bankName}}</p>\n\n    </ion-item>\n\n\n\n    <ion-label class="no-margin">Celular del Receptor</ion-label>\n\n    <ion-item class="no-margin">\n\n      <p>{{code}}-{{phone}}</p>\n\n    </ion-item>\n\n\n\n    <ion-label class="no-margin">Documento del Receptor</ion-label>\n\n    <ion-item class="no-margin">\n\n      <p>{{idType}}-{{idNumber}}</p>\n\n    </ion-item>\n\n\n\n    <ion-label class="no-margin">Monto</ion-label>\n\n    <ion-item class="no-margin">\n\n      <p>{{this.formatAmount(amount)}}</p>\n\n    </ion-item>\n\n\n\n    <button ion-button block color="secondary" (click)="paymentRequest()" >Enviar</button>\n\n  </ion-list>\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n		<small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\order-detail\order-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], OrderDetailPage);
    return OrderDetailPage;
}());

//# sourceMappingURL=order-detail.js.map

/***/ }),

/***/ 544:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceivedPaymentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components




var ReceivedPaymentsPage = /** @class */ (function () {
    function ReceivedPaymentsPage(navCtrl, navParams, modalCtrl, alertCtrl, loadingCtrl, p2pServiceProvider, datePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.datePipe = datePipe;
        this.items = [];
        this.loginData = navParams.get('loginData');
        this.username = navParams.get('username');
        this.paymentsRequest();
    }
    ReceivedPaymentsPage.prototype.paymentsRequest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present().then(function () {
            var receivedPaymentsObject = {
                username: _this.username,
                canal: "04",
                fechahora_disp: new Date(),
                tipomov: "R"
            };
            _this.p2pServiceProvider.paymentsRequest(receivedPaymentsObject)
                .then(function (data) {
                _this.payments = data;
                if (_this.payments.name == null) {
                    loader.dismiss();
                    _this.createList(_this.payments);
                }
                else {
                    loader.dismiss();
                    _this.navCtrl.pop();
                }
            });
        });
    };
    ReceivedPaymentsPage.prototype.itemSelected = function (item) {
        var alert = this.alertCtrl.create({
            title: 'Detalle del Pago',
            message: '<b>Transacción Exitosa</b><hr/>' +
                '<b id="dateHead">Banco:</b> ' + item.codigo_banco + '<br/>' +
                '<b id="dateHead">Fecha:</b> ' + this.datePipe.transform(item.fecha_tran, 'DATETIME') + '<br/>' +
                '<b id="dateHead">Monto:</b> ' + this.numberWithCommas(item.monto) + ' Bs.<br/>' +
                '<b id="dateHead">Concepto:</b> ' + item.concepto + '<br/>' +
                '<b id="dateHead">Ref. Quantum:</b> ' + item.trace_quantum + '<br/>' +
                '<b id="dateHead">Ref. Suiche:</b> ' + item.codigo_suiche,
            buttons: ['CERRAR']
        });
        alert.present();
    };
    ReceivedPaymentsPage.prototype.createList = function (payments) {
        if (payments.lista_mov != null && payments.lista_mov.length > 0) {
            this.manageBankList(payments.lista_mov);
            for (var _i = 0, _a = payments.lista_mov; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.codigo_resp == "00") {
                    i.codigo_resp = "checkmark-circle-outline";
                }
                else {
                    i.codigo_resp = "close-circle";
                }
                this.items.push(i);
            }
        }
        else {
            if (this.payments.cod_respuesta == this.p2pServiceProvider.SESSION_EXPIRED) {
                //TOKEN EXPIRED -> LOG OUT ACTION
                this.displayMessage("Error", this.payments.cod_respuesta + " - " + this.payments.descripcion_respuesta);
                this.navCtrl.popToRoot();
            }
            else {
                this.displayMessage("Aviso", "No existen movimientos registrados");
                this.navCtrl.pop();
            }
        }
    };
    ReceivedPaymentsPage.prototype.manageBankList = function (payments) {
        for (var _i = 0, payments_1 = payments; _i < payments_1.length; _i++) {
            var i = payments_1[_i];
            for (var _a = 0, _b = this.loginData.lista_bancos; _a < _b.length; _a++) {
                var j = _b[_a];
                if (i.codigo_banco == j.codigo) {
                    i.codigo_banco = j.nombre;
                }
            }
        }
        return payments;
    };
    ReceivedPaymentsPage.prototype.numberWithCommas = function (number) {
        var aux = number;
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Colocando comas en formateo de miles
        var comma = /\,/gi;
        var dot = /\./gi;
        var asterisco = /\*/gi;
        number = number.replace(dot, "-");
        number = number.replace(comma, ".");
        number = number.replace(asterisco, ".");
        number = number.replace("-", ",");
        if (aux % 1 == 0) {
            number = number + ",00";
        }
        return number;
    };
    ReceivedPaymentsPage.prototype.displayMessage = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    };
    ReceivedPaymentsPage.prototype.maskPhone = function (phone) {
        if (phone.length > 10) {
            phone = phone.substring(0, 4) + 'XXX' + phone.substring(7, phone.length + 1);
        }
        return phone;
    };
    ReceivedPaymentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-received-payments',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\received-payments\received-payments.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Pagos Recibidos\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card-content>\n\n    <!-- Header -->\n\n    <ion-row class="table-header">\n\n      <ion-col col-4>\n\n        <span><strong>ESTADO</strong></span>\n\n      </ion-col>\n\n      <ion-col col-4>\n\n        <span><strong>DESCRIPCIÓN</strong></span>\n\n      </ion-col>\n\n      <ion-col col-4>\n\n        <span><strong>MONTO</strong></span>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <!--Body-->\n\n    <ion-grid>\n\n      <button ion-item *ngFor="let item of items" (click)="itemSelected(item)" detail-none>\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-icon name=\'{{item.codigo_resp}}\' item-start></ion-icon>\n\n          </ion-col>\n\n          <ion-col col-auto>\n\n            <div><span>{{item.codigo_banco}}</span></div>\n\n            <div><span>{{this.maskPhone(item.telefono)}}</span></div>\n\n            <div><span>{{item.fecha_tran | dateview: \'DATETIME\'}}</span></div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div><span>{{numberWithCommas(item.monto)}}</span></div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </button>\n\n    </ion-grid>\n\n  </ion-card-content>\n\n\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\received-payments\received-payments.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */]])
    ], ReceivedPaymentsPage);
    return ReceivedPaymentsPage;
}());

//# sourceMappingURL=received-payments.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SentPaymentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components




var SentPaymentsPage = /** @class */ (function () {
    function SentPaymentsPage(navCtrl, navParams, modalCtrl, alertCtrl, loadingCtrl, p2pServiceProvider, datePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.datePipe = datePipe;
        this.items = [];
        this.loginData = navParams.get('loginData');
        this.username = navParams.get('username');
        this.paymentsRequest();
    }
    SentPaymentsPage.prototype.paymentsRequest = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        this.p2pServiceProvider.onViewMsgPresent = true;
        loader.onDidDismiss(function () { _this.p2pServiceProvider.onViewMsgPresent = false; });
        loader.present().then(function () {
            var SentPaymentsObject = {
                username: _this.username,
                canal: "04",
                fechahora_disp: new Date(),
                tipomov: "E"
            };
            _this.p2pServiceProvider.paymentsRequest(SentPaymentsObject)
                .then(function (data) {
                _this.payments = data;
                if (_this.payments.name == null) {
                    loader.dismiss();
                    _this.createList(_this.payments);
                }
                else {
                    loader.dismiss();
                    _this.navCtrl.pop();
                }
            });
        });
    };
    SentPaymentsPage.prototype.itemSelected = function (item) {
        var tranState = item.codigo_resp == "checkmark-circle-outline" ? 'Transacción Exitosa' : 'Transacción Fallida';
        var alert = this.alertCtrl.create({
            title: 'Detalle del Pago',
            message: '<b>' + tranState + '</b><hr/>' +
                '<b id="dateHead">Banco:</b> ' + item.codigo_banco + '<br/>' +
                '<b id="dateHead">Fecha:</b> ' + this.datePipe.transform(item.fecha_tran, 'DATETIME') + '<br/>' +
                '<b id="dateHead">Monto:</b> ' + this.numberWithCommas(item.monto) + ' Bs.<br/>' +
                '<b id="dateHead">Concepto:</b> ' + item.concepto + '<br/>' +
                '<b id="dateHead">Ref. Quantum:</b> ' + item.trace_quantum + '<br/>' +
                '<b id="dateHead">Ref. Suiche:</b> ' + item.codigo_suiche,
            buttons: ['CERRAR']
        });
        alert.present();
    };
    SentPaymentsPage.prototype.createList = function (payments) {
        if (payments.lista_mov != null && payments.lista_mov.length > 0) {
            this.manageBankList(payments.lista_mov);
            for (var _i = 0, _a = payments.lista_mov; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.codigo_resp == "00") {
                    i.codigo_resp = "checkmark-circle-outline";
                }
                else {
                    i.codigo_resp = "close-circle";
                }
                this.items.push(i);
            }
        }
        else {
            if (this.payments.cod_respuesta == this.p2pServiceProvider.SESSION_EXPIRED) {
                //TOKEN EXPIRED -> LOG OUT ACTION
                this.displayMessage("Error", this.payments.cod_respuesta + " - " + this.payments.descripcion_respuesta);
                this.navCtrl.popToRoot();
            }
            else {
                this.displayMessage("Aviso", "No existen movimientos registrados");
                this.navCtrl.pop();
            }
        }
    };
    SentPaymentsPage.prototype.manageBankList = function (payments) {
        for (var _i = 0, payments_1 = payments; _i < payments_1.length; _i++) {
            var i = payments_1[_i];
            for (var _a = 0, _b = this.loginData.lista_bancos; _a < _b.length; _a++) {
                var j = _b[_a];
                if (i.codigo_banco == j.codigo) {
                    i.codigo_banco = j.nombre;
                }
            }
        }
        return payments;
    };
    SentPaymentsPage.prototype.numberWithCommas = function (number) {
        var aux = number;
        number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Colocando comas en formateo de miles
        var comma = /\,/gi;
        var dot = /\./gi;
        var asterisco = /\*/gi;
        number = number.replace(dot, "-");
        number = number.replace(comma, ".");
        number = number.replace(asterisco, ".");
        number = number.replace("-", ",");
        if (aux % 1 == 0) {
            number = number + ",00";
        }
        return number;
    };
    SentPaymentsPage.prototype.displayMessage = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    };
    SentPaymentsPage.prototype.maskPhone = function (phone) {
        if (phone.length > 10) {
            phone = phone.substring(0, 4) + 'XXX' + phone.substring(7, phone.length + 1);
        }
        return phone;
    };
    SentPaymentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-sent-payments',template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\sent-payments\sent-payments.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>\n\n      Pagos Emitidos\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-card-content>\n\n    <!-- Header -->\n\n    <ion-row class="table-header">\n\n      <ion-col col-4>\n\n        <span><strong>ESTADO</strong></span>\n\n      </ion-col>\n\n      <ion-col col-4>\n\n        <span><strong>DESCRIPCIÓN</strong></span>\n\n      </ion-col>\n\n      <ion-col col-4>\n\n        <span><strong>MONTO</strong></span>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <!--Body-->\n\n    <ion-grid>\n\n      <button ion-item *ngFor="let item of items" (click)="itemSelected(item)" detail-none>\n\n        <ion-row>\n\n          <ion-col>\n\n            <ion-icon name=\'{{item.codigo_resp}}\' item-start></ion-icon>\n\n          </ion-col>\n\n          <ion-col col-auto>\n\n            <div><span>{{item.codigo_banco}}</span></div>\n\n            <div><span>{{this.maskPhone(item.telefono)}}</span></div>\n\n            <div><span>{{item.fecha_tran | dateview: \'DATETIME\'}}</span></div>\n\n          </ion-col>\n\n          <ion-col>\n\n            <div><span>{{numberWithCommas(item.monto)}}</span></div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </button>\n\n    </ion-grid>\n\n  </ion-card-content>\n\n\n\n</ion-content>\n\n\n\n<ion-footer class="hideElementOnKeyboardShown">\n\n	<ion-toolbar>\n\n    <small>Comercializado por</small><br><small><b>Corporación Unidigital C.A. J-40148330-5.</b></small>\n\n	</ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\pages\sent-payments\sent-payments.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_2__pipes_dateview_dateview__["a" /* DateviewPipe */]])
    ], SentPaymentsPage);
    return SentPaymentsPage;
}());

//# sourceMappingURL=sent-payments.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(551);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_idle_keepalive__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_moment__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__directives_directives_module__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_affiliation_terms_affiliation_terms__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_affiliation_affiliation__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_change_password_change_password__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_client_qa_request_client_qa_request__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_clientid_request_clientid_request__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_company_balance_company_balance__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_company_received_company_received__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_frecuent_addition_frecuent_addition__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_frecuent_selection_frecuent_selection__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_options_options__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_order_detail_order_detail__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_payment_order_payment_order__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_phone_chooser_phone_chooser__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_question_request_question_request__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_received_payments_received_payments__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_reset_password_reset_password__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_sent_payments_sent_payments__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_verify_affiliation_verify_affiliation__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_pipes_module__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_p2p_service_p2p_service__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_timer_timer__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__app_component__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_common_locales_es__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_keyboard__ = __webpack_require__(904);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





 // this includes the core NgIdleModule but includes keepalive providers for easy wireup





























Object(__WEBPACK_IMPORTED_MODULE_33__angular_common__["j" /* registerLocaleData */])(__WEBPACK_IMPORTED_MODULE_32__angular_common_locales_es__["a" /* default */], 'es');
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_31__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_affiliation_affiliation__["a" /* AffiliationPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_affiliation_terms_affiliation_terms__["a" /* AffiliationTermsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_options_options__["a" /* OptionsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_clientid_request_clientid_request__["a" /* ClientidRequestPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_client_qa_request_client_qa_request__["a" /* ClientQaRequestPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_balance_company_balance__["a" /* CompanyBalancePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_received_company_received__["a" /* CompanyReceivedPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_payment_order_payment_order__["a" /* PaymentOrderPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_phone_chooser_phone_chooser__["a" /* PhoneChooserPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_received_payments_received_payments__["a" /* ReceivedPaymentsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_sent_payments_sent_payments__["a" /* SentPaymentsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_order_detail_order_detail__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_reset_password_reset_password__["a" /* ResetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_verify_affiliation_verify_affiliation__["a" /* VerifyAffiliationPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_question_request_question_request__["a" /* QuestionRequestPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_frecuent_addition_frecuent_addition__["a" /* FrecuentAdditionPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_frecuent_selection_frecuent_selection__["a" /* FrecuentSelectionPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_8__directives_directives_module__["a" /* DirectivesModule */],
                __WEBPACK_IMPORTED_MODULE_28__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_5__ng_idle_keepalive__["b" /* NgIdleKeepaliveModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_31__app_component__["a" /* MyApp */], {
                    backButtonText: '',
                    iconMode: 'ios',
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    tabsPlacement: 'bottom',
                    pageTransition: 'ios-transition'
                }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_31__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_affiliation_affiliation__["a" /* AffiliationPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_affiliation_terms_affiliation_terms__["a" /* AffiliationTermsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_options_options__["a" /* OptionsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_change_password_change_password__["a" /* ChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_clientid_request_clientid_request__["a" /* ClientidRequestPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_client_qa_request_client_qa_request__["a" /* ClientQaRequestPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_company_balance_company_balance__["a" /* CompanyBalancePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_company_received_company_received__["a" /* CompanyReceivedPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_payment_order_payment_order__["a" /* PaymentOrderPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_phone_chooser_phone_chooser__["a" /* PhoneChooserPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_received_payments_received_payments__["a" /* ReceivedPaymentsPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_sent_payments_sent_payments__["a" /* SentPaymentsPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_order_detail_order_detail__["a" /* OrderDetailPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_reset_password_reset_password__["a" /* ResetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_verify_affiliation_verify_affiliation__["a" /* VerifyAffiliationPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_question_request_question_request__["a" /* QuestionRequestPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_frecuent_addition_frecuent_addition__["a" /* FrecuentAdditionPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_frecuent_selection_frecuent_selection__["a" /* FrecuentSelectionPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_34__ionic_native_keyboard__["a" /* Keyboard */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["LOCALE_ID"], useClass: __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* IonicErrorHandler */], useValue: 'es' },
                __WEBPACK_IMPORTED_MODULE_29__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_timer_timer__["a" /* TimerProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 216,
	"./af.js": 216,
	"./ar": 217,
	"./ar-dz": 218,
	"./ar-dz.js": 218,
	"./ar-kw": 219,
	"./ar-kw.js": 219,
	"./ar-ly": 220,
	"./ar-ly.js": 220,
	"./ar-ma": 221,
	"./ar-ma.js": 221,
	"./ar-sa": 222,
	"./ar-sa.js": 222,
	"./ar-tn": 223,
	"./ar-tn.js": 223,
	"./ar.js": 217,
	"./az": 224,
	"./az.js": 224,
	"./be": 225,
	"./be.js": 225,
	"./bg": 226,
	"./bg.js": 226,
	"./bm": 227,
	"./bm.js": 227,
	"./bn": 228,
	"./bn-bd": 229,
	"./bn-bd.js": 229,
	"./bn.js": 228,
	"./bo": 230,
	"./bo.js": 230,
	"./br": 231,
	"./br.js": 231,
	"./bs": 232,
	"./bs.js": 232,
	"./ca": 233,
	"./ca.js": 233,
	"./cs": 234,
	"./cs.js": 234,
	"./cv": 235,
	"./cv.js": 235,
	"./cy": 236,
	"./cy.js": 236,
	"./da": 237,
	"./da.js": 237,
	"./de": 238,
	"./de-at": 239,
	"./de-at.js": 239,
	"./de-ch": 240,
	"./de-ch.js": 240,
	"./de.js": 238,
	"./dv": 241,
	"./dv.js": 241,
	"./el": 242,
	"./el.js": 242,
	"./en-au": 243,
	"./en-au.js": 243,
	"./en-ca": 244,
	"./en-ca.js": 244,
	"./en-gb": 245,
	"./en-gb.js": 245,
	"./en-ie": 246,
	"./en-ie.js": 246,
	"./en-il": 247,
	"./en-il.js": 247,
	"./en-in": 248,
	"./en-in.js": 248,
	"./en-nz": 249,
	"./en-nz.js": 249,
	"./en-sg": 250,
	"./en-sg.js": 250,
	"./eo": 251,
	"./eo.js": 251,
	"./es": 252,
	"./es-do": 253,
	"./es-do.js": 253,
	"./es-mx": 254,
	"./es-mx.js": 254,
	"./es-us": 255,
	"./es-us.js": 255,
	"./es.js": 252,
	"./et": 256,
	"./et.js": 256,
	"./eu": 257,
	"./eu.js": 257,
	"./fa": 258,
	"./fa.js": 258,
	"./fi": 259,
	"./fi.js": 259,
	"./fil": 260,
	"./fil.js": 260,
	"./fo": 261,
	"./fo.js": 261,
	"./fr": 262,
	"./fr-ca": 263,
	"./fr-ca.js": 263,
	"./fr-ch": 264,
	"./fr-ch.js": 264,
	"./fr.js": 262,
	"./fy": 265,
	"./fy.js": 265,
	"./ga": 266,
	"./ga.js": 266,
	"./gd": 267,
	"./gd.js": 267,
	"./gl": 268,
	"./gl.js": 268,
	"./gom-deva": 269,
	"./gom-deva.js": 269,
	"./gom-latn": 270,
	"./gom-latn.js": 270,
	"./gu": 271,
	"./gu.js": 271,
	"./he": 272,
	"./he.js": 272,
	"./hi": 273,
	"./hi.js": 273,
	"./hr": 274,
	"./hr.js": 274,
	"./hu": 275,
	"./hu.js": 275,
	"./hy-am": 276,
	"./hy-am.js": 276,
	"./id": 277,
	"./id.js": 277,
	"./is": 278,
	"./is.js": 278,
	"./it": 279,
	"./it-ch": 280,
	"./it-ch.js": 280,
	"./it.js": 279,
	"./ja": 281,
	"./ja.js": 281,
	"./jv": 282,
	"./jv.js": 282,
	"./ka": 283,
	"./ka.js": 283,
	"./kk": 284,
	"./kk.js": 284,
	"./km": 285,
	"./km.js": 285,
	"./kn": 286,
	"./kn.js": 286,
	"./ko": 287,
	"./ko.js": 287,
	"./ku": 288,
	"./ku.js": 288,
	"./ky": 289,
	"./ky.js": 289,
	"./lb": 290,
	"./lb.js": 290,
	"./lo": 291,
	"./lo.js": 291,
	"./lt": 292,
	"./lt.js": 292,
	"./lv": 293,
	"./lv.js": 293,
	"./me": 294,
	"./me.js": 294,
	"./mi": 295,
	"./mi.js": 295,
	"./mk": 296,
	"./mk.js": 296,
	"./ml": 297,
	"./ml.js": 297,
	"./mn": 298,
	"./mn.js": 298,
	"./mr": 299,
	"./mr.js": 299,
	"./ms": 300,
	"./ms-my": 301,
	"./ms-my.js": 301,
	"./ms.js": 300,
	"./mt": 302,
	"./mt.js": 302,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./oc-lnc": 309,
	"./oc-lnc.js": 309,
	"./pa-in": 310,
	"./pa-in.js": 310,
	"./pl": 311,
	"./pl.js": 311,
	"./pt": 312,
	"./pt-br": 313,
	"./pt-br.js": 313,
	"./pt.js": 312,
	"./ro": 314,
	"./ro.js": 314,
	"./ru": 315,
	"./ru.js": 315,
	"./sd": 316,
	"./sd.js": 316,
	"./se": 317,
	"./se.js": 317,
	"./si": 318,
	"./si.js": 318,
	"./sk": 319,
	"./sk.js": 319,
	"./sl": 320,
	"./sl.js": 320,
	"./sq": 321,
	"./sq.js": 321,
	"./sr": 322,
	"./sr-cyrl": 323,
	"./sr-cyrl.js": 323,
	"./sr.js": 322,
	"./ss": 324,
	"./ss.js": 324,
	"./sv": 325,
	"./sv.js": 325,
	"./sw": 326,
	"./sw.js": 326,
	"./ta": 327,
	"./ta.js": 327,
	"./te": 328,
	"./te.js": 328,
	"./tet": 329,
	"./tet.js": 329,
	"./tg": 330,
	"./tg.js": 330,
	"./th": 331,
	"./th.js": 331,
	"./tk": 332,
	"./tk.js": 332,
	"./tl-ph": 333,
	"./tl-ph.js": 333,
	"./tlh": 334,
	"./tlh.js": 334,
	"./tr": 335,
	"./tr.js": 335,
	"./tzl": 336,
	"./tzl.js": 336,
	"./tzm": 337,
	"./tzm-latn": 338,
	"./tzm-latn.js": 338,
	"./tzm.js": 337,
	"./ug-cn": 339,
	"./ug-cn.js": 339,
	"./uk": 340,
	"./uk.js": 340,
	"./ur": 341,
	"./ur.js": 341,
	"./uz": 342,
	"./uz-latn": 343,
	"./uz-latn.js": 343,
	"./uz.js": 342,
	"./vi": 344,
	"./vi.js": 344,
	"./x-pseudo": 345,
	"./x-pseudo.js": 345,
	"./yo": 346,
	"./yo.js": 346,
	"./zh-cn": 347,
	"./zh-cn.js": 347,
	"./zh-hk": 348,
	"./zh-hk.js": 348,
	"./zh-mo": 349,
	"./zh-mo.js": 349,
	"./zh-tw": 350,
	"./zh-tw.js": 350
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 567;

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__amount_formatter_amount_formatter__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__valid_input_as_valid_input_as__ = __webpack_require__(607);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_2__valid_input_as_valid_input_as__["a" /* ValidInputAsDirective */],
                __WEBPACK_IMPORTED_MODULE_1__amount_formatter_amount_formatter__["a" /* AmountFormatterDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_2__valid_input_as_valid_input_as__["a" /* ValidInputAsDirective */],
                __WEBPACK_IMPORTED_MODULE_1__amount_formatter_amount_formatter__["a" /* AmountFormatterDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AmountFormatterDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AmountFormatterDirective = /** @class */ (function () {
    function AmountFormatterDirective() {
        this.ngModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.DECIMAL_SEPARATOR = ",";
        this.THOUSANDS_SEPARATOR = ".";
        this.validInput = true;
    }
    AmountFormatterDirective.prototype.format = function (value) {
        var outValue = value.toString().trim();
        this.validInput = true;
        if (!isNaN(value) && outValue.length > 0) {
            if (outValue.indexOf(".") < 0 && outValue.indexOf(",") < 0) {
                //NO DECIMAL INDEX
                outValue = outValue.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
                outValue += ",00";
            }
            else if (outValue.indexOf(".") == outValue.lastIndexOf(".") && outValue.indexOf(",") < 0) {
                //DECIMAL BY DOT
                outValue = outValue.replace(".", ",");
                outValue = outValue.substring(0, outValue.indexOf(",")).replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR)
                    + outValue.substring(outValue.indexOf(","), outValue.length);
                if (outValue.lastIndexOf(",") == outValue.length - 1) {
                    //COMPLETE DECIMALS
                    outValue += "00";
                }
            }
            else if (outValue.indexOf(",") == outValue.lastIndexOf(",") && (outValue.indexOf(".") < 0 || outValue.lastIndexOf(".") < outValue.lastIndexOf(","))) {
                //DECIMAL BY COMMA
                outValue = outValue.replace(/\./gi, "");
                outValue = outValue.substring(0, outValue.indexOf(",")).replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR)
                    + outValue.substring(outValue.indexOf(","), outValue.length);
                if (outValue.lastIndexOf(",") == outValue.length - 1) {
                    //COMPLETE DECIMALS
                    outValue += "00";
                }
            }
        }
        else if (outValue.indexOf(",") > 0 && outValue.indexOf(",") == outValue.lastIndexOf(",") && (outValue.indexOf(".") < 0 || outValue.lastIndexOf(".") < outValue.lastIndexOf(","))) {
            //DECIMAL BY COMMA
            outValue = outValue.replace(/\./gi, "");
            outValue = outValue.substring(0, outValue.indexOf(",")).replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR)
                + outValue.substring(outValue.indexOf(","), outValue.length);
            if (outValue.lastIndexOf(",") == outValue.length - 1) {
                //COMPLETE DECIMALS
                outValue += "00";
            }
        }
        else {
            this.validInput = false;
        }
        //DELIMIT TO 2 DECIMALS
        if (outValue.indexOf(",") >= 0) {
            if ((outValue.indexOf(",") + 3) < outValue.length) {
                outValue = outValue.substring(0, (outValue.indexOf(",") + 3));
            }
            if (outValue.indexOf(",") == 0) {
                outValue = "0" + outValue;
            }
            if ((outValue.indexOf(",") + 1) == outValue.length) {
                outValue = outValue + "00";
            }
        }
        else if (outValue == ".") {
            outValue = "0,00";
        }
        if (this.validInput && !isNaN(Number(outValue.replace(/\./g, "").replace(",", ".")))) {
            //UNFORMAT -> Number -> Format (this is for delete initial ceros for a valid amount 00031)
            outValue = Number(outValue.replace(/\./g, "").replace(",", ".")).toFixed(2).replace(/\./gi, ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        this.ngModelChange.emit(outValue);
        return outValue;
    };
    AmountFormatterDirective.prototype.cleanFormat = function (value) {
        var cleanValue = value.toString();
        if (this.validInput) {
            while (cleanValue.indexOf(".") >= 0) {
                cleanValue = cleanValue.replace(".", "");
            }
            cleanValue = cleanValue.replace(",", ".");
        }
        return cleanValue;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AmountFormatterDirective.prototype, "ngModelChange", void 0);
    AmountFormatterDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[amount-formatter]',
            host: {
                '(focus)': '$event.target.value = this.cleanFormat($event.target.value)',
                '(blur)': '$event.target.value = this.format($event.target.value)'
            }
        }),
        __metadata("design:paramtypes", [])
    ], AmountFormatterDirective);
    return AmountFormatterDirective;
}());

//# sourceMappingURL=amount-formatter.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidInputAsDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidInputAsDirective = /** @class */ (function () {
    function ValidInputAsDirective() {
        this.ngModelChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    // constructor(private el: ElementRef) {}
    //(keypress)': 'validInput($event) <<DELETED>>
    ValidInputAsDirective.prototype.validInput = function (e) {
        switch (this.inputType) {
            case 0://As Alphanumeric
                break;
            case 1://As Number Only
                if ('0123456789'.includes(e.key) == false) {
                    e.preventDefault();
                    return;
                }
                break;
            case 3://As Alphanumeric (No speacial characters)
                console.log("valid as 3 > " + (e.keyCode));
                if (!(' '.includes(e.key)) && !e.key.match('[0-9]') && !e.key.match('[a-z]') && !e.key.match('[A-Z]')) {
                    e.preventDefault();
                    return;
                }
                else if (e.keyCode == 42 || e.keyCode == 45 || e.keyCode == 47) {
                    e.preventDefault();
                    return;
                }
                break;
            case 4://As Alphanumeric (some speacial characters)
                console.log("valid as 4 > " + (e.keyCode));
                if (!(' .-_*'.includes(e.key)) && !e.key.match('[0-9]') && !e.key.match('[a-z]') && !e.key.match('[A-Z]')) {
                    e.preventDefault();
                    return;
                }
                else if (e.keyCode == 47) {
                    e.preventDefault();
                    return;
                }
                break;
        }
    };
    ValidInputAsDirective.prototype.onBlur = function (target) {
        if (target.value.length > 0) {
            target.value = target.value.trim();
            this.ngModelChange.emit(target.value);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('valid-input-as'),
        __metadata("design:type", Number)
    ], ValidInputAsDirective.prototype, "inputType", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ValidInputAsDirective.prototype, "ngModelChange", void 0);
    ValidInputAsDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[valid-input-as]',
            host: { '(blur)': 'onBlur($event.target)' }
        }),
        __metadata("design:paramtypes", [])
    ], ValidInputAsDirective);
    return ValidInputAsDirective;
}());

//# sourceMappingURL=valid-input-as.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dateview_dateview__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__dateview_dateview__["a" /* DateviewPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__dateview_dateview__["a" /* DateviewPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_idle_core__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_idle_keepalive__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_affiliation_terms_affiliation_terms__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_affiliation_affiliation__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_clientid_request_clientid_request__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_phone_chooser_phone_chooser__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_question_request_question_request__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_reset_password_reset_password__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_verify_affiliation_verify_affiliation__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Modules & Components














var TimerProvider = /** @class */ (function () {
    function TimerProvider(idle, keepalive, alertCtrl, p2pServiceProvider, app) {
        var _this = this;
        this.idle = idle;
        this.keepalive = keepalive;
        this.alertCtrl = alertCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.app = app;
        this.lastPing = null;
        this.timedOut = false;
        idle.setIdle(90);
        idle.setTimeout(90);
        idle.setInterrupts(__WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["a" /* DEFAULT_INTERRUPTSOURCES */]);
        idle.onTimeout.subscribe(function () {
            if (!(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_6__pages_affiliation_affiliation__["a" /* AffiliationPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_5__pages_affiliation_terms_affiliation_terms__["a" /* AffiliationTermsPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_7__pages_clientid_request_clientid_request__["a" /* ClientidRequestPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_9__pages_phone_chooser_phone_chooser__["a" /* PhoneChooserPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_10__pages_question_request_question_request__["a" /* QuestionRequestPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_11__pages_reset_password_reset_password__["a" /* ResetPasswordPage */]) &&
                !(_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_12__pages_verify_affiliation_verify_affiliation__["a" /* VerifyAffiliationPage */])) {
                _this.timedOut = true;
                _this.displayMessage("Aviso", "La sesión ha caducado, por favor ingrese nuevamente");
                _this.app.getActiveNav().popToRoot();
                _this.p2pServiceProvider.logoutRequest();
            }
            _this.reset();
        });
        // sets the ping interval to 15 seconds
        this.keepalive.interval(15);
        this.keepalive.onPing.subscribe(function () { return _this.lastPing = new Date(); });
        this.reset();
    }
    TimerProvider.prototype.reset = function () {
        this.idle.watch();
        this.timedOut = false;
    };
    TimerProvider.prototype.displayMessage = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    TimerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ng_idle_core__["b" /* Idle */],
            __WEBPACK_IMPORTED_MODULE_3__ng_idle_keepalive__["a" /* Keepalive */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_13__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]])
    ], TimerProvider);
    return TimerProvider;
}());

//# sourceMappingURL=timer.js.map

/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_options_options__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_p2p_service_p2p_service__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, app, alertCtrl, loadingCtrl, p2pServiceProvider) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.p2pServiceProvider = p2pServiceProvider;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.idleState = 'Not started.';
        this.timedOut = false;
        this.lastPing = null;
        this.backLogoutActive = false;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            window.addEventListener('keyboardWillShow', function (e) {
                document.body.classList.add('keyboard-is-open');
            });
            window.addEventListener('keyboardWillHide', function () {
                document.body.classList.remove('keyboard-is-open');
            });
            platform.registerBackButtonAction(function () {
                if (_this.p2pServiceProvider.onViewMsgPresent) {
                    //DO NOTHING - VIEW MESSAGE PRESENT
                }
                else if (_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_5__pages_options_options__["a" /* OptionsPage */]) {
                    if (_this.backLogoutActive == false) {
                        var alert_1 = _this.alertCtrl.create({
                            title: "Salir",
                            message: "¿Desea salir de la aplicación?",
                            enableBackdropDismiss: false,
                            buttons: [
                                {
                                    text: 'SI',
                                    handler: function () {
                                        //RE-VALID FOR ALERT PRESENT ON CHANGE NAV
                                        if (_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_5__pages_options_options__["a" /* OptionsPage */]) {
                                            _this.logout();
                                        }
                                        else {
                                            _this.backLogoutActive = false;
                                        }
                                    }
                                },
                                {
                                    text: 'NO',
                                    handler: function () {
                                        _this.backLogoutActive = false;
                                    }
                                }
                            ]
                        });
                        _this.backLogoutActive = true;
                        alert_1.present();
                    }
                }
                else if (_this.app.getActiveNav().getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]) {
                    _this.platform.exitApp();
                }
                else {
                    _this.app.getActiveNav().pop();
                }
            });
        });
    }
    MyApp.prototype.logout = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Procesando...",
        });
        loader.present().then(function () {
            _this.p2pServiceProvider.logoutRequest()
                .then(function (data) {
                loader.dismiss();
                _this.backLogoutActive = false;
                _this.app.getActiveNav().popToRoot();
            });
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\Trabajos\EFT\bicentenario-p2p-movil\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_p2p_service_p2p_service__["a" /* P2PServiceProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateviewPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DateviewPipe = /** @class */ (function () {
    function DateviewPipe() {
    }
    DateviewPipe.prototype.transform = function (value, dateType) {
        if (dateType != undefined && (dateType.toUpperCase() == 'DATETIME' || dateType.toUpperCase() == 'TIME')) {
            var hourType = ' AM';
            var showOnlyHour = (dateType.toUpperCase() == 'TIME');
            var time = value.substring(value.indexOf("T") + 1, value.length);
            var hourFraction = time.substring(0, 2);
            if (parseInt(hourFraction) > 12) {
                hourFraction = (parseInt(hourFraction) - 12).toString();
                if (hourFraction.length == 1)
                    hourFraction = '0' + hourFraction;
                hourType = ' PM';
            }
            else if (parseInt(hourFraction) == 12) {
                hourType = ' PM';
            }
            hourFraction = hourFraction == '00' ? '12' : hourFraction;
            return (showOnlyHour ? '' : ((new __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */]('es')).transform(value, 'dd/MM/yyyy')) + ' ') + hourFraction + time.substring(2, 5) + hourType;
        }
        else {
            return (new __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */]('es')).transform(value, 'dd/MM/yyyy');
        }
    };
    DateviewPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
            name: 'dateview',
        })
    ], DateviewPipe);
    return DateviewPipe;
}());

//# sourceMappingURL=dateview.js.map

/***/ })

},[546]);
//# sourceMappingURL=main.js.map