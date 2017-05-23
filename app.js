const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./config/mongoConnection");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const configRoutes = require("./routes");
const pkg = require('./package');


const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use(rewriteUnsupportedBrowserMethods);
//设置静态文件目录
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
app.use(cookieParser());
//设置session中间件
app.use(session({
    secret: 'ilovecoding',// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,//强制更新 true
    saveUninitialized: true// 设置为 false，强制创建一个 session，即使用户未登录
}));

app.use(passport.initialize());
app.use(passport.session());
// flash 中间件，用来显示通知
app.use(flash());

app.engine('handlebars', handlebarsInstance.engine);
//设置模板引擎为handlebars
app.set('view engine', 'handlebars');

require('./routes/index')(app, passport);
require('./routes/passport')(passport);

configRoutes(app);

// 监听端口，启动程序

let port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("1111111");
});