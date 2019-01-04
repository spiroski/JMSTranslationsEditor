// @flow
import {
    DOMAIN_LOADED,
    CHANGE_DOMAIN_LOCALE_TARGET,
    DOMAIN_LOCALE_SAVED
} from '../actions/editor';
import { PROJECT_OPENED } from '../actions/projects';
import type { Action } from './types';

function targets(state = {}, action: Action) {
    switch (action.type) {
        case CHANGE_DOMAIN_LOCALE_TARGET:
            return Object.assign({}, state, { [action.locale]: action.value });
        default:
            return state;
    }
}

function item(state = {}, action: Action) {
    switch (action.type) {
        case CHANGE_DOMAIN_LOCALE_TARGET:
            return Object.assign({}, state, {
                changed: true,
                targets: targets(state.targets, action)
            });
        case DOMAIN_LOCALE_SAVED:
            return Object.assign({}, state, { changed: false });
        default:
            return state;
    }
}

function items(state = {}, action: Action) {
    const changedItems = {};
    switch (action.type) {
        case CHANGE_DOMAIN_LOCALE_TARGET:
            return Object.assign({}, state, {
                [action.itemId]: item(state[action.itemId], action)
            });
        case DOMAIN_LOCALE_SAVED:
            for (const id in state) {
                if (state.hasOwnProperty(id)) {
                    changedItems[id] = item(state[id], action);
                }
            }
            return Object.assign({}, state, changedItems);
        default:
            return state;
    }
}

function domain(state = {}, action: Action) {
    const changed = { changed: true };
    switch (action.type) {
        case CHANGE_DOMAIN_LOCALE_TARGET:
        case DOMAIN_LOCALE_SAVED:
            return Object.assign({}, state, changed, {
                items: items(state.items, action)
            });
        default:
            return state;
    }
}

export default function domains(state = {}, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return {};
        case DOMAIN_LOADED:
            return Object.assign({}, state, { [action.domain]: action.data });
        case CHANGE_DOMAIN_LOCALE_TARGET:
        case DOMAIN_LOCALE_SAVED:
            return Object.assign({}, state, {
                [action.domain]: domain(state[action.domain], action)
            });
        default:
            return state;
    }
}
