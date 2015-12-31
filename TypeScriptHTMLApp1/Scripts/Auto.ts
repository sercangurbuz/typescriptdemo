import PartModule = require("part");

export enum GearType {
    Manual, Auto
}

export interface IModel {
    make: string;
    model: string;
    year: number;
}

export interface IAutoOptions {
    engine: string;
    horsePower: number;
    color: string;
    gearType: number;
    model: IModel;
    gasTankLiter: number;
    gasConsumeForKm: number;
}

export interface IAuto {
    options: IAutoOptions;
    start(notify?: IEventNotifier): void;
    stop(): void;
    partsManager: PartModule.IPartManager<PartModule.IBasePart>;
}

export interface IEventNotifier {
    (eventType: EventType, value?: any): void;
}
export enum EventType {
    Started,
    Driving,
    Stopped,
    LowGas,
    NoGas
}

export class Auto implements IAuto {
    static minGasLimitforWarning: number = 20;
    oilGauge: number = 0;
    timerToken: number;
    partsManager: PartModule.IPartManager<PartModule.IBasePart>;

    constructor(public options: IAutoOptions) {
        this.oilGauge = options.gasTankLiter;
        this.partsManager = new PartModule.PartManager<PartModule.Part>();
        this.initParts();
    }
    //Overrided in Car class
    initParts() {
        this.partsManager.addPart(new PartModule.Part("Oil pipe", "Engine oil system"));
        this.partsManager.addPart(new PartModule.Part("Oil pump", "Engine oil system"));
        this.partsManager.addPart(new PartModule.Part("Water neck", "Engine cooling system"));
        this.partsManager.addPart(new PartModule.Part("Water tank", "Engine oil system"));
        this.partsManager.addPart(new PartModule.Part("Calibrated friction brake", "Braking system"));
        this.partsManager.addPart(new PartModule.Part("Tyre", "Braking system"));
    }
    //Property usage
    get autoInfo(): string {
        var str = "";
        for (var key in this.options) {
            str += " " + key + " " + this.options[key];
        }
        return str;
    }

    get allParts(): PartModule.IBasePart[] {
        return this.partsManager.parts;
    }

    start(notify?: IEventNotifier): void {
        notify(EventType.Started, this.getPartNames());

        this.timerToken = setInterval(() => {
            this.consumeGas(notify);
        }, 1000);
    }

    private consumeGas(notify: (eventType: EventType, value?: any) => void): void {
        this.oilGauge = this.oilGauge - this.options.gasConsumeForKm;

        if (this.oilGauge <= 0) {
            this.stop();
            notify(EventType.Stopped);
            notify(EventType.NoGas);
        } else {
            if (this.oilGauge <= Auto.minGasLimitforWarning) {
                notify(EventType.LowGas, Auto.minGasLimitforWarning);
            }
            notify(EventType.Driving, this.oilGauge);
        }
    }

    stop(): void {
        clearInterval(this.timerToken);
    }

    private getPartNames(): string {
        var parts: string = "<h4>Parts</h4><ul>";
        this.allParts.forEach((part: PartModule.IBasePart) => {
            parts += "<li>" + part.partName + "</li>";
        });
        return parts;
    }
}
