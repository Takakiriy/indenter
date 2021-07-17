import * as main from './main';
import * as path from "path";
import * as clipboardy from 'clipboardy';
import * as lib from "./lib";
const  callMain = main.callMainFromJest;

if (path.basename(process.cwd()) !== 'src') {
    // Because the second execute of Jest watch mode is inherited the current folder.
    process.chdir('src');
}

test.each([
    ["insert indent"],
    ["insert line 2 indent"],
    ["cut indent"],
])("%s", async (caseName) => {
    const  inputText = lib.getSnapshot(`${caseName}: 1 sourceFileContents 1`);
    clipboardy.writeSync(inputText);

    await callMain([], {});
    const  outputText = clipboardy.readSync();
    expect(outputText).toMatchSnapshot('answer');
});
