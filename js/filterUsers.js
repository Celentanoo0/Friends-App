import { usersCreate } from "./createUsers.js";
import {usersWrapper} from './main.js'

export function filterUsers(users){
    let mutatedArr = [...users];
    const formWrapper = document.querySelector('.form-main');
    formWrapper.addEventListener('click', (e) => {
        
        if(e.target !== formWrapper){
            usersWrapper.innerHTML = "";
        }
        //sorting by age and name
        if(e.target.closest('#fromOld')){
            mutatedArr.sort((a,b) => b.dob.age - a.dob.age);
            mutatedArr.forEach(usersCreate);
        }
        if(e.target.closest('#fromYoung')){
            mutatedArr.sort((a,b) => a.dob.age - b.dob.age);
            mutatedArr.forEach(usersCreate);
        }
        if(e.target.closest('#fromZtoA')){
            mutatedArr.sort((a,b) => b.name.first >= a.name.first ? 1 : -1);
            mutatedArr.forEach(usersCreate);
        }
        if(e.target.closest('#fromAtoZ')){
            mutatedArr.sort((a,b) => a.name.first >= b.name.first ? 1 : -1);
            mutatedArr.forEach(usersCreate);
        }

        //filter by age
        if(e.target.closest('.age-from-to-btn')){
            const fromField = document.querySelector('#age-from');
            const toField = document.querySelector('#age-too');
            if(fromField.value !== '' && toField.value !== ''){
                mutatedArr = mutatedArr.filter(item => item.dob.age >= fromField.value && item.dob.age <= toField.value);
                if(mutatedArr.length >= 1){
                    mutatedArr.forEach(usersCreate);
                } else{
                    const noSuchResults = document.createElement('li');
                    const noSuchResultsText = document.createElement('div')
                    noSuchResultsText.innerHTML = 'There is no any users with these parametras. Im sorry:(';
                    noSuchResults.append(noSuchResultsText);
                    document.querySelector('.cards-wrapper').append(noSuchResults);
                }
            };
        }

        //filter by name
        if(e.target.closest('#search-by-name')){
            const nameField = document.querySelector('.form-main #name-search');
            mutatedArr = mutatedArr.filter((item) => item.name.first.toLowerCase().includes(nameField.value.toLowerCase()))
            mutatedArr.forEach(usersCreate);
        }

        //filter by gender
        if(e.target.closest('#gender-all-main')){
            mutatedArr = users.filter((item) => item.gender === 'male' || item.gender === 'female');
            mutatedArr.forEach(usersCreate);
        }
        if(e.target.closest('#gender-male-main')){
            mutatedArr = users.filter((item) => item.gender === 'male');
            mutatedArr.forEach(usersCreate);
        }
        if(e.target.closest('#gender-female-main')){
            mutatedArr = users.filter((item) => item.gender === 'female');
            mutatedArr.forEach(usersCreate);
        }

        //reset button
        if(e.target.closest('.form__reset')){
            users.forEach(usersCreate);
        }
    })
}