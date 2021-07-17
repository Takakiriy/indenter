import * as clipboardy from 'clipboardy';
import { pp } from "./lib";

// main
export async function  main() {

    const  inputText = clipboardy.readSync();
    const  lines = inputText.split('\n');
    const  nullLength = 9999;
    const  indentRegularExpression = /^( |¥t)*/;
    if (inputText.trim() === '') {
        return;
    }
    var  minIndentLength = nullLength;
    for (const line of lines) {
        if (line.trim() !== '') {
            const  indentLength = indentRegularExpression.exec( line )![0].length;
            minIndentLength = Math.min(minIndentLength, indentLength)
        }
    }
    const  firstLineIndent = indentRegularExpression.exec( lines[0] )![0];
    if (minIndentLength === nullLength) {
        return;
    }

    if (minIndentLength < firstLineIndent.length) {

        // insert indent
        for (var lineNum = 2;  lineNum < lines.length;  lineNum += 1 ) {
            if (lines[lineNum - 1] !== '') {

                lines[lineNum - 1] = firstLineIndent + lines[lineNum - 1];
            }
        }
    } else {

        // cut indent
        for (var lineNum = 1;  lineNum < lines.length;  lineNum += 1 ) {
            lines[lineNum - 1] = lines[lineNum - 1].substr(minIndentLength);
        }
    }

    const  outputText = lines.join('\n');
    clipboardy.writeSync(outputText);
}


// getStdOut
// Example:
//    var d = getStdOut();  // Set break point here and watch the variable d
function  getStdOut(): string[] {
    return  stdout.split('\n');
}

// println
// #keyword: println, console.log, consoleLog
// Output any text to standard output.
export function  println(message: any, delayedExpanding: boolean = false) {
    if (typeof message === 'object' && !delayedExpanding) {
        message = JSON.stringify(message);
    }
    if (withJest && !delayedExpanding) {
        stdout += message.toString() + '\n';
        pp(message.toString());
    } else {
        consoleLog(message);
    }
}
const  consoleLog = console.log;
console.log = println;

// callMainFromJest
// #keyword: callMainFromJest
export async function  callMainFromJest(parameters?: string[], options?: {[name: string]: string}) {
    withJest = true;
    stdout = '';
    if (parameters) {
        programArguments = parameters;
    } else {
        programArguments = [];
    }
    if (options) {
        programOptions = options;
    } else {
        programOptions = {};
    }

    await main();
}

var    locale = '';
var    withJest = false;
export var  stdout = '';
export var  programArguments: string[] = [];
export var  programOptions: {[key: string]: any} = {};
