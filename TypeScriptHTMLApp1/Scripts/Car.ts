import Autos = require("Auto");
import PartService = require("part");

export interface ICarOptions extends Autos.IAutoOptions {
    plate: string;
}

export class BaseCarOptions implements ICarOptions {
    engine: string;
    horsePower: number;
    doorCount: number;
    color: string;
    gearType: number;
    model: Autos.IModel;
    gasTankLiter: number;
    gasConsumeForKm: number;
    plate: string;

    constructor(options?: any) {
        options = options || {};

        this.engine = options.engine || "V8";
        this.horsePower = options.engine;
        this.doorCount = options.engine || 4;
        this.color = options.engine;
        this.gearType = options.engine || Autos.GearType.Auto;
        this.model = options.engine || {};
        this.gasTankLiter = options.engine || 45;
        this.gasConsumeForKm = options.oilConsumeForKm || 5;
    }
}

export class Car extends Autos.Auto {

    constructor(public options: ICarOptions) {
        super(options);
    }

    initParts() {
        super.initParts();
        this.partsManager.addPart(new PartService.Part("Seat belt", "Car seat"));
        this.partsManager.addPart(new PartService.Part("Seat bracket", "Car seat"));
    }

    start(notify?: Autos.IEventNotifier): void {
        super.start(notify);
    }
}
