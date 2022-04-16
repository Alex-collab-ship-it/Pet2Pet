import { onlyDigits } from './functions';

var sha1 = require('sha1');

export const reg_check = (mail) => {
    const result = fetch('https://pancake69.xyz/Auth/AuthCheck',
        {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: "\"" + mail + "\""
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.text() + ')'
                ));
            }
            return response.text();
        }).then(data => data
        ).catch((error) => {
            console.log(error)
        });
    return result
}

export const regStage1 = (mail) =>{
    fetch('https://pancake69.xyz/Registration/Stage1',
        {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: "\"" + mail + "\""
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.statusText + ')'
                ));
            }
            return response.text();
        }).catch((error) => {
            console.log(error)
        });
}

export const regStage2 = (name, mail, pass, code) => {
    const token = fetch('https://pancake69.xyz/Registration/Stage2',
    {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: mail,
            password: sha1(pass), 
            code: code
        })
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.text() + ')'
            ));
        }
        return response.text();
    }).then(data => data
        
    ).catch(error => console.log(error))
    return token
}

export const SignIn = async (mail, pass) => {
    const result = await fetch('https://pancake69.xyz/Auth/Auth',
        {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: mail,
                password: sha1(pass)
            })
        }).then(response => {
            if (!response.ok) {
                return Promise.reject(new Error(
                    'Response failed: ' + response.status + ' (' + response.text() + ')'
                ));
            }
            return response.text();
        }).then(data => data)
    return result
}

export const AddPet = (name, breed, age, photos, token, info, man, cat) => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");
    var formdata = new FormData();

    formdata.append("ExInfo", info);
    formdata.append("Sex", man ? "M" : "F");
    formdata.append("Name", name);
    formdata.append("Breed", breed);
    let i = 1
    photos.forEach(img => {
        formdata.append(`image${i}`, {
            uri: img.uri,
            type: 'image/jpeg', 
            name: `${i}.jpeg`
        });
        i += 1
    });
    formdata.append("Token", token);
    formdata.append("Type", cat ? "Cat" : "Dog");
    formdata.append("Age", onlyDigits(age));

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    const result = fetch("https://pancake69.xyz/Pet/AddPet", requestOptions)
    .then(response => response.text())
    .then(result => result)
    .catch(error => console.log('error', error));
    return result
}

export const getPet = (token) => {
    const result = fetch('https://pancake69.xyz/Pet/GetPetInfo', {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: "\"" + token + "\""

    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.text() + ')'
            ));
        }
        return response.json()

    }).then(data => data
    ).catch(e => console.log(e))
    return result
}

export const getAnket = (token, isFirst) => {
    const result = fetch('https://pancake69.xyz/Selection/GetAnket', {
        method: 'POST',
        headers:{
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            isFirstRequest: isFirst
        })
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.text() + ')'
            ));
        }
        return response.json()

    }).then(data => data
    ).catch(e => console.log(e))

    return result
}

export const sendChoice = (token, owner, choice) => {
    fetch('https://pancake69.xyz/Selection/RateToPet', {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
            to: owner,
            rate: choice
        })
    }).then((response) => {
        if (!response.ok) {
            return Promise.reject(new Error(
                'Response failed: ' + response.status + ' (' + response.text() + ')'
            ));
        }
        return response.text()

    }).then(data => console.log(data)
    ).catch(e => console.log(e))
}
