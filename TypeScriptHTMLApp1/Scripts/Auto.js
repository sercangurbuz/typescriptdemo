define(["require", "exports", "part"], function (require, exports, PartModule) {
    (function (GearType) {
        GearType[GearType["Manual"] = 0] = "Manual";
        GearType[GearType["Auto"] = 1] = "Auto";
    })(exports.GearType || (exports.GearType = {}));
    var GearType = exports.GearType;
    (function (EventType) {
        EventType[EventType["Started"] = 0] = "Started";
        EventType[EventType["Driving"] = 1] = "Driving";
        EventType[EventType["Stopped"] = 2] = "Stopped";
        EventType[EventType["LowGas"] = 3] = "LowGas";
        EventType[EventType["NoGas"] = 4] = "NoGas";
    })(exports.EventType || (exports.EventType = {}));
    var EventType = exports.EventType;
    var Auto = (function () {
        function Auto(options) {
            this.options = options;
            this.oilGauge = 0;
            this.oilGauge = options.gasTankLiter;
            this.partsManager = new PartModule.PartManager();
            this.initParts();
        }
        //Overrided in Car class
        Auto.prototype.initParts = function () {
            this.partsManager.addPart(new PartModule.Part("Oil pipe", "Engine oil system"));
            this.partsManager.addPart(new PartModule.Part("Oil pump", "Engine oil system"));
            this.partsManager.addPart(new PartModule.Part("Water neck", "Engine cooling system"));
            this.partsManager.addPart(new PartModule.Part("Water tank", "Engine oil system"));
            this.partsManager.addPart(new PartModule.Part("Calibrated friction brake", "Braking system"));
            this.partsManager.addPart(new PartModule.Part("Tyre", "Braking system"));
        };
        Object.defineProperty(Auto.prototype, "autoInfo", {
            //Property usage
            get: function () {
                var str = "";
                for (var key in this.options) {
                    str += " " + key + " " + this.options[key];
                }
                return str;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Auto.prototype, "allParts", {
            get: function () {
                return this.partsManager.parts;
            },
            enumerable: true,
            configurable: true
        });
        Auto.prototype.start = function (notify) {
            var _this = this;
            notify(EventType.Started, this.getPartNames());
            this.timerToken = setInterval(function () {
                _this.consumeGas(notify);
            }, 1000);
        };
        Auto.prototype.consumeGas = function (notify) {
            this.oilGauge = this.oilGauge - this.options.gasConsumeForKm;
            if (this.oilGauge <= 0) {
                this.stop();
                notify(EventType.Stopped);
                notify(EventType.NoGas);
            }
            else {
                if (this.oilGauge <= Auto.minGasLimitforWarning) {
                    notify(EventType.LowGas, Auto.minGasLimitforWarning);
                }
                notify(EventType.Driving, this.oilGauge);
            }
        };
        Auto.prototype.stop = function () {
            clearInterval(this.timerToken);
        };
        Auto.prototype.getPartNames = function () {
            var parts = "<h4>Parts</h4><ul>";
            this.allParts.forEach(function (part) {
                parts += "<li>" + part.partName + "</li>";
            });
            return parts;
        };
        Auto.minGasLimitforWarning = 20;
        return Auto;
    })();
    exports.Auto = Auto;
});
//# sourceMappingURL=Auto.js.map