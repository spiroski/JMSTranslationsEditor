// @flow
import type { Action } from './types';
import { PROJECT_OPENED } from '../actions/projects';

export default function project(state = null, action: Action) {
    switch (action.type) {
        case PROJECT_OPENED:
            return { path: action.path };
        default:
            return state;
    }
}
