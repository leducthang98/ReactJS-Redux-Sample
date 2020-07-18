import { all } from 'redux-saga/effects'
import { HomeSaga } from './HomeSaga'
function* RootSaga() {
    yield all([
        ...HomeSaga
    ]);
}
export default RootSaga;