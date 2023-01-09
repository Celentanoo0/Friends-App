import { createUsers } from "./createUsers.js";
import { enablePagination } from "./enablePagination.js";
import { rerenderSucces, rerenderError, genderFilter } from "./rerenderPage.js";

export function filterUsers(users){
    const formWrapper = document.querySelector('.form-main');
    const paginationNums = document.querySelector('#pagination-numbers');
    const usersWrapper = document.querySelector(".cards-wrapper");
    const resetPage = [...users];

    formWrapper.addEventListener('click', (e) => {
        //sort by age
        if(e.target.closest('#fromOld')){
            users.sort((a,b) => b.dob.age - a.dob.age);
            rerenderSucces(users);
        }
        if(e.target.closest('#fromYoung')){
            users.sort((a,b) => a.dob.age - b.dob.age);
            rerenderSucces(users);
        }

        //sort by name
        if(e.target.closest('#fromZtoA')){
            users.sort((a,b) => b.name.first.toLowerCase() >= a.name.first.toLowerCase() ? 1 : -1);
            rerenderSucces(users);
        }
        if(e.target.closest('#fromAtoZ')){
            users.sort((a,b) => a.name.first.toLowerCase() >= b.name.first.toLowerCase() ? 1 : -1);
            rerenderSucces(users);
        }

        //filter by age
        if(e.target.closest('#filter-age')){
            const fromAge = document.querySelector('#age-from');
            const toAge = document.querySelector('#age-to');
            if(fromAge.value !== '' && toAge.value !== ''){
                users = users.filter((item) => item.dob.age >= fromAge.value && item.dob.age <= toAge.value);
                users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
            }
        }

        //filter by name
        if(e.target.closest('#search-by-name')){
            const nameField = document.querySelector('#name-search');
            if(nameField.value !== ''){
                users = users.filter((item) => item.name.first.toLowerCase().includes(nameField.value.toLowerCase()));
                users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
            }
        }

        //filter by gender
        if(e.target.closest('#gender-all')){
            const allFiltered = genderFilter.length >= 1 ? [...genderFilter] : [...users];
            usersWrapper.innerHTML = "";
            allFiltered.forEach((item) => createUsers(item));
            paginationNums.innerHTML = "";
            enablePagination(users);
        }
        if(e.target.closest('#gender-male')){
            const maleFiltered = genderFilter.length >= 1 ? genderFilter.filter((item) => item.gender === 'male') : users.filter((item) => item.gender === 'male');
            if(maleFiltered.length >= 1){
                usersWrapper.innerHTML = "";
                maleFiltered.forEach((item) => createUsers(item));
                paginationNums.innerHTML = "";
                enablePagination(maleFiltered);
            } else{
                rerenderError(maleFiltered);
            }
        }
        if(e.target.closest('#gender-female')){
            const femaleFiltered = genderFilter.length >= 1 ? genderFilter.filter((item) => item.gender === 'female') : users.filter((item) => item.gender === 'female');
            if(femaleFiltered.length >= 1){
                usersWrapper.innerHTML = "";
                femaleFiltered.forEach((item) => createUsers(item));
                paginationNums.innerHTML = "";
                enablePagination(femaleFiltered);
            } else{
                rerenderError(femaleFiltered)
            }
        }

        //reset page
        if(e.target.closest('#form-reset')){
            users = [...resetPage];
            rerenderSucces(resetPage);
        }
    })
}