import * as ProjectActions from './actions/projects';

export default function(ipcRenderer, store) {
    ipcRenderer.on('dispatch', (event, action) => {
        store.dispatch(action);
    });

    ipcRenderer.on('open-project', () => {
        store.dispatch(ProjectActions.openProject());
    });
}
