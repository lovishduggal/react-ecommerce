export function createOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json',
            },
        });
        const data = await response.json();
        //TODO: Onserver it will only return some info of user (not password)
        resolve({ data });
    });
}

export function fecthAllOrders(pagination) {
    let queryString = '';
    for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
    }
    return new Promise(async (resolve) => {
        const response = await fetch(
            `http://localhost:8080/orders?${queryString}`
        );
        const data = await response.json();
        const totalOrders = await response.headers.get('X-Total-Count');
        //TODO: Onserver it will only return some info of user (not password)
        resolve({ data: { orders: data, totalItems: +totalOrders } });
    });
}
