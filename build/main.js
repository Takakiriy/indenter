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
        var _a, isError, tabSizeBefore, tabSizeAfter, isChangingFromTab, isChangingToTab, inputText, lines, nullLength, indentRegularExpression, lineNum, tabIndent, spaceIndent, minIndentLength, _i, lines_1, line, indentLength, firstLineIndent, firstLineIndentAfter, firstLineIndentAfter, lineNum, line, indentBefore, indentAfter, indentAfter, lineNum, unindentedLine, indentBefore, indentAfter, indentAfter, outputText;
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
                line = lines_1[_i];
                if (line.trim() !== '') {
                    indentLength = indentRegularExpression.exec(line)[0].length;
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
                        lines[lineNum - 1] = firstLineIndentAfter + indentAfter + line.substr(indentBefore.length);
                    }
                }
            }
            else {
                // cut indent
                for (lineNum = 1; lineNum <= lines.length; lineNum += 1) {
                    unindentedLine = lines[lineNum - 1].substr(minIndentLength);
                    indentBefore = indentRegularExpression.exec(unindentedLine)[0];
                    if (isChangingToTab) {
                        indentAfter = '\t'.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                    }
                    else {
                        indentAfter = ' '.repeat(indentBefore.length * tabSizeAfter / tabSizeBefore);
                    }
                    lines[lineNum - 1] = indentAfter + unindentedLine.substr(indentBefore.length);
                }
            }
            outputText = lines.join('\n');
            clipboardy.writeSync(outputText);
            return [2 /*return*/];
        });
    });
}
exports.main = main;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6Qyw2QkFBMkI7QUFFM0IsT0FBTztBQUNQLFNBQXVCLElBQUk7Ozs7WUFDakIsS0FBNkUsWUFBWSxFQUFFLEVBQTFGLE9BQU8sYUFBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFtQjtZQUNsRyxJQUFJLE9BQU8sRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUM3QyxzQkFBTzthQUNWO1lBRU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLHVCQUF1QixHQUFHLFVBQVUsQ0FBQztZQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLHNCQUFPO2FBQ1Y7WUFDRCxJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixLQUFTLE9BQU8sR0FBRyxDQUFDLEVBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUcsT0FBTyxJQUFJLENBQUMsRUFBRztvQkFDcEQsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBRSxD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ICogYXMgY2xpcGJvYXJkeSBmcm9tICdjbGlwYm9hcmR5JztcclxuaW1wb3J0IHsgcHAgfSBmcm9tIFwiLi9saWJcIjtcclxuXHJcbi8vIG1haW5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG4gICAgY29uc3Qge2lzRXJyb3IsIHRhYlNpemVCZWZvcmUsIHRhYlNpemVBZnRlciwgaXNDaGFuZ2luZ0Zyb21UYWIsIGlzQ2hhbmdpbmdUb1RhYn0gPSBwYXJzZUNvbW1hbmQoKTtcclxuICAgIGlmIChpc0Vycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BhcmFtZXRlciBlcnJvci4nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnaW5kZW50ZXIgWzI0XScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgIDI0ID0gY2hhbmdlIHRhYiBzaXplIDIgdG8gNCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgIHQ0ID0gY2hhbmdlIHRhYiB0byA0IHNwYWNlcycpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAgaW5wdXRUZXh0ID0gY2xpcGJvYXJkeS5yZWFkU3luYygpO1xyXG4gICAgY29uc3QgIGxpbmVzID0gaW5wdXRUZXh0LnNwbGl0KCdcXG4nKTtcclxuICAgIGNvbnN0ICBudWxsTGVuZ3RoID0gOTk5OTtcclxuICAgIGNvbnN0ICBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbiA9IC9eKCB8XFx0KSovO1xyXG4gICAgaWYgKGlucHV0VGV4dC50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzQ2hhbmdpbmdGcm9tVGFiKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbGluZU51bSA9IDE7ICBsaW5lTnVtIDwgbGluZXMubGVuZ3RoOyAgbGluZU51bSArPSAxICkge1xyXG4gICAgICAgICAgICBjb25zdCAgdGFiSW5kZW50ID0gL14oXFx0KSovLmV4ZWMobGluZXNbbGluZU51bSAtIDFdKSFbMF07XHJcbiAgICAgICAgICAgIGNvbnN0ICBzcGFjZUluZGVudCA9ICcgJy5yZXBlYXQodGFiU2l6ZUJlZm9yZSAqIHRhYkluZGVudC5sZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gc3BhY2VJbmRlbnQgKyBsaW5lc1tsaW5lTnVtIC0gMV0uc3Vic3RyKHRhYkluZGVudC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciAgbWluSW5kZW50TGVuZ3RoID0gbnVsbExlbmd0aDtcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xyXG4gICAgICAgIGlmIChsaW5lLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgIGluZGVudExlbmd0aCA9IGluZGVudFJlZ3VsYXJFeHByZXNzaW9uLmV4ZWMoIGxpbmUgKSFbMF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBtaW5JbmRlbnRMZW5ndGggPSBNYXRoLm1pbihtaW5JbmRlbnRMZW5ndGgsIGluZGVudExlbmd0aClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCAgZmlyc3RMaW5lSW5kZW50ID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggbGluZXNbMF0gKSFbMF07XHJcbiAgICBpZiAobWluSW5kZW50TGVuZ3RoID09PSBudWxsTGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtaW5JbmRlbnRMZW5ndGggPCBmaXJzdExpbmVJbmRlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICB2YXIgIGZpcnN0TGluZUluZGVudEFmdGVyID0gJ1xcdCcucmVwZWF0KGZpcnN0TGluZUluZGVudC5sZW5ndGggKiB0YWJTaXplQWZ0ZXIgLyB0YWJTaXplQmVmb3JlKTtcclxuICAgICAgICAgICAgbGluZXNbMF0gPSBmaXJzdExpbmVJbmRlbnRBZnRlciArIGxpbmVzWzBdLnN1YnN0cihmaXJzdExpbmVJbmRlbnQubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgIGZpcnN0TGluZUluZGVudEFmdGVyID0gZmlyc3RMaW5lSW5kZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW5zZXJ0IGluZGVudFxyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAyOyAgbGluZU51bSA8PSBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tsaW5lTnVtIC0gMV0gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAgbGluZSA9IGxpbmVzW2xpbmVOdW0gLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICBpbmRlbnRCZWZvcmUgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lICkhWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgIGluZGVudEFmdGVyID0gJyAnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gZmlyc3RMaW5lSW5kZW50QWZ0ZXIgKyBpbmRlbnRBZnRlciArIGxpbmUuc3Vic3RyKGluZGVudEJlZm9yZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gY3V0IGluZGVudFxyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAxOyAgbGluZU51bSA8PSBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICB1bmluZGVudGVkTGluZSA9IGxpbmVzW2xpbmVOdW0gLSAxXS5zdWJzdHIobWluSW5kZW50TGVuZ3RoKTtcclxuICAgICAgICAgICAgY29uc3QgIGluZGVudEJlZm9yZSA9IGluZGVudFJlZ3VsYXJFeHByZXNzaW9uLmV4ZWMoIHVuaW5kZW50ZWRMaW5lICkhWzBdO1xyXG4gICAgICAgICAgICBpZiAoaXNDaGFuZ2luZ1RvVGFiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgIGluZGVudEFmdGVyID0gJ1xcdCcucmVwZWF0KGluZGVudEJlZm9yZS5sZW5ndGggKiB0YWJTaXplQWZ0ZXIgLyB0YWJTaXplQmVmb3JlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnICcucmVwZWF0KGluZGVudEJlZm9yZS5sZW5ndGggKiB0YWJTaXplQWZ0ZXIgLyB0YWJTaXplQmVmb3JlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gaW5kZW50QWZ0ZXIgKyB1bmluZGVudGVkTGluZS5zdWJzdHIoaW5kZW50QmVmb3JlLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0ICBvdXRwdXRUZXh0ID0gbGluZXMuam9pbignXFxuJyk7XHJcbiAgICBjbGlwYm9hcmR5LndyaXRlU3luYyhvdXRwdXRUZXh0KTtcclxufVxyXG5cclxuLy8gcGFyc2VDb21tYW5kXHJcbmZ1bmN0aW9uICBwYXJzZUNvbW1hbmQoKTogcGFyc2VkQ29tbWFuZCB7XHJcbiAgICB2YXIgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgdmFyICB0YWJTaXplQmVmb3JlID0gMDtcclxuICAgIHZhciAgdGFiU2l6ZUFmdGVyICA9IDA7XHJcbiAgICB2YXIgIGlzQ2hhbmdpbmdGcm9tVGFiID0gZmFsc2U7XHJcbiAgICB2YXIgIGlzQ2hhbmdpbmdUb1RhYiA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChwcm9ncmFtQXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHRhYlNpemVCZWZvcmUgPSAxO1xyXG4gICAgICAgIHRhYlNpemVBZnRlciAgPSAxO1xyXG4gICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKHByb2dyYW1Bcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29uc3QgIGNvbW1hbmQgPSBwcm9ncmFtQXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGlmIChjb21tYW5kICAmJiAgY29tbWFuZC5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgaWYgKGNvbW1hbmQgPT09ICd0dCcpIHtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVCZWZvcmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGFiU2l6ZUFmdGVyICA9IDE7XHJcbiAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQmVmb3JlID0gcGFyc2VJbnQoY29tbWFuZFswXSk7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQWZ0ZXIgID0gcGFyc2VJbnQoY29tbWFuZFsxXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZFswXSA9PT0gJ3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IHRhYlNpemVBZnRlcjtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nRnJvbVRhYiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmRbMV0gPT09ICd0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYlNpemVBZnRlciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2luZ1RvVGFiID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDaGFuZ2luZ0Zyb21UYWIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhYlNpemVCZWZvcmUgJiYgdGFiU2l6ZUFmdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICB7aXNFcnJvciwgdGFiU2l6ZUJlZm9yZSwgdGFiU2l6ZUFmdGVyLCBpc0NoYW5naW5nRnJvbVRhYiwgaXNDaGFuZ2luZ1RvVGFifTtcclxufVxyXG5cclxuaW50ZXJmYWNlIHBhcnNlZENvbW1hbmQge1xyXG4gICAgaXNFcnJvcjogYm9vbGVhbjtcclxuICAgIHRhYlNpemVCZWZvcmU6IG51bWJlcjtcclxuICAgIHRhYlNpemVBZnRlcjogbnVtYmVyO1xyXG4gICAgaXNDaGFuZ2luZ0Zyb21UYWI6IGJvb2xlYW47XHJcbiAgICBpc0NoYW5naW5nVG9UYWI6IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIGdldFN0ZE91dFxyXG4vLyBFeGFtcGxlOlxyXG4vLyAgICB2YXIgZCA9IGdldFN0ZE91dCgpOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbmZ1bmN0aW9uICBnZXRTdGRPdXQoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuICBzdGRvdXQuc3BsaXQoJ1xcbicpO1xyXG59XHJcblxyXG4vLyBwcmludGxuXHJcbi8vICNrZXl3b3JkOiBwcmludGxuLCBjb25zb2xlLmxvZywgY29uc29sZUxvZ1xyXG4vLyBPdXRwdXQgYW55IHRleHQgdG8gc3RhbmRhcmQgb3V0cHV0LlxyXG5leHBvcnQgZnVuY3Rpb24gIHByaW50bG4obWVzc2FnZTogYW55LCBkZWxheWVkRXhwYW5kaW5nOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgJiYgIWRlbGF5ZWRFeHBhbmRpbmcpIHtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBpZiAod2l0aEplc3QgJiYgIWRlbGF5ZWRFeHBhbmRpbmcpIHtcclxuICAgICAgICBzdGRvdXQgKz0gbWVzc2FnZS50b1N0cmluZygpICsgJ1xcbic7XHJcbiAgICAgICAgcHAobWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZUxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5jb25zdCAgY29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xyXG5jb25zb2xlLmxvZyA9IHByaW50bG47XHJcblxyXG4vLyBjYWxsTWFpbkZyb21KZXN0XHJcbi8vICNrZXl3b3JkOiBjYWxsTWFpbkZyb21KZXN0XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgY2FsbE1haW5Gcm9tSmVzdChwYXJhbWV0ZXJzPzogc3RyaW5nW10sIG9wdGlvbnM/OiB7W25hbWU6IHN0cmluZ106IHN0cmluZ30pIHtcclxuICAgIHdpdGhKZXN0ID0gdHJ1ZTtcclxuICAgIHN0ZG91dCA9ICcnO1xyXG4gICAgaWYgKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICBwcm9ncmFtQXJndW1lbnRzID0gcGFyYW1ldGVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZ3JhbUFyZ3VtZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICBwcm9ncmFtT3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2dyYW1PcHRpb25zID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgYXdhaXQgbWFpbigpO1xyXG59XHJcblxyXG52YXIgICAgbG9jYWxlID0gJyc7XHJcbnZhciAgICB3aXRoSmVzdCA9IGZhbHNlO1xyXG5leHBvcnQgdmFyICBzdGRvdXQgPSAnJztcclxuZXhwb3J0IHZhciAgcHJvZ3JhbUFyZ3VtZW50czogc3RyaW5nW10gPSBbXTtcclxuZXhwb3J0IHZhciAgcHJvZ3JhbU9wdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XHJcbiJdfQ==