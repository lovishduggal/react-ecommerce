export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'content-type': 'application/json',
            },
        });
        const data = await response.json();
        //TODO: Onserver it will only return some info of user (not password)
        resolve({ data });
    });
}

export function checkUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/auth/login`, {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                console.log(error);
                reject(error);
            }

            //TODO: On server it will only return some info of user (not password)
        } catch (error) {
            reject({ error });
        }
    });
}

export function signOut() {
    return new Promise(async (resolve) => {
        //! On server we will remove user session info.
        resolve({ data: 'success' });
    });
}
