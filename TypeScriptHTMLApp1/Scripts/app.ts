import Cars = require("Car");
import LogService = require("logservice");
import Auto = require("Auto");

class App {
    static startCar() {
        var options: Cars.ICarOptions = new Cars.BaseCarOptions();
        options.color = 'Blue';
        options.horsePower = 120;
        options.gasTankLiter = 55;
        options.gasConsumeForKm = 7;
        options.model = {
            model: "Volvo",
            make: "S60",
            year: 2015
        }

        var monitorEl: HTMLUListElement = <HTMLUListElement>document.getElementById("list");
        var myNewCar = new Cars.Car(options);
        myNewCar.start((eventType: Auto.EventType, value?: any) => {
            var msg: string = "";
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
    }

    static run() {
        LogService.LogService.initLogService(new LogService.ToastrLogService());
        var startbuttonEl: HTMLInputElement = <HTMLInputElement>document.getElementById("startAgain");
        startbuttonEl.onclick = (): void => {
            this.startCar();
        };

        this.startCar();
    }
}

export = App;
