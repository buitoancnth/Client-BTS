'use strict';
app.controller('quanLyTramController', ['$scope', '$http', '$location', 'ngAuthSettings', function ($scope, $http, $location, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var IDTram = $location.search().id;
    $scope.Tram = '';
    $scope.myInterval = 3000;
    $scope.slides = [];
    //console.log($rootScope.quyen);
    $scope.TenQuanLy = '';
    $http({ url: serviceBase + 'api/Trams/' + IDTram, method: 'GET' })
    .success(function (data, status, headers, config) {
        $scope.Tram = data;
       
        //console.log(data.IDQuanLy);
            $http({ url: serviceBase + 'api/Account/GetUser?id=' + data.IDQuanLy, method: 'GET' })
            .success(function (data) {
                $scope.TenQuanLy = data.Ten;
        });
    });
    
    var tabClasses;

    function initTabs() {
        tabClasses = ["", "", "", ""];
    }

    $scope.getTabClass = function (tabNum) {
        return tabClasses[tabNum];
    };

    $scope.getTabPaneClass = function (tabNum) {
        return "tab-pane " + tabClasses[tabNum];
    }

    $scope.setActiveTab = function (tabNum) {
        initTabs();
        tabClasses[tabNum] = "active";
    };

    $scope.tab1 = "This is first section";
    $scope.tab2 = "This is SECOND section";
    $scope.tab3 = "This is THIRD section";
    $scope.tab4 = "This is FOURTH section";

    //Initialize 
    initTabs();
    $scope.setActiveTab(1);
    $scope.index = 0;
    
    $scope.UpdateTram = function (IDTram, Tram) {
        //console.log(Tram);
        //console.log($scope.Data.CauCap.$valid);
        if (IDTram > 0) {
            $http.put(serviceBase + "api/Trams?id=" + IDTram, Tram).success(function (data) {
                alert('Cập Nhật Trạm Thành Công');
                //console.log(data);
            }).error(function (data) {
                //console.log(data);
                $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
            });
        }
    }


    // GET THE FILE INFORMATION.
    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {

            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }

        });
    };

    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {
        $scope.myInterval = 3000;
        $http({ url: serviceBase + 'api/HinhAnhTramsByIDTram?id=' + IDTram, method: 'GET' })
       .success(function (data, status, headers, config) {
           $scope.slides = data;
       });

        //FILL FormData WITH FILE DETAILS.
        var data = new FormData();

        for (var i in $scope.files) {
            data.append("uploadedFile", $scope.files[i]);
        }

        // ADD LISTENERS.
        var objXhr = new XMLHttpRequest();
        objXhr.addEventListener("progress", updateProgress, false);
        objXhr.addEventListener("load", transferComplete, false);

        // SEND FILE DETAILS TO THE API.
        objXhr.open("POST", serviceBase + 'api/HinhAnhTrams?idTram=' + IDTram);
        objXhr.send(data);
    }

    // UPDATE PROGRESS BAR.
    function updateProgress(e) {
        if (e.lengthComputable) {
            document.getElementById('pro').setAttribute('value', e.loaded);
            document.getElementById('pro').setAttribute('max', e.total);
        }
    }
        
    // CONFIRMATION.
    function transferComplete(e) {
        alert("Đã Upload Ảnh Thành Công");
    }

   
   
    $http({ url: serviceBase + 'api/HinhAnhTramsByIDTram?id=' + IDTram, method: 'GET' })
       .success(function (data, status, headers, config) {
           $scope.slides = data;
       });

}]);


app.controller('nhaTramController', ['$scope', '$http', '$location', 'ngAuthSettings', function ($scope, $http, $location, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var IDTram = $location.search().id;
    
    var counter = 0;
    
    //thêm new nhà trạm
    $scope.ThemNhaTram = function (i) {
        counter += i; 
        var field = 'show' + counter;
        //console.log(field);
        $scope[field] = true;
        //console.log($scope[field]);
        //console.log(counter);
        if(counter == 4) {
            alert("Thêm Tối Đa 4 Lần");
        }
       
    }
    //xóa trạm thêm new
    $scope.xoa = function (i) {
        counter = counter - 1;
        console.log(counter);
        var field = 'show' + i;
        $scope[field] = false;
        alert("Xóa Thành Công");
    }
    //get nhà trạm
    $http({ url: serviceBase + 'api/NhaTramsByIDTram?id=' + IDTram, method: 'GET' })
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.NhaTrams = data;
    });

    //get Nhà Mạng
    $http({ url: serviceBase + 'api/NhaMangs', method: 'GET' })
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.NhaMangs = data;
    });
    //Update Nha Tram
    $scope.Update = function (IDNhaTram, nhaTram) {
        //console.log(nhaTram);
        //console.log($scope.Data.CauCap.$valid);
        if (IDNhaTram > 0) {
            $http.put(serviceBase + "api/NhaTrams?id=" + IDNhaTram, nhaTram).success(function (data) {
                alert('Cập Nhật Nhà Trạm Thành Công');
                console.log(data);
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
            });
        }
    }

    //add nhà trạm
    $scope.IDNhaMang = {};
    $scope.IDTram = {};
    $scope.CauCap = {};
    $scope.HangRao = {};
    $scope.HeThongDien = {};
    $scope.DieuHoa = {};
    $scope.OnAp = {};
    $scope.CanhBao = {};
    $scope.BinhCuuHoa = {};
    $scope.CanhBao = {};
    $scope.MayPhatDien = {};
    $scope.ChungMayPhat = {};
    
    $scope.AddNhaTram = function (i) {
       
        console.log(Object.values($scope.IDNhaMang)[i - 1]);
        
        console.log('vao day');
       
        var field1 = Object.values($scope.IDNhaMang)[i - 1];
        //var field2 = 'IDTram' + i;
        var field3 = Object.values($scope.CauCap)[i - 1];
        var field4 = Object.values($scope.HeThongDien)[i - 1];
        var field5 = Object.values($scope.HangRao)[i - 1];
        var field6 = Object.values($scope.DieuHoa)[i - 1];
        var field7 = Object.values($scope.OnAp)[i - 1];
        var field8 = Object.values($scope.CanhBao)[i - 1];
        var field9 = Object.values($scope.BinhCuuHoa)[i - 1];
        var field10 = Object.values($scope.MayPhatDien)[i - 1];
        var field11 = Object.values($scope.ChungMayPhat)[i - 1];
        if (field1){
            var NhaTram = {
                IDNhaMang: field1,
                IDTram: IDTram,
                CauCap: field3,
                HeThongDien: field4,
                HangRao: field5,
                DieuHoa: field6,
                OnAp: field7,
                CanhBao: field8,
                BinhCuuHoa: field9,
                MayPhatDien: field10,
                ChungMayPhat: field11
            }
            console.log(NhaTram);
            //console.log($scope.Data.CauCap.$valid);

            $http.post(serviceBase + "api/NhaTrams", NhaTram).success(function (data) {
                alert('Thêm Trạm Thành Công');
                console.log(data);
            }).error(function (data) {
                alert('Vui Lòng Không Chọn Nhà Mạng Đã Có!')
                $scope.error = "Something wrong " + data.ExceptionMessage;
            });
        } else {
            alert('Vui Lòng Chọn Nhà Mạng');
        }
        

    }
}]);

