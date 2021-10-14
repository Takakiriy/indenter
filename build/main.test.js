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
var main = require("./main");
var path = require("path");
var clipboardy = require("clipboardy");
var lib = require("./lib");
var fs = require("fs");
var callMain = main.callMainFromJest;
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
    ["change 2 spaces to tab and cut indent", ["2t"]],
    ["change 4 spaces to tab and insert indent", ["4t"]],
    ["change tab to 2 spaces and cut indent", ["t2"]],
    ["change tab to 4 spaces and insert indent", ["t4"]],
])("%s", function (caseName, parameters) { return __awaiter(void 0, void 0, void 0, function () {
    var inputText, outputText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputText = lib.getSnapshot(caseName + ": 1 sourceFileContents 1");
                clipboardy.writeSync(inputText);
                return [4 /*yield*/, callMain(parameters, {})];
            case 1:
                _a.sent();
                outputText = clipboardy.readSync();
                expect(outputText).toMatchSnapshot('answer');
                return [2 /*return*/];
        }
    });
}); });
describe("test of test >>", function () {
    test("checks snapshots files are confirmed", function () {
        var activeSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap').toString();
        var backUpSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap.confirmed-ts').toString();
        // 拡張子の末尾を .snap にしない理由は、Jest が使っていない .snap ファイルを自動的に削除しようとするからです
        // ____.snap.confirmed-ts ファイルが存在する理由は、Jest の自動編集が予期しないデータを追加することがあるからです
        expect(activeSnapshots).toBe(backUpSnapshots);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwyQkFBNkI7QUFDN0IsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsSUFBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBRXhDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUU7SUFDeEMsaUZBQWlGO0lBQ2pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEI7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ04sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0lBQzVCLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUNsQixDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQztJQUNuQyxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsdUNBQXVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsMENBQTBDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUN2RCxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQU8sUUFBUSxFQUFFLFVBQVU7Ozs7O2dCQUN6QixTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBSSxRQUFRLDZCQUEwQixDQUFDLENBQUM7Z0JBQzFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWhDLHFCQUFNLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEVBQUE7O2dCQUE5QixTQUE4QixDQUFDO2dCQUN4QixVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O0tBQ2hELENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUN4QixJQUFJLENBQUMsc0NBQXNDLEVBQUU7UUFDekMsSUFBTyxlQUFlLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZGLElBQU8sZUFBZSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsOENBQThDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoRyxpRUFBaUU7UUFDakUsd0VBQXdFO1FBRTVFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1haW4gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBjbGlwYm9hcmR5IGZyb20gJ2NsaXBib2FyZHknO1xyXG5pbXBvcnQgKiBhcyBsaWIgZnJvbSBcIi4vbGliXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5jb25zdCAgY2FsbE1haW4gPSBtYWluLmNhbGxNYWluRnJvbUplc3Q7XHJcblxyXG5pZiAocGF0aC5iYXNlbmFtZShwcm9jZXNzLmN3ZCgpKSAhPT0gJ3NyYycpIHtcclxuICAgIC8vIEJlY2F1c2UgdGhlIHNlY29uZCBleGVjdXRlIG9mIEplc3Qgd2F0Y2ggbW9kZSBpcyBpbmhlcml0ZWQgdGhlIGN1cnJlbnQgZm9sZGVyLlxyXG4gICAgcHJvY2Vzcy5jaGRpcignc3JjJyk7XHJcbn1cclxuXHJcbnRlc3QuZWFjaChbXHJcbiAgICBbXCJpbnNlcnQgaW5kZW50XCIsIFtdXSxcclxuICAgIFtcImluc2VydCBsaW5lIDIgaW5kZW50XCIsIFtdXSxcclxuICAgIFtcImN1dCBpbmRlbnRcIiwgW11dLFxyXG4gICAgW1wiY3V0IGluZGVudCBhdCB0aGUgbGFzdCBsaW5lXCIsIFtdXSxcclxuICAgIFtcImNoYW5nZSB0YWIgc2l6ZSAyIHRvIDQgYW5kIGluc2VydCBpbmRlbnRcIiwgW1wiMjRcIl1dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiBzaXplIDQgdG8gMiBhbmQgY3V0IGluZGVudFwiLCBbXCI0MlwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgMiBzcGFjZXMgdG8gdGFiIGFuZCBjdXQgaW5kZW50XCIsIFtcIjJ0XCJdXSxcclxuICAgIFtcImNoYW5nZSA0IHNwYWNlcyB0byB0YWIgYW5kIGluc2VydCBpbmRlbnRcIiwgW1wiNHRcIl1dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiB0byAyIHNwYWNlcyBhbmQgY3V0IGluZGVudFwiLCBbXCJ0MlwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgdGFiIHRvIDQgc3BhY2VzIGFuZCBpbnNlcnQgaW5kZW50XCIsIFtcInQ0XCJdXSxcclxuXSkoXCIlc1wiLCBhc3luYyAoY2FzZU5hbWUsIHBhcmFtZXRlcnMpID0+IHtcclxuICAgIGNvbnN0ICBpbnB1dFRleHQgPSBsaWIuZ2V0U25hcHNob3QoYCR7Y2FzZU5hbWV9OiAxIHNvdXJjZUZpbGVDb250ZW50cyAxYCk7XHJcbiAgICBjbGlwYm9hcmR5LndyaXRlU3luYyhpbnB1dFRleHQpO1xyXG5cclxuICAgIGF3YWl0IGNhbGxNYWluKHBhcmFtZXRlcnMsIHt9KTtcclxuICAgIGNvbnN0ICBvdXRwdXRUZXh0ID0gY2xpcGJvYXJkeS5yZWFkU3luYygpO1xyXG4gICAgZXhwZWN0KG91dHB1dFRleHQpLnRvTWF0Y2hTbmFwc2hvdCgnYW5zd2VyJyk7XHJcbn0pO1xyXG5cclxuZGVzY3JpYmUoXCJ0ZXN0IG9mIHRlc3QgPj5cIiwgKCkgPT4ge1xyXG4gICAgdGVzdChcImNoZWNrcyBzbmFwc2hvdHMgZmlsZXMgYXJlIGNvbmZpcm1lZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgIGFjdGl2ZVNuYXBzaG90cyA9IGZzLnJlYWRGaWxlU3luYygnX19zbmFwc2hvdHNfXy9tYWluLnRlc3QudHMuc25hcCcpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgIGJhY2tVcFNuYXBzaG90cyA9IGZzLnJlYWRGaWxlU3luYygnX19zbmFwc2hvdHNfXy9tYWluLnRlc3QudHMuc25hcC5jb25maXJtZWQtdHMnKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAvLyDmi6HlvLXlrZDjga7mnKvlsL7jgpIgLnNuYXAg44Gr44GX44Gq44GE55CG55Sx44Gv44CBSmVzdCDjgYzkvb/jgaPjgabjgYTjgarjgYQgLnNuYXAg44OV44Kh44Kk44Or44KS6Ieq5YuV55qE44Gr5YmK6Zmk44GX44KI44GG44Go44GZ44KL44GL44KJ44Gn44GZXHJcbiAgICAgICAgICAgIC8vIF9fX18uc25hcC5jb25maXJtZWQtdHMg44OV44Kh44Kk44Or44GM5a2Y5Zyo44GZ44KL55CG55Sx44Gv44CBSmVzdCDjga7oh6rli5Xnt6jpm4bjgYzkuojmnJ/jgZfjgarjgYTjg4fjg7zjgr/jgpLov73liqDjgZnjgovjgZPjgajjgYzjgYLjgovjgYvjgonjgafjgZlcclxuXHJcbiAgICAgICAgZXhwZWN0KGFjdGl2ZVNuYXBzaG90cykudG9CZShiYWNrVXBTbmFwc2hvdHMpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iXX0=