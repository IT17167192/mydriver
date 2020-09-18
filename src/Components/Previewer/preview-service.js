import {MY_DRIVER_API} from "../../config";

export const readFiles = (token, data) => {
    //(data.id_token);
    return fetch(`${MY_DRIVER_API}/readDrive`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const readNextSetOfFiles = (token, data) => {
    //(data);
    return fetch(`${MY_DRIVER_API}/nextSetOfFiles`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const downloadFile = (token, data) => {
    //(data.id_token);
    return fetch(`${MY_DRIVER_API}/downloadFile`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.blob())
        .catch(err => console.log(err))
};

export const deleteFile = (token, data, id) => {
    return fetch(`${MY_DRIVER_API}/deleteFile/${id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err));
};

export const getFileThumbnailUrl = (token, data) => {
    return fetch(`${MY_DRIVER_API}/fileMeta`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
