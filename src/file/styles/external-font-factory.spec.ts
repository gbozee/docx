import { expect } from "chai";

import { ExternalFontFactory } from "./external-font-factory";

describe("External fonts factory", () => {
    let fontsXML;
    beforeEach(() => {
        fontsXML = `
        <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
        <w:fonts xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:lc="http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml">
            <w:font w:name="Times New Roman"/>
            <w:font w:name="Georgia"/>
            <w:font w:name="Acme">
                <w:embedRegular w:fontKey="{00000000-0000-0000-0000-000000000000}" r:id="rId1" w:subsetted="0"/>
            </w:font>
            <w:font w:name="Rubik">
                <w:embedRegular w:fontKey="{00000000-0000-0000-0000-000000000000}" r:id="rId2" w:subsetted="0"/>
                <w:embedBold w:fontKey="{00000000-0000-0000-0000-000000000000}" r:id="rId3" w:subsetted="0"/>
                <w:embedItalic w:fontKey="{00000000-0000-0000-0000-000000000000}" r:id="rId4" w:subsetted="0"/>
                <w:embedBoldItalic w:fontKey="{00000000-0000-0000-0000-000000000000}" r:id="rId5" w:subsetted="0"/>
            </w:font>
        </w:fonts>`;
    });
    describe("#parse", () => {
        it("should parse w:fonts attributes", () => {
            // tslint:disable-next-line:no-any
            const importedFonts = new ExternalFontFactory().newInstance(fontsXML) as any;
            expect(importedFonts.rootKey).to.equal("w:fonts");
            expect(importedFonts.root[0]._attr).to.deep.equal({
                "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
                "xmlns:o": "urn:schemas-microsoft-com:office:office",
                "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
                "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
                "xmlns:v": "urn:schemas-microsoft-com:vml",
                "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
                "xmlns:w10": "urn:schemas-microsoft-com:office:word",
                "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
                "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
                "xmlns:sl": "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
                "xmlns:a": "http://schemas.openxmlformats.org/drawingml/2006/main",
                "xmlns:pic": "http://schemas.openxmlformats.org/drawingml/2006/picture",
                "xmlns:c": "http://schemas.openxmlformats.org/drawingml/2006/chart",
                "xmlns:lc": "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
                "xmlns:dgm": "http://schemas.openxmlformats.org/drawingml/2006/diagram",
                "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
                "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
                "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
                "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
            });
        });
        it("should parse other child elements of w:fonts", () => {
            // tslint:disable-next-line:no-any
            const importedStyle = new ExternalFontFactory().newInstance(fontsXML) as any;
            expect(importedStyle.root[1]).to.deep.equal({
                deleted: false,
                root: [
                    {
                        deleted: false,
                        root: {
                            "w:name": "Times New Roman",
                        },
                        rootKey: "_attr",
                    },
                ],
                rootKey: "w:font",
            });
        });
    });
});
