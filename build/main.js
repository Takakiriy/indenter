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
        var inputText, lines, nullLength, indentRegularExpression, minIndentLength, _i, lines_1, line, indentLength, firstLineIndent, lineNum, d, lineNum, outputText;
        return __generator(this, function (_a) {
            inputText = clipboardy.readSync();
            lines = inputText.split('\n');
            nullLength = 9999;
            indentRegularExpression = /^( |¥t)*/;
            if (inputText.trim() === '') {
                return [2 /*return*/];
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
                // insert indent
                for (lineNum = 2; lineNum < lines.length; lineNum += 1) {
                    d = lib_1.pp(lineNum);
                    lib_1.pp(lines[lineNum - 1]);
                    if (lines[lineNum - 1] !== '') {
                        lines[lineNum - 1] = firstLineIndent + lines[lineNum - 1];
                    }
                    lib_1.pp(lines[lineNum - 1]);
                }
            }
            else {
                // cut indent
                for (lineNum = 1; lineNum < lines.length; lineNum += 1) {
                    lines[lineNum - 1] = lines[lineNum - 1].substr(minIndentLength);
                }
            }
            outputText = lines.join('\n');
            clipboardy.writeSync(outputText);
            return [2 /*return*/];
        });
    });
}
exports.main = main;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QztBQUV6Qyw2QkFBMkI7QUFFM0IsT0FBTztBQUNQLFNBQXVCLElBQUk7Ozs7WUFFaEIsU0FBUyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLHVCQUF1QixHQUFHLFVBQVUsQ0FBQztZQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLHNCQUFPO2FBQ1Y7WUFDSSxlQUFlLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLFdBQXdCLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxFQUFFO2dCQUFmLElBQUk7Z0JBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUNiLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN0RSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUE7aUJBQzVEO2FBQ0o7WUFDTSxlQUFlLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLElBQUksZUFBZSxLQUFLLFVBQVUsRUFBRTtnQkFDaEMsc0JBQU87YUFDVjtZQUVELElBQUksZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBRTFDLGdCQUFnQjtnQkFDaEIsS0FBUyxPQUFPLEdBQUcsQ0FBQyxFQUFH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QWMsR0FBeUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2xpcGJvYXJkeSBmcm9tICdjbGlwYm9hcmR5JztcclxuaW1wb3J0ICogYXMgbGliIGZyb20gXCIuL2xpYlwiO1xyXG5pbXBvcnQgeyBwcCB9IGZyb20gXCIuL2xpYlwiO1xyXG5cclxuLy8gbWFpblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcblxyXG4gICAgY29uc3QgIGlucHV0VGV4dCA9IGNsaXBib2FyZHkucmVhZFN5bmMoKTtcclxuICAgIGNvbnN0ICBsaW5lcyA9IGlucHV0VGV4dC5zcGxpdCgnXFxuJyk7XHJcbiAgICBjb25zdCAgbnVsbExlbmd0aCA9IDk5OTk7XHJcbiAgICBjb25zdCAgaW5kZW50UmVndWxhckV4cHJlc3Npb24gPSAvXiggfMKldCkqLztcclxuICAgIGlmIChpbnB1dFRleHQudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciAgbWluSW5kZW50TGVuZ3RoID0gbnVsbExlbmd0aDtcclxuICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xyXG4gICAgICAgIGlmIChsaW5lLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgY29uc3QgIGluZGVudExlbmd0aCA9IGluZGVudFJlZ3VsYXJFeHByZXNzaW9uLmV4ZWMoIGxpbmUgKSFbMF0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBtaW5JbmRlbnRMZW5ndGggPSBNYXRoLm1pbihtaW5JbmRlbnRMZW5ndGgsIGluZGVudExlbmd0aClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCAgZmlyc3RMaW5lSW5kZW50ID0gaW5kZW50UmVndWxhckV4cHJlc3Npb24uZXhlYyggbGluZXNbMF0gKSFbMF07XHJcbiAgICBpZiAobWluSW5kZW50TGVuZ3RoID09PSBudWxsTGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtaW5JbmRlbnRMZW5ndGggPCBmaXJzdExpbmVJbmRlbnQubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgIC8vIGluc2VydCBpbmRlbnRcclxuICAgICAgICBmb3IgKHZhciBsaW5lTnVtID0gMjsgIGxpbmVOdW0gPCBsaW5lcy5sZW5ndGg7ICBsaW5lTnVtICs9IDEgKSB7XHJcbnZhciBkID0gcHAobGluZU51bSlcclxucHAobGluZXNbbGluZU51bSAtIDFdKVxyXG4gICAgICAgICAgICBpZiAobGluZXNbbGluZU51bSAtIDFdICE9PSAnJykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxpbmVzW2xpbmVOdW0gLSAxXSA9IGZpcnN0TGluZUluZGVudCArIGxpbmVzW2xpbmVOdW0gLSAxXTtcclxuICAgICAgICAgICAgfVxyXG5wcChsaW5lc1tsaW5lTnVtIC0gMV0pXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gY3V0IGluZGVudFxyXG4gICAgICAgIGZvciAodmFyIGxpbmVOdW0gPSAxOyAgbGluZU51bSA8IGxpbmVzLmxlbmd0aDsgIGxpbmVOdW0gKz0gMSApIHtcclxuICAgICAgICAgICAgbGluZXNbbGluZU51bSAtIDFdID0gbGluZXNbbGluZU51bSAtIDFdLnN1YnN0cihtaW5JbmRlbnRMZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCAgb3V0cHV0VGV4dCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xyXG4gICAgY2xpcGJvYXJkeS53cml0ZVN5bmMob3V0cHV0VGV4dCk7XHJcbn1cclxuXHJcblxyXG4vLyBnZXRTdGRPdXRcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgdmFyIGQgPSBnZXRTdGRPdXQoKTsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgZFxyXG5mdW5jdGlvbiAgZ2V0U3RkT3V0KCk6IHN0cmluZ1tdIHtcclxuICAgIHJldHVybiAgc3Rkb3V0LnNwbGl0KCdcXG4nKTtcclxufVxyXG5cclxuLy8gcHJpbnRsblxyXG4vLyAja2V5d29yZDogcHJpbnRsbiwgY29uc29sZS5sb2csIGNvbnNvbGVMb2dcclxuLy8gT3V0cHV0IGFueSB0ZXh0IHRvIHN0YW5kYXJkIG91dHB1dC5cclxuZXhwb3J0IGZ1bmN0aW9uICBwcmludGxuKG1lc3NhZ2U6IGFueSwgZGVsYXllZEV4cGFuZGluZzogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnICYmICFkZWxheWVkRXhwYW5kaW5nKSB7XHJcbiAgICAgICAgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gICAgaWYgKHdpdGhKZXN0ICYmICFkZWxheWVkRXhwYW5kaW5nKSB7XHJcbiAgICAgICAgc3Rkb3V0ICs9IG1lc3NhZ2UudG9TdHJpbmcoKSArICdcXG4nO1xyXG4gICAgICAgIHBwKG1lc3NhZ2UudG9TdHJpbmcoKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGVMb2cobWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgIGNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcclxuY29uc29sZS5sb2cgPSBwcmludGxuO1xyXG5cclxuLy8gY2FsbE1haW5Gcm9tSmVzdFxyXG4vLyAja2V5d29yZDogY2FsbE1haW5Gcm9tSmVzdFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGNhbGxNYWluRnJvbUplc3QocGFyYW1ldGVycz86IHN0cmluZ1tdLCBvcHRpb25zPzoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9KSB7XHJcbiAgICB3aXRoSmVzdCA9IHRydWU7XHJcbiAgICBzdGRvdXQgPSAnJztcclxuICAgIGlmIChwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgcHJvZ3JhbUFyZ3VtZW50cyA9IHBhcmFtZXRlcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByb2dyYW1Bcmd1bWVudHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgcHJvZ3JhbU9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ncmFtT3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IG1haW4oKTtcclxufVxyXG5cclxudmFyICAgIGxvY2FsZSA9ICcnO1xyXG52YXIgICAgd2l0aEplc3QgPSBmYWxzZTtcclxuZXhwb3J0IHZhciAgc3Rkb3V0ID0gJyc7XHJcbmV4cG9ydCB2YXIgIHByb2dyYW1Bcmd1bWVudHM6IHN0cmluZ1tdID0gW107XHJcbmV4cG9ydCB2YXIgIHByb2dyYW1PcHRpb25zOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xyXG4iXX0=