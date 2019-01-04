// @flow
import xml2js from 'xml2js';
import { readXML, writeFile } from './domain-loader';

class DomainWriter {
    constructor(projectPath) {
        this.projectPath = projectPath;
    }

    getFilePath(domain, locale) {
        return `${this.projectPath}/${domain}.${locale}.xliff`;
    }

    async write(domain, locale, data) {
        const filePath = this.getFilePath(domain, locale);
        const xmlObject = await readXML(filePath);
        xmlObject.xliff.file[0].body[0]['trans-unit'].forEach((unit, index) => {
            const { id } = unit.$;
            const item = data.items[id];
            xmlObject.xliff.file[0].body[0]['trans-unit'][index].target[0] =
                item.targets[locale];
        });

        const builder = new xml2js.Builder({ cdata: true });
        const xml = builder.buildObject(xmlObject);
        return writeFile(filePath, xml);
    }
}

export default DomainWriter;
