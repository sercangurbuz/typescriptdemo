define(["require", "exports"], function (require, exports) {
    //#region Misc Features
    exports.gearType = {
        "MANUAL ": 0,
        "AUTO": 1
    };
    var MaxDoorCount = 5;
    var Auto = (function () {
        function Auto(options) {
            this.options = options;
            if (options.doorCount > MaxDoorCount) {
                throw new Error("max door count must be less than 5");
            }
            this.oilGauge = options.oilTankLiter;
        }
        Object.defineProperty(Auto.prototype, "autoInfo", {
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
        Auto.prototype.start = function (cb) {
            var _this = this;
            console.log('Engine started...' + this.autoInfo);
            this.timerToken = setInterval(function () {
                if (_this.consumeOil()) {
                    cb();
                }
            }, 1000);
        };
        Auto.prototype.consumeOil = function () {
            this.oilGauge = this.oilGauge - this.options.oilConsumeForKm;
            var isEmpty = this.oilGauge <= 0;
            if (isEmpty) {
                console.log('Run out of oil...');
                this.stop();
            }
            else {
                console.log('Oil left is ' + this.oilGauge);
            }
            return isEmpty;
        };
        Auto.prototype.stop = function () {
            clearInterval(this.timerToken);
            console.log('Engine stopped...');
        };
        return Auto;
    })();
    exports.Auto = Auto;
});
//# sourceMappingURL=Auto.js.map