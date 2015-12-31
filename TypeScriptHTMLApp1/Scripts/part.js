define(["require", "exports"], function (require, exports) {
    var Part = (function () {
        function Part(partName, categoryName) {
            this.partName = partName;
            this.categoryName = categoryName;
        }
        return Part;
    })();
    exports.Part = Part;
    var PartManager = (function () {
        function PartManager() {
            this.list = new Array();
        }
        PartManager.prototype.addPart = function (part) {
            this.list.push(part);
        };
        PartManager.prototype.getPartByName = function (partName) {
            for (var i = 0; i < this.list.length; i++) {
                var part = this.list[i];
                if (part.partName === partName) {
                    return part;
                }
            }
            return null;
        };
        Object.defineProperty(PartManager.prototype, "parts", {
            get: function () {
                return this.list;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PartManager.prototype, "partNames", {
            get: function () {
                var parts = "<h4>Parts</h4><ul>";
                for (var part in this.list) {
                    parts += "<li>" + part + " : " + this.parts[part].partName + "</li>";
                }
                return parts;
            },
            enumerable: true,
            configurable: true
        });
        return PartManager;
    })();
    exports.PartManager = PartManager;
});
//# sourceMappingURL=part.js.map