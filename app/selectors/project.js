export const selectProject = state => state.project;

export const selectProjectPath = state => selectProject(state).path;
