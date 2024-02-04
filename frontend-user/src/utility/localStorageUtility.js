import {REMEMBER_ME, USER_LOCALSTORAGE_KEY} from "../constants/constants";

const checkStorageAvailable = ()=>{
    return typeof(Storage) !== "undefined"
}
const addUserIdentityObject = (user) => {
    if (checkStorageAvailable()) {
        if (getRememberMeChoice()) {
            addPersistentUserIdentityObject(user);
        } else {
            addTempUserIdentityObject(user);
        }
    }
}

const removeUserIdentityObject = () => {
    if (checkStorageAvailable()) {
        if (getRememberMeChoice()) {
            removePersistentUserIdentityObject();
        } else {
            removeTempUserIdentityObject();
        }
        removeRememberMeChoice()
    }
}

const getUserIdentityObject = () => {
    if (checkStorageAvailable()) {
        if (getRememberMeChoice()) {
            return getPersistentUserObject();
        } else {
            return getTempUserIdentityObject();
        }
    }
}

const addPersistentUserIdentityObject = (user) => {
    checkStorageAvailable()&&localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

const removePersistentUserIdentityObject = () => {
    checkStorageAvailable()&&localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}

const getPersistentUserObject = () =>{
    return checkStorageAvailable()&&localStorage.getItem(USER_LOCALSTORAGE_KEY);
}

const addTempUserIdentityObject = (user) => {
    checkStorageAvailable()&&sessionStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
}

const removeTempUserIdentityObject = () => {
    checkStorageAvailable()&&sessionStorage.removeItem(USER_LOCALSTORAGE_KEY)
}

const getTempUserIdentityObject = () => {
    return checkStorageAvailable()&&sessionStorage.getItem(USER_LOCALSTORAGE_KEY)
}

const addRememberMeChoice = (choice = false) => {
    checkStorageAvailable()&&localStorage.setItem(REMEMBER_ME, choice.toString());
}

const removeRememberMeChoice = () => {
    checkStorageAvailable()&&localStorage.removeItem(REMEMBER_ME);
}

const getRememberMeChoice = () => {
    return checkStorageAvailable() && (localStorage.getItem(REMEMBER_ME) === 'true');
}

export {
    checkStorageAvailable,
    addUserIdentityObject,
    getUserIdentityObject,
    addPersistentUserIdentityObject,
    removePersistentUserIdentityObject,
    removeUserIdentityObject,
    addTempUserIdentityObject,
    removeTempUserIdentityObject,
    addRememberMeChoice,
    removeRememberMeChoice,
    getRememberMeChoice
}