app.controller('nhaMangController', ['$scope', '$http', 'ngAuthSettings', function ($scope, $http, ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var counterNhaMang = 0;

    //thêm new nhà mạng
    $scope.ThemNhaMang = function (i) {
        counterNhaMang += i;
        var fieldNhaMang = 'ShowNew' + counterNhaMang;
        //console.log(field);
        $scope[fieldNhaMang] = true;
        //console.log($scope[field]);
        //console.log(counter);
        if (counterNhaMang == 4) {
            alert("Thêm Tối Đa 4 Lần");
        }

    }
    //xóa nhà mạng thêm new
    $scope.XoaNhaMang = function (i) {
        counterNhaMang = counterNhaMang - 1;
        //console.log(counterNhaMang);
        var fieldNhaMang = 'ShowNew' + counterNhaMang;
        $scope[fieldNhaMang] = false;
        alert("Xóa Thành Công");
    }

    //get tất cả nhà Mang
    $http({ url: serviceBase + 'api/NhaMangs', method: 'GET' })
    .success(function (data, status, headers, config) {
        console.log(data);
        $scope.NhaMangs = data;
    });

    //update Nhà Mạng
    $scope.UpdateNhaMang = function (IDNhaMang,nhaMang) {
        //console.log(nhaTram);
        //console.log($scope.Data.CauCap.$valid);
        if (IDNhaMang > 0) {
            $http.put(serviceBase + "api/NhaMangs?id=" + IDNhaMang, nhaMang).success(function (data) {
                alert('Cập Nhật Nhà Mạng Thành Công');
                console.log(data);
            }).error(function (data) {
                console.log(data);
                $scope.error = "Something wrong when adding updating employee " + data.ExceptionMessage;
            });
        }
    }
}]);

//chi phi ton hao
app.controller('phiTonHaoController', ['$scope', '$http', '$location','ngAuthSettings', function ($scope, $http, $location,ngAuthSettings) {
    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var IDTram = $location.search().id;
    //get phi tổn hao đã có
    $scope.tongtime = "";
    $http({ url: serviceBase + 'api/MatDienByIDTram?id='+IDTram, method: 'GET' })
   .success(function (data, status, headers, config) {
       //console.log('vao dayyyyyyyyyyyyyyy');
        $scope.TienPhis = data;
   });

   
    $scope.TinhToanTime = function (t1, t2) {
        
        var start = moment(t1, "HH:mm");
        var end = moment(t2, "HH:mm");
        if (end < start) {
            alert("Nhập Sai Thời Gian Máy Nổ Ngừng");
        } else {
            var minutes = end.diff(start, 'minutes');
            var interval = moment().hour(0).minute(minutes);
            var time = interval.format("HH:mm");
            //console.log(interval.format("HH:mm"));
            $scope.tongtime = time;
        }

    };
    $scope.TinhToanTime1 = function (t1, t2) {
 
        var start = moment(t1, "HH:mm");
        var end = moment(t2, "HH:mm");
        if (end < start) {
            alert("Thời Gian Chạy Máy Nổ Nhập Sai");
        }
    }

    //Thêm chi phí

    $scope.ThemPhi = function (chiphi) {
        
        var ChiPhi = {
            IDTram: IDTram,
            NgayMatDien: chiphi.NgayMatDien,
            GioMatDien:chiphi.GioMatDien,
            ThoiGianMayNo:chiphi.ThoiGianMayNo,
            ThoiGianNgung:chiphi.ThoiGianNgung,
            QuangDuongDiChuyen:chiphi.QuangDuongDiChuyen
        }
        console.log(ChiPhi);
        $http.post(serviceBase + "api/MatDiens", ChiPhi).success(function (data) {
            $http({ url: serviceBase + 'api/MatDienByIDTram?id=' + IDTram, method: 'GET' })
               .success(function (data, status, headers, config) {
                   //console.log('vao dayyyyyyyyyyyyyyy');
                   $scope.TienPhis = data;
               });
            alert('Thêm Thành Công');

            //console.log(data);
        }).error(function (data) {
            alert('Vui Lòng Kiểm Tra Lại Dữ Liệu')
            $scope.error = "Something wrong " + data.ExceptionMessage;
        });
       
    }
   
}]);