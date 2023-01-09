"use strict";

import { createUsers } from "./modules/createUsers.js";
import { filterUsers } from "./modules/filterUsers.js";
import { enablePagination } from "./modules/enablePagination.js";

const menuBtn = document.querySelector(".menu__icon");
const pageFilters = document.querySelector(".sidebar");
const usersWrapper = document.querySelector(".cards-wrapper");

//open sidebar on moblie devices
menuBtn.addEventListener("click", () => {
    pageFilters.classList.toggle("show");
    document.body.classList.toggle("_lock");
    menuBtn.classList.toggle("_active");
});

//fetching users from random users api, and returning an array of users
async function getUsers() {
    try {
        const request = await fetch(
            "https://randomuser.me/api/?results=60&nat=us,dk,fr,gb&inc=gender,name,phone,email,dob,picture"
        );
        const users = await request.json();
        return users.results;
    } catch (err) {
        console.error(`Error during fething: ${err.message}`);
    }
}

getUsers()
    .then((usersArray) => {
        usersWrapper.innerHTML = "";
        usersWrapper.classList.add("_loaded");

        usersArray.forEach((item) => {
            item.isShownOnPage = false;
        });

        //rendering users
        usersArray.forEach(createUsers);

        //rendering pagination
        enablePagination(usersArray);

        //adding filtration
        filterUsers(usersArray);
    })
    .catch((err) => {
        console.error(`Error during handling a result: ${err.message}`);
    });
