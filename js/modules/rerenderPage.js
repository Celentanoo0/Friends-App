import { enablePagination } from "./enablePagination.js";
import { createUsers } from "./createUsers.js";

const paginationNums = document.querySelector("#pagination-numbers");
const usersWrapper = document.querySelector(".cards-wrapper");
const pageFilters = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu__icon");
export let genderFilter = [];

export function rerenderSucces(users) {
    usersWrapper.innerHTML = "";
    users.forEach((item) => createUsers(item));

    paginationNums.innerHTML = "";
    enablePagination(users);

    genderFilter = [...users];

    if (window.innerWidth < 690) {
        pageFilters.classList.toggle("show");
        document.body.classList.toggle("_lock");
        menuBtn.classList.toggle("_active");
    }
}

export function rerenderSuccesGender(users) {
    usersWrapper.innerHTML = "";
    users.forEach((item) => createUsers(item));

    paginationNums.innerHTML = "";
    enablePagination(users);

    if (window.innerWidth < 690) {
        pageFilters.classList.toggle("show");
        document.body.classList.toggle("_lock");
        menuBtn.classList.toggle("_active");
    }
}

export function rerenderError(users) {
    paginationNums.innerHTML = "";
    usersWrapper.innerHTML = "";
    const error = document.createElement("li");
    const errorMsg = document.createElement("div");
    errorMsg.style.fontSize = "26px";
    errorMsg.style.fontWeight = 700;
    errorMsg.innerHTML = "Can't find any user by this filters :(";
    error.append(errorMsg);
    usersWrapper.append(error);

    genderFilter = [...users];

    users.length = 0;
    enablePagination(users);

    if (window.innerWidth < 690) {
        pageFilters.classList.toggle("show");
        document.body.classList.toggle("_lock");
        menuBtn.classList.toggle("_active");
    }
}
