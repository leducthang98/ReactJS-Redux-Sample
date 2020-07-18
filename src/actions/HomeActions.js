export function getInfoUser(payload) {
    return (
        {
            type: "GET_INFO_USER_REQUEST",
            payload
        }
    )
}
export function getCategory(payload) {
    return (
        {
            type: "GET_CATEGORY_REQUEST",
            payload
        }
    )
}
export function loadingCategory(payload) {
    return (
        {
            type: "LOADING_CATEGORY",
            payload
        }
    )
}