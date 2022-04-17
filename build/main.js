"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.programOptions = exports.programArguments = exports.stdout = exports.callMainFromJest = exports.println = exports.main = void 0;
var clipboardy = require("clipboardy");
var lib_1 = require("./lib");
// main
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, isError, tabSizeBefore, tabSizeAfter, isChangingFromTab, isChangingToTab, indentLength, inputText, lines, nullLength, indentRegularExpression, lineNum, tabIndent, spaceIndent, minIndentLength, _i, lines_1, line_1, indentLength_1, firstLineIndent, firstLineIndentAfter, firstLineIndentAfter, lineNum, line, indentBefore, indentAfter, indentAfter, lineNum, unindentedLine, indentBefore, indentAfter, indentAfter, line, outputText;
        return __generator(this, function (_b) {
            _a = parseCommand(), isError = _a.isError, tabSizeBefore = _a.tabSizeBefore, tabSizeAfter = _a.tabSizeAfter, isChangingFromTab = _a.isChangingFromTab, isChangingToTab = _a.isChangingToTab, indentLength = _a.indentLength;
            if (isError) {
                console.log('Parameter error.');
                console.log('indenter [24]');
                console.log('  24 = change tab size 2 to 4');
                console.log('  t4 = change tab to 4 spaces');
                return [2 /*return*/];
            }
            inputText = clipboardy.readSync();
            lines = inputText.split('\n');
            nullLength = 9999;
            indentRegularExpression = /^( |\t)*/;
            if (inputText.trim() === '') {
                return [2 /*return*/];
            }
            if (isChangingFromTab) {
                for (lineNum = 1; lineNum < lines.length; lineNum += 1) {
                    tabIndent = /^(\t)*/.exec(lines[lineNum - 1])[0];
                    spaceIndent = ' '.repeat(tabSizeBefore * tabIndent.length);
                    lines[lineNum - 1] = spaceIndent + lines[lineNum - 1].substr(tabIndent.length);
                }
            }
            minIndentLength = nullLength;
            for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                line_1 = lines_1[_i];
                if (line_1.trim() !== '') {
                    indentLength_1 = indentRegularExpression.exec(line_1)[0].length;
                    minIndentLength = Math.min(minIndentLength, indentLength_1);
                }
            }
            firstLineIndent = indentRegularExpression.exec(lines[0])[0];
            if (minIndentLength === nullLength) {
                return [2 /*return*/];
            }
            if (minIndentLength < firstLineIndent.length && indentLength === null) {
                if (isChangingToTab) {
                    firstLineIndentAfter = '\t'.repeat(firstLineIndent.length * tabSizeAfter / tabSizeBefore);
                    lines[0] = firstLineIndentAfter + lines[0].substr(firstLineIndent.length);
                }
                else {
                    firstLineIndentAfter = firstLineIndent;
                    // lines[0] is not changed.
                }
                // insert indent
                for (lineNum = 2; lineNum <= lines.length; lineNum += 1) {
                    if (lines[lineNum - 1] !== '') {
                        line = lines[lineNum - 1];
                        indentBefore = indentRegularExpression.exec(line)[0];
                        if (isChangingToTab) {
                            indentAfter = '\t'.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                        }
                        else {
                            indentAfter = ' '.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                        }
                        line = firstLineIndentAfter + indentAfter + line.substring(indentBefore.length);
                        if (line.trimLeft().substring(0, 2) === '- ' && tabSizeBefore !== tabSizeAfter) {
                            line = changeSpacesRightOfHyphen(line, tabSizeAfter);
                        }
                        lines[lineNum - 1] = line;
                    }
                }
            }
            else {
                // cut indent
                for (lineNum = 1; lineNum <= lines.length; lineNum += 1) {
                    unindentedLine = lines[lineNum - 1].substring(minIndentLength);
                    indentBefore = indentRegularExpression.exec(unindentedLine)[0];
                    if (isChangingToTab) {
                        indentAfter = '\t'.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                    }
                    else {
                        indentAfter = ' '.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                    }
                    if (indentLength !== null) {
                        if (isChangingToTab) {
                            indentAfter = '\t'.repeat(indentLength * tabSizeAfter / tabSizeBefore) + indentAfter;
                        }
                        else {
                            indentAfter = ' '.repeat(indentLength) + indentAfter;
                        }
                    }
                    line = indentAfter + unindentedLine.substring(indentBefore.length);
                    if (line.trimLeft().substring(0, 2) === '- ' && tabSizeBefore !== tabSizeAfter) {
                        line = changeSpacesRightOfHyphen(line, tabSizeAfter);
                    }
                    if (line.trim() === '') {
                        line = '';
                    }
                    lines[lineNum - 1] = line;
                }
            }
            outputText = lines.join('\n');
            clipboardy.writeSync(outputText);
            return [2 /*return*/];
        });
    });
}
exports.main = main;
// changeSpacesRightOfHyphen
function changeSpacesRightOfHyphen(line, tabSizeAfter) {
    var hyphenPosition = line.indexOf('-');
    var element = line.substring(hyphenPosition + 1).trimLeft();
    line = line.substring(0, hyphenPosition + 1) + ' '.repeat(tabSizeAfter - 1) + element;
    return line;
}
// parseCommand
function parseCommand() {
    var isError = true;
    var tabSizeBefore = 0;
    var tabSizeAfter = 0;
    var isChangingFromTab = false;
    var isChangingToTab = false;
    var indentLength = null;
    if (exports.programArguments.length === 0) {
        tabSizeBefore = 1;
        tabSizeAfter = 1;
        isError = false;
    }
    else if (exports.programArguments.length >= 1) {
        var command = exports.programArguments[0];
        if (command && command.length === 2) {
            if (command === 'tt') {
                tabSizeBefore = 1;
                tabSizeAfter = 1;
                isError = false;
            }
            else {
                tabSizeBefore = parseInt(command[0]);
                tabSizeAfter = parseInt(command[1]);
                if (command[0] === 't') {
                    tabSizeBefore = tabSizeAfter;
                    isChangingFromTab = true;
                }
                else if (command[1] === 't') {
                    tabSizeAfter = 1;
                    isChangingToTab = true;
                }
                else {
                    isChangingFromTab = true;
                }
                if (tabSizeBefore && tabSizeAfter) {
                    isError = false;
                }
            }
        }
    }
    if (exports.programArguments.length >= 2) {
        indentLength = parseInt(exports.programArguments[1]);
    }
    return { isError: isError, tabSizeBefore: tabSizeBefore, tabSizeAfter: tabSizeAfter, isChangingFromTab: isChangingFromTab, isChangingToTab: isChangingToTab, indentLength: indentLength };
}
// getStdOut
// Example:
//    var d = getStdOut();  // Set break point here and watch the variable d
function getStdOut() {
    return exports.stdout.split('\n');
}
// println
// #keyword: println, console.log, consoleLog
// Output any text to standard output.
function println(message, delayedExpanding) {
    if (delayedExpanding === void 0) { delayedExpanding = false; }
    if (typeof message === 'object' && !delayedExpanding) {
        message = JSON.stringify(message);
    }
    if (withJest && !delayedExpanding) {
        exports.stdout += message.toString() + '\n';
        (0, lib_1.pp)(message.toString());
    }
    else {
        consoleLog(message);
    }
}
exports.println = println;
var consoleLog = console.log;
console.log = println;
// callMainFromJest
// #keyword: callMainFromJest
function callMainFromJest(parameters, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    withJest = true;
                    exports.stdout = '';
                    if (parameters) {
                        exports.programArguments = parameters;
                    }
                    else {
                        exports.programArguments = [];
                    }
                    if (options) {
                        exports.programOptions = options;
                    }
                    else {
                        exports.programOptions = {};
                    }
                    return [4 /*yield*/, main()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.callMainFromJest = callMainFromJest;
var locale = '';
var withJest = false;
exports.stdout = '';
exports.programArguments = [];
exports.programOptions = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6Qyw2QkFBMkI7QUFFM0IsT0FBTztBQUNQLFNBQXVCLElBQUk7Ozs7WUFDakIsS0FBMkYsWUFBWSxFQUFFLEVBQXhHLE9BQU8sYUFBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsZUFBZSxxQkFBQSxFQUFFLFlBQVksa0JBQUEsQ0FBbUI7WUFDaEgsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7Z0JBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDN0Msc0JBQU87YUFDVjtZQUVNLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsS0FBSyxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQix1QkFBdUIsR0FBRyxVQUFVLENBQUM7WUFDNUMsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6QixzQkFBTzthQUNWO1lBQ0QsSUFBSSxpQkFBaUIsRUFBRTtnQkFDbkIsS0FBUyxPQUFPLEdBQUcsQ0FBQyxFQUFHLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFHLE9BQU8sSUFBSSxDQUFDLEVBQUc7b0JBQ3BELFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcs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d0JBQ1Qsc0JBQWMsR0FBRyxPQUFPLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNILHNCQUFjLEdBQUcsRUFBRSxDQUFDO3FCQUN2QjtvQkFFRCxxQkFBTSxJQUFJLEVBQUUsRUFBQTs7b0JBQVosU0FBWSxDQUFDOzs7OztDQUNoQjtBQWZELDRDQWVDO0FBRUQsSUFBTyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLElBQU8sUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNaLFFBQUEsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNaLFFBQUEsZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO0FBQ2hDLFFBQUEsY0FBYyxHQUF5QixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjbGlwYm9hcmR5IGZyb20gJ2NsaXBib2FyZHknO1xyXG5pbXBvcnQgeyBwcCB9IGZyb20gXCIuL2xpYlwiO1xyXG5cclxuLy8gbWFpblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcbiAgICBjb25zdCB7aXNFcnJvciwgdGFiU2l6ZUJlZm9yZSwgdGFiU2l6ZUFmdGVyLCBpc0NoYW5naW5nRnJvbVRhYiwgaXNDaGFuZ2luZ1RvVGFiLCBpbmRlbnRMZW5ndGh9ID0gcGFyc2VDb21tYW5kKCk7XHJcbiAgICBpZiAoaXNFcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQYXJhbWV0ZXIgZXJyb3IuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luZGVudGVyIFsyNF0nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICAyNCA9IGNoYW5nZSB0YWIgc2l6ZSAyIHRvIDQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICB0NCA9IGNoYW5nZSB0YWIgdG8gNCBzcGFjZXMnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgIGlucHV0VGV4dCA9IGNsaXBib2FyZHkucmVhZFN5bmMoKTtcclxuICAgIGNvbnN0ICBsaW5lczogc3RyaW5nW10gPSBpbnB1dFRleHQuc3BsaXQoJ1xcbicpO1xyXG4gICAgY29uc3QgIG51bGxMZW5ndGggPSA5OTk5O1xyXG4gICAgY29uc3QgIGluZGVudFJlZ3VsYXJFeHByZXNzaW9uID0gL14oIHxcXHQpKi87XHJcbiAgICBpZiAoaW5wdXRUZXh0LnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNDaGFuZ2luZ0Zyb21UYWIpIHtcclxuICAgICAgICBmb3IgKHZhciBsaW5lTnVtID0gMTsgIGxpbmVOdW0gPCBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICB0YWJJbmRlbnQgPSAvXihcXHQpKi8uZXhlYyhsaW5lc1tsaW5lTnVtIC0gMV0pIVswXTtcclxuICAgICAgICAgICAgY29uc3QgIHNwYWNlSW5kZW50ID0gJyAnLnJlcGVhdCh0YWJTaXplQmVmb3JlICogdGFiSW5kZW50Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBsaW5lc1tsaW5lTnVtIC0gMV0gPSBzcGFjZUluZGVudCArIGxpbmVzW2xpbmVOdW0gLSAxXS5zdWJzdHIodGFiSW5kZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyICBtaW5JbmRlbnRMZW5ndGggPSBudWxsTGVuZ3RoO1xyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgaWYgKGxpbmUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCAgaW5kZW50TGVuZ3RoID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggbGluZSApIVswXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIG1pbkluZGVudExlbmd0aCA9IE1hdGgubWluKG1pbkluZGVudExlbmd0aCwgaW5kZW50TGVuZ3RoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0ICBmaXJzdExpbmVJbmRlbnQgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lc1swXSApIVswXTtcclxuICAgIGlmIChtaW5JbmRlbnRMZW5ndGggPT09IG51bGxMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1pbkluZGVudExlbmd0aCA8IGZpcnN0TGluZUluZGVudC5sZW5ndGggICYmICBpbmRlbnRMZW5ndGggPT09IG51bGwpIHtcclxuICAgICAgICBpZiAoaXNDaGFuZ2luZ1RvVGFiKSB7XHJcbiAgICAgICAgICAgIHZhciAgZmlyc3RMaW5lSW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoZmlyc3RMaW5lSW5kZW50Lmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICBsaW5lc1swXSA9IGZpcnN0TGluZUluZGVudEFmdGVyICsgbGluZXNbMF0uc3Vic3RyKGZpcnN0TGluZUluZGVudC5sZW5ndGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciAgZmlyc3RMaW5lSW5kZW50QWZ0ZXIgPSBmaXJzdExpbmVJbmRlbnQ7XHJcbiAgICAgICAgICAgIC8vIGxpbmVzWzBdIGlzIG5vdCBjaGFuZ2VkLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW5zZXJ0IGluZGVudFxyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAyOyAgbGluZU51bSA8PSBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tsaW5lTnVtIC0gMV0gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgICAgbGluZSA9IGxpbmVzW2xpbmVOdW0gLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICBpbmRlbnRCZWZvcmUgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lICkhWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgIGluZGVudEFmdGVyID0gJyAnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZSA9IGZpcnN0TGluZUluZGVudEFmdGVyICsgaW5kZW50QWZ0ZXIgKyBsaW5lLnN1YnN0cmluZyhpbmRlbnRCZWZvcmUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaW5lLnRyaW1MZWZ0KCkuc3Vic3RyaW5nKDAsMikgPT09ICctICcgICYmICB0YWJTaXplQmVmb3JlICE9PSB0YWJTaXplQWZ0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gY2hhbmdlU3BhY2VzUmlnaHRPZkh5cGhlbihsaW5lLCB0YWJTaXplQWZ0ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gbGluZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIC8vIGN1dCBpbmRlbnRcclxuICAgICAgICBmb3IgKHZhciBsaW5lTnVtID0gMTsgIGxpbmVOdW0gPD0gbGluZXMubGVuZ3RoOyAgbGluZU51bSArPSAxICkge1xyXG4gICAgICAgICAgICB2YXIgICAgdW5pbmRlbnRlZExpbmUgPSBsaW5lc1tsaW5lTnVtIC0gMV0uc3Vic3RyaW5nKG1pbkluZGVudExlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0ICBpbmRlbnRCZWZvcmUgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCB1bmluZGVudGVkTGluZSApIVswXTtcclxuICAgICAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICAgICAgdmFyICBpbmRlbnRBZnRlciA9ICdcXHQnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgIGluZGVudEFmdGVyID0gJyAnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZGVudExlbmd0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGVudEFmdGVyID0gJ1xcdCcucmVwZWF0KGluZGVudExlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpICsgaW5kZW50QWZ0ZXI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGVudEFmdGVyID0gJyAnLnJlcGVhdChpbmRlbnRMZW5ndGgpICsgaW5kZW50QWZ0ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciAgbGluZSA9IGluZGVudEFmdGVyICsgdW5pbmRlbnRlZExpbmUuc3Vic3RyaW5nKGluZGVudEJlZm9yZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAobGluZS50cmltTGVmdCgpLnN1YnN0cmluZygwLDIpID09PSAnLSAnICAmJiAgdGFiU2l6ZUJlZm9yZSAhPT0gdGFiU2l6ZUFmdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gY2hhbmdlU3BhY2VzUmlnaHRPZkh5cGhlbihsaW5lLCB0YWJTaXplQWZ0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsaW5lLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGxpbmUgPSAnJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gbGluZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgIG91dHB1dFRleHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcclxuICAgIGNsaXBib2FyZHkud3JpdGVTeW5jKG91dHB1dFRleHQpO1xyXG59XHJcblxyXG4vLyBjaGFuZ2VTcGFjZXNSaWdodE9mSHlwaGVuXHJcbmZ1bmN0aW9uICBjaGFuZ2VTcGFjZXNSaWdodE9mSHlwaGVuKGxpbmU6IHN0cmluZywgdGFiU2l6ZUFmdGVyOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgIGh5cGhlblBvc2l0aW9uID0gbGluZS5pbmRleE9mKCAnLScgKTtcclxuICAgIGNvbnN0ICBlbGVtZW50ID0gbGluZS5zdWJzdHJpbmcoaHlwaGVuUG9zaXRpb24gKyAxKS50cmltTGVmdCgpO1xyXG5cclxuICAgIGxpbmUgPSBsaW5lLnN1YnN0cmluZygwLCBoeXBoZW5Qb3NpdGlvbiArIDEpICsgJyAnLnJlcGVhdCh0YWJTaXplQWZ0ZXIgLSAxKSArIGVsZW1lbnQ7XHJcbiAgICByZXR1cm4gIGxpbmU7XHJcbn1cclxuXHJcbi8vIHBhcnNlQ29tbWFuZFxyXG5mdW5jdGlvbiAgcGFyc2VDb21tYW5kKCk6IHBhcnNlZENvbW1hbmQge1xyXG4gICAgdmFyICBpc0Vycm9yID0gdHJ1ZTtcclxuICAgIHZhciAgdGFiU2l6ZUJlZm9yZSA9IDA7XHJcbiAgICB2YXIgIHRhYlNpemVBZnRlciAgPSAwO1xyXG4gICAgdmFyICBpc0NoYW5naW5nRnJvbVRhYiA9IGZhbHNlO1xyXG4gICAgdmFyICBpc0NoYW5naW5nVG9UYWIgPSBmYWxzZTtcclxuICAgIHZhciAgaW5kZW50TGVuZ3RoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBpZiAocHJvZ3JhbUFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0YWJTaXplQmVmb3JlID0gMTtcclxuICAgICAgICB0YWJTaXplQWZ0ZXIgID0gMTtcclxuICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgfSBlbHNlIGlmIChwcm9ncmFtQXJndW1lbnRzLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgY29uc3QgIGNvbW1hbmQgPSBwcm9ncmFtQXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGlmIChjb21tYW5kICAmJiAgY29tbWFuZC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmQgPT09ICd0dCcpIHtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVCZWZvcmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGFiU2l6ZUFmdGVyICA9IDE7XHJcbiAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQmVmb3JlID0gcGFyc2VJbnQoY29tbWFuZFswXSk7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQWZ0ZXIgID0gcGFyc2VJbnQoY29tbWFuZFsxXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZFswXSA9PT0gJ3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IHRhYlNpemVBZnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nRnJvbVRhYiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmRbMV0gPT09ICd0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlNpemVBZnRlciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2luZ1RvVGFiID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2luZ0Zyb21UYWIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhYlNpemVCZWZvcmUgJiYgdGFiU2l6ZUFmdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHByb2dyYW1Bcmd1bWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBpbmRlbnRMZW5ndGggPSBwYXJzZUludChwcm9ncmFtQXJndW1lbnRzWzFdKTtcclxuICAgIH1cclxuICAgIHJldHVybiAge2lzRXJyb3IsIHRhYlNpemVCZWZvcmUsIHRhYlNpemVBZnRlciwgaXNDaGFuZ2luZ0Zyb21UYWIsIGlzQ2hhbmdpbmdUb1RhYiwgaW5kZW50TGVuZ3RofTtcclxufVxyXG5cclxuaW50ZXJmYWNlIHBhcnNlZENvbW1hbmQge1xyXG4gICAgaXNFcnJvcjogYm9vbGVhbjtcclxuICAgIHRhYlNpemVCZWZvcmU6IG51bWJlcjtcclxuICAgIHRhYlNpemVBZnRlcjogbnVtYmVyO1xyXG4gICAgaXNDaGFuZ2luZ0Zyb21UYWI6IGJvb2xlYW47XHJcbiAgICBpc0NoYW5naW5nVG9UYWI6IGJvb2xlYW47XHJcbiAgICBpbmRlbnRMZW5ndGg6IG51bWJlciB8IG51bGw7XHJcbn1cclxuXHJcbi8vIGdldFN0ZE91dFxyXG4vLyBFeGFtcGxlOlxyXG4vLyAgICB2YXIgZCA9IGdldFN0ZE91dCgpOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbmZ1bmN0aW9uICBnZXRTdGRPdXQoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuICBzdGRvdXQuc3BsaXQoJ1xcbicpO1xyXG59XHJcblxyXG4vLyBwcmludGxuXHJcbi8vICNrZXl3b3JkOiBwcmludGxuLCBjb25zb2xlLmxvZywgY29uc29sZUxvZ1xyXG4vLyBPdXRwdXQgYW55IHRleHQgdG8gc3RhbmRhcmQgb3V0cHV0LlxyXG5leHBvcnQgZnVuY3Rpb24gIHByaW50bG4obWVzc2FnZTogYW55LCBkZWxheWVkRXhwYW5kaW5nOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgJiYgIWRlbGF5ZWRFeHBhbmRpbmcpIHtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBpZiAod2l0aEplc3QgJiYgIWRlbGF5ZWRFeHBhbmRpbmcpIHtcclxuICAgICAgICBzdGRvdXQgKz0gbWVzc2FnZS50b1N0cmluZygpICsgJ1xcbic7XHJcbiAgICAgICAgcHAobWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZUxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5jb25zdCAgY29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG5jb25zb2xlLmxvZyA9IHByaW50bG47XHJcblxyXG4vLyBjYWxsTWFpbkZyb21KZXN0XHJcbi8vICNrZXl3b3JkOiBjYWxsTWFpbkZyb21KZXN0XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgY2FsbE1haW5Gcm9tSmVzdChwYXJhbWV0ZXJzPzogc3RyaW5nW10sIG9wdGlvbnM/OiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcclxuICAgIHdpdGhKZXN0ID0gdHJ1ZTtcclxuICAgIHN0ZG91dCA9ICcnO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBwcm9ncmFtQXJndW1lbnRzID0gcGFyYW1ldGVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZ3JhbUFyZ3VtZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICBwcm9ncmFtT3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2dyYW1PcHRpb25zID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgbWFpbigpO1xyXG59XHJcblxyXG52YXIgICAgbG9jYWxlID0gJyc7XHJcbnZhciAgICB3aXRoSmVzdCA9IGZhbHNlO1xyXG5leHBvcnQgdmFyICBzdGRvdXQgPSAnJztcclxuZXhwb3J0IHZhciAgcHJvZ3JhbUFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcclxuZXhwb3J0IHZhciAgcHJvZ3JhbU9wdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XHJcbiJdfQ==