import { createUsers } from "./createUsers.js";
import { filterUsers } from "./filterUsers.js";
import { enablePagination } from "./enablePagination.js";
import { enableSidebar } from "./enableSidebar.js";

const usersWrapper = document.querySelector(".cards-wrapper");

export function appCreate() {
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
    async function handleUsers() {
        try {
            const usersArray = await getUsers();
            usersWrapper.innerHTML = "";
            usersWrapper.classList.add("_loaded");

            usersArray.forEach(createUsers);

            filterUsers(usersArray);

            enablePagination();

            enableSidebar();
        } catch (err) {
            console.error(`Error during handling a result: ${err.message}`);
        }
    }
    handleUsers();
}
