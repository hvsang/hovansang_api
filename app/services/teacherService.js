function TeacherService() {
    this.getListTeacherApi = function () {
        return axios({
            url: "https://638c5ec5eafd555746a5030a.mockapi.io/api/teacher",
            method: "GET",
        });
    };

    this.deleteListTeacherApi = function (id) {
        return axios({
            url: `https://638c5ec5eafd555746a5030a.mockapi.io/api/teacher/${id}`,
            method: "DELETE",
        });
    };

    this.addListTeacherApi = function (teacher) {
        return axios({
            url: "https://638c5ec5eafd555746a5030a.mockapi.io/api/teacher",
            method: "POST",
            data: teacher,
        });
    };

    this.getTeacherByIdApi = function (id) {
        return axios({
            url: `https://638c5ec5eafd555746a5030a.mockapi.io/api/teacher/${id}`,
            method: "GET",
        });
    };

    this.updateTeacherApi = function (teacher) {
        return axios({
            url: `https://638c5ec5eafd555746a5030a.mockapi.io/api/teacher/${teacher.id}`,
            method: "PUT",
            data: teacher,
        });
    };
}