import fs from 'mz/fs';
import xml2js from 'xml2js';
import * as deepmerge from 'deepmerge';

const GENERAL_REGEX = new RegExp('^(.*)\\.(.*?)\\.(xliff)$');

function getFiles(path) {
    return fs
        .readdir(path)
        .then(files => files.filter(file => GENERAL_REGEX.test(file)));
}

export function readFile(path) {
    return fs.readFile(path);
}

export function writeFile(path, contents) {
    return fs.writeFile(path, contents);
}

export function readXML(path) {
    return readFile(path).then(fileContents =>
        new Promise((resolve, reject) => {
            const parser = new xml2js.Parser();
            parser.parseString(fileContents, (err, result) => {
                if (result) {
                    resolve(result);
                }
                reject(err);
            });
        }).catch(err => err)
    );
}

function listDomains(path) {
    return getFiles(path)
        .then(files => {
            const domains = [];
            files.forEach(filename => {
                const matches = GENERAL_REGEX.exec(filename);
                if (matches) {
                    const domain = matches[1];
                    if (!domains.includes(domain)) {
                        domains.push(domain);
                    }
                }
            });
            return domains;
        })
        .catch(error => error);
}

async function appendItems(domain, locale, path) {
    return readXML(`${path}/${domain}.${locale}.xliff`)
        .then(data => {
            const items = {};
            data.xliff.file[0].body[0]['trans-unit'].forEach(unit => {
                const { id } = unit.$;
                const source = unit.source[0];
                const target = unit.target[0];
                if (!items[id]) {
                    items[id] = { source, targets: {} };
                }
                items[id].targets[locale] = target;
            });

            return items;
        })
        .catch(err => {
            console.error(err);
            return {};
        });
}

async function loadDomain(path, domain) {
    return new Promise((resolve, reject) => {
        getFiles(path)
            .then(files => {
                let found = false;
                const domainData = { locales: [], items: {} };

                files.forEach(async (filename, index, arr) => {
                    const matches = GENERAL_REGEX.exec(filename);
                    const domainId = matches[1];
                    const locale = matches[2];
                    if (domainId === domain) {
                        found = true;
                        domainData.locales.push(locale);
                        const newItems = await appendItems(
                            domainId,
                            locale,
                            path
                        );
                        domainData.items = deepmerge(
                            domainData.items,
                            newItems
                        );
                        if (index + 1 === arr.length) {
                            return resolve(domainData);
                        }
                    }
                });

                if (!found) {
                    return reject(new Error(`Domain ${domain} not found`));
                }

                return resolve(domainData);
            })
            .catch(error => error);
    });
}

export default {
    loadDomain,
    listDomains
};
