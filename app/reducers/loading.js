// @flow

import { LOAD_DOMAIN, DOMAIN_LOADED } from '../actions/editor';
import { PROJECT_OPENED } from '../actions/projects';
import type { Action } from './types';

function domains(state = {}, action: Action) {
    switch (action.type) {
        case LOAD_DOMAIN:
            return Object.assign({}, state, { [action.domain]: true });
        case DOMAIN_LOADED:
            return Object.assign({}, state, { [action.domain]: false });
        default:
            return state;
    }
}

const defaultState = {
    domains: {}
};

function loading(state = defaultState, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return Object.assign({}, defaultState);
        case LOAD_DOMAIN:
        case DOMAIN_LOADED:
            return Object.assign({}, state, {
                domains: domains(state.domains, action)
            });
        default:
            return state;
    }
}

export default loading;
