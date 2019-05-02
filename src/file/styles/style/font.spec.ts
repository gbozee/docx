import { expect } from "chai";
import { Formatter } from "export/formatter";
import { CustomFont, Font } from "./font";

describe("Font", () => {
    describe("Default Font", () => {
        it("should set the name of the font", () => {
            const font = new Font("Acme");
            const tree = new Formatter().format(font);
            expect(tree).to.deep.equal({
                "w:font": { _attr: { "w:name": "Acme" } },
            });
        });
    });
    describe("Custom Font", () => {
        it("should set the name of the font", () => {
            const font = new CustomFont("Acme");
            const tree = new Formatter().format(font);
            expect(tree).to.deep.equal({
                "w:font": { _attr: { "w:name": "Acme" } },
            });
        });
        it("different font Weights i.e regular, bold, italics", () => {
            const font = new CustomFont("Acme")
                .addStyle("regular")
                .addStyle("bold")
                .addStyle("italic")
                .addStyle("bold-italic");
            const tree = new Formatter().format(font);
            expect(tree).to.deep.equal({
                "w:font": [
                    { _attr: { "w:name": "Acme" } },
                    {
                        "w:embedRegular": {
                            _attr: { "w:fontKey": "{00000000-0000-0000-0000-000000000000}", "r:id": "acmeRegular", "w:subsetted": "0" },
                        },
                    },
                    {
                        "w:embedBold": {
                            _attr: { "w:fontKey": "{00000000-0000-0000-0000-000000000000}", "r:id": "acmeBold", "w:subsetted": "0" },
                        },
                    },
                    {
                        "w:embedItalic": {
                            _attr: { "w:fontKey": "{00000000-0000-0000-0000-000000000000}", "r:id": "acmeItalic", "w:subsetted": "0" },
                        },
                    },
                    {
                        "w:embedBoldItalic": {
                            _attr: {
                                "w:fontKey": "{00000000-0000-0000-0000-000000000000}",
                                "r:id": "acmeBoldItalic",
                                "w:subsetted": "0",
                            },
                        },
                    },
                ],
            });
        });
    });
});
