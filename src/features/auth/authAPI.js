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
        const response = await fetch(`http://localhost:8080/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginInfo),
            headers: {
                'content-type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return resolve({ data });
        }
        const data = await response.text();
        reject({ data });
    });
}
export function checkAuth() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`http://localhost:8080/auth/check`);
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject(error);
            }

            //TODO: On server it will only return some info of user (not password)
        } catch (error) {
            reject({ error });
        }
    });
}

export function signOut() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(`http://localhost:8080/auth/logout`);

        if (response.ok) {
            const data = await response.json();
            return resolve({ data });
        }
        const data = await response.text();
        reject({ data });
    });
}

export function resetPasswordRequest(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(
                `http://localhost:8080/auth/reset-password-request`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject(error);
            }
        } catch (error) {
            reject({ error });
        }
    });
}

export function resetPassword({ password, email, token }) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(
                `http://localhost:8080/auth/reset-password`,
                {
                    method: 'POST',
                    body: JSON.stringify({ password, email, token }),
                    headers: {
                        'content-type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject(error);
            }
        } catch (error) {
            reject({ error });
        }
    });
}
