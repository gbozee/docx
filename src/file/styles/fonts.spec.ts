import { assert, expect } from "chai";

import { Formatter } from "export/formatter";

import { CharacterStyle, ParagraphStyle } from "./style";

import { Fonts } from "./fonts";

import { EMPTY_OBJECT } from "file/xml-components";

describe("Fonts", () => {
    let fonts: Fonts;

    beforeEach(() => {
        fonts = new Fonts();
    });

    describe("#constructor()", () => {
        it("should create fonts with correct rootKey", () => {
            const newJson = JSON.parse(JSON.stringify(fonts));
            assert.equal(newJson.rootKey, "w:fonts");
        });
    });

    describe("#createParagraphStyle", () => {
        it("should create a new paragraph style and push it onto this collection", () => {
            const pStyle = fonts.createParagraphStyle("pStyleId");
            expect(pStyle).to.instanceOf(ParagraphStyle);
            const tree = new Formatter().format(fonts)["w:fonts"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "w:style": { _attr: { "w:type": "paragraph", "w:styleId": "pStyleId" } },
                },
            ]);
        });

        it("should set the paragraph name if given", () => {
            const pStyle = fonts.createParagraphStyle("pStyleId", "Paragraph Style");
            expect(pStyle).to.instanceOf(ParagraphStyle);
            const tree = new Formatter().format(fonts)["w:fonts"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "w:style": [
                        { _attr: { "w:type": "paragraph", "w:styleId": "pStyleId" } },
                        { "w:name": { _attr: { "w:val": "Paragraph Style" } } },
                    ],
                },
            ]);
        });
    });

    describe("#createCharacterStyle", () => {
        it("should create a new character style and push it onto this collection", () => {
            const cStyle = fonts.createCharacterStyle("pStyleId");
            expect(cStyle).to.instanceOf(CharacterStyle);
            const tree = new Formatter().format(fonts)["w:fonts"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "w:style": [
                        { _attr: { "w:type": "character", "w:styleId": "pStyleId" } },
                        {
                            "w:uiPriority": {
                                _attr: {
                                    "w:val": "99",
                                },
                            },
                        },
                        {
                            "w:unhideWhenUsed": EMPTY_OBJECT,
                        },
                    ],
                },
            ]);
        });

        it("should set the character name if given", () => {
            const cStyle = fonts.createCharacterStyle("pStyleId", "Character Style");
            expect(cStyle).to.instanceOf(CharacterStyle);
            const tree = new Formatter().format(fonts)["w:fonts"].filter((x) => !x._attr);
            expect(tree).to.deep.equal([
                {
                    "w:style": [
                        { _attr: { "w:type": "character", "w:styleId": "pStyleId" } },
                        { "w:name": { _attr: { "w:val": "Character Style" } } },
                        {
                            "w:uiPriority": {
                                _attr: {
                                    "w:val": "99",
                                },
                            },
                        },
                        {
                            "w:unhideWhenUsed": EMPTY_OBJECT,
                        },
                    ],
                },
            ]);
        });
    });
});
