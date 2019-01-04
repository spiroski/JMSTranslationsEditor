// @flow
import { push } from 'connected-react-router';
import { remote } from 'electron';
import type { Dispatch } from '../reducers/types';
import { openProject as openProjectDialog } from '../utils/project';

export const OPEN_PROJECT = 'OPEN_PROJECT';
export const PROJECT_OPENED = 'PROJECT_OPENED';
export const PROJECT_OPEN_FAILED = 'PROJECT_OPEN_FAILED';

export function projectOpened(path) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: PROJECT_OPENED,
            path
        });
        dispatch(push(`/editor`));
    };
}

export const projectOpenFailed = {
    type: PROJECT_OPEN_FAILED
};

export function openProject() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: OPEN_PROJECT
        });
        openProjectDialog(remote.dialog)
            .then(path => dispatch(projectOpened(path)))
            .catch(() => dispatch(projectOpenFailed));
    };
}
