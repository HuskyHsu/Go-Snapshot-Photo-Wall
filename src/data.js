`
https://api.imgur.com/3/album/y9yElNB/images
Authorization:Client-ID cb0681a079ca451

https://api.imgur.com/3/image
Authorization:Bearer c1a0b11db42b730983644bf7087d1aa031b6c415

album:y9yElNB
title:
description:
`

const host = 'https://api.imgur.com/3';

const get = async function () {

    const path = '/album/y9yElNB/images'
    const response = await fetch(`${host}${path}`, {
        method: 'GET',
        headers: {
            'Authorization': `Client-ID cb0681a079ca451`
        }
    });

    return response.json();
}

export {get}