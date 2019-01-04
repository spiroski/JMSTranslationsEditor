// @flow
import { push } from 'connected-react-router';
import type { GetState, Dispatch } from '../reducers/types';
import domainLoader from '../utils/domain-loader';
import DomainWriter from '../utils/DomainWriter';
import { selectDomain } from '../selectors/domains';
import { selectProjectPath } from '../selectors/project';

export const OPEN_DOMAIN = 'OPEN_DOMAIN';
export const LOAD_DOMAIN = 'LOAD_DOMAIN';
export const DOMAIN_LOADED = 'DOMAIN_LOADED';
export const LIST_DOMAINS = 'LIST_DOMAINS';
export const DOMAINS_LISTED = 'DOMAINS_LISTED';
export const OPEN_DOMAIN_LOCALE = 'OPEN_DOMAIN_LOCALE';
export const CHANGE_DOMAIN_LOCALE_TARGET = 'CHANGE_DOMAIN_LOCALE_TARGET';
export const SAVE_DOMAIN_LOCALE = 'SAVE_DOMAIN_LOCALE';
export const DOMAIN_LOCALE_SAVED = 'DOMAIN_LOCALE_SAVED';
export const DOMAIN_LOCALE_NOT_SAVED = 'DOMAIN_LOCALE_NOT_SAVED';
export const CHANGE_FILTER = 'CHANGE_FILTER';

function domainLoaded(domain, data) {
    return {
        type: DOMAIN_LOADED,
        domain,
        data
    };
}

function domainsListed(domains) {
    return {
        type: DOMAINS_LISTED,
        domains
    };
}

export function listDomains() {
    return (dispatch: Dispatch, getState: GetState) => {
        domainLoader
            .listDomains(selectProjectPath(getState()))
            .then(domains => {
                dispatch(domainsListed(domains));
                return domains;
            })
            .catch(error => console.error(error));
    };
}

export function loadDomain(domain) {
    return (dispatch: Dispatch, getState: GetState) => {
        const loading = getState().loading.domains[domain];
        if (loading) {
            return;
        }
        dispatch({
            type: LOAD_DOMAIN,
            domain
        });
        domainLoader
            .loadDomain(selectProjectPath(getState()), domain)
            .then(data => {
                dispatch(domainLoaded(domain, data));
                return data;
            })
            .catch(error => console.error(error));
    };
}

export function openDomain(domain) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: OPEN_DOMAIN,
            domain
        });
        dispatch(push(`/editor/${domain}`));
    };
}

export function openDomainLocale(domain, locale) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: OPEN_DOMAIN_LOCALE,
            domain,
            locale
        });
        dispatch(push(`/editor/${domain}/${locale}`));
    };
}

export function changeDomainLocaleTarget(domain, locale, itemId, value) {
    return {
        type: CHANGE_DOMAIN_LOCALE_TARGET,
        domain,
        locale,
        itemId,
        value
    };
}

export function saveDomainLocale(domain, locale) {
    return (dispatch: Dispatch, getState: GetState) => {
        dispatch({
            type: SAVE_DOMAIN_LOCALE,
            domain,
            locale
        });
        const writter = new DomainWriter(selectProjectPath(getState()));
        writter
            .write(domain, locale, selectDomain(getState(), domain))
            .then(result => {
                dispatch({
                    type: DOMAIN_LOCALE_SAVED,
                    domain,
                    locale
                });
                return result;
            })
            .catch(err => {
                dispatch({
                    type: DOMAIN_LOCALE_NOT_SAVED,
                    domain,
                    locale
                });
                console.error(err);
            });
    };
}

export const changeFilter = filter => ({
    type: CHANGE_FILTER,
    filter
});
