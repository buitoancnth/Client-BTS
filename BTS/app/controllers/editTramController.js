'use strict';
app.controller('editTramController', ['$rootScope', '$scope', '$http', '$location', 'ngAuthSettings', function ($rootScope, $scope, $http, $location, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var IDTram = $location.search().id;
    $scope.ViDo = "";
    $scope.KinhDo = "";
    $scope.map = { center: { latitude: 21.0277644, longitude: 105.83415979999995 }, zoom: 10 };
    $scope.marker = [];
    $scope.names = [];
    $http({ url: serviceBase + 'api/Account/GetAllQuanLy', method: 'GET' })
    .success(function (data, status, headers, config) {
        $scope.names = data;
    }).error(function (e) { console.log(e) });


    $http({ url: serviceBase + 'api/Trams/' + IDTram, method: 'GET' })
    .success(function (data, status, headers, config) {
        $scope.Tram = data;
        //clear markers 
        $scope.markers = [];
        $scope.markers.push({
            id: data.IDTram,
            coords: { latitude: data.ViDo, longitude: data.KinhDo },
            title: data.TenTram,
            address: data.Tinh,
            zoom: 8,
            fit: true,
            image: data.Tinh
        });

        //set map focus to center
        $scope.map.center.latitude = data.ViDo;
        $scope.map.center.longitude = data.KinhDo;

    }, function () {
        alert('Error');
    });
 

    $scope.$on('gmPlacesAutocomplete::placeChanged', function () {
        var location = $scope.autocomplete.getPlace().geometry.location;

        $scope.Tram.ViDo = location.lat();
        $scope.Tram.KinhDo = location.lng();

        $scope.markers = [];
        $scope.markers.push({
            id: "id",
            coords: { latitude: location.lat(), longitude: location.lng() },
            title: "tt",
            address: "Tinh",
            zoom: 8,
            fit: true,
            image: "tinh"
        });

        //set map focus to center
        $scope.map.center.latitude = location.lat();
        $scope.map.center.longitude = location.lng();
        $scope.$apply();
    });

    $scope.CapNhatTram = function (IDTram, Tram) {
        //console.log(Tram);
        //console.log($scope.Data.CauCap.$valid);
        if (IDTram > 0) {
            $http.put(serviceBase + "api/Trams?id=" + IDTram, Tram).success(function (data) {
               
                //console.log('/quan-ly-tram?id=' + IDTram);
                $location.path("/quan-ly-tram").search('id='+IDTram);
                alert('Cập Nhật Trạm Thành Công');
                //console.log(data);
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
            });
        }
    }
}]);