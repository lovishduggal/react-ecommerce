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

export function updateOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `http://localhost:8080/orders/${order.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify(order),
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

export function fecthAllOrders({ pagination, sort }) {
    let queryString = '';

    for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
    }

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
        resolve({ data: { orders: data, totalOrders: +totalOrders } });
    });
}
