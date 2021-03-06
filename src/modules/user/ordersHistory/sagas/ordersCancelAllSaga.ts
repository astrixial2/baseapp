// tslint:disable-next-line
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../index';
import {
    ordersCancelAllError,
    OrdersCancelAllFetch,
} from '../actions';

const ordersCancelAllOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* ordersCancelAllSaga(action: OrdersCancelAllFetch) {
    try {
        yield call(API.post(ordersCancelAllOptions), '/market/orders/cancel', action.payload);
        yield put(alertPush({ message: ['success.order.cancelling.all'], type: 'success'}));
    } catch (error) {
        yield put(ordersCancelAllError());
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
