export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        //Todo: We will not hard-code server URL here.
        const response = await fetch('http://localhost:8080/products');
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchAllProductsByFilters(filter) {
    // TODO: On server we will support mutli value searching
    return new Promise(async (resolve) => {
        let queryString = '';
        for (let key in filter) {
            queryString += `${key}=${filter[key]}&`;
        }
        const response = await fetch(
            `http://localhost:8080/products?${queryString}`
        );
        const data = await response.json();
        resolve({ data });
    });
}
