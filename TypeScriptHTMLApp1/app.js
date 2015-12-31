define(["require", "exports", "Car"], function (require, exports, Cars) {
    var App = (function () {
        function App() {
        }
        App.run = function () {
            window.onload = function () {
                var options = new Cars.BaseCarOptions();
                options.color = 'Blue';
                options.horsePower = 120;
                options.oilTankLiter = 55;
                options.oilConsumeForKm = 7;
                options.model = {
                    model: "Volvo",
                    make: "S60",
                    year: 2015
                };
                var myNewCar = new Cars.Car(options);
                myNewCar.start(function () {
                    console.log('go to oil station');
                });
            };
        };
        return App;
    })();
    exports.App = App;
    App.run();
});
//#endregion
//# sourceMappingURL=app.js.map