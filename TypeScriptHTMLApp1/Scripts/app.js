define(["require", "exports", "Car", "logservice", "Auto"], function (require, exports, Cars, LogService, Auto) {
    var App = (function () {
        function App() {
        }
        App.startCar = function () {
            var options = new Cars.BaseCarOptions();
            options.color = 'Blue';
            options.horsePower = 120;
            options.gasTankLiter = 55;
            options.gasConsumeForKm = 7;
            options.model = {
                model: "Volvo",
                make: "S60",
                year: 2015
            };
            var monitorEl = document.getElementById("list");
            var myNewCar = new Cars.Car(options);
            myNewCar.start(function (eventType, value) {
                var msg = "";
                switch (eventType) {
                    case Auto.EventType.LowGas:
                        msg = "Gas is getting low !! Should more than " + value;
                        LogService.LogService.log(msg, LogService.LogType.Warn);
                        break;
                    case Auto.EventType.Driving:
                        msg = "Driving..Remainig gas is " + value + " lt";
                        LogService.LogService.log(msg);
                        break;
                    case Auto.EventType.NoGas:
                        msg = "Run of of gas,Get out of the car then start walking :)";
                        LogService.LogService.log(msg, LogService.LogType.Error);
                        break;
                    case Auto.EventType.Started:
                        msg = "Engine started " + value;
                        LogService.LogService.log(msg, LogService.LogType.Success);
                        break;
                    case Auto.EventType.Stopped:
                        msg = "Engine stopped";
                        LogService.LogService.log(msg, LogService.LogType.Success);
                        break;
                }
                var liEl = document.createElement("li");
                liEl.innerText = msg;
                monitorEl.appendChild(liEl);
            });
        };
        App.run = function () {
            var _this = this;
            LogService.LogService.initLogService(new LogService.ToastrLogService());
            var startbuttonEl = document.getElementById("startAgain");
            startbuttonEl.onclick = function () {
                _this.startCar();
            };
            this.startCar();
        };
        return App;
    })();
    return App;
});
//# sourceMappingURL=app.js.map