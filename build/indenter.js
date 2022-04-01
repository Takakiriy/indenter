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
var commander = require("commander");
var main = require("./main");
var lib = require("./lib");
function exitFromCommander(e) {
    if (e.code !== 'commander.version') {
        console.log(e.message);
    }
}
function callMain() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, arg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commander.program.version('0.2.1').exitOverride(exitFromCommander)
                        .exitOverride(exitFromCommander)
                        .option("-l, --locale <s>")
                        .option("-t, --test")
                        .option("-c, --command <s>")
                        .option("-i, --input")
                        .parse(process.argv);
                    for (_i = 0, _a = commander.program.args; _i < _a.length; _i++) {
                        arg = _a[_i];
                        main.programArguments.push(arg);
                    }
                    Object.assign(main.programOptions, commander.program.opts());
                    return [4 /*yield*/, main.main()["catch"](function (e) {
                            if (main.programOptions.test) {
                                throw e;
                            }
                            else {
                                console.log("ERROR: " + e.message);
                                var timeOver = new Date();
                                timeOver.setSeconds(timeOver.getSeconds() + 1);
                                while ((new Date()).getTime() < timeOver.getTime()) {
                                }
                            }
                        })["finally"](function () {
                            lib.getInputObject().close();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
callMain();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsNkJBQStCO0FBQy9CLDJCQUE2QjtBQUU3QixTQUFVLGlCQUFpQixDQUFDLENBQTJCO0lBQ25ELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxtQkFBbUIsRUFBRTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUM7QUFDRCxTQUFnQixRQUFROzs7Ozs7b0JBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDN0QsWUFBWSxDQUFDLGlCQUFpQixDQUFDO3lCQUMvQixNQUFNLENBQUMsa0JBQWtCLENBQUM7eUJBQzFCLE1BQU0sQ0FBQyxZQUFZLENBQUM7eUJBQ3BCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzt5QkFDM0IsTUFBTSxDQUFDLGFBQWEsQ0FBQzt5QkFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFekIsV0FBd0MsRUFBdEIsS0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBdEIsY0FBc0IsRUFBdEIsSUFBc0IsRUFBRTt3QkFBL0IsR0FBRzt3QkFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUU3RCxxQkFBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQ2IsT0FBSyxDQUFBLENBQUUsVUFBQyxDQUFDOzRCQUNOLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Z0NBQzFCLE1BQU0sQ0FBQyxDQUFDOzZCQUNYO2lDQUFNO2dDQUVILE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBVSxDQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7Z0NBQ3JDLElBQU8sUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO2dDQUVqRCxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtpQ0FDbkQ7NkJBQ0o7d0JBQ0wsQ0FBQyxDQUFDLENBQ0QsU0FBTyxDQUFBLENBQUM7NEJBQ0wsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNqQyxDQUFDLENBQUMsRUFBQTs7b0JBaEJOLFNBZ0JNLENBQUM7Ozs7O0NBQ1Y7QUFDRCxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyBtYWluIGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tICcuL2xpYic7XHJcblxyXG5mdW5jdGlvbiAgZXhpdEZyb21Db21tYW5kZXIoZTogY29tbWFuZGVyLkNvbW1hbmRlckVycm9yKSB7XHJcbiAgICBpZiAoZS5jb2RlICE9PSAnY29tbWFuZGVyLnZlcnNpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5hc3luYyBmdW5jdGlvbiAgY2FsbE1haW4oKSB7XHJcbiAgICBjb21tYW5kZXIucHJvZ3JhbS52ZXJzaW9uKCcwLjIuMScpLmV4aXRPdmVycmlkZShleGl0RnJvbUNvbW1hbmRlcilcclxuICAgICAgICAuZXhpdE92ZXJyaWRlKGV4aXRGcm9tQ29tbWFuZGVyKVxyXG4gICAgICAgIC5vcHRpb24oXCItbCwgLS1sb2NhbGUgPHM+XCIpXHJcbiAgICAgICAgLm9wdGlvbihcIi10LCAtLXRlc3RcIilcclxuICAgICAgICAub3B0aW9uKFwiLWMsIC0tY29tbWFuZCA8cz5cIilcclxuICAgICAgICAub3B0aW9uKFwiLWksIC0taW5wdXRcIilcclxuICAgICAgICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBjb21tYW5kZXIucHJvZ3JhbS5hcmdzKSB7XHJcbiAgICAgICAgbWFpbi5wcm9ncmFtQXJndW1lbnRzLnB1c2goYXJnKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5hc3NpZ24obWFpbi5wcm9ncmFtT3B0aW9ucywgY29tbWFuZGVyLnByb2dyYW0ub3B0cygpKTtcclxuXHJcbiAgICBhd2FpdCAgbWFpbi5tYWluKClcclxuICAgICAgICAuY2F0Y2goIChlKT0+e1xyXG4gICAgICAgICAgICBpZiAobWFpbi5wcm9ncmFtT3B0aW9ucy50ZXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBgRVJST1I6ICR7ZS5tZXNzYWdlfWAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICB0aW1lT3ZlciA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lT3Zlci5zZXRTZWNvbmRzKCB0aW1lT3Zlci5nZXRTZWNvbmRzKCkgKyAxICk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgPCB0aW1lT3Zlci5nZXRUaW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmZpbmFsbHkoKCk9PntcclxuICAgICAgICAgICAgbGliLmdldElucHV0T2JqZWN0KCkuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxufVxyXG5jYWxsTWFpbigpO1xyXG4iXX0=