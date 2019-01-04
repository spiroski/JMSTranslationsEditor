// @flow
import { combineReducers } from 'redux';

import {
    OPEN_DOMAIN,
    OPEN_DOMAIN_LOCALE,
    DOMAINS_LISTED,
    SAVE_DOMAIN_LOCALE,
    DOMAIN_LOCALE_SAVED,
    DOMAIN_LOCALE_NOT_SAVED,
    CHANGE_FILTER
} from '../actions/editor';
import { PROJECT_OPENED } from '../actions/projects';
import type { Action } from './types';

function saving(state = {}, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return {};
        case SAVE_DOMAIN_LOCALE:
            return Object.assign({}, state, {
                [`${action.domain}.${action.locale}`]: true
            });
        case DOMAIN_LOCALE_SAVED:
        case DOMAIN_LOCALE_NOT_SAVED:
            return Object.assign({}, state, {
                [`${action.domain}.${action.locale}`]: false
            });
        default:
            return state;
    }
}

function domain(state = null, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return null;
        case OPEN_DOMAIN:
            return action.domain;
        default:
            return state;
    }
}

function locale(state = null, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return null;
        case OPEN_DOMAIN_LOCALE:
            return action.locale;
        default:
            return state;
    }
}

function availableDomains(state = [], action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return [];
        case DOMAINS_LISTED:
            return action.domains;
        default:
            return state;
    }
}

function filter(state = '', action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return '';
        case CHANGE_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default combineReducers({
    domain,
    locale,
    availableDomains,
    saving,
    filter
});
