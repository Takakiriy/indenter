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
var callMain = main.callMainFromJest;
if (path.basename(process.cwd()) !== 'src') {
    // Because the second execute of Jest watch mode is inherited the current folder.
    process.chdir('src');
}
test.each([
    ["insert indent"],
    ["insert line 2 indent"],
    ["cut indent"],
])("%s", function (caseName) { return __awaiter(void 0, void 0, void 0, function () {
    var inputText, outputText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputText = lib.getSnapshot(caseName + ": 1 sourceFileContents 1");
                clipboardy.writeSync(inputText);
                return [4 /*yield*/, callMain([], {})];
            case 1:
                _a.sent();
                outputText = clipboardy.readSync();
                expect(outputText).toMatchSnapshot('answer');
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQiwyQkFBNkI7QUFDN0IsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3QixJQUFPLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7QUFFeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRTtJQUN4QyxpRkFBaUY7SUFDakYsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUN4QjtBQUVELElBQUksQ0FBQyxJQUFJLENBQUM7SUFDTixDQUFDLGVBQWUsQ0FBQztJQUNqQixDQUFDLHNCQUFzQixDQUFDO0lBQ3hCLENBQUMsWUFBWSxDQUFDO0NBQ2pCLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBTyxRQUFROzs7OztnQkFDYixTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBSSxRQUFRLDZCQUEwQixDQUFDLENBQUM7Z0JBQzFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWhDLHFCQUFNLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUE7O2dCQUF0QixTQUFzQixDQUFDO2dCQUNoQixVQUFVLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUMxQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O0tBQ2hELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIG1haW4gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBjbGlwYm9hcmR5IGZyb20gJ2NsaXBib2FyZHknO1xyXG5pbXBvcnQgKiBhcyBsaWIgZnJvbSBcIi4vbGliXCI7XHJcbmNvbnN0ICBjYWxsTWFpbiA9IG1haW4uY2FsbE1haW5Gcm9tSmVzdDtcclxuXHJcbmlmIChwYXRoLmJhc2VuYW1lKHByb2Nlc3MuY3dkKCkpICE9PSAnc3JjJykge1xyXG4gICAgLy8gQmVjYXVzZSB0aGUgc2Vjb25kIGV4ZWN1dGUgb2YgSmVzdCB3YXRjaCBtb2RlIGlzIGluaGVyaXRlZCB0aGUgY3VycmVudCBmb2xkZXIuXHJcbiAgICBwcm9jZXNzLmNoZGlyKCdzcmMnKTtcclxufVxyXG5cclxudGVzdC5lYWNoKFtcclxuICAgIFtcImluc2VydCBpbmRlbnRcIl0sXHJcbiAgICBbXCJpbnNlcnQgbGluZSAyIGluZGVudFwiXSxcclxuICAgIFtcImN1dCBpbmRlbnRcIl0sXHJcbl0pKFwiJXNcIiwgYXN5bmMgKGNhc2VOYW1lKSA9PiB7XHJcbiAgICBjb25zdCAgaW5wdXRUZXh0ID0gbGliLmdldFNuYXBzaG90KGAke2Nhc2VOYW1lfTogMSBzb3VyY2VGaWxlQ29udGVudHMgMWApO1xyXG4gICAgY2xpcGJvYXJkeS53cml0ZVN5bmMoaW5wdXRUZXh0KTtcclxuXHJcbiAgICBhd2FpdCBjYWxsTWFpbihbXSwge30pO1xyXG4gICAgY29uc3QgIG91dHB1dFRleHQgPSBjbGlwYm9hcmR5LnJlYWRTeW5jKCk7XHJcbiAgICBleHBlY3Qob3V0cHV0VGV4dCkudG9NYXRjaFNuYXBzaG90KCdhbnN3ZXInKTtcclxufSk7XHJcbiJdfQ==