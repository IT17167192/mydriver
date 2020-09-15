import {MY_DRIVER_API} from "../../config";

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.clear();
        localStorage.removeItem('userToken');
        next();
    }
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('userToken', JSON.stringify(data));
        next();
    }
};

export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('userToken')) {
        // console.log(sessionStorage.getItem('userData'));
        return JSON.parse(localStorage.getItem('userToken'));
    } else {
        return false;
    }
};

export const signIn = (data) => {
    return fetch(`${MY_DRIVER_API}/configSession`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
