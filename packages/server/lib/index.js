"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var Route = (function () {
    function Route() {
    }
    Object.defineProperty(Route, "all", {
        get: function () {
            return Route.routes;
        },
        enumerable: false,
        configurable: true
    });
    Route.get = function (path) {
        var handlers = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handlers[_i - 1] = arguments[_i];
        }
        Route.routes.push({ path: path, handlers: handlers });
        return Route;
    };
    Route.routes = [];
    return Route;
}());
var Kernel = (function () {
    function Kernel() {
        this.router = express_1.default();
        this.routes = Route.all;
        this.run = this.run.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
        this.getRoutes();
    }
    Kernel.prototype.getRoutes = function () {
        var _this = this;
        this.routes.forEach(function (route) {
            var _a;
            (_a = _this.router).get.apply(_a, __spreadArrays([route.path], route.handlers));
            console.log.apply(console, route.handlers);
        });
    };
    Kernel.prototype.postRoutes = function () {
        var _this = this;
        this.routes.forEach(function (route) {
            var _a;
            (_a = _this.router).post.apply(_a, __spreadArrays([route.path], route.handlers));
            console.log.apply(console, route.handlers);
        });
    };
    Kernel.prototype.run = function (port, host) {
        if (port === void 0) { port = 4000; }
        if (host === void 0) { host = 'localhost'; }
        http_1.createServer(this.router).listen(port, host, function () {
            console.log("Server running on http://" + host + ":" + port);
        });
    };
    return Kernel;
}());
Route.get('/', function (req, res) {
    res.send('Server on top of express router');
});
new Kernel().run();
