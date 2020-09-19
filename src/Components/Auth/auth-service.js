import {MY_DRIVER_API} from "../../config";

export const signout = (data, next) => {
    return fetch(`${MY_DRIVER_API}/unlinkSession`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            //(response.json());
            if (typeof window !== 'undefined') {
                sessionStorage.clear();
                localStorage.removeItem('userToken');
                next();
            }
        })
        .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        const now = new Date();
        const item = {
            value: data,
            expiry: now.getTime() + data.exp
        };
        sessionStorage.setItem('userData', JSON.stringify(item));
        next();
    }
};

export const isAuthenticate = () => {

    if (typeof window == 'undefined') {
        return false;
    }
    //get user data from the session storage
    const item = JSON.parse(sessionStorage.getItem('userData'));
    const now = new Date();

    if(item === null){
        return false;
    }
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        signout({"id_token": item.value.tokenObj.id_token}, () => {
            sessionStorage.removeItem('userData');
            return false;
        });
    }else if (sessionStorage.getItem('userData')) {
        return JSON.parse(sessionStorage.getItem('userData')).value;
    } else {
        return false;
    }
};

export const getTokenAndUserInfo = (data) => {
    return fetch(`${MY_DRIVER_API}/getTokenAndUserInfo`, {
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
