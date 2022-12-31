"use strict";

import { usersCreate } from "./usersCreate.js";

const menuBtn = document.querySelector(".menu__icon");
const pageFilters = document.querySelector(".menu__body");
export const usersWrapper = document.querySelector(".cards-wrapper");
const fromOldSortBtn = document.querySelector("#fromOld");
const fromYoungSortBtn = document.querySelector("#fromYoung");

//showing-hiding sidebar on moblie devices
menuBtn.addEventListener("click", () => {
    pageFilters.classList.toggle("show");
    document.body.classList.toggle("_lock");
    menuBtn.classList.toggle("_active");
});

//fetching users from random users api, and returning an array of users
async function getUsers() {
    const request = await fetch("https://randomuser.me/api/?results=12");
    const users = await request.json();
    return users.results;
}

//adding users to the page
getUsers().then((usersArray) => {
    usersWrapper.innerHTML = "";
    usersWrapper.classList.add("_loaded");

    usersArray.forEach(usersCreate);
    return usersArray;
});
