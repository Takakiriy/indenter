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
        var _a, isError, tabSizeBefore, tabSizeAfter, isChangingFromTab, isChangingToTab, inputText, lines, nullLength, indentRegularExpression, lineNum, tabIndent, spaceIndent, minIndentLength, _i, lines_1, line_1, indentLength, firstLineIndent, firstLineIndentAfter, firstLineIndentAfter, lineNum, line, indentBefore, indentAfter, indentAfter, lineNum, unindentedLine, indentBefore, indentAfter, indentAfter, line, outputText;
        return __generator(this, function (_b) {
            _a = parseCommand(), isError = _a.isError, tabSizeBefore = _a.tabSizeBefore, tabSizeAfter = _a.tabSizeAfter, isChangingFromTab = _a.isChangingFromTab, isChangingToTab = _a.isChangingToTab;
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
                    indentLength = indentRegularExpression.exec(line_1)[0].length;
                    minIndentLength = Math.min(minIndentLength, indentLength);
                }
            }
            firstLineIndent = indentRegularExpression.exec(lines[0])[0];
            if (minIndentLength === nullLength) {
                return [2 /*return*/];
            }
            if (minIndentLength < firstLineIndent.length) {
                if (isChangingToTab) {
                    firstLineIndentAfter = '\t'.repeat(firstLineIndent.length * tabSizeAfter / tabSizeBefore);
                    lines[0] = firstLineIndentAfter + lines[0].substr(firstLineIndent.length);
                }
                else {
                    firstLineIndentAfter = firstLineIndent;
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
                        if (line.trimLeft()[0] === '-') {
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
                    line = indentAfter + unindentedLine.substring(indentBefore.length);
                    if (line.trimLeft()[0] === '-') {
                        line = changeSpacesRightOfHyphen(line, tabSizeAfter);
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
    if (exports.programArguments.length === 0) {
        tabSizeBefore = 1;
        tabSizeAfter = 1;
        isError = false;
    }
    else if (exports.programArguments.length === 1) {
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
    return { isError: isError, tabSizeBefore: tabSizeBefore, tabSizeAfter: tabSizeAfter, isChangingFromTab: isChangingFromTab, isChangingToTab: isChangingToTab };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6Qyw2QkFBMkI7QUFFM0IsT0FBTztBQUNQLFNBQXVCLElBQUk7Ozs7WUFDakIsS0FBNkUsWUFBWSxFQUFFLEVBQTFGLE9BQU8sYUFBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFtQjtZQUNsRyxJQUFJLE9BQU8sRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUM3QyxzQkFBTzthQUNWO1lBRU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxLQUFLLEdBQWEsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLHVCQUF1QixHQUFHLFVBQVUsQ0FBQztZQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLHNCQUFPO2FBQ1Y7WUFDRCxJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixLQUFTLE9BQU8sR0FBRyxDQUFDLEVBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUcsT0FBTyxJQUFJLENBQUMsRUFBRztvQkFDcEQsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBRSxD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O0FBQ0QsSUFBTyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztBQUV0QixtQkFBbUI7QUFDbkIsNkJBQTZCO0FBQzdCLFNBQXVCLGdCQUFnQixDQUFDLFVBQXFCLEVBQUUsT0FBa0M7Ozs7O29CQUM3RixRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixjQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNaLElBQUksVUFBVSxFQUFFO3dCQUNaLHdCQUFnQixHQUFHLFVBQVUsQ0FBQztxQkFDakM7eUJBQU07d0JBQ0gsd0JBQWdCLEdBQUcsRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxzQkFBYyxHQUFHLE9BQU8sQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsc0JBQWMsR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUVELHFCQUFNLElBQUksRUFBRSxFQUFBOztvQkFBWixTQUFZLENBQUM7Ozs7O0NBQ2hCO0FBZkQsNENBZUM7QUFFRCxJQUFPLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBTyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ1osUUFBQSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBQSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7QUFDaEMsUUFBQSxjQUFjLEdBQXlCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsaXBib2FyZHkgZnJvbSAnY2xpcGJvYXJkeSc7XHJcbmltcG9ydCB7IHBwIH0gZnJvbSBcIi4vbGliXCI7XHJcblxyXG4vLyBtYWluXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgbWFpbigpIHtcclxuICAgIGNvbnN0IHtpc0Vycm9yLCB0YWJTaXplQmVmb3JlLCB0YWJTaXplQWZ0ZXIsIGlzQ2hhbmdpbmdGcm9tVGFiLCBpc0NoYW5naW5nVG9UYWJ9ID0gcGFyc2VDb21tYW5kKCk7XHJcbiAgICBpZiAoaXNFcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQYXJhbWV0ZXIgZXJyb3IuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luZGVudGVyIFsyNF0nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICAyNCA9IGNoYW5nZSB0YWIgc2l6ZSAyIHRvIDQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICB0NCA9IGNoYW5nZSB0YWIgdG8gNCBzcGFjZXMnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgIGlucHV0VGV4dCA9IGNsaXBib2FyZHkucmVhZFN5bmMoKTtcclxuICAgIGNvbnN0ICBsaW5lczogc3RyaW5nW10gPSBpbnB1dFRleHQuc3BsaXQoJ1xcbicpO1xyXG4gICAgY29uc3QgIG51bGxMZW5ndGggPSA5OTk5O1xyXG4gICAgY29uc3QgIGluZGVudFJlZ3VsYXJFeHByZXNzaW9uID0gL14oIHxcXHQpKi87XHJcbiAgICBpZiAoaW5wdXRUZXh0LnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoaXNDaGFuZ2luZ0Zyb21UYWIpIHtcclxuICAgICAgICBmb3IgKHZhciBsaW5lTnVtID0gMTsgIGxpbmVOdW0gPCBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICB0YWJJbmRlbnQgPSAvXihcXHQpKi8uZXhlYyhsaW5lc1tsaW5lTnVtIC0gMV0pIVswXTtcclxuICAgICAgICAgICAgY29uc3QgIHNwYWNlSW5kZW50ID0gJyAnLnJlcGVhdCh0YWJTaXplQmVmb3JlICogdGFiSW5kZW50Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBsaW5lc1tsaW5lTnVtIC0gMV0gPSBzcGFjZUluZGVudCArIGxpbmVzW2xpbmVOdW0gLSAxXS5zdWJzdHIodGFiSW5kZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyICBtaW5JbmRlbnRMZW5ndGggPSBudWxsTGVuZ3RoO1xyXG4gICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgaWYgKGxpbmUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCAgaW5kZW50TGVuZ3RoID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggbGluZSApIVswXS5sZW5ndGg7XHJcbiAgICAgICAgICAgIG1pbkluZGVudExlbmd0aCA9IE1hdGgubWluKG1pbkluZGVudExlbmd0aCwgaW5kZW50TGVuZ3RoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0ICBmaXJzdExpbmVJbmRlbnQgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lc1swXSApIVswXTtcclxuICAgIGlmIChtaW5JbmRlbnRMZW5ndGggPT09IG51bGxMZW5ndGgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1pbkluZGVudExlbmd0aCA8IGZpcnN0TGluZUluZGVudC5sZW5ndGgpIHtcclxuICAgICAgICBpZiAoaXNDaGFuZ2luZ1RvVGFiKSB7XHJcbiAgICAgICAgICAgIHZhciAgZmlyc3RMaW5lSW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoZmlyc3RMaW5lSW5kZW50Lmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICBsaW5lc1swXSA9IGZpcnN0TGluZUluZGVudEFmdGVyICsgbGluZXNbMF0uc3Vic3RyKGZpcnN0TGluZUluZGVudC5sZW5ndGgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciAgZmlyc3RMaW5lSW5kZW50QWZ0ZXIgPSBmaXJzdExpbmVJbmRlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpbnNlcnQgaW5kZW50XHJcbiAgICAgICAgZm9yICh2YXIgbGluZU51bSA9IDI7ICBsaW5lTnVtIDw9IGxpbmVzLmxlbmd0aDsgIGxpbmVOdW0gKz0gMSApIHtcclxuICAgICAgICAgICAgaWYgKGxpbmVzW2xpbmVOdW0gLSAxXSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHZhciAgICBsaW5lID0gbGluZXNbbGluZU51bSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgIGluZGVudEJlZm9yZSA9IGluZGVudFJlZ3VsYXJFeHByZXNzaW9uLmV4ZWMoIGxpbmUgKSFbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDaGFuZ2luZ1RvVGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICBpbmRlbnRBZnRlciA9ICdcXHQnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnICcucmVwZWF0KGluZGVudEJlZm9yZS5sZW5ndGggKiB0YWJTaXplQWZ0ZXIgLyB0YWJTaXplQmVmb3JlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW5lID0gZmlyc3RMaW5lSW5kZW50QWZ0ZXIgKyBpbmRlbnRBZnRlciArIGxpbmUuc3Vic3RyaW5nKGluZGVudEJlZm9yZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmUudHJpbUxlZnQoKVswXSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IGNoYW5nZVNwYWNlc1JpZ2h0T2ZIeXBoZW4obGluZSwgdGFiU2l6ZUFmdGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmVzW2xpbmVOdW0gLSAxXSA9IGxpbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyBjdXQgaW5kZW50XHJcbiAgICAgICAgZm9yICh2YXIgbGluZU51bSA9IDE7ICBsaW5lTnVtIDw9IGxpbmVzLmxlbmd0aDsgIGxpbmVOdW0gKz0gMSApIHtcclxuICAgICAgICAgICAgdmFyICAgIHVuaW5kZW50ZWRMaW5lID0gbGluZXNbbGluZU51bSAtIDFdLnN1YnN0cmluZyhtaW5JbmRlbnRMZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCAgaW5kZW50QmVmb3JlID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggdW5pbmRlbnRlZExpbmUgKSFbMF07XHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5naW5nVG9UYWIpIHtcclxuICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyICBpbmRlbnRBZnRlciA9ICcgJy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgIGxpbmUgPSBpbmRlbnRBZnRlciArIHVuaW5kZW50ZWRMaW5lLnN1YnN0cmluZyhpbmRlbnRCZWZvcmUubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGxpbmUudHJpbUxlZnQoKVswXSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBsaW5lID0gY2hhbmdlU3BhY2VzUmlnaHRPZkh5cGhlbihsaW5lLCB0YWJTaXplQWZ0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpbmVzW2xpbmVOdW0gLSAxXSA9IGxpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0ICBvdXRwdXRUZXh0ID0gbGluZXMuam9pbignXFxuJyk7XHJcbiAgICBjbGlwYm9hcmR5LndyaXRlU3luYyhvdXRwdXRUZXh0KTtcclxufVxyXG5cclxuLy8gY2hhbmdlU3BhY2VzUmlnaHRPZkh5cGhlblxyXG5mdW5jdGlvbiAgY2hhbmdlU3BhY2VzUmlnaHRPZkh5cGhlbihsaW5lOiBzdHJpbmcsIHRhYlNpemVBZnRlcjogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0ICBoeXBoZW5Qb3NpdGlvbiA9IGxpbmUuaW5kZXhPZiggJy0nICk7XHJcbiAgICBjb25zdCAgZWxlbWVudCA9IGxpbmUuc3Vic3RyaW5nKGh5cGhlblBvc2l0aW9uICsgMSkudHJpbUxlZnQoKTtcclxuXHJcbiAgICBsaW5lID0gbGluZS5zdWJzdHJpbmcoMCwgaHlwaGVuUG9zaXRpb24gKyAxKSArICcgJy5yZXBlYXQodGFiU2l6ZUFmdGVyIC0gMSkgKyBlbGVtZW50O1xyXG4gICAgcmV0dXJuICBsaW5lO1xyXG59XHJcblxyXG4vLyBwYXJzZUNvbW1hbmRcclxuZnVuY3Rpb24gIHBhcnNlQ29tbWFuZCgpOiBwYXJzZWRDb21tYW5kIHtcclxuICAgIHZhciAgaXNFcnJvciA9IHRydWU7XHJcbiAgICB2YXIgIHRhYlNpemVCZWZvcmUgPSAwO1xyXG4gICAgdmFyICB0YWJTaXplQWZ0ZXIgID0gMDtcclxuICAgIHZhciAgaXNDaGFuZ2luZ0Zyb21UYWIgPSBmYWxzZTtcclxuICAgIHZhciAgaXNDaGFuZ2luZ1RvVGFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHByb2dyYW1Bcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IDE7XHJcbiAgICAgICAgdGFiU2l6ZUFmdGVyICA9IDE7XHJcbiAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIH0gZWxzZSBpZiAocHJvZ3JhbUFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCAgY29tbWFuZCA9IHByb2dyYW1Bcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYgKGNvbW1hbmQgICYmICBjb21tYW5kLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZCA9PT0gJ3R0Jykge1xyXG4gICAgICAgICAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQWZ0ZXIgID0gMTtcclxuICAgICAgICAgICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVCZWZvcmUgPSBwYXJzZUludChjb21tYW5kWzBdKTtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVBZnRlciAgPSBwYXJzZUludChjb21tYW5kWzFdKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kWzBdID09PSAndCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJTaXplQmVmb3JlID0gdGFiU2l6ZUFmdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdpbmdGcm9tVGFiID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZFsxXSA9PT0gJ3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2l6ZUFmdGVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nVG9UYWIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nRnJvbVRhYiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiU2l6ZUJlZm9yZSAmJiB0YWJTaXplQWZ0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIHtpc0Vycm9yLCB0YWJTaXplQmVmb3JlLCB0YWJTaXplQWZ0ZXIsIGlzQ2hhbmdpbmdGcm9tVGFiLCBpc0NoYW5naW5nVG9UYWJ9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgcGFyc2VkQ29tbWFuZCB7XHJcbiAgICBpc0Vycm9yOiBib29sZWFuO1xyXG4gICAgdGFiU2l6ZUJlZm9yZTogbnVtYmVyO1xyXG4gICAgdGFiU2l6ZUFmdGVyOiBudW1iZXI7XHJcbiAgICBpc0NoYW5naW5nRnJvbVRhYjogYm9vbGVhbjtcclxuICAgIGlzQ2hhbmdpbmdUb1RhYjogYm9vbGVhbjtcclxufVxyXG5cclxuLy8gZ2V0U3RkT3V0XHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHZhciBkID0gZ2V0U3RkT3V0KCk7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuZnVuY3Rpb24gIGdldFN0ZE91dCgpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gIHN0ZG91dC5zcGxpdCgnXFxuJyk7XHJcbn1cclxuXHJcbi8vIHByaW50bG5cclxuLy8gI2tleXdvcmQ6IHByaW50bG4sIGNvbnNvbGUubG9nLCBjb25zb2xlTG9nXHJcbi8vIE91dHB1dCBhbnkgdGV4dCB0byBzdGFuZGFyZCBvdXRwdXQuXHJcbmV4cG9ydCBmdW5jdGlvbiAgcHJpbnRsbihtZXNzYWdlOiBhbnksIGRlbGF5ZWRFeHBhbmRpbmc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGlmICh3aXRoSmVzdCAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIHN0ZG91dCArPSBtZXNzYWdlLnRvU3RyaW5nKCkgKyAnXFxuJztcclxuICAgICAgICBwcChtZXNzYWdlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlTG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0ICBjb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbmNvbnNvbGUubG9nID0gcHJpbnRsbjtcclxuXHJcbi8vIGNhbGxNYWluRnJvbUplc3RcclxuLy8gI2tleXdvcmQ6IGNhbGxNYWluRnJvbUplc3RcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBjYWxsTWFpbkZyb21KZXN0KHBhcmFtZXRlcnM/OiBzdHJpbmdbXSwgb3B0aW9ucz86IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xyXG4gICAgd2l0aEplc3QgPSB0cnVlO1xyXG4gICAgc3Rkb3V0ID0gJyc7XHJcbiAgICBpZiAocGFyYW1ldGVycykge1xyXG4gICAgICAgIHByb2dyYW1Bcmd1bWVudHMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ncmFtQXJndW1lbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgIHByb2dyYW1PcHRpb25zID0gb3B0aW9ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZ3JhbU9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBtYWluKCk7XHJcbn1cclxuXHJcbnZhciAgICBsb2NhbGUgPSAnJztcclxudmFyICAgIHdpdGhKZXN0ID0gZmFsc2U7XHJcbmV4cG9ydCB2YXIgIHN0ZG91dCA9ICcnO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtQXJndW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtT3B0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcclxuIl19