export default function GetInfoUser(token) {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3004/account_detail'
        fetch(url, {
            method: "GET",
            headers: { Authorization: 'Bearer' + ' ' + token }
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

