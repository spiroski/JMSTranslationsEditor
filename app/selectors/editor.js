export const getEditor = state => state.editor;

export function isSaving(state, domain, locale) {
    return !!getEditor(state).saving[`${domain}.${locale}`];
}

export const selectEditorDomain = state =>
    state && state.editor ? state.editor.domain : null;

export const selectEditorLocale = state =>
    state && state.editor ? state.editor.locale : null;

export const selectEditorFilter = state =>
    state && state.editor ? state.editor.filter : null;
