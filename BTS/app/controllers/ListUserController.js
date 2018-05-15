'use strict';
app.controller('ListUserController', ['$scope', '$http','$location', 'ngAuthSettings', 'localStorageService', function ($scope, $http,$location, ngAuthSettings, localStorageService) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    $http({ url: serviceBase + 'api/Account/GetAllUser', method: 'GET' })
     .success(function (data, status, headers, config) {
         $scope.Users = data;
         //console.log(data);
     });
    $scope.ThemUser = function () {
        var user = {
            Email: $scope.Email,
            Ten: $scope.Ten,
            DiaChi: $scope.DiaChi,
            NgaySinh: $scope.NgaySinh,
            GioiTinh: $scope.GioiTinh,
            Phone: $scope.Phone,
            Image: "tam_12345.jpg",
            ChucVu: $scope.ChucVu,
            Password: "123123Aa@",
            ConfirmPassword: "123123Aa@"
        }
        console.log(user);
        $http.post(serviceBase + 'api/Account/Register', user).success(function (data, status, headers, config) {
            $http({ url: serviceBase + 'api/Account/GetAllUser', method: 'GET' })
             .success(function (data, status, headers, config) {
                 $scope.Users = data;
                 //console.log(data);
             });
            alert("Đã Thêm Mới User");
        }).error(function (err) {
            alert("Kiểm Tra Lại Thông Tin Mail");
        });
    }
    $scope.XoaUser = function (IDUser) {
        $http({ url: serviceBase + 'api/TramsByIdQuanLy?id=' + IDUser, method: 'GET' })
        .success(function (data, status, headers, config) {
            if (Object.keys(data).length) {
                console.log(data);
                alert("Vui Lòng Chuyển Đổi Trạm Sang Quản Lý Khác");
            } else {
                $http.delete(serviceBase + 'api/Account/DeleteUserBTS?id=' + IDUser)
                     .success(function (data, status, headers, config) {
                         $http({ url: serviceBase + 'api/Account/GetAllUser', method: 'GET' })
                         .success(function (data, status, headers, config) {
                             $scope.Users = data;
                             //console.log(data);
                         });
                         alert("Xóa Thành Công User");
                     });
            }
     });
    }
    $scope.Update = function (a,b) {
        var quyen = {
            UserName: a,
            Role: b
        }
        console.log(quyen);
        $http.post(serviceBase + 'api/Account/ChangeRole',quyen)
       .success(function (data, status, headers, config) {                
                alert("Cập Nhật Thành Công");
       }).error(function (data) {
           alert("Chưa Thay Đổi Quyền");
       });
        }
     
}]);