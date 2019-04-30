import { expect } from "chai";
import * as sinon from "sinon";
import { CoreProperties } from "./core-properties";

import { Formatter } from "export/formatter";

import { File } from "./file";
import { Paragraph } from "./paragraph";
import { Table } from "./table";

describe("File", () => {
    describe("#constructor", () => {
        it("should create with correct headers and footers", () => {
            const doc = new File();
            const header = doc.createHeader();
            const footer = doc.createFooter();

            doc.addSection({
                headers: {
                    default: header,
                },
                footers: {
                    default: footer,
                },
            });

            const tree = new Formatter().format(doc.Document.Body);

            expect(tree["w:body"][1]["w:sectPr"][4]["w:headerReference"]._attr["w:type"]).to.equal("default");
            expect(tree["w:body"][1]["w:sectPr"][5]["w:footerReference"]._attr["w:type"]).to.equal("default");
        });

        it("should create with first headers and footers", () => {
            const doc = new File();
            const header = doc.createHeader();
            const footer = doc.createFooter();

            doc.addSection({
                headers: {
                    first: header,
                },
                footers: {
                    first: footer,
                },
            });

            const tree = new Formatter().format(doc.Document.Body);

            expect(tree["w:body"][1]["w:sectPr"][4]["w:headerReference"]._attr["w:type"]).to.equal("first");
            expect(tree["w:body"][1]["w:sectPr"][5]["w:footerReference"]._attr["w:type"]).to.equal("first");
        });

        it("should create with correct headers", () => {
            const doc = new File();
            const header = doc.createHeader();
            const footer = doc.createFooter();

            doc.addSection({
                headers: {
                    default: header,
                    first: header,
                    even: header,
                },
                footers: {
                    default: footer,
                    first: footer,
                    even: footer,
                },
            });

            const tree = new Formatter().format(doc.Document.Body);

            expect(tree["w:body"][1]["w:sectPr"][4]["w:headerReference"]._attr["w:type"]).to.equal("default");
            expect(tree["w:body"][1]["w:sectPr"][5]["w:headerReference"]._attr["w:type"]).to.equal("first");
            expect(tree["w:body"][1]["w:sectPr"][6]["w:headerReference"]._attr["w:type"]).to.equal("even");

            expect(tree["w:body"][1]["w:sectPr"][7]["w:footerReference"]._attr["w:type"]).to.equal("default");
            expect(tree["w:body"][1]["w:sectPr"][8]["w:footerReference"]._attr["w:type"]).to.equal("first");
            expect(tree["w:body"][1]["w:sectPr"][9]["w:footerReference"]._attr["w:type"]).to.equal("even");
        });
    });

    describe("#addParagraph", () => {
        it("should call the underlying document's addParagraph", () => {
            const file = new File();
            const spy = sinon.spy(file.Document, "addParagraph");
            file.addParagraph(new Paragraph());

            expect(spy.called).to.equal(true);
        });
    });

    describe("#addTable", () => {
        it("should call the underlying document's addTable", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Document, "addTable");
            wrapper.addTable(
                new Table({
                    rows: 1,
                    columns: 1,
                }),
            );

            expect(spy.called).to.equal(true);
        });
    });

    describe("#createTable", () => {
        it("should call the underlying document's createTable", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Document, "createTable");
            wrapper.createTable({
                rows: 1,
                columns: 1,
            });

            expect(spy.called).to.equal(true);
        });
    });

    describe("#addTableOfContents", () => {
        it("should call the underlying document's addTableOfContents", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Document, "addTableOfContents");
            // tslint:disable-next-line:no-any
            wrapper.addTableOfContents({} as any);

            expect(spy.called).to.equal(true);
        });
    });

    describe("#createParagraph", () => {
        it("should call the underlying document's createParagraph", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Document, "createParagraph");
            wrapper.createParagraph("test");

            expect(spy.called).to.equal(true);
        });
    });

    describe("#addImage", () => {
        it("should call the underlying document's addImage", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Document, "addParagraph");
            // tslint:disable-next-line:no-any
            wrapper.addImage({} as any);

            expect(spy.called).to.equal(true);
        });
    });

    describe("#createImage", () => {
        it("should call the underlying document's createImage", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.Media, "addMedia");
            const wrapperSpy = sinon.spy(wrapper.Document, "addParagraph");
            wrapper.createImage("");

            expect(spy.called).to.equal(true);
            expect(wrapperSpy.called).to.equal(true);
        });
    });

    describe("#createFootnote", () => {
        it("should call the underlying document's createFootnote", () => {
            const wrapper = new File();
            const spy = sinon.spy(wrapper.FootNotes, "createFootNote");
            wrapper.createFootnote(new Paragraph(""));

            expect(spy.called).to.equal(true);
        });
    });
    describe("#coreProperties", () => {
        const properties = {
            title: "test document",
            subject: "test subject",
            creator: "me",
            keywords: "test docx",
            description: "testing document",
            lastModifiedBy: "the author",
            revision: "123",
        };
        it("should create the core properties in the constructor", () => {
            const wrapper = new File(properties);
            expectCoreProperties(wrapper.CoreProperties);
        });
        it("should create the core properties outside the constructor", () => {
            const wrapper = new File();
            wrapper.CoreProperties = new CoreProperties(properties);
            expectCoreProperties(wrapper.CoreProperties);
        });
    });
});

// tslint:disable-next-line: typedef
function expectCoreProperties(properties) {
    const tree = new Formatter().format(properties);
    expect(Object.keys(tree)).to.deep.equal(["cp:coreProperties"]);
    expect(tree["cp:coreProperties"]).to.be.an.instanceof(Array);
    const key = (obj: {}) => Object.keys(obj)[0];
    const props = tree["cp:coreProperties"].map(key).sort();
    expect(props).to.deep.equal([
        "_attr",
        "cp:keywords",
        "cp:lastModifiedBy",
        "cp:revision",
        "dc:creator",
        "dc:description",
        "dc:subject",
        "dc:title",
        "dcterms:created",
        "dcterms:modified",
    ]);
    // tslint:disable-next-line: no-any
    expect(tree["cp:coreProperties"].slice(1, -2).sort((a: any, b: any) => (key(a) < key(b) ? -1 : 1))).to.deep.equal([
        { "cp:keywords": ["test docx"] },
        { "cp:lastModifiedBy": ["the author"] },
        { "cp:revision": ["123"] },
        { "dc:creator": ["me"] },
        { "dc:description": ["testing document"] },
        { "dc:subject": ["test subject"] },
        { "dc:title": ["test document"] },
    ]);
}
