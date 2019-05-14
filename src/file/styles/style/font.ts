import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

export interface IFontAttributes {
    readonly name?: string;
}
export interface IFontFaceAttributes {
    readonly id: string;
    readonly fontKey: string;
    readonly subsetted: string;
}
class FontAttributes extends XmlAttributeComponent<IFontAttributes> {
    protected readonly xmlKeys = {
        name: "w:name",
    };
}
class FontFaceAttributes extends XmlAttributeComponent<IFontFaceAttributes> {
    protected readonly xmlKeys = {
        fontKey: "w:fontKey",
        id: "r:id",
        subsetted: "w:subsetted",
    };
}

export class Font extends XmlComponent {
    // tslint:disable-next-line:readonly-keyword
    protected name: string = "";
    constructor(name: string) {
        super("w:font");
        this.name = name;
        this.root.push(new FontAttributes({ name }));
    }

    public push(styleSegment: XmlComponent): void {
        this.root.push(styleSegment);
    }
    public get Name(): string {
        return this.name;
    }
    public set Name(name: string) {
        this.name = name;
    }
}

type fontStyles = "regular" | "bold" | "italic" | "bold-italic";
const toTitle = (str: string) => {
    return str
        .split(" ")
        .map((s) => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
        .join(" ");
};
class FontFace extends XmlComponent {
    constructor(style: fontStyles, fontName: string) {
        const asCamel = style
            .split("-")
            .map((x) => toTitle(x))
            .join("");
        super(`w:embed${asCamel}`);
        this.root.push(
            new FontFaceAttributes({
                fontKey: "{00000000-0000-0000-0000-000000000000}",
                id: `${fontName.toLowerCase()}${asCamel}`,
                subsetted: "0",
            }),
        );
    }
}
export class CustomFont extends Font {
    constructor(name: string) {
        super(name);
    }
    public addStyle(fontStyle: fontStyles): CustomFont {
        this.root.push(new FontFace(fontStyle, this.name));
        return this;
    }
}
