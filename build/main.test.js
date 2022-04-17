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
    ["cut indent in the YAML", []],
    ["change tab size 2 to 4 and insert indent", ["24"]],
    ["change tab size 4 to 2 and cut indent", ["42"]],
    ["change tab size 2 to 4 and insert indent 6", ["24", "6"]],
    ["change YAML tab size 2 to 4 and insert indent", ["24"]],
    ["change YAML tab size 4 to 2 and cut indent", ["42"]],
    ["change 2 spaces to tab and cut indent", ["2t"]],
    ["change 4 spaces to tab and insert indent", ["4t"]],
    ["change tab to 2 spaces and cut indent", ["t2"]],
    ["change tab to 4 spaces and insert indent", ["t4"]],
    ["bug case 1 of tab size 4 to 2", ["42", "0"]],
    ["bug case 2 of tab size 4 to 2", ["42"]],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwyQkFBNkI7QUFDN0IsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsSUFBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBRXhDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUU7SUFDeEMsaUZBQWlGO0lBQ2pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEI7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ04sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0lBQzVCLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUNsQixDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQztJQUNuQyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztJQUM5QixDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQywrQ0FBK0MsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUMsNENBQTRDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDLHVDQUF1QyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUMsdUNBQXVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDLCtCQUErQixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7Q0FDNUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFPLFFBQVEsRUFBRSxVQUFVOzs7OztnQkFDekIsU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUksUUFBUSw2QkFBMEIsQ0FBQyxDQUFDO2dCQUMxRSxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVoQyxxQkFBTSxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFBOztnQkFBOUIsU0FBOEIsQ0FBQztnQkFDeEIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztLQUNoRCxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFDeEIsSUFBSSxDQUFDLHNDQUFzQyxFQUFFO1FBQ3pDLElBQU8sZUFBZSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RixJQUFPLGVBQWUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLDhDQUE4QyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEcsaUVBQWlFO1FBQ2pFLHdFQUF3RTtRQUU1RSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBtYWluIGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgY2xpcGJvYXJkeSBmcm9tICdjbGlwYm9hcmR5JztcclxuaW1wb3J0ICogYXMgbGliIGZyb20gXCIuL2xpYlwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuY29uc3QgIGNhbGxNYWluID0gbWFpbi5jYWxsTWFpbkZyb21KZXN0O1xyXG5cclxuaWYgKHBhdGguYmFzZW5hbWUocHJvY2Vzcy5jd2QoKSkgIT09ICdzcmMnKSB7XHJcbiAgICAvLyBCZWNhdXNlIHRoZSBzZWNvbmQgZXhlY3V0ZSBvZiBKZXN0IHdhdGNoIG1vZGUgaXMgaW5oZXJpdGVkIHRoZSBjdXJyZW50IGZvbGRlci5cclxuICAgIHByb2Nlc3MuY2hkaXIoJ3NyYycpO1xyXG59XHJcblxyXG50ZXN0LmVhY2goW1xyXG4gICAgW1wiaW5zZXJ0IGluZGVudFwiLCBbXV0sXHJcbiAgICBbXCJpbnNlcnQgbGluZSAyIGluZGVudFwiLCBbXV0sXHJcbiAgICBbXCJjdXQgaW5kZW50XCIsIFtdXSxcclxuICAgIFtcImN1dCBpbmRlbnQgYXQgdGhlIGxhc3QgbGluZVwiLCBbXV0sXHJcbiAgICBbXCJjdXQgaW5kZW50IGluIHRoZSBZQU1MXCIsIFtdXSxcclxuICAgIFtcImNoYW5nZSB0YWIgc2l6ZSAyIHRvIDQgYW5kIGluc2VydCBpbmRlbnRcIiwgW1wiMjRcIl1dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiBzaXplIDQgdG8gMiBhbmQgY3V0IGluZGVudFwiLCBbXCI0MlwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgdGFiIHNpemUgMiB0byA0IGFuZCBpbnNlcnQgaW5kZW50IDZcIiwgW1wiMjRcIiwgXCI2XCJdXSxcclxuICAgIFtcImNoYW5nZSBZQU1MIHRhYiBzaXplIDIgdG8gNCBhbmQgaW5zZXJ0IGluZGVudFwiLCBbXCIyNFwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgWUFNTCB0YWIgc2l6ZSA0IHRvIDIgYW5kIGN1dCBpbmRlbnRcIiwgW1wiNDJcIl1dLFxyXG4gICAgW1wiY2hhbmdlIDIgc3BhY2VzIHRvIHRhYiBhbmQgY3V0IGluZGVudFwiLCBbXCIydFwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgNCBzcGFjZXMgdG8gdGFiIGFuZCBpbnNlcnQgaW5kZW50XCIsIFtcIjR0XCJdXSxcclxuICAgIFtcImNoYW5nZSB0YWIgdG8gMiBzcGFjZXMgYW5kIGN1dCBpbmRlbnRcIiwgW1widDJcIl1dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiB0byA0IHNwYWNlcyBhbmQgaW5zZXJ0IGluZGVudFwiLCBbXCJ0NFwiXV0sXHJcbiAgICBbXCJidWcgY2FzZSAxIG9mIHRhYiBzaXplIDQgdG8gMlwiLCBbXCI0MlwiLCBcIjBcIl1dLFxyXG4gICAgW1wiYnVnIGNhc2UgMiBvZiB0YWIgc2l6ZSA0IHRvIDJcIiwgW1wiNDJcIl1dLFxyXG5dKShcIiVzXCIsIGFzeW5jIChjYXNlTmFtZSwgcGFyYW1ldGVycykgPT4ge1xyXG4gICAgY29uc3QgIGlucHV0VGV4dCA9IGxpYi5nZXRTbmFwc2hvdChgJHtjYXNlTmFtZX06IDEgc291cmNlRmlsZUNvbnRlbnRzIDFgKTtcclxuICAgIGNsaXBib2FyZHkud3JpdGVTeW5jKGlucHV0VGV4dCk7XHJcblxyXG4gICAgYXdhaXQgY2FsbE1haW4ocGFyYW1ldGVycywge30pO1xyXG4gICAgY29uc3QgIG91dHB1dFRleHQgPSBjbGlwYm9hcmR5LnJlYWRTeW5jKCk7XHJcbiAgICBleHBlY3Qob3V0cHV0VGV4dCkudG9NYXRjaFNuYXBzaG90KCdhbnN3ZXInKTtcclxufSk7XHJcblxyXG5kZXNjcmliZShcInRlc3Qgb2YgdGVzdCA+PlwiLCAoKSA9PiB7XHJcbiAgICB0ZXN0KFwiY2hlY2tzIHNuYXBzaG90cyBmaWxlcyBhcmUgY29uZmlybWVkXCIsICgpID0+IHtcclxuICAgICAgICBjb25zdCAgYWN0aXZlU25hcHNob3RzID0gZnMucmVhZEZpbGVTeW5jKCdfX3NuYXBzaG90c19fL21haW4udGVzdC50cy5zbmFwJykudG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCAgYmFja1VwU25hcHNob3RzID0gZnMucmVhZEZpbGVTeW5jKCdfX3NuYXBzaG90c19fL21haW4udGVzdC50cy5zbmFwLmNvbmZpcm1lZC10cycpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIC8vIOaLoeW8teWtkOOBruacq+WwvuOCkiAuc25hcCDjgavjgZfjgarjgYTnkIbnlLHjga/jgIFKZXN0IOOBjOS9v+OBo+OBpuOBhOOBquOBhCAuc25hcCDjg5XjgqHjgqTjg6vjgpLoh6rli5XnmoTjgavliYrpmaTjgZfjgojjgYbjgajjgZnjgovjgYvjgonjgafjgZlcclxuICAgICAgICAgICAgLy8gX19fXy5zbmFwLmNvbmZpcm1lZC10cyDjg5XjgqHjgqTjg6vjgYzlrZjlnKjjgZnjgovnkIbnlLHjga/jgIFKZXN0IOOBruiHquWLlee3qOmbhuOBjOS6iOacn+OBl+OBquOBhOODh+ODvOOCv+OCkui/veWKoOOBmeOCi+OBk+OBqOOBjOOBguOCi+OBi+OCieOBp+OBmVxyXG5cclxuICAgICAgICBleHBlY3QoYWN0aXZlU25hcHNob3RzKS50b0JlKGJhY2tVcFNuYXBzaG90cyk7XHJcbiAgICB9KTtcclxufSk7XHJcbiJdfQ==