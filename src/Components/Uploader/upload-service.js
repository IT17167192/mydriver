import {MY_DRIVER_API} from "../../config";

export const uploadFile = (token, data) => {
    return fetch(`${MY_DRIVER_API}/upload`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: data
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
