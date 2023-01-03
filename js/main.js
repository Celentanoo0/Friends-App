"use strict";

import { usersCreate } from "./createUsers.js";
import { filterUsers } from "./filterUsers.js";

const menuBtn = document.querySelector(".menu__icon");
const pageFilters = document.querySelector(".menu__body");
export const usersWrapper = document.querySelector(".cards-wrapper");

//showing-hiding sidebar on moblie devices
menuBtn.addEventListener("click", () => {
    pageFilters.classList.toggle("show");
    document.body.classList.toggle("_lock");
    menuBtn.classList.toggle("_active");
});

//fetching users from random users api, and returning an array of users
async function getUsers() {
    try {
        const request = await fetch(
            "https://randomuser.me/api/?results=12&nat=us,dk,fr,gb&inc=gender,name,phone,email,dob,picture"
        );
        const users = await request.json();
        return users.results;
    } catch (err) {
        console.error(`Error during fething: ${err.message}`);
    }
}

//adding users to the page
getUsers()
    .then((usersArray) => {
        usersWrapper.innerHTML = "";
        usersWrapper.classList.add("_loaded");

        //creating users from array
        usersArray.forEach(usersCreate);
        console.log(usersArray)

        filterUsers(usersArray);

        return usersArray;
    })
    .catch((err) => {
        console.error(`Error during handling a result: ${err.message}`);
    });
