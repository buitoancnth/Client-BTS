
var app = angular.module('BTSApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'uiGmapgoogle-maps', 'ui.bootstrap','gm']);

//app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//    GoogleMapApi.configure({
//        key: 'AIzaSyCDd1mR0LEylwyaoa692EBMmaY1UctoCts',
//        v: '3.30',
//        libraries: 'places'
//    });
//}]);
app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });
    $routeProvider.when("/trams", {
        controller: "tramsController",
        templateUrl: "/app/views/trams.html"
    });
    $routeProvider.when("/quan-ly-tram", {
        controller: "quanLyTramController",
        templateUrl: "/app/views/quanLyTram.html"
    });
    $routeProvider.when("/add-tram", {
        controller: "addTramController",
        templateUrl: "/app/views/addTram.html"
    });
    $routeProvider.when("/edit-tram", {
        controller: "editTramController",
        templateUrl: "/app/views/editTram.html"
    });
    $routeProvider.when("/danh-sach-tram-grid", {
        controller: "tramsController",
        templateUrl: "/app/views/danhSachTramGrid.html"
    });
    $routeProvider.when("/danh-sach-user", {
        controller: "ListUserController",
        templateUrl: "/app/views/ListUser.html"
    });
    $routeProvider.when("/danh-sach-tram-quan-ly", {
        controller: "DanhSachTramController",
        templateUrl: "/app/views/DanhSachTram.html"
    });
    $routeProvider.otherwise({ redirectTo: "/trams" });

});

var serviceBase = 'http://localhost:57219/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});
app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);

app.filter('myFormat', function () {
    return function (x) {
        var result = "";
        if (x <= 5) {
            result = "xấu";
        } else if (x <= 10) {
            result = "Trung Binh";
        } else {
            result = "Tốt";
        }
        return result;
    };
});


