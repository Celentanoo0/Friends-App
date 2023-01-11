export function createUsers(item) {
    const usersWrapper = document.querySelector(".cards-wrapper");
    const user = document.createElement("li");
    user.classList.add("cards-wrapper__card", "card", "hidden");
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
    userAge.innerHTML = `<span>Age:</span> ${item.dob.age} years old`;
    const userMail = document.createElement("p");
    userMail.innerHTML = item.email;
    const userPhone = document.createElement("p");
    userPhone.innerHTML = `<span>Phone:</span> ${item.phone}`;
    const userDob = document.createElement("p");
    userDob.innerHTML = `<span>Birthday:</span> ${item.dob.date
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("-")}`;
    userDescr.append(userAge, userPhone, userDob, userMail);
    user.append(userDescr);

    const userGender = document.createElement("div");
    userGender.classList.add("card__gender");
    const userGenderText = document.createElement("p");
    userGenderText.innerHTML = item.gender;
    userGender.append(userGenderText);
    user.append(userGender);
}
