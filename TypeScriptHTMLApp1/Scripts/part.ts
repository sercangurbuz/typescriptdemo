export interface IBasePart {
    partName: string;
    categoryName: string;
}

export class Part implements IBasePart {
    constructor(public partName: string, public categoryName: string) { }
}

export interface IPartManager<T extends IBasePart> {
    addPart(part: T): void;
    getPartByName(partName: string): T;
    parts: IBasePart[];
}

export class PartManager<T extends IBasePart> implements IPartManager<T>{
    list: Array<T>;
    constructor() {
        this.list = new Array<T>();
    }

    addPart(part: T): void {
        this.list.push(part);
    }

    getPartByName(partName: string): T {
        for (var i = 0; i < this.list.length; i++) {
            var part = this.list[i];

            if (part.partName === partName) {
                return part;
            }
        }
        return null;
    }

    get parts(): IBasePart[] {
        return this.list;
    }

    get partNames(): string {
        var parts: string = "<h4>Parts</h4><ul>";
        for (var part in this.list) {
            parts += "<li>" + part + " : " + this.parts[part].partName + "</li>";
        }
        return parts;
    }
}
