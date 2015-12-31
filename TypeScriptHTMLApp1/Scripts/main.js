require.config({
    baseUrl: "/Scripts",
    paths: {
        'jquery': 'jquery-2.1.4',
        'toastr': 'toastr'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        toastr: {
            deps: ['jquery']
        }
    }
});
require(['app'], function (app) {
    app.run();
});
//# sourceMappingURL=main.js.map