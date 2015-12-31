define(["require", "exports", "toastr"], function (require, exports, toastr) {
    (function (LogType) {
        LogType[LogType["Info"] = 0] = "Info";
        LogType[LogType["Success"] = 1] = "Success";
        LogType[LogType["Warn"] = 2] = "Warn";
        LogType[LogType["Error"] = 3] = "Error";
    })(exports.LogType || (exports.LogType = {}));
    var LogType = exports.LogType;
    ;
    var ConsoleLogService = (function () {
        function ConsoleLogService() {
        }
        ConsoleLogService.prototype.getType = function (type) {
            switch (type) {
                case LogType.Info:
                    return "info";
                case LogType.Success:
                    return "success";
                case LogType.Warn:
                    return "warn";
                case LogType.Error:
                    return "error";
            }
            return "log";
        };
        ConsoleLogService.prototype.log = function (msg, type) {
            if (type === void 0) { type = LogType.Info; }
            console[this.getType(type)](msg);
        };
        return ConsoleLogService;
    })();
    exports.ConsoleLogService = ConsoleLogService;
    var ToastrLogService = (function () {
        function ToastrLogService() {
        }
        ToastrLogService.prototype.getType = function (type) {
            switch (type) {
                case LogType.Info:
                    return "info";
                case LogType.Success:
                    return "success";
                case LogType.Warn:
                    return "warning";
                case LogType.Error:
                    return "error";
            }
            return "info";
        };
        ToastrLogService.prototype.log = function (msg, type) {
            if (type === void 0) { type = LogType.Info; }
            toastr[this.getType(type)](msg);
        };
        return ToastrLogService;
    })();
    exports.ToastrLogService = ToastrLogService;
    var LogService = (function () {
        function LogService() {
        }
        LogService.initLogService = function (instance) {
            LogService.instance = instance;
        };
        LogService.log = function (msg, type) {
            LogService.instance.log(msg, type);
        };
        return LogService;
    })();
    exports.LogService = LogService;
});
//# sourceMappingURL=logservice.js.map