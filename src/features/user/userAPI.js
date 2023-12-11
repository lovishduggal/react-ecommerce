export function fetchLoggdInUserOrders(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `http://localhost:8080/orders/?user.id=${userId}`
        );
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchLoggdInUser(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`http://localhost:8080/users/${userId}`);
        const data = await response.json();
        resolve({ data });
    });
}

export function updateUser(updateData) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `http://localhost:8080/users/${updateData.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(updateData),
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
        const data = await response.json();
        //TODO: Onserver it will only return some info of user (not password)
        resolve({ data });
    });
}
