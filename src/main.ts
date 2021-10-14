import * as clipboardy from 'clipboardy';
import { pp } from "./lib";

// main
export async function  main() {
    const {isError, tabSizeBefore, tabSizeAfter, isChangingFromTab, isChangingToTab} = parseCommand();
    if (isError) {
        console.log('Parameter error.');
        console.log('indenter [24]');
        console.log('  24 = change tab size 2 to 4');
        console.log('  t4 = change tab to 4 spaces');
        return;
    }

    const  inputText = clipboardy.readSync();
    const  lines = inputText.split('\n');
    const  nullLength = 9999;
    const  indentRegularExpression = /^( |\t)*/;
    if (inputText.trim() === '') {
        return;
    }
    if (isChangingFromTab) {
        for (var lineNum = 1;  lineNum < lines.length;  lineNum += 1 ) {
            const  tabIndent = /^(\t)*/.exec(lines[lineNum - 1])![0];
            const  spaceIndent = ' '.repeat(tabSizeBefore * tabIndent.length);

            lines[lineNum - 1] = spaceIndent + lines[lineNum - 1].substr(tabIndent.length);
        }
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
        if (isChangingToTab) {
            var  firstLineIndentAfter = '\t'.repeat(firstLineIndent.length * tabSizeAfter / tabSizeBefore);
            lines[0] = firstLineIndentAfter + lines[0].substr(firstLineIndent.length);
        } else {
            var  firstLineIndentAfter = firstLineIndent;
        }

        // insert indent
        for (var lineNum = 2;  lineNum <= lines.length;  lineNum += 1 ) {
            if (lines[lineNum - 1] !== '') {
                const  line = lines[lineNum - 1];
                const  indentBefore = indentRegularExpression.exec( line )![0];
                if (isChangingToTab) {
                    var  indentAfter = '\t'.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                } else {
                    var  indentAfter = ' '.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                }

                lines[lineNum - 1] = firstLineIndentAfter + indentAfter + line.substr(indentBefore.length);
            }
        }
    } else {

        // cut indent
        for (var lineNum = 1;  lineNum <= lines.length;  lineNum += 1 ) {
            const  unindentedLine = lines[lineNum - 1].substr(minIndentLength);
            const  indentBefore = indentRegularExpression.exec( unindentedLine )![0];
            if (isChangingToTab) {
                var  indentAfter = '\t'.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
            } else {
                var  indentAfter = ' '.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
            }

            lines[lineNum - 1] = indentAfter + unindentedLine.substr(indentBefore.length);
        }
    }

    const  outputText = lines.join('\n');
    clipboardy.writeSync(outputText);
}

// parseCommand
function  parseCommand(): parsedCommand {
    var  isError = true;
    var  tabSizeBefore = 0;
    var  tabSizeAfter  = 0;
    var  isChangingFromTab = false;
    var  isChangingToTab = false;

    if (programArguments.length === 0) {
        tabSizeBefore = 1;
        tabSizeAfter  = 1;
        isError = false;

    } else if (programArguments.length === 1) {
        const  command = programArguments[0];
        if (command  &&  command.length === 2) {
            if (command === 'tt') {
                tabSizeBefore = 1;
                tabSizeAfter  = 1;
                isError = false;
            } else {
                tabSizeBefore = parseInt(command[0]);
                tabSizeAfter  = parseInt(command[1]);
                if (command[0] === 't') {
                    tabSizeBefore = tabSizeAfter;
                    isChangingFromTab = true;
                } else if (command[1] === 't') {
                    tabSizeAfter = 1;
                    isChangingToTab = true;
                } else {
                    isChangingFromTab = true;
                }
                if (tabSizeBefore && tabSizeAfter) {
                    isError = false;
                }
            }
        }
    }
    return  {isError, tabSizeBefore, tabSizeAfter, isChangingFromTab, isChangingToTab};
}

interface parsedCommand {
    isError: boolean;
    tabSizeBefore: number;
    tabSizeAfter: number;
    isChangingFromTab: boolean;
    isChangingToTab: boolean;
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
