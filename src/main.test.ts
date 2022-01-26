import * as main from './main';
import * as path from "path";
import * as clipboardy from 'clipboardy';
import * as lib from "./lib";
import * as fs from "fs";
const  callMain = main.callMainFromJest;

if (path.basename(process.cwd()) !== 'src') {
    // Because the second execute of Jest watch mode is inherited the current folder.
    process.chdir('src');
}

test.each([
    ["insert indent", []],
    ["insert line 2 indent", []],
    ["cut indent", []],
    ["cut indent at the last line", []],
    ["change tab size 2 to 4 and insert indent", ["24"]],
    ["change tab size 4 to 2 and cut indent", ["42"]],
    ["change YAML tab size 2 to 4 and insert indent", ["24"]],
    ["change YAML tab size 4 to 2 and cut indent", ["42"]],
    ["change 2 spaces to tab and cut indent", ["2t"]],
    ["change 4 spaces to tab and insert indent", ["4t"]],
    ["change tab to 2 spaces and cut indent", ["t2"]],
    ["change tab to 4 spaces and insert indent", ["t4"]],
])("%s", async (caseName, parameters) => {
    const  inputText = lib.getSnapshot(`${caseName}: 1 sourceFileContents 1`);
    clipboardy.writeSync(inputText);

    await callMain(parameters, {});
    const  outputText = clipboardy.readSync();
    expect(outputText).toMatchSnapshot('answer');
});

describe("test of test >>", () => {
    test("checks snapshots files are confirmed", () => {
        const  activeSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap').toString();
        const  backUpSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap.confirmed-ts').toString();
            // 拡張子の末尾を .snap にしない理由は、Jest が使っていない .snap ファイルを自動的に削除しようとするからです
            // ____.snap.confirmed-ts ファイルが存在する理由は、Jest の自動編集が予期しないデータを追加することがあるからです

        expect(activeSnapshots).toBe(backUpSnapshots);
    });
});
