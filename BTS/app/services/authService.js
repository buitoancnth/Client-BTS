'use strict';
app.factory('authService', ['$rootScope', '$http', '$q', 'localStorageService', 'ngAuthSettings', function ($rootScope,$http, $q, localStorageService, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};
    var data1 = {};
    var _authentication = {
        isAuth: false,
        ChucVu : "",
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
        
        var deferred = $q.defer();
        
        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            $http({ url: serviceBase + 'api/Account/GetQuyen?Email=' + loginData.userName, method: 'GET' })
                .success(function (data1) {
                    $rootScope.quyen = data1.ChucVu;
                    console.log($rootScope.quyen);
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, ChucVu: data1.ChucVu });
                    
                    _authentication.ChucVu = data1.ChucVu;
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);
                });
            

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.ChucVu = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.ChucVu = authData.ChucVu;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;

    return authServiceFactory;
}]);