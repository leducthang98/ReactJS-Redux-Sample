import { put, takeEvery } from 'redux-saga/effects';
import GetInfoUser from '../fetchAPIs/GetInfoUserAPI';
import { getCategory } from '../actions/HomeActions';
import GetCategory from '../fetchAPIs/GetCategoryAPI';
function* getInfoUser(action) {
    try {
        const userData = yield GetInfoUser(action.payload);
        yield put({
            type: 'GET_INFO_USER_SUCCESS',
            payload: { userData }
        })
    } catch (error) {
        yield put({
            type: 'GET_INFO_USER_FAILURE',
            payload: {
                errorMessage: error.message
            }
        })
    }
}
function* getCategories(action) {
    try {
        const categoryData = yield GetCategory(action.payload);
        yield put({
            type: 'GET_CATEGORY_SUCCESS',
            payload: { data: categoryData }
        })
    } catch (error) {
        yield put({
            type: 'GET_CATEGORY_FAILURE',
            payload: {
                errorMessage: error.message
            }
        })
    }
}
export const HomeSaga = [
    takeEvery("GET_INFO_USER_REQUEST", getInfoUser),
    takeEvery("GET_CATEGORY_REQUEST", getCategories),
]
