const DEFAULT_STATE = {
    infoUser: null,
    dataCategory: null,
    isLoadingCategory: false,
}

export default (state = DEFAULT_STATE, action) => {

    switch (action.type) {
        case 'GET_INFO_USER_SUCCESS':
            return {
                ...state,
                infoUser: action.payload.userData
            }
        case 'GET_INFO_USER_FAILURE':
            return {
            }
        case 'GET_CATEGORY_SUCCESS':
            return {
                ...state,
                dataCategory: action.payload.data,
                isLoadingCategory: false
            }
        case 'GET_CATEGORY_FAILURE':
            return {
            }
        case 'GET_CATEGORY_REQUEST':
            return {
                ...state,
                isLoadingCategory: true,
            }
        case 'LOADING_CATEGORY':
            return {
                ...state,
                isLoadingCategory: true,
            }
        default:
            return state;
    }

}
