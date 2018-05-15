
$(document).ready(function() {

    $("#thongtintram").click(function () {
        alert('1');
        $("#noidung").load('thongtintram.html')
    });
    $("#thongtinnhatram").click(function () {
        $("#noidung").load('quanlynhanvien.html')
    });
    $("#thongtincotangten").click(function () {
        $("#noidung").load('quanlyphongban.php.html')
    });
    $("#thongtinmayphat").click(function () {
        $("#noidung").load('timkiem.php.html')
    });
    $("#phimatdien").click(function () {
        $("#noidung").load('phimatdien.html')
    });


});
