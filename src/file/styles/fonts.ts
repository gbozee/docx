import { BaseXmlComponent, XmlComponent } from "file/xml-components";
import { DocumentDefaults } from "./defaults";
import { CharacterStyle, ParagraphStyle } from "./style";
export * from "./border";

export class Fonts extends XmlComponent {
    constructor(initialFonts?: BaseXmlComponent) {
        super("w:fonts");
        if (initialFonts) {
            this.root.push(initialFonts);
        }
    }

    public push(style: XmlComponent): Fonts {
        this.root.push(style);
        return this;
    }

    public createDocumentDefaults(): DocumentDefaults {
        const defaults = new DocumentDefaults();
        this.push(defaults);
        return defaults;
    }

    public createParagraphStyle(styleId: string, name?: string): ParagraphStyle {
        const paragraphStyle = new ParagraphStyle(styleId, name);
        this.push(paragraphStyle);
        return paragraphStyle;
    }

    public createCharacterStyle(styleId: string, name?: string): CharacterStyle {
        const characterStyle = new CharacterStyle(styleId, name);
        this.push(characterStyle);
        return characterStyle;
    }
}

export { CharacterStyle, ParagraphStyle } from "./style";
