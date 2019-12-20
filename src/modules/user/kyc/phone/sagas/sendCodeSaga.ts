// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../../api';
import { alertPush, getUserInfo } from '../../../../index';
import { sendCodeData, sendCodeError, SendCodeFetch } from '../actions';

const sessionsConfig = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'barong',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* sendCodeSaga(action: SendCodeFetch) {
    try {
        const currentUserInfo = yield getUserInfo();
        yield call(API.post(sessionsConfig(currentUserInfo && currentUserInfo.csrf_token)), '/resource/phones', action.payload);
        yield put(sendCodeData());
        yield put(alertPush({message: ['success.phone.verification.send'], type: 'success'}));
    } catch (error) {
        yield put(sendCodeError(error));
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
