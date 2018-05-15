'use strict';
app.controller('DanhSachTramController', ['$scope', '$http', '$location', 'ngAuthSettings', 'localStorageService', function ($scope, $http, $location, ngAuthSettings, localStorageService) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var IDUser = $location.search().id;
    $http({ url: serviceBase + 'api/TramsByIdQuanLy?id=' + IDUser, method: 'GET' })
     .success(function (data, status, headers, config) {
         $scope.Trams = data;
     });

}]);
