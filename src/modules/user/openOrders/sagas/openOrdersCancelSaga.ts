// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush, getUserInfo } from '../../../index';
import { openOrdersCancelError, OpenOrdersCancelFetch } from '../actions';

const ordersCancelOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'peatio',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* openOrdersCancelSaga(action: OpenOrdersCancelFetch) {
    try {
        const { id } = action.payload;
        const currentUserInfo = yield getUserInfo();
        yield call(API.post(ordersCancelOptions(currentUserInfo && currentUserInfo.csrf_token)), `/market/orders/${id}/cancel`, { id });
        yield put(alertPush({ message: ['success.order.cancelling'], type: 'success'}));
    } catch (error) {
        yield put(openOrdersCancelError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
