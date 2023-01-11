import {
    rerenderSucces,
    rerenderSuccesGender,
    rerenderError,
    genderFilter,
} from "./rerenderPage.js";

export function filterUsers(usersArray) {
    const formWrapper = document.querySelector(".form-main");
    let users = [...usersArray];

    formWrapper.addEventListener("click", (e) => {
        if (e.target.closest("#fromOld")) {
            users.sort((a, b) => b.dob.age - a.dob.age);
            users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
        }
        if (e.target.closest("#fromYoung")) {
            users.sort((a, b) => a.dob.age - b.dob.age);
            users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
        }

        if (e.target.closest("#fromZtoA")) {
            users.sort((a, b) =>
                b.name.first.toLowerCase() >= a.name.first.toLowerCase()
                    ? 1
                    : -1
            );
            users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
        }
        if (e.target.closest("#fromAtoZ")) {
            users.sort((a, b) =>
                a.name.first.toLowerCase() >= b.name.first.toLowerCase()
                    ? 1
                    : -1
            );
            users.length >= 1 ? rerenderSucces(users) : rerenderError(users);
        }

        if (e.target.closest("#filter-age")) {
            const fromAge = document.querySelector("#age-from");
            const toAge = document.querySelector("#age-to");
            if (fromAge.value !== "" && toAge.value !== "") {
                users = users.filter(
                    (item) =>
                        item.dob.age >= fromAge.value &&
                        item.dob.age <= toAge.value
                );
                users.length >= 1
                    ? rerenderSucces(users)
                    : rerenderError(users);
            }
        }

        if (e.target.closest("#search-by-name")) {
            const nameField = document.querySelector("#name-search");
            if (nameField.value !== "") {
                users = users.filter((item) =>
                    item.name.first
                        .toLowerCase()
                        .includes(nameField.value.toLowerCase())
                );
                users.length >= 1
                    ? rerenderSucces(users)
                    : rerenderError(users);
            }
        }

        if (e.target.closest("#gender-all")) {
            const genderFiltrated =
                genderFilter.length >= 1 ? [...genderFilter] : [...users];
            genderFiltrated.length >= 1
                ? rerenderSuccesGender(genderFiltrated)
                : rerenderError(genderFiltrated);
        }
        if (e.target.closest("#gender-male")) {
            const genderFiltrated =
                genderFilter.length >= 1
                    ? genderFilter.filter((item) => item.gender === "male")
                    : users.filter((item) => item.gender === "male");
            genderFiltrated.length >= 1
                ? rerenderSuccesGender(genderFiltrated)
                : rerenderError(genderFiltrated);
        }
        if (e.target.closest("#gender-female")) {
            const genderFiltrated =
                genderFilter.length >= 1
                    ? genderFilter.filter((item) => item.gender === "female")
                    : users.filter((item) => item.gender === "female");
            genderFiltrated.length >= 1
                ? rerenderSuccesGender(genderFiltrated)
                : rerenderError(genderFiltrated);
        }

        if (e.target.closest("#form-reset")) {
            users = [...usersArray];
            rerenderSucces(usersArray);
        }
    });
}
