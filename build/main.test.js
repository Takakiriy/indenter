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
    ["change YAML tab size 2 to 4 and insert indent", ["24"]],
    ["change YAML tab size 4 to 2 and cut indent", ["42"]],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwyQkFBNkI7QUFDN0IsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3Qix1QkFBeUI7QUFDekIsSUFBTyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO0FBRXhDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUU7SUFDeEMsaUZBQWlGO0lBQ2pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDeEI7QUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ04sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO0lBQzVCLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUNsQixDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQztJQUNuQyxDQUFDLDBDQUEwQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsK0NBQStDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDLDRDQUE0QyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUMsMENBQTBDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDLHVDQUF1QyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3ZELENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBTyxRQUFRLEVBQUUsVUFBVTs7Ozs7Z0JBQ3pCLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFJLFFBQVEsNkJBQTBCLENBQUMsQ0FBQztnQkFDMUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFaEMscUJBQU0sUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsRUFBQTs7Z0JBQTlCLFNBQThCLENBQUM7Z0JBQ3hCLFVBQVUsR0FBRyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7S0FDaEQsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQ3hCLElBQUksQ0FBQyxzQ0FBc0MsRUFBRTtRQUN6QyxJQUFPLGVBQWUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkYsSUFBTyxlQUFlLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hHLGlFQUFpRTtRQUNqRSx3RUFBd0U7UUFFNUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbWFpbiBmcm9tICcuL21haW4nO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIGNsaXBib2FyZHkgZnJvbSAnY2xpcGJvYXJkeSc7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tIFwiLi9saWJcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmNvbnN0ICBjYWxsTWFpbiA9IG1haW4uY2FsbE1haW5Gcm9tSmVzdDtcclxuXHJcbmlmIChwYXRoLmJhc2VuYW1lKHByb2Nlc3MuY3dkKCkpICE9PSAnc3JjJykge1xyXG4gICAgLy8gQmVjYXVzZSB0aGUgc2Vjb25kIGV4ZWN1dGUgb2YgSmVzdCB3YXRjaCBtb2RlIGlzIGluaGVyaXRlZCB0aGUgY3VycmVudCBmb2xkZXIuXHJcbiAgICBwcm9jZXNzLmNoZGlyKCdzcmMnKTtcclxufVxyXG5cclxudGVzdC5lYWNoKFtcclxuICAgIFtcImluc2VydCBpbmRlbnRcIiwgW11dLFxyXG4gICAgW1wiaW5zZXJ0IGxpbmUgMiBpbmRlbnRcIiwgW11dLFxyXG4gICAgW1wiY3V0IGluZGVudFwiLCBbXV0sXHJcbiAgICBbXCJjdXQgaW5kZW50IGF0IHRoZSBsYXN0IGxpbmVcIiwgW11dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiBzaXplIDIgdG8gNCBhbmQgaW5zZXJ0IGluZGVudFwiLCBbXCIyNFwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgdGFiIHNpemUgNCB0byAyIGFuZCBjdXQgaW5kZW50XCIsIFtcIjQyXCJdXSxcclxuICAgIFtcImNoYW5nZSBZQU1MIHRhYiBzaXplIDIgdG8gNCBhbmQgaW5zZXJ0IGluZGVudFwiLCBbXCIyNFwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgWUFNTCB0YWIgc2l6ZSA0IHRvIDIgYW5kIGN1dCBpbmRlbnRcIiwgW1wiNDJcIl1dLFxyXG4gICAgW1wiY2hhbmdlIDIgc3BhY2VzIHRvIHRhYiBhbmQgY3V0IGluZGVudFwiLCBbXCIydFwiXV0sXHJcbiAgICBbXCJjaGFuZ2UgNCBzcGFjZXMgdG8gdGFiIGFuZCBpbnNlcnQgaW5kZW50XCIsIFtcIjR0XCJdXSxcclxuICAgIFtcImNoYW5nZSB0YWIgdG8gMiBzcGFjZXMgYW5kIGN1dCBpbmRlbnRcIiwgW1widDJcIl1dLFxyXG4gICAgW1wiY2hhbmdlIHRhYiB0byA0IHNwYWNlcyBhbmQgaW5zZXJ0IGluZGVudFwiLCBbXCJ0NFwiXV0sXHJcbl0pKFwiJXNcIiwgYXN5bmMgKGNhc2VOYW1lLCBwYXJhbWV0ZXJzKSA9PiB7XHJcbiAgICBjb25zdCAgaW5wdXRUZXh0ID0gbGliLmdldFNuYXBzaG90KGAke2Nhc2VOYW1lfTogMSBzb3VyY2VGaWxlQ29udGVudHMgMWApO1xyXG4gICAgY2xpcGJvYXJkeS53cml0ZVN5bmMoaW5wdXRUZXh0KTtcclxuXHJcbiAgICBhd2FpdCBjYWxsTWFpbihwYXJhbWV0ZXJzLCB7fSk7XHJcbiAgICBjb25zdCAgb3V0cHV0VGV4dCA9IGNsaXBib2FyZHkucmVhZFN5bmMoKTtcclxuICAgIGV4cGVjdChvdXRwdXRUZXh0KS50b01hdGNoU25hcHNob3QoJ2Fuc3dlcicpO1xyXG59KTtcclxuXHJcbmRlc2NyaWJlKFwidGVzdCBvZiB0ZXN0ID4+XCIsICgpID0+IHtcclxuICAgIHRlc3QoXCJjaGVja3Mgc25hcHNob3RzIGZpbGVzIGFyZSBjb25maXJtZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICBhY3RpdmVTbmFwc2hvdHMgPSBmcy5yZWFkRmlsZVN5bmMoJ19fc25hcHNob3RzX18vbWFpbi50ZXN0LnRzLnNuYXAnKS50b1N0cmluZygpO1xyXG4gICAgICAgIGNvbnN0ICBiYWNrVXBTbmFwc2hvdHMgPSBmcy5yZWFkRmlsZVN5bmMoJ19fc25hcHNob3RzX18vbWFpbi50ZXN0LnRzLnNuYXAuY29uZmlybWVkLXRzJykudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgLy8g5ouh5by15a2Q44Gu5pyr5bC+44KSIC5zbmFwIOOBq+OBl+OBquOBhOeQhueUseOBr+OAgUplc3Qg44GM5L2/44Gj44Gm44GE44Gq44GEIC5zbmFwIOODleOCoeOCpOODq+OCkuiHquWLleeahOOBq+WJiumZpOOBl+OCiOOBhuOBqOOBmeOCi+OBi+OCieOBp+OBmVxyXG4gICAgICAgICAgICAvLyBfX19fLnNuYXAuY29uZmlybWVkLXRzIOODleOCoeOCpOODq+OBjOWtmOWcqOOBmeOCi+eQhueUseOBr+OAgUplc3Qg44Gu6Ieq5YuV57eo6ZuG44GM5LqI5pyf44GX44Gq44GE44OH44O844K/44KS6L+95Yqg44GZ44KL44GT44Go44GM44GC44KL44GL44KJ44Gn44GZXHJcblxyXG4gICAgICAgIGV4cGVjdChhY3RpdmVTbmFwc2hvdHMpLnRvQmUoYmFja1VwU25hcHNob3RzKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl19