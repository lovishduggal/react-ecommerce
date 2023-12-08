export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users', {
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
        const { email, password } = loginInfo;
        const response = await fetch(
            `http://localhost:8080/users?email=${email}`
        );
        const data = await response.json();
        console.log(data);
        if (data.length) {
            if (password === data[0].password) resolve({ data: data[0] });
            else reject({ message: 'Credentials are wrong' });
        } else reject({ message: 'User not found' });
        //TODO: Onserver it will only return some info of user (not password)
        resolve({ data });
    });
}
