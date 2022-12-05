function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value == "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        } else {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
    };

    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemTraKySo = function (value, errorId, mess) {
        var number = /^[0-9]+$/;
        if (value.match(number)) {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        } else {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
    };

    this.kiemTraKyTuDacBiet = function (value, errorId, mess) {
        var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (value.match(format)) {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        } else {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
    };

    this.kiemTraPassword = function (value, errorId, mess) {
        var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(password)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemTraEmail = function (value, errorId, mess) {
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(email)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemTraLuachon = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex != 0) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemTraTrung = function (value, errorId, mess, data) {
        var exist = false;
        for (var i = 0; i < data.length; i++) {
            var nv = data[i];
            if (nv.taiKhoan == value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    }
}