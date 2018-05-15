'use strict';
app.controller('tramsController', ['$rootScope', '$scope', '$http', 'ngAuthSettings', 'localStorageService', function ($rootScope,$scope, $http, ngAuthSettings, localStorageService) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
  
    //this is for default map focus when load first time
    $scope.map = { center: { latitude: 16.041861, longitude: 108.197028 }, zoom: 10 };
    $scope.markers = [];
    $scope.locations = [];
    $scope.names = [];
    $http({ url: serviceBase + 'api/Trams', method: 'GET' })
    .success(function (data, status, headers, config) {
        //console.log(headers); // Should log 'foo'
        //console.log(config);     
        //$scope.locations.forEach(function (e) {
        //    alert('ok');
        //    console.log(e.TenTram);
        //});
        $scope.locations = data;
     
            
        //console.log(data);
        $scope.locations.forEach(function (e) {
            //console.log(e.IDQuanLy);
            $http({ url: serviceBase + 'api/Account/GetUser?id=' + e.IDQuanLy, method: 'GET' })
            .success(function (data) {
                //console.log('vao day');
                $scope.names.push(data.Ten);
                //console.log($scope.names);
            });
            $scope.markers.push({
                id: e.IDTram,
                coords: { latitude: e.ViDo, longitude: e.KinhDo },
                title: e.TenTram,
                address: e.Tinh,
                
                radius: e.BanKinhPhuSong,
                options: { draggable: false, icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }
            });
    });
        //var Arrmaker = [];
        //var parsed = JSON.parse(JSON.stringify($scope.locations));
        //for (var x in parsed) {
        //    Arrmaker.push(parsed[x]);
        //}
        //for (var i = 0; i < Arrmaker.length; i++) {
        //    $scope.markers.push({
        //        id: Arrmaker[i].LocationID,
        //        coords: { latitude: Arrmaker[i].Lat, longitude: Arrmaker[i].Long },
        //        title: Arrmaker[i].title,
        //        address: Arrmaker[i].Address,
        //        image: Arrmaker[i].ImagePath,
        //        options: { draggable: true, icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' }
        //    });
        //}
    }, function () {
        alert('Error');
    });

    
    
    $scope.ShowLocation = function (IDTram) {
    $http({ url: serviceBase + 'api/Trams/' + IDTram, method: 'GET' })
    .success(function (data, status, headers, config) {
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
        $scope.windowOptions = {
            show: true
        };

    }

}]);