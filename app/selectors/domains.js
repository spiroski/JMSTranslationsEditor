// @flow
import { createSelector } from 'reselect';
import {
    selectEditorDomain,
    selectEditorLocale,
    selectEditorFilter
} from './editor';

export const selectDomains = state => state.domains;

export const selectDomain = (state, domain) =>
    state && state.domains ? state.domains[domain] : null;

export const selectItems = (state, domain) => {
    const dom = selectDomain(state, domain);
    return dom ? dom.items : null;
};

export const selectOpenedDomainItems = state => {
    const domain = selectEditorDomain(state);
    return state.domains[domain].items;
};

export const selectOpenedItems = createSelector(
    [selectEditorDomain, selectEditorLocale, selectOpenedDomainItems],
    (domain, locale, items) => {
        const result = [];
        const keys = Object.keys(items);
        keys.forEach(key => {
            result.push({
                id: key,
                source: items[key].source,
                target: items[key].targets[locale]
            });
        });

        return result;
    }
);

export const selectOpenedFilteredItems = createSelector(
    [selectOpenedItems, selectEditorFilter],
    (items = [], filter = '') =>
        items.filter(item => {
            const { source, target } = item;

            return (
                (source &&
                    source.toUpperCase().includes(filter.toUpperCase())) ||
                (target && target.toUpperCase().includes(filter.toUpperCase()))
            );
        })
);
