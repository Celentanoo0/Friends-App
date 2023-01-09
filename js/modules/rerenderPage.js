import { enablePagination } from "./enablePagination.js";
import { createUsers } from "./createUsers.js";

const paginationNums = document.querySelector('#pagination-numbers');
const usersWrapper = document.querySelector(".cards-wrapper");
export let genderFilter = [];

export function rerenderSucces(users) {
    usersWrapper.innerHTML = "";
    users.forEach((item) => createUsers(item));
    paginationNums.innerHTML = "";
    enablePagination(users);
    genderFilter = [...users];
}

export function rerenderError(users){
    users.length = 0;
    paginationNums.innerHTML = "";
    usersWrapper.innerHTML = '';
    const error = document.createElement('li');
    const errorMsg = document.createElement('div');
    errorMsg.style.fontSize = '26px';
    errorMsg.style.fontWeight = 700;
    errorMsg.innerHTML = "Can't find any user by this filters :("
    error.append(errorMsg);
    usersWrapper.append(error);
    enablePagination(users);
}