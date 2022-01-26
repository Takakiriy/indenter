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
var child_process = require("child_process");
var path = require("path");
var clipboardy = require("clipboardy");
var lib = require("./lib");
var scriptPath = "../build/indenter.js";
var testFolderPath = "test_data" + path.sep;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestOfSimpleRun()];
                case 1:
                    _a.sent();
                    console.log('Pass');
                    return [2 /*return*/];
            }
        });
    });
}
// TestOfSimpleRun
function TestOfSimpleRun() {
    return __awaiter(this, void 0, void 0, function () {
        var returns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("TestCase: TestOfSimpleRun");
                    console.log(clipboardy.readSync());
                    return [4 /*yield*/, callChildProccess("node " + scriptPath, {})];
                case 1:
                    // Test Main
                    returns = _a.sent();
                    // Check
                    console.log(clipboardy.readSync());
                    return [2 /*return*/];
            }
        });
    });
}
// callChildProccess
function callChildProccess(commandLine, option) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolveFunction, rejectFunction) { return __awaiter(_this, void 0, void 0, function () {
                    var returnValue, childProcess, _i, _a, inputLine, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                returnValue = new ProcessReturns();
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 8, , 9]);
                                childProcess = child_process.exec(commandLine, 
                                // on close the "childProcess" (2)
                                function (error, stdout, stderr) {
                                    returnValue.stdout = stdout;
                                    returnValue.stderr = stderr;
                                    resolveFunction(returnValue);
                                });
                                if (!(option && childProcess.stdin)) return [3 /*break*/, 7];
                                if (!option.inputLines) return [3 /*break*/, 6];
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                            case 2:
                                _b.sent();
                                _i = 0, _a = option.inputLines;
                                _b.label = 3;
                            case 3:
                                if (!(_i < _a.length)) return [3 /*break*/, 6];
                                inputLine = _a[_i];
                                console.log(inputLine);
                                childProcess.stdin.write(inputLine + "\n");
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 3];
                            case 6:
                                childProcess.stdin.end();
                                _b.label = 7;
                            case 7:
                                // on close the "childProcess" (1)
                                childProcess.on('close', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                childProcess.on('exit', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                return [3 /*break*/, 9];
                            case 8:
                                e_1 = _b.sent();
                                throw Error("Error in the command line " + commandLine);
                            case 9: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// ProcessOption
var ProcessOption = /** @class */ (function () {
    function ProcessOption() {
    }
    return ProcessOption;
}());
// ProcessReturns
var ProcessReturns = /** @class */ (function () {
    function ProcessReturns() {
        this.exitCode = 0;
        this.stdout = '';
        this.stderr = '';
    }
    return ProcessReturns;
}());
var testFolderFullPath = lib.getFullPath("../src/" + testFolderPath, process.cwd());
var cutBOM = 1;
var notFound = -1;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50ZXJfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRlbnRlcl90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLDJCQUE2QjtBQUM3Qix1Q0FBeUM7QUFDekMsMkJBQTZCO0FBRTdCLElBQU8sVUFBVSxHQUFJLHNCQUFzQixDQUFDO0FBQzVDLElBQU8sY0FBYyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBRS9DLFNBQWdCLElBQUk7Ozs7d0JBQ25CLHFCQUFNLGVBQWUsRUFBRSxFQUFBOztvQkFBdkIsU0FBdUIsQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Q0FDcEI7QUFFRCxrQkFBa0I7QUFDbEIsU0FBZ0IsZUFBZTs7Ozs7O29CQUczQixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBR3RCLHFCQUFNLGlCQUFpQixDQUFDLFVBQVEsVUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFBOztvQkFEM0QsWUFBWTtvQkFDWixPQUFPLEdBQUcsU0FBaUQsQ0FBQztvQkFFL0QsUUFBUTtvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUNuQztBQUVELG9CQUFvQjtBQUNwQixTQUFnQixpQkFBaUIsQ0FBQyxXQUFtQixFQUFHLE1BQXNCOzs7O1lBQzdFLHNCQUFTLElBQUksT0FBTyxDQUFFLFVBQU8sZUFBZSxFQUFFLGNBQWM7Ozs7O2dDQUNwRCxXQUFXLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQzs7OztnQ0FFbEMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUUsV0FBVztnQ0FFcEQsa0NBQWtDO2dDQUNsQyxVQUFDLEtBQXlDLEVBQUUsTUFBYyxFQUFFLE1BQWM7b0NBQ3pFLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29DQUM1QixXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQ0FDNUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dDQUM5QixDQUFDLENBQ0QsQ0FBQztxQ0FDRSxDQUFBLE1BQU0sSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFBLEVBQTVCLHdCQUE0QjtxQ0FFM0IsTUFBTSxDQUFDLFVBQVUsRUFBakIsd0JBQWlCO2dDQUNwQixxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQXhCLENBQXdCLENBQUMsRUFBQTs7Z0NBQXRELFNBQXNELENBQUM7c0NBQ2QsRUFBakIsS0FBQSxNQUFNLENBQUMsVUFBVTs7O3FDQUFqQixDQUFBLGNBQWlCLENBQUE7Z0NBQTlCLFNBQVM7Z0NBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0NBQ3ZCLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQztnQ0FDM0MscUJBQU0sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLEVBQUE7O2dDQUF0RCxTQUFzRCxDQUFDOzs7Z0NBSGhDLElBQWlCLENBQUE7OztnQ0FNMUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7O2dDQUcxQixrQ0FBa0M7Z0NBQ2xDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsUUFBZ0I7b0NBQ3pDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dDQUNqQyxDQUFDLENBQUMsQ0FBQztnQ0FDSCxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLFFBQWdCO29DQUN4QyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQ0FDakMsQ0FBQyxDQUFDLENBQUM7Ozs7Z0NBRUgsTUFBTSxLQUFLLENBQUMsK0JBQTZCLFdBQWEsQ0FBQyxDQUFDOzs7O3FCQUV6RCxDQUFDLEVBQUM7OztDQUNIO0FBRUQsZ0JBQWdCO0FBQ2hCO0lBQUE7SUFFQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVELGlCQUFpQjtBQUNqQjtJQUFBO1FBQ0MsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFFRCxJQUFPLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUUsWUFBVSxjQUFnQixFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3hGLElBQU8sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNsQixJQUFPLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyQixJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGNsaXBib2FyZHkgZnJvbSAnY2xpcGJvYXJkeSc7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tICcuL2xpYic7XHJcblxyXG5jb25zdCAgc2NyaXB0UGF0aCA9ICBgLi4vYnVpbGQvaW5kZW50ZXIuanNgO1xyXG5jb25zdCAgdGVzdEZvbGRlclBhdGggPSBgdGVzdF9kYXRhYCArIHBhdGguc2VwO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcblx0YXdhaXQgVGVzdE9mU2ltcGxlUnVuKCk7XHJcblx0Y29uc29sZS5sb2coJ1Bhc3MnKTtcclxufVxyXG5cclxuLy8gVGVzdE9mU2ltcGxlUnVuXHJcbmFzeW5jIGZ1bmN0aW9uICBUZXN0T2ZTaW1wbGVSdW4oKSB7XHJcblx0bGV0ICByZXR1cm5zOiBQcm9jZXNzUmV0dXJucztcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgVGVzdENhc2U6IFRlc3RPZlNpbXBsZVJ1bmApO1xyXG5cdGNvbnNvbGUubG9nKGNsaXBib2FyZHkucmVhZFN5bmMoKSk7XHJcblxyXG4gICAgLy8gVGVzdCBNYWluXHJcbiAgICByZXR1cm5zID0gYXdhaXQgY2FsbENoaWxkUHJvY2Nlc3MoYG5vZGUgJHtzY3JpcHRQYXRofWAsIHt9KTtcclxuXHJcblx0Ly8gQ2hlY2tcclxuXHRjb25zb2xlLmxvZyhjbGlwYm9hcmR5LnJlYWRTeW5jKCkpO1xyXG59XHJcblxyXG4vLyBjYWxsQ2hpbGRQcm9jY2Vzc1xyXG5hc3luYyBmdW5jdGlvbiAgY2FsbENoaWxkUHJvY2Nlc3MoY29tbWFuZExpbmU6IHN0cmluZywgIG9wdGlvbj86IFByb2Nlc3NPcHRpb24pOiBQcm9taXNlPFByb2Nlc3NSZXR1cm5zPiB7XHJcblx0cmV0dXJuICAgbmV3IFByb21pc2UoIGFzeW5jIChyZXNvbHZlRnVuY3Rpb24sIHJlamVjdEZ1bmN0aW9uKSA9PiB7XHJcblx0XHRjb25zdCAgcmV0dXJuVmFsdWUgPSBuZXcgUHJvY2Vzc1JldHVybnMoKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0ICBjaGlsZFByb2Nlc3MgPSBjaGlsZF9wcm9jZXNzLmV4ZWMoIGNvbW1hbmRMaW5lLFxyXG5cclxuXHRcdFx0XHQvLyBvbiBjbG9zZSB0aGUgXCJjaGlsZFByb2Nlc3NcIiAoMilcclxuXHRcdFx0XHQoZXJyb3I6IGNoaWxkX3Byb2Nlc3MuRXhlY0V4Y2VwdGlvbiB8IG51bGwsIHN0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUuc3Rkb3V0ID0gc3Rkb3V0O1xyXG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUuc3RkZXJyID0gc3RkZXJyO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZUZ1bmN0aW9uKHJldHVyblZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChvcHRpb24gJiYgY2hpbGRQcm9jZXNzLnN0ZGluKSB7XHJcblxyXG5cdFx0XHRcdGlmIChvcHRpb24uaW5wdXRMaW5lcykge1xyXG5cdFx0XHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMCkpO1xyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBpbnB1dExpbmUgb2Ygb3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaW5wdXRMaW5lKTtcclxuXHRcdFx0XHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGluLndyaXRlKGlucHV0TGluZSArIFwiXFxuXCIpO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRpbi5lbmQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gb24gY2xvc2UgdGhlIFwiY2hpbGRQcm9jZXNzXCIgKDEpXHJcblx0XHRcdGNoaWxkUHJvY2Vzcy5vbignY2xvc2UnLCAoZXhpdENvZGU6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHJldHVyblZhbHVlLmV4aXRDb2RlID0gZXhpdENvZGU7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjaGlsZFByb2Nlc3Mub24oJ2V4aXQnLCAoZXhpdENvZGU6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHJldHVyblZhbHVlLmV4aXRDb2RlID0gZXhpdENvZGU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHR0aHJvdyBFcnJvcihgRXJyb3IgaW4gdGhlIGNvbW1hbmQgbGluZSAke2NvbW1hbmRMaW5lfWApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBQcm9jZXNzT3B0aW9uXHJcbmNsYXNzIFByb2Nlc3NPcHRpb24ge1xyXG5cdGlucHV0TGluZXM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuLy8gUHJvY2Vzc1JldHVybnNcclxuY2xhc3MgUHJvY2Vzc1JldHVybnMge1xyXG5cdGV4aXRDb2RlOiBudW1iZXIgPSAwO1xyXG5cdHN0ZG91dDogc3RyaW5nID0gJyc7XHJcblx0c3RkZXJyOiBzdHJpbmcgPSAnJztcclxufVxyXG5cclxuY29uc3QgIHRlc3RGb2xkZXJGdWxsUGF0aCA9IGxpYi5nZXRGdWxsUGF0aCggYC4uL3NyYy8ke3Rlc3RGb2xkZXJQYXRofWAsIHByb2Nlc3MuY3dkKCkpO1xyXG5jb25zdCAgY3V0Qk9NID0gMTtcclxuY29uc3QgIG5vdEZvdW5kID0gLTE7XHJcbm1haW4oKTtcclxuIl19