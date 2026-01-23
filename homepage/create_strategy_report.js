const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        LevelFormat, PageBreak, Header, Footer, PageNumber } = require('docx');
const fs = require('fs');

// Create the strategy report document
const doc = new Document({
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
              run: { size: 36, bold: true, font: "Arial", color: "06c656" },
              paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
            { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
              run: { size: 28, bold: true, font: "Arial" },
              paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
            { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
              run: { size: 24, bold: true, font: "Arial" },
              paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
        ]
    },
    numbering: {
        config: [
            { reference: "bullets",
              levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
            { reference: "numbers",
              levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
                style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
        ]
    },
    sections: [{
        properties: {
            page: {
                size: { width: 11906, height: 16838 },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
        },
        headers: {
            default: new Header({
                children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [new TextRun({ text: "AI Perspective Bot \u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0\u6226\u7565", size: 18, color: "888888" })]
                })]
            })
        },
        footers: {
            default: new Footer({
                children: [new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: "Page ", size: 18 }), new TextRun({ children: [PageNumber.CURRENT], size: 18 })]
                })]
            })
        },
        children: [
            // Title
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
                children: [new TextRun({ text: "AI Perspective Bot", size: 52, bold: true, color: "06c656" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 },
                children: [new TextRun({ text: "\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u6700\u7d42\u30c1\u30a7\u30c3\u30af\uff06\u62e1\u6563\u6226\u7565\u30ec\u30dd\u30fc\u30c8", size: 36, bold: true })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 800 },
                children: [new TextRun({ text: "2026\u5e741\u670823\u65e5", size: 22, color: "666666" })]
            }),

            // Executive Summary
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("\u30a8\u30b0\u30bc\u30af\u30c6\u30a3\u30d6\u30b5\u30de\u30ea\u30fc")] }),
            new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun("\u300cAI Perspective Bot\u300d\u306f\u3001\u4f4f\u5b85\u55b6\u696d\u30de\u30f3\u30fb\u5de5\u52d9\u5e97\u5411\u3051\u306eLINE\u30d9\u30fc\u30b9\u306e\u5efa\u7bc9\u30d1\u30fc\u30b9AI\u751f\u6210\u30b5\u30fc\u30d3\u30b9\u3067\u3059\u3002\u5199\u771f\u3092\u9001\u308b\u3060\u3051\u30671\u5206\u3067\u30d7\u30ed\u7d1a\u306e\u30d1\u30fc\u30b9\u304c\u5b8c\u6210\u3059\u308b\u3068\u3044\u3046\u5727\u5012\u7684\u306a\u4fa1\u5024\u63d0\u6848\u3092\u6301\u3063\u3066\u3044\u307e\u3059\u3002\u672c\u30ec\u30dd\u30fc\u30c8\u3067\u306f\u3001\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u306e\u6700\u7d42\u30c1\u30a7\u30c3\u30af\u7d50\u679c\u3068\u3001\u30b5\u30fc\u30d3\u30b9\u3092\u4e16\u306e\u4e2d\u306b\u5e83\u3052\u308b\u305f\u3081\u306e\u5305\u62ec\u7684\u306a\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0\u6226\u7565\u3092\u63d0\u6848\u3057\u307e\u3059\u3002")]
            }),

            new Paragraph({ children: [new PageBreak()] }),

            // Section 1: Final Check Results
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. \u30db\u30fc\u30e0\u30da\u30fc\u30b8\u6700\u7d42\u30c1\u30a7\u30c3\u30af\u7d50\u679c")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 \u73fe\u72b6\u306e\u8a55\u4fa1\u30b5\u30de\u30ea\u30fc")] }),

            // Status table
            createStatusTable(),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 SEO\u306e\u554f\u984c\u70b9\uff08\u7dca\u6025\u5bfe\u5fdc\u5fc5\u8981\uff09")] }),

            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u30bf\u30a4\u30c8\u30eb\u30bf\u30b0: ", bold: true }), new TextRun("\u300cAI Perspective Bot - \u6599\u91d1\u30d7\u30e9\u30f3 & FAQ\u300d\u2192 \u65e5\u672c\u8a9e\u30ad\u30fc\u30ef\u30fc\u30c9\u304c\u4e0d\u8db3")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "meta description: ", bold: true }), new TextRun("\u5b8c\u5168\u306b\u6b20\u843d\u2192\u691c\u7d22CTR\u306b\u91cd\u5927\u306a\u5f71\u97ff")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "OGP\u30bf\u30b0: ", bold: true }), new TextRun("\u672a\u8a2d\u5b9a\u2192LINE\u30b7\u30a7\u30a2\u6642\u306e\u30d7\u30ec\u30d3\u30e5\u30fc\u304c\u4e0d\u9069\u5207")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u69cb\u9020\u5316\u30c7\u30fc\u30bf: ", bold: true }), new TextRun("FAQ\u30bb\u30af\u30b7\u30e7\u30f3\u306b\u5bfe\u5fdc\u3059\u308bJSON-LD\u304c\u306a\u3044")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "h1\u30bf\u30b0\u306e\u91cd\u8907: ", bold: true }), new TextRun("\u30da\u30fc\u30b8\u5185\u306b2\u3064\u306eh1\u304c\u5b58\u5728")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 \u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9\u306e\u554f\u984c\u70b9\uff08\u7dca\u6025\u5bfe\u5fdc\u5fc5\u8981\uff09")] }),

            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u753b\u50cf\u30b5\u30a4\u30ba: ", bold: true }), new TextRun("\u5408\u8a08\u7d0440MB\uff08gallery_8.png\u306f7.5MB\uff09\u2192WebP\u5909\u63db\u3067-90%\u524a\u6e1b\u53ef\u80fd")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "Tailwind CDN: ", bold: true }), new TextRun("\u958b\u767a\u7528CDN\u3092\u672c\u756a\u5229\u7528\u2192\u30d3\u30eb\u30c9\u7248\u306b\u79fb\u884c\u5fc5\u8981")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "Lazy Loading: ", bold: true }), new TextRun("\u5168\u753b\u50cf\u304c\u5373\u5ea7\u306b\u8aad\u307f\u8fbc\u307e\u308c\u308b\u2192loading=\"lazy\"\u8ffd\u52a0\u5fc5\u8981")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "\u30d5\u30a9\u30f3\u30c8: ", bold: true }), new TextRun("4\u30a6\u30a7\u30a4\u30c8\u00d72\u30d5\u30a9\u30f3\u30c8\u2192\u524a\u6e1b\u63a8\u5968")] }),

            new Paragraph({ children: [new PageBreak()] }),

            // Section 2: Marketing Strategy
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. \u62e1\u6563\u6226\u7565\uff08\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0\u30d7\u30e9\u30f3\uff09")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 \u30bf\u30fc\u30b2\u30c3\u30c8\u5206\u6790")] }),
            new Paragraph({ spacing: { after: 200 },
                children: [new TextRun({ text: "\u30e1\u30a4\u30f3\u30bf\u30fc\u30b2\u30c3\u30c8: ", bold: true }), new TextRun("\u4f4f\u5b85\u55b6\u696d\u30de\u30f3\u3001\u5de5\u52d9\u5e97\u3001\u8a2d\u8a08\u4e8b\u52d9\u6240")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun("\u30da\u30a4\u30f3\u30dd\u30a4\u30f3\u30c8: \u30d1\u30fc\u30b9\u4f5c\u6210\u306e\u6642\u9593\u30fb\u30b3\u30b9\u30c8\u3001\u63d0\u6848\u30b9\u30d4\u30fc\u30c9\u3001\u5c02\u9580\u30bd\u30d5\u30c8\u306e\u64cd\u4f5c")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun("\u7af6\u5408\u512a\u4f4d\u6027: \u300cLINE\u3067\u5b8c\u7d50\u300d\u300c1\u5206\u3067\u5b8c\u6210\u300d\u300c\u6708\u7d043\u56de\u7121\u6599\u300d")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 SEO\u6226\u7565")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("\u30bf\u30fc\u30b2\u30c3\u30c8\u30ad\u30fc\u30ef\u30fc\u30c9")] }),
            createKeywordTable(),

            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("\u30b3\u30f3\u30c6\u30f3\u30c4\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u30d6\u30ed\u30b0\u8a18\u4e8b\u306e\u4f5c\u6210: ", bold: true }), new TextRun("\u300c\u5efa\u7bc9\u30d1\u30fc\u30b9 \u81ea\u52d5\u751f\u6210 \u6bd4\u8f03\u300d\u300cAI \u5efa\u7bc9 \u6d3b\u7528\u4e8b\u4f8b\u300d\u7b49")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u4e8b\u4f8b\u30da\u30fc\u30b8: ", bold: true }), new TextRun("\u5b9f\u969b\u306e\u5229\u7528\u8005\u306e\u58f0\u3001Before/After\u753b\u50cf")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "FAQ\u5145\u5b9f: ", bold: true }), new TextRun("\u691c\u7d22\u610f\u56f3\u306b\u5408\u308f\u305b\u305f\u8cea\u554f\u3092\u8ffd\u52a0")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 SNS\u6226\u7565")] }),

            createSNSTable(),

            new Paragraph({ children: [new PageBreak()] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.4 LINE\u516c\u5f0f\u30a2\u30ab\u30a6\u30f3\u30c8\u6d3b\u7528")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u30ea\u30c3\u30c1\u30e1\u30cb\u30e5\u30fc\u306e\u6d3b\u7528: ", bold: true }), new TextRun("\u4f7f\u3044\u65b9\u3001\u4f8b\u3001\u6599\u91d1\u30d7\u30e9\u30f3\u3078\u306e\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u30b9\u30c6\u30c3\u30d7\u914d\u4fe1: ", bold: true }), new TextRun("\u767b\u9332\u5f8c\u306e\u30ca\u30fc\u30c1\u30e3\u30ea\u30f3\u30b0\u30e1\u30c3\u30bb\u30fc\u30b8")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "\u53cb\u3060\u3061\u7d39\u4ecb\u30ad\u30e3\u30f3\u30da\u30fc\u30f3: ", bold: true }), new TextRun("\u7d39\u4ecb\u8005\u30fb\u88ab\u7d39\u4ecb\u8005\u4e21\u65b9\u306b\u7279\u5178")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.5 \u5e83\u544a\u6226\u7565")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Google\u5e83\u544a")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u691c\u7d22\u5e83\u544a: ", bold: true }), new TextRun("\u300c\u5efa\u7bc9\u30d1\u30fc\u30b9 \u4f5c\u6210\u300d\u300c\u4f4f\u5b85\u30d1\u30fc\u30b9 AI\u300d\u7b49\u306e\u30ad\u30fc\u30ef\u30fc\u30c9")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "\u30c7\u30a3\u30b9\u30d7\u30ec\u30a4\u5e83\u544a: ", bold: true }), new TextRun("\u5efa\u7bc9\u30fb\u4e0d\u52d5\u7523\u95a2\u9023\u30b5\u30a4\u30c8\u3078\u306e\u914d\u4fe1")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "\u30ea\u30de\u30fc\u30b1\u30c6\u30a3\u30f3\u30b0: ", bold: true }), new TextRun("\u30b5\u30a4\u30c8\u8a2a\u554f\u8005\u3078\u306e\u518d\u30a2\u30d7\u30ed\u30fc\u30c1")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("LINE\u5e83\u544a")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 },
                children: [new TextRun({ text: "LINE\u5e83\u544a: ", bold: true }), new TextRun("\u53cb\u3060\u3061\u8ffd\u52a0\u5e83\u544a\u3067\u76f4\u63a5\u30b3\u30f3\u30d0\u30fc\u30b8\u30e7\u30f3")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 },
                children: [new TextRun({ text: "\u30bf\u30fc\u30b2\u30c6\u30a3\u30f3\u30b0: ", bold: true }), new TextRun("\u5efa\u7bc9\u30fb\u4e0d\u52d5\u7523\u696d\u754c\u3001\u5e74\u9f6230-50\u4ee3")] }),

            new Paragraph({ children: [new PageBreak()] }),

            // Section 3: Action Plan
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. \u5b9f\u884c\u8a08\u753b\uff08\u30a2\u30af\u30b7\u30e7\u30f3\u30d7\u30e9\u30f3\uff09")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 \u5373\u6642\u5bfe\u5fdc\uff08\u30ed\u30fc\u30f3\u30c1\u524d\uff09")] }),
            createActionTable("immediate"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 \u77ed\u671f\uff081-2\u9031\u9593\uff09")] }),
            createActionTable("short"),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 \u4e2d\u671f\uff081-3\u30f6\u6708\uff09")] }),
            createActionTable("medium"),

            new Paragraph({ children: [new PageBreak()] }),

            // Section 4: KPI
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. KPI\u30fb\u6210\u679c\u6307\u6a19")] }),
            createKPITable(),

            // Section 5: Summary
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. \u307e\u3068\u3081")] }),
            new Paragraph({ spacing: { after: 200 },
                children: [new TextRun("AI Perspective Bot\u306e\u30db\u30fc\u30e0\u30da\u30fc\u30b8\u306f\u3001\u30c7\u30b6\u30a4\u30f3\u30fb\u30b3\u30f3\u30c6\u30f3\u30c4\u306f\u826f\u597d\u3067\u3059\u304c\u3001SEO\u3068\u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9\u306e\u6700\u9069\u5316\u304c\u5fc5\u8981\u3067\u3059\u3002\u7279\u306b\u4ee5\u4e0b\u306e3\u70b9\u3092\u5373\u5ea7\u306b\u5bfe\u5fdc\u3059\u308b\u3053\u3068\u3067\u3001\u30ed\u30fc\u30f3\u30c1\u6e96\u5099\u304c\u6574\u3044\u307e\u3059\u3002")] }),
            new Paragraph({ numbering: { reference: "numbers", level: 0 },
                children: [new TextRun({ text: "SEO\u30e1\u30bf\u30bf\u30b0\u306e\u8ffd\u52a0", bold: true }), new TextRun("\uff08title, description, OGP\uff09")] }),
            new Paragraph({ numbering: { reference: "numbers", level: 0 },
                children: [new TextRun({ text: "\u753b\u50cf\u306e\u6700\u9069\u5316", bold: true }), new TextRun("\uff08WebP\u5909\u63db\u3001lazy loading\uff09")] }),
            new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 400 },
                children: [new TextRun({ text: "Tailwind CSS\u306e\u672c\u756a\u30d3\u30eb\u30c9", bold: true }), new TextRun("\uff08CDN\u304b\u3089\u79fb\u884c\uff09")] }),
            new Paragraph({
                children: [new TextRun("\u62e1\u6563\u6226\u7565\u3068\u3057\u3066\u306f\u3001LINE\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u306e\u5f37\u307f\u3092\u6d3b\u304b\u3057\u3001SNS\uff08\u7279\u306bX/Instagram\uff09\u3067\u306eBefore/After\u30b3\u30f3\u30c6\u30f3\u30c4\u3068\u3001SEO\u3067\u306e\u30ed\u30f3\u30b0\u30c6\u30fc\u30eb\u6226\u7565\u3092\u4e26\u884c\u3057\u3066\u9032\u3081\u308b\u3053\u3068\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\u7121\u6599\u30d7\u30e9\u30f3\u304b\u3089\u306e\u30b3\u30f3\u30d0\u30fc\u30b8\u30e7\u30f3\u3092\u6700\u5927\u5316\u3059\u308b\u305f\u3081\u306b\u3001\u30e6\u30fc\u30b6\u30fc\u4f53\u9a13\u306e\u5411\u4e0a\u3068\u7d99\u7d9a\u7684\u306a\u30b3\u30f3\u30c6\u30f3\u30c4\u767a\u4fe1\u304c\u9375\u3068\u306a\u308a\u307e\u3059\u3002")]
            }),
        ]
    }]
});

// Helper functions to create tables
function createStatusTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [3000, 2000, 4000],
        rows: [
            new TableRow({
                children: [
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u30c1\u30a7\u30c3\u30af\u9805\u76ee", bold: true, color: "FFFFFF" })] })] }),
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u8a55\u4fa1", bold: true, color: "FFFFFF" })] })] }),
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u5099\u8003", bold: true, color: "FFFFFF" })] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u30c7\u30b6\u30a4\u30f3\u30fb\u30ec\u30a4\u30a2\u30a6\u30c8")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u25ce \u826f\u597d", color: "06c656" })] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u30e2\u30c0\u30f3\u3067\u30d7\u30ed\u30d5\u30a7\u30c3\u30b7\u30e7\u30ca\u30eb\u306a\u30c7\u30b6\u30a4\u30f3")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u30ec\u30b9\u30dd\u30f3\u30b7\u30d6\u5bfe\u5fdc")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u25ce \u826f\u597d", color: "06c656" })] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("Tailwind CSS\u3067\u9069\u5207\u306b\u5b9f\u88c5")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("SEO\u30e1\u30bf\u60c5\u5831")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u00d7 \u8981\u6539\u5584", color: "FF0000" })] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("description, OGP, \u69cb\u9020\u5316\u30c7\u30fc\u30bf\u304c\u6b20\u843d")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u00d7 \u8981\u6539\u5584", color: "FF0000" })] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u753b\u50cf40MB\u3001lazy loading\u306a\u3057")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("\u30c8\u30e9\u30c3\u30ad\u30f3\u30b0\u8a2d\u5b9a")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u25cb \u6982\u306d\u826f\u597d", color: "FFA500" })] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun("GA4\u8a2d\u5b9a\u6e08\u307f\u3001LINE Tag\u306f\u672a\u8a2d\u5b9a")] })] }),
                ]
            }),
        ]
    });
}

function createKeywordTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2500, 4500, 2000],
        rows: [
            new TableRow({
                children: [
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u512a\u5148\u5ea6", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u30ad\u30fc\u30ef\u30fc\u30c9", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u691c\u7d22\u30dc\u30ea\u30e5\u30fc\u30e0", bold: true })] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u9ad8")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("AI\u30d1\u30fc\u30b9\u751f\u6210 / \u5efa\u7bc9\u30d1\u30fc\u30b9 \u81ea\u52d5\u751f\u6210")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e2d")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u9ad8")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4f4f\u5b85\u30d1\u30fc\u30b9 \u4f5c\u6210 / \u5916\u89b3\u30d1\u30fc\u30b9 \u4f5c\u308a\u65b9")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e2d")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e2d")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u9593\u53d6\u308a\u56f3 \u30d1\u30fc\u30b9\u5316 / \u5efa\u7bc9\u30d3\u30b8\u30e5\u30a2\u30e9\u30a4\u30bc\u30fc\u30b7\u30e7\u30f3 AI")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4f4e")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e2d")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e0d\u52d5\u7523\u55b6\u696d \u30c4\u30fc\u30eb / \u4f4f\u5b85\u55b6\u696d \u52b9\u7387\u5316")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4e2d")] })] }),
                ]
            }),
        ]
    });
}

function createSNSTable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [2000, 3500, 3500],
        rows: [
            new TableRow({
                children: [
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u30b3\u30f3\u30c6\u30f3\u30c4\u65b9\u91dd", bold: true })] })] }),
                    new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "\u6295\u7a3f\u983b\u5ea6", bold: true })] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("X (Twitter)")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("Before/After\u52d5\u753b\u3001\u4f7f\u3044\u65b9Tips\u3001\u30e6\u30fc\u30b6\u30fc\u4e8b\u4f8b")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u65e52-3\u56de")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("Instagram")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u9ad8\u54c1\u8cea\u30d1\u30fc\u30b9\u30ae\u30e3\u30e9\u30ea\u30fc\u3001Reels\u3067\u5909\u63db\u30d7\u30ed\u30bb\u30b9")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u65e51\u56de + Reels\u90312-3\u56de")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("YouTube")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u4f7f\u3044\u65b9\u30c1\u30e5\u30fc\u30c8\u30ea\u30a2\u30eb\u3001\u6d3b\u7528\u4e8b\u4f8b\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u67081-2\u672c")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("TikTok")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u30b9\u30b1\u30c3\u30c1\u2192\u30d1\u30fc\u30b9\u306e\u77ac\u9593\u5909\u63db\u52d5\u753b")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u90313-5\u56de")] })] }),
                ]
            }),
        ]
    });
}

function createActionTable(phase) {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
    const borders = { top: border, bottom: border, left: border, right: border };

    const actions = {
        immediate: [
            ["\u30bf\u30a4\u30c8\u30eb\u30bf\u30b0\u306e\u6700\u9069\u5316", "\u65e5\u672c\u8a9e\u30ad\u30fc\u30ef\u30fc\u30c9\u3092\u542b\u3080\u30bf\u30a4\u30c8\u30eb\u306b\u5909\u66f4"],
            ["meta description\u8ffd\u52a0", "120\u6587\u5b57\u4ee5\u5185\u3067\u9b45\u529b\u7684\u306a\u8aac\u660e\u6587\u3092\u8ffd\u52a0"],
            ["OGP\u30bf\u30b0\u8a2d\u5b9a", "og:title, og:description, og:image\u3092\u8a2d\u5b9a"],
            ["\u753b\u50cf\u306eWebP\u5909\u63db", "\u7279\u306bgallery\u753b\u50cf\uff0890%\u524a\u6e1b\u53ef\u80fd\uff09"],
            ["lazy loading\u8ffd\u52a0", "\u5168\u753b\u50cf\u306bloading=\"lazy\"\u5c5e\u6027\u3092\u8ffd\u52a0"],
        ],
        short: [
            ["Tailwind CSS\u30d3\u30eb\u30c9", "CDN\u304b\u3089\u672c\u756a\u7528\u30d3\u30eb\u30c9\u306b\u79fb\u884c"],
            ["\u69cb\u9020\u5316\u30c7\u30fc\u30bf\u8ffd\u52a0", "FAQPage, SoftwareApplication\u306eJSON-LD"],
            ["LINE Tag\u8a2d\u5b9a", "\u30b3\u30f3\u30d0\u30fc\u30b8\u30e7\u30f3\u30c8\u30e9\u30c3\u30ad\u30f3\u30b0\u306e\u8a2d\u5b9a"],
            ["SNS\u30a2\u30ab\u30a6\u30f3\u30c8\u958b\u8a2d", "X, Instagram\u306e\u516c\u5f0f\u30a2\u30ab\u30a6\u30f3\u30c8\u4f5c\u6210"],
            ["\u521d\u671f\u30b3\u30f3\u30c6\u30f3\u30c4\u4f5c\u6210", "Before/After\u52d5\u753b5\u672c\u4ee5\u4e0a"],
        ],
        medium: [
            ["\u30d6\u30ed\u30b0\u8a18\u4e8b\u4f5c\u6210", "SEO\u30bf\u30fc\u30b2\u30c3\u30c8\u8a18\u4e8b\u30925-10\u672c"],
            ["\u5e83\u544a\u904b\u7528\u958b\u59cb", "Google\u5e83\u544a\u3001LINE\u5e83\u544a\u306e\u30c6\u30b9\u30c8\u904b\u7528"],
            ["\u30e6\u30fc\u30b6\u30fc\u4e8b\u4f8b\u53ce\u96c6", "\u5b9f\u969b\u306e\u5229\u7528\u8005\u306e\u58f0\u3092\u53ce\u96c6\u30fb\u63b2\u8f09"],
            ["\u53cb\u3060\u3061\u7d39\u4ecb\u30ad\u30e3\u30f3\u30da\u30fc\u30f3", "\u30ea\u30d5\u30a1\u30e9\u30eb\u30d7\u30ed\u30b0\u30e9\u30e0\u306e\u958b\u59cb"],
            ["A/B\u30c6\u30b9\u30c8\u5b9f\u65bd", "CTA\u30dc\u30bf\u30f3\u3001\u30d5\u30a1\u30fc\u30b9\u30c8\u30d3\u30e5\u30fc\u306e\u6700\u9069\u5316"],
        ]
    };

    const rows = [
        new TableRow({
            children: [
                new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "\u30bf\u30b9\u30af", bold: true })] })] }),
                new TableCell({ borders, shading: { fill: "F0F0F0", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: "\u8a73\u7d30", bold: true })] })] }),
            ]
        })
    ];

    actions[phase].forEach(([task, detail]) => {
        rows.push(new TableRow({
            children: [
                new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun(task)] })] }),
                new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun(detail)] })] }),
            ]
        }));
    });

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [3500, 5500],
        rows: rows
    });
}

function createKPITable() {
    const border = { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD" };
    const borders = { top: border, bottom: border, left: border, right: border };

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: [3000, 3000, 3000],
        rows: [
            new TableRow({
                children: [
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "KPI", bold: true, color: "FFFFFF" })] })] }),
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "1\u30f6\u6708\u76ee\u76ee\u6a19", bold: true, color: "FFFFFF" })] })] }),
                    new TableCell({ borders, shading: { fill: "06c656", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ children: [new TextRun({ text: "3\u30f6\u6708\u76ee\u76ee\u6a19", bold: true, color: "FFFFFF" })] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("LINE\u53cb\u3060\u3061\u6570")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("500\u4eba")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("2,000\u4eba")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u6709\u6599\u8ee2\u63db\u7387")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("3%")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("5%")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u30b5\u30a4\u30c8PV")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("5,000PV")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("20,000PV")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("SNS\u30d5\u30a9\u30ed\u30ef\u30fc")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u5408\u8a081,000\u4eba")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u5408\u8a085,000\u4eba")] })] }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("MRR\uff08\u6708\u9593\u53ce\u76ca\uff09")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u00a530,000")] })] }),
                    new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun("\u00a5200,000")] })] }),
                ]
            }),
        ]
    });
}

// Generate the document
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('/sessions/busy-kind-bell/mnt/中嶋裕士/AI_Perspective_Bot_戦略レポート.docx', buffer);
    console.log('Strategy report created successfully!');
});
