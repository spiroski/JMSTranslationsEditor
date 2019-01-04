// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counter from './counter';
import project from './project';
import domains from './domains';
import editor from './editor';
import loading from './loading';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        counter,
        project,
        domains,
        editor,
        loading
    });
}
