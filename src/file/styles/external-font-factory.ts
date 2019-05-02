import { convertToXmlComponent, ImportedRootElementAttributes, ImportedXmlComponent } from "file/xml-components";
import { Element as XMLElement, xml2js } from "xml-js";
import { Fonts } from "./";

export class ExternalFontFactory {
    /**
     * Creates new Font based on the given fonts.
     * Parses the fonts and convert them to XmlComponent.
     * Example content from fonts.xml:
     * <?xml version="1.0">
     * <w:fonts xmlns:mc="some schema" ...>
     *
     *   <w:font w:type="paragraph" w:styleId="Heading1">
     *           <w:name w:val="heading 1"/>
     *           .....
     *   </w:font>
     *
     *   <w:font w:type="paragraph" w:styleId="Heading2">
     *           <w:name w:val="heading 2"/>
     *           .....
     *   </w:font>
     *
     *   <w:docDefaults>Or any other element will be parsed to</w:docDefaults>
     *
     * </w:styles>
     * @param externalFonts context from styles.xml
     */
    public newInstance(xmlData: string): Fonts {
        const xmlObj = xml2js(xmlData, { compact: false }) as XMLElement;
        let stylesXmlElement: XMLElement | undefined;
        for (const xmlElm of xmlObj.elements || []) {
            if (xmlElm.name === "w:fonts") {
                stylesXmlElement = xmlElm;
            }
        }
        if (stylesXmlElement === undefined) {
            throw new Error("can not find fonts element");
        }

        const importedStyle = new Fonts(new ImportedRootElementAttributes(stylesXmlElement.attributes));
        const stylesElements = stylesXmlElement.elements || [];
        for (const childElm of stylesElements) {
            importedStyle.push(convertToXmlComponent(childElm) as ImportedXmlComponent);
        }
        return importedStyle;
    }
}
