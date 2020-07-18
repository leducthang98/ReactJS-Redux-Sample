export default function GetCategory(data) {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3004/category_page?page=' + data.page;
        fetch(url, {
            method: "GET",
            headers: { Authorization: 'Bearer' + ' ' + data.token }
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

