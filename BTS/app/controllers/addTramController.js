app.controller('addTramController',['$scope', '$http', 'ngAuthSettings', function ($scope,$http,ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    $scope.ViDo = "";
    $scope.KinhDo = "";
    $scope.map = { center: { latitude: 21.0277644, longitude: 105.83415979999995 }, zoom: 10 };
    $scope.marker = [];
    $scope.names = [];
    $http({ url: serviceBase + 'api/Account/GetAllQuanLy', method: 'GET' })
    .success(function (data, status, headers, config) {
        $scope.names = data;
    }).error(function(e){console.log(e)});
    $scope.$on('gmPlacesAutocomplete::placeChanged', function () {
        var location = $scope.autocomplete.getPlace().geometry.location;
        
        $scope.ViDo = location.lat();
        $scope.KinhDo = location.lng();
       
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

    //add tram

    $scope.ThemTram = function () {
        console.log('vao day');
        var Tram = {
            TenTram: $scope.TenTram,
            CotAnten: 15,
            CotTiepDat: 15,
            SanTram: 15,
            Tinh: $scope.Tinh,
            ViDo: $scope.ViDo,
            KinhDo: $scope.KinhDo,
            IDQuanLy: $scope.IDQuanLy,
            BanKinhPhuSong: $scope.BanKinhPhuSong
        }
        console.log(Tram);
        //console.log($scope.Data.CauCap.$valid);
            
        $http.post(serviceBase + "api/Trams", Tram).success(function (data) {
                alert('Thêm Trạm Thành Công');
                console.log(data);
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong " + data.ExceptionMessage;
            });
        
    }
}]);
