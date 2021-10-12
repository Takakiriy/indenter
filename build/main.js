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
                for (lineNum = 2; lineNum < lines.length; lineNum += 1) {
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
                for (lineNum = 1; lineNum < lines.length; lineNum += 1) {
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
        lib_1.pp(message.toString());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUN6Qyw2QkFBMkI7QUFFM0IsT0FBTztBQUNQLFNBQXVCLElBQUk7Ozs7WUFDakIsS0FBNkUsWUFBWSxFQUFFLEVBQTFGLE9BQU8sYUFBQSxFQUFFLGFBQWEsbUJBQUEsRUFBRSxZQUFZLGtCQUFBLEVBQUUsaUJBQWlCLHVCQUFBLEVBQUUsZUFBZSxxQkFBQSxDQUFtQjtZQUNsRyxJQUFJLE9BQU8sRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUM3QyxzQkFBTzthQUNWO1lBRU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLHVCQUF1QixHQUFHLFVBQVUsQ0FBQztZQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLHNCQUFPO2FBQ1Y7WUFDRCxJQUFJLGlCQUFpQixFQUFFO2dCQUNuQixLQUFTLE9BQU8sR0FBRyxDQUFDLEVBQUcsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUcsT0FBTyxJQUFJLENBQUMsRUFBRztvQkFDcEQsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUVsRSxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2xGO2FBQ0o7WUFDSSxlQUFlLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLFdBQXdCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUFFO2dCQUFmLElBQUk7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUNiLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN0RSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUE7aUJBQzVEO2FBQ0o7WUFDTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksZUFBZSxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsc0JBQU87YUFDVjtZQUVELElBQUksZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFDLElBQUksZUFBZSxFQUFFO29CQUNaLG9CQUFvQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUM7b0JBQy9GLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDN0U7cUJBQU07b0JBQ0Usb0JBQW9CLEdBQUcsZUFBZSxDQUFDO2lCQUMvQztnQkFFRCxnQkFBZ0I7Z0JBQ2hCLEtBQVMsT0FBTyxHQUFHLENBQUMsRUFBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRyxPQUFPLElBQUksQ0FBQyxFQUFHO29CQUMzRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNwQixJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDMUIsWUFBWSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBRSxJQUFJLENBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxlQUFlLEVBQUU7NEJBQ1osV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLEdBQUcsYUFBYSxDQUFDLENBQUM7eUJBQ3RGOzZCQUFNOzRCQUNFLFdBQVcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDO3lCQUNyRjt3QkFFRCxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDOUY7aUJBQ0o7YUFDSjtpQkFBTTtnQkFFSCxhQUFhO2dCQUNiLEtBQVMsT0FBTyxHQUFHLENBQUMsRUFBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRyxPQUFPLElBQUksQ0FBQyxFQUFHO29CQUNwRCxjQUFjLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzVELFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsY0FBYyxDQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pFLElBQUksZUFBZSxFQUFFO3dCQUNaLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDO3FCQUN0Rjt5QkFBTTt3QkFDRSxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQztxQkFDckY7b0JBRUQsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ2pGO2FBQ0o7WUFFTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O0NBQ3BDO0FBN0VELG9CQTZFQztBQUVELGVBQWU7QUFDZixTQUFVLFlBQVk7SUFDbEIsSUFBSyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLElBQUssYUFBYSxHQUFHLENBQUMsQ0FBQztJQUN2QixJQUFLLFlBQVksR0FBSSxDQUFDLENBQUM7SUFDdkIsSUFBSyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDL0IsSUFBSyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBRTdCLElBQUksd0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMvQixhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFlBQVksR0FBSSxDQUFDLENBQUM7UUFDbEIsT0FBTyxHQUFHLEtBQUssQ0FBQztLQUVuQjtTQUFNLElBQUksd0JBQWdCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN0QyxJQUFPLE9BQU8sR0FBRyx3QkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sSUFBTSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Z0JBQ2xCLGFBQWEsR0FBRyxDQUFDLENBQUM7Z0JBQ2xCLFlBQVksR0FBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDbkI7aUJBQU07Z0JBQ0gsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsWUFBWSxHQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO29CQUNwQixhQUFhLEdBQUcsWUFBWSxDQUFDO29CQUM3QixpQkFBaUIsR0FBRyxJQUFJLENBQUM7aUJBQzVCO3FCQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDM0IsWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFDakIsZUFBZSxHQUFHLElBQUksQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2lCQUM1QjtnQkFDRCxJQUFJLGFBQWEsSUFBSSxZQUFZLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxLQUFLLENBQUM7aUJBQ25CO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsT0FBUSxFQUFDLE9BQU8sU0FBQSxFQUFFLGFBQWEsZUFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLGVBQWUsaUJBQUEsRUFBQyxDQUFDO0FBQ3ZGLENBQUM7QUFVRCxZQUFZO0FBQ1osV0FBVztBQUNYLDRFQUE0RTtBQUM1RSxTQUFVLFNBQVM7SUFDZixPQUFRLGNBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVELFVBQVU7QUFDViw2Q0FBNkM7QUFDN0Msc0NBQXNDO0FBQ3RDLFNBQWlCLE9BQU8sQ0FBQyxPQUFZLEVBQUUsZ0JBQWlDO0lBQWpDLGlDQUFBLEVBQUEsd0JBQWlDO0lBQ3BFLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDbEQsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckM7SUFDRCxJQUFJLFFBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1FBQy9CLGNBQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLFFBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0wsQ0FBQztBQVZELDBCQVVDO0FBQ0QsSUFBTyxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNoQyxPQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztBQUV0QixtQkFBbUI7QUFDbkIsNkJBQTZCO0FBQzdCLFNBQXVCLGdCQUFnQixDQUFDLFVBQXFCLEVBQUUsT0FBa0M7Ozs7O29CQUM3RixRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNoQixjQUFNLEdBQUcsRUFBRSxDQUFDO29CQUNaLElBQUksVUFBVSxFQUFFO3dCQUNaLHdCQUFnQixHQUFHLFVBQVUsQ0FBQztxQkFDakM7eUJBQU07d0JBQ0gsd0JBQWdCLEdBQUcsRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxzQkFBYyxHQUFHLE9BQU8sQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsc0JBQWMsR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUVELHFCQUFNLElBQUksRUFBRSxFQUFBOztvQkFBWixTQUFZLENBQUM7Ozs7O0NBQ2hCO0FBZkQsNENBZUM7QUFFRCxJQUFPLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBTyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ1osUUFBQSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBQSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7QUFDaEMsUUFBQSxjQUFjLEdBQXlCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsaXBib2FyZHkgZnJvbSAnY2xpcGJvYXJkeSc7XHJcbmltcG9ydCB7IHBwIH0gZnJvbSBcIi4vbGliXCI7XHJcblxyXG4vLyBtYWluXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgbWFpbigpIHtcclxuICAgIGNvbnN0IHtpc0Vycm9yLCB0YWJTaXplQmVmb3JlLCB0YWJTaXplQWZ0ZXIsIGlzQ2hhbmdpbmdGcm9tVGFiLCBpc0NoYW5naW5nVG9UYWJ9ID0gcGFyc2VDb21tYW5kKCk7XHJcbiAgICBpZiAoaXNFcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdQYXJhbWV0ZXIgZXJyb3IuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2luZGVudGVyIFsyNF0nKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICAyNCA9IGNoYW5nZSB0YWIgc2l6ZSAyIHRvIDQnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnICB0NCA9IGNoYW5nZSB0YWIgdG8gNCBzcGFjZXMnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgIGlucHV0VGV4dCA9IGNsaXBib2FyZHkucmVhZFN5bmMoKTtcclxuICAgIGNvbnN0ICBsaW5lcyA9IGlucHV0VGV4dC5zcGxpdCgnXFxuJyk7XHJcbiAgICBjb25zdCAgbnVsbExlbmd0aCA9IDk5OTk7XHJcbiAgICBjb25zdCAgaW5kZW50UmVndWxhckV4cHJlc3Npb24gPSAvXiggfFxcdCkqLztcclxuICAgIGlmIChpbnB1dFRleHQudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChpc0NoYW5naW5nRnJvbVRhYikge1xyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAxOyAgbGluZU51bSA8IGxpbmVzLmxlbmd0aDsgIGxpbmVOdW0gKz0gMSApIHtcclxuICAgICAgICAgICAgY29uc3QgIHRhYkluZGVudCA9IC9eKFxcdCkqLy5leGVjKGxpbmVzW2xpbmVOdW0gLSAxXSkhWzBdO1xyXG4gICAgICAgICAgICBjb25zdCAgc3BhY2VJbmRlbnQgPSAnICcucmVwZWF0KHRhYlNpemVCZWZvcmUgKiB0YWJJbmRlbnQubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIGxpbmVzW2xpbmVOdW0gLSAxXSA9IHNwYWNlSW5kZW50ICsgbGluZXNbbGluZU51bSAtIDFdLnN1YnN0cih0YWJJbmRlbnQubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgIG1pbkluZGVudExlbmd0aCA9IG51bGxMZW5ndGg7XHJcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcclxuICAgICAgICBpZiAobGluZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0ICBpbmRlbnRMZW5ndGggPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lICkhWzBdLmxlbmd0aDtcclxuICAgICAgICAgICAgbWluSW5kZW50TGVuZ3RoID0gTWF0aC5taW4obWluSW5kZW50TGVuZ3RoLCBpbmRlbnRMZW5ndGgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgIGZpcnN0TGluZUluZGVudCA9IGluZGVudFJlZ3VsYXJFeHByZXNzaW9uLmV4ZWMoIGxpbmVzWzBdICkhWzBdO1xyXG4gICAgaWYgKG1pbkluZGVudExlbmd0aCA9PT0gbnVsbExlbmd0aCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobWluSW5kZW50TGVuZ3RoIDwgZmlyc3RMaW5lSW5kZW50Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChpc0NoYW5naW5nVG9UYWIpIHtcclxuICAgICAgICAgICAgdmFyICBmaXJzdExpbmVJbmRlbnRBZnRlciA9ICdcXHQnLnJlcGVhdChmaXJzdExpbmVJbmRlbnQubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgIGxpbmVzWzBdID0gZmlyc3RMaW5lSW5kZW50QWZ0ZXIgKyBsaW5lc1swXS5zdWJzdHIoZmlyc3RMaW5lSW5kZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyICBmaXJzdExpbmVJbmRlbnRBZnRlciA9IGZpcnN0TGluZUluZGVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGluc2VydCBpbmRlbnRcclxuICAgICAgICBmb3IgKHZhciBsaW5lTnVtID0gMjsgIGxpbmVOdW0gPCBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tsaW5lTnVtIC0gMV0gIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAgbGluZSA9IGxpbmVzW2xpbmVOdW0gLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICBpbmRlbnRCZWZvcmUgPSBpbmRlbnRSZWd1bGFyRXhwcmVzc2lvbi5leGVjKCBsaW5lICkhWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hhbmdpbmdUb1RhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgIGluZGVudEFmdGVyID0gJyAnLnJlcGVhdChpbmRlbnRCZWZvcmUubGVuZ3RoICogdGFiU2l6ZUFmdGVyIC8gdGFiU2l6ZUJlZm9yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gZmlyc3RMaW5lSW5kZW50QWZ0ZXIgKyBpbmRlbnRBZnRlciArIGxpbmUuc3Vic3RyKGluZGVudEJlZm9yZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gY3V0IGluZGVudFxyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAxOyAgbGluZU51bSA8IGxpbmVzLmxlbmd0aDsgIGxpbmVOdW0gKz0gMSApIHtcclxuICAgICAgICAgICAgY29uc3QgIHVuaW5kZW50ZWRMaW5lID0gbGluZXNbbGluZU51bSAtIDFdLnN1YnN0cihtaW5JbmRlbnRMZW5ndGgpO1xyXG4gICAgICAgICAgICBjb25zdCAgaW5kZW50QmVmb3JlID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggdW5pbmRlbnRlZExpbmUgKSFbMF07XHJcbiAgICAgICAgICAgIGlmIChpc0NoYW5naW5nVG9UYWIpIHtcclxuICAgICAgICAgICAgICAgIHZhciAgaW5kZW50QWZ0ZXIgPSAnXFx0Jy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyICBpbmRlbnRBZnRlciA9ICcgJy5yZXBlYXQoaW5kZW50QmVmb3JlLmxlbmd0aCAqIHRhYlNpemVBZnRlciAvIHRhYlNpemVCZWZvcmUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaW5lc1tsaW5lTnVtIC0gMV0gPSBpbmRlbnRBZnRlciArIHVuaW5kZW50ZWRMaW5lLnN1YnN0cihpbmRlbnRCZWZvcmUubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgIG91dHB1dFRleHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcclxuICAgIGNsaXBib2FyZHkud3JpdGVTeW5jKG91dHB1dFRleHQpO1xyXG59XHJcblxyXG4vLyBwYXJzZUNvbW1hbmRcclxuZnVuY3Rpb24gIHBhcnNlQ29tbWFuZCgpOiBwYXJzZWRDb21tYW5kIHtcclxuICAgIHZhciAgaXNFcnJvciA9IHRydWU7XHJcbiAgICB2YXIgIHRhYlNpemVCZWZvcmUgPSAwO1xyXG4gICAgdmFyICB0YWJTaXplQWZ0ZXIgID0gMDtcclxuICAgIHZhciAgaXNDaGFuZ2luZ0Zyb21UYWIgPSBmYWxzZTtcclxuICAgIHZhciAgaXNDaGFuZ2luZ1RvVGFiID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHByb2dyYW1Bcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IDE7XHJcbiAgICAgICAgdGFiU2l6ZUFmdGVyICA9IDE7XHJcbiAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIH0gZWxzZSBpZiAocHJvZ3JhbUFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCAgY29tbWFuZCA9IHByb2dyYW1Bcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYgKGNvbW1hbmQgICYmICBjb21tYW5kLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBpZiAoY29tbWFuZCA9PT0gJ3R0Jykge1xyXG4gICAgICAgICAgICAgICAgdGFiU2l6ZUJlZm9yZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0YWJTaXplQWZ0ZXIgID0gMTtcclxuICAgICAgICAgICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVCZWZvcmUgPSBwYXJzZUludChjb21tYW5kWzBdKTtcclxuICAgICAgICAgICAgICAgIHRhYlNpemVBZnRlciAgPSBwYXJzZUludChjb21tYW5kWzFdKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kWzBdID09PSAndCcpIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWJTaXplQmVmb3JlID0gdGFiU2l6ZUFmdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hhbmdpbmdGcm9tVGFiID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZFsxXSA9PT0gJ3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU2l6ZUFmdGVyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nVG9UYWIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5naW5nRnJvbVRhYiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiU2l6ZUJlZm9yZSAmJiB0YWJTaXplQWZ0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIHtpc0Vycm9yLCB0YWJTaXplQmVmb3JlLCB0YWJTaXplQWZ0ZXIsIGlzQ2hhbmdpbmdGcm9tVGFiLCBpc0NoYW5naW5nVG9UYWJ9O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgcGFyc2VkQ29tbWFuZCB7XHJcbiAgICBpc0Vycm9yOiBib29sZWFuO1xyXG4gICAgdGFiU2l6ZUJlZm9yZTogbnVtYmVyO1xyXG4gICAgdGFiU2l6ZUFmdGVyOiBudW1iZXI7XHJcbiAgICBpc0NoYW5naW5nRnJvbVRhYjogYm9vbGVhbjtcclxuICAgIGlzQ2hhbmdpbmdUb1RhYjogYm9vbGVhbjtcclxufVxyXG5cclxuLy8gZ2V0U3RkT3V0XHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHZhciBkID0gZ2V0U3RkT3V0KCk7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuZnVuY3Rpb24gIGdldFN0ZE91dCgpOiBzdHJpbmdbXSB7XHJcbiAgICByZXR1cm4gIHN0ZG91dC5zcGxpdCgnXFxuJyk7XHJcbn1cclxuXHJcbi8vIHByaW50bG5cclxuLy8gI2tleXdvcmQ6IHByaW50bG4sIGNvbnNvbGUubG9nLCBjb25zb2xlTG9nXHJcbi8vIE91dHB1dCBhbnkgdGV4dCB0byBzdGFuZGFyZCBvdXRwdXQuXHJcbmV4cG9ydCBmdW5jdGlvbiAgcHJpbnRsbihtZXNzYWdlOiBhbnksIGRlbGF5ZWRFeHBhbmRpbmc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGlmICh3aXRoSmVzdCAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIHN0ZG91dCArPSBtZXNzYWdlLnRvU3RyaW5nKCkgKyAnXFxuJztcclxuICAgICAgICBwcChtZXNzYWdlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlTG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0ICBjb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbmNvbnNvbGUubG9nID0gcHJpbnRsbjtcclxuXHJcbi8vIGNhbGxNYWluRnJvbUplc3RcclxuLy8gI2tleXdvcmQ6IGNhbGxNYWluRnJvbUplc3RcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBjYWxsTWFpbkZyb21KZXN0KHBhcmFtZXRlcnM/OiBzdHJpbmdbXSwgb3B0aW9ucz86IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xyXG4gICAgd2l0aEplc3QgPSB0cnVlO1xyXG4gICAgc3Rkb3V0ID0gJyc7XHJcbiAgICBpZiAocGFyYW1ldGVycykge1xyXG4gICAgICAgIHByb2dyYW1Bcmd1bWVudHMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ncmFtQXJndW1lbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgIHByb2dyYW1PcHRpb25zID0gb3B0aW9ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZ3JhbU9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBtYWluKCk7XHJcbn1cclxuXHJcbnZhciAgICBsb2NhbGUgPSAnJztcclxudmFyICAgIHdpdGhKZXN0ID0gZmFsc2U7XHJcbmV4cG9ydCB2YXIgIHN0ZG91dCA9ICcnO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtQXJndW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtT3B0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcclxuIl19