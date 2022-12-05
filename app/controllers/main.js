var teacherService = new TeacherService();
var validation = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function getListTeacher() {
    teacherService.getListTeacherApi()
        .then(function (result) {
            renderHTML(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

getListTeacher();

function renderHTML(data) {
    var content = "";
    data.forEach(function (teacher, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${teacher.taiKhoan}</td>
                <td>${teacher.matKhau}</td>
                <td>${teacher.hoTen}</td>
                <td>${teacher.email}</td>
                <td>${teacher.ngonNgu}</td>
                <td>${teacher.loaiND}</td>
                <td>${teacher.moTa}</td>
                <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteTeacher('${teacher.id}')">Delete</button>
                </td>
            </tr>
        `
    });
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

/**
 * DELETE
 */
function deleteTeacher(id) {
    teacherService.deleteListTeacherApi(id)
        .then(function () {
            alert("Delete Success!");
            getListTeacher()
        })
        .catch(function (error) {
            console.log(error);
        })
}

getEle("btnThemNguoiDung").onclick = function () {
    var title = "Thêm giáo viên";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    var button = `<button class="btn btn-success" onclick="addTeacher()">Add Teacher</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;
}

/**
 * ADD
 */

function addTeacher() {
    var taiKhoan = getEle("TaiKhoan").value;
    var matKhau = getEle("MatKhau").value;
    var hoTen = getEle("HoTen").value;
    var email = getEle("Email").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;

    var isValid = true;

    // Check Validation
    // Tài khoản
    isValid &= validation.kiemTraRong(taiKhoan, "errorTK", "(*) Vui lòng nhập tài khoản!");
    // Họ tên
    isValid &= validation.kiemTraRong(hoTen, "errorHT", "(*) Vui lòng nhập họ tên!") && validation.kiemTraKySo(hoTen, "errorHT", "(*) Vui lòng không nhập số!") && validation.kiemTraKyTuDacBiet(hoTen, "errorHT", "(*) Vui lòng không nhập ký tự đặc biệt!");
    // Mật khẩu
    isValid &= validation.kiemTraRong(matKhau, "errorMK", "(*) Vui lòng nhập mật khẩu!") && validation.kiemTraPassword(matKhau, "errorMK", "(*) Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!") && validation.kiemTraDoDaiKyTu(matKhau, "errorMK", "(*) Vui lòng nhập ký tự 6-10!", 6, 10);
    // Email
    isValid &= validation.kiemTraRong(email, "errorEmail", "(*) Vui lòng nhập email!") && validation.kiemTraEmail(email, "errorEmail", "(*) Vui lòng nhập đúng format email!");
    // Hình ảnh
    isValid &= validation.kiemTraRong(hinhAnh, "errorHA", "(*) Vui lòng nhập hình ảnh!");
    // Người dùng
    isValid &= validation.kiemTraLuachon("loaiNguoiDung", "errorND", "(*) Vui lòng chọn người dùng!");
    // Ngôn ngữ
    isValid &= validation.kiemTraLuachon("loaiNgonNgu", "errorNN", "(*) Vui lòng chọn ngôn ngữ!");
    // Mô tả
    isValid &= validation.kiemTraRong(moTa, "errorMT", "(*) Vui lòng nhập mô tả!") && validation.kiemTraDoDaiKyTu(matKhau, "errorMK", "(*) Vui lòng nhập không quá 60 ký tự", 1, 60);

    if (!isValid) return;

    var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

    teacherService.addListTeacherApi(teacher)
        .then(function () {
            alert("Add Success!");
            getListTeacher();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * EDIT
 */
function editTeacher(id) {
    var title = "Sửa giáo viên";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    var button = `<button class="btn btn-warning" onclick="updateTeacher(${id})">Update Teacher</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;

    teacherService.getTeacherByIdApi(id)
        .then(function (result) {
            var teacher = result.data;
            getEle("TaiKhoan").value = teacher.taiKhoan;
            getEle("MatKhau").value = teacher.matKhau;
            getEle("HoTen").value = teacher.hoTen;
            getEle("Email").value = teacher.email;
            getEle("loaiNgonNgu").value = teacher.ngonNgu;
            getEle("loaiNguoiDung").value = teacher.loaiND;
            getEle("MoTa").value = teacher.moTa;
            getEle("HinhAnh").value = teacher.hinhAnh;
        })
        .catch(function (error) {
            console.log(error);
        })
}

/**
 * UPDATE
 */

function updateTeacher(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var matKhau = getEle("MatKhau").value;
    var hoTen = getEle("HoTen").value;
    var email = getEle("Email").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var moTa = getEle("MoTa").value;
    var hinhAnh = getEle("HinhAnh").value;

    var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

    teacherService.updateTeacherApi(teacher)
        .then(function () {
            alert("Update Success!");
            getListTeacher();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}