import toastr = require("toastr");

export enum LogType { Info, Success, Warn, Error };

export interface ILogService {
    log(msg: string, type: LogType): void;
    getType(type: LogType): string;
}

export class ConsoleLogService implements ILogService {
    getType(type: LogType): string {
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
    }
    log(msg: string, type: LogType = LogType.Info): void {
        console[this.getType(type)](msg);
    }
}

export class ToastrLogService implements ILogService {
    getType(type: LogType): string {
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
    }

    log(msg: string, type: LogType = LogType.Info): void {
        toastr[this.getType(type)](msg);
    }
}

export class LogService {
    static instance: ILogService;
    static initLogService(instance: ILogService) {
        LogService.instance = instance;
    }
    static log(msg: string, type?: LogType) {
        LogService.instance.log(msg, type);
    }
}