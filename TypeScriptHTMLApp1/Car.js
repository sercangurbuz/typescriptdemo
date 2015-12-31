var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "Auto"], function (require, exports, Autos) {
    var GearType = Autos.gearType;
    var BaseCarOptions = (function () {
        function BaseCarOptions(options) {
            options = options || {};
            this.engine = options.engine || "V8";
            this.horsePower = options.engine;
            this.doorCount = options.engine || 4;
            this.color = options.engine;
            this.gearType = options.engine || GearType.AUTO;
            this.model = options.engine || {};
            this.oilTankLiter = options.engine || 45;
            this.oilConsumeForKm = options.oilConsumeForKm || 5;
        }
        return BaseCarOptions;
    })();
    exports.BaseCarOptions = BaseCarOptions;
    var Car = (function (_super) {
        __extends(Car, _super);
        function Car(options) {
            _super.call(this, options);
            this.options = options;
        }
        Car.prototype.start = function (cb) {
            _super.prototype.start.call(this, cb);
        };
        return Car;
    })(Autos.Auto);
    exports.Car = Car;
});
//# sourceMappingURL=Car.js.map