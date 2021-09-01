export const fetchCustomersList = async () => {
    const url = process.env.REACT_APP_API_BASE_URL + "/customers"
    const options = {
        method: "GET"
    }
    return await fetch(url, options)
}

export const deleteCustomer = async (customerId) => {
    const url = process.env.REACT_APP_API_BASE_URL + `/customers/${customerId}`
    const options = {
        method: "DELETE"
    }
    return await fetch(url, options);
}

export const addCustomer = async (values) => {
    const url = process.env.REACT_APP_API_BASE_URL + "/customers"
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
    }
    return await fetch(url, options)
}

export const fetchProducts = async () => {
    const url = process.env.REACT_APP_API_BASE_URL + "/products"
    const options = {
        method: "GET"
    }
    return await fetch(url, options)
}