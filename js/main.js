"use strict";

const menuBtn = document.querySelector(".menu__icon");
const pageFilters = document.querySelector(".menu__body");
const usersWrapper = document.querySelector(".cards-wrapper");

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
getUsers()
    .then((usersArray) => {
        usersWrapper.innerHTML = "";
        usersWrapper.classList.add("_loaded");

        usersArray.forEach((item) => {
            const user = document.createElement("li");
            user.classList.add("cards-wrapper__card");
            user.classList.add("card");
            usersWrapper.append(user);

            const userName = document.createElement("div");
            userName.classList.add("card__name");
            item.gender === "male"
                ? userName.classList.add("male")
                : userName.classList.add("female");
            const userNameText = document.createElement("p");
            userNameText.innerHTML = `${item.name.first} ${item.name.last}`;
            userName.append(userNameText);
            user.append(userName);

            const userImg = document.createElement("div");
            userImg.classList.add("card__avatar");
            const userImgPhoto = document.createElement("img");
            userImgPhoto.src = item.picture.large;
            userImg.append(userImgPhoto);
            user.append(userImg);

            const userDescr = document.createElement("div");
            userDescr.classList.add("card__description");
            const userAge = document.createElement("p");
            userAge.innerHTML = `I'm ${item.dob.age} years old`;
            const userMail = document.createElement("p");
            userMail.innerHTML = item.email;
            const userPhone = document.createElement("p");
            userPhone.innerHTML = item.phone;
            const userDob = document.createElement("p");
            userDob.innerHTML = item.dob.date;
            userDescr.append(userAge, userMail, userPhone, userDob);
            user.append(userDescr);

            const userGender = document.createElement("div");
            userGender.classList.add("card__gender");
            const userGenderText = document.createElement("p");
            userGenderText.innerHTML = item.gender;
            userGender.append(userGenderText);
            user.append(userGender);
        });
        return usersArray;
    })
    .then((usersArray) => {
        const fromOldSortBtn = document.querySelector('#fromOld');
        const fromYoungSortBtn = document.querySelector('#fromYoung');
        console.log(usersArray)
        fromOldSortBtn.addEventListener('click', () => {
            const sortedUsersArray =  usersArray.sort((a,b) => a.dob.age - b.dob.age).reverse();
            usersWrapper.innerHTML = '';
            sortedUsersArray.forEach((item) => {
                //
            })
        })
    });
