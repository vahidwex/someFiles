import "reflect-metadata";
import "zone.js/dist/zone-node";
import { renderModuleFactory } from "@angular/platform-server";
import { enableProdMode } from "@angular/core";
import * as express from "express";
import * as compression from "compression";
import { join } from "path";
import { readFileSync, createWriteStream } from "fs";
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
import { ngExpressEngine } from "@nguniversal/express-engine";
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { ValueProvider } from '@angular/core';

let morgan = require('morgan');
const domino = require("domino");
const DIST_FOLDER = join(process.cwd(), "dist");
const template = readFileSync(join(DIST_FOLDER, "browser", "index.html")).toString();
const win = domino.createWindow(template);

global["window"] = win;
global["DOMTokenList"] = win.DOMTokenList;
global["Node"] = win.Node;
global["Text"] = win.Text;
global["HTMLElement"] = win.HTMLElement;
global["navigator"] = win.navigator;
global["Event"] = win.Event;
global["Event"]["prototype"] = win.Event.prototype;
global["document"] = win.document;
global["CSS"] = null;
global["$"] = null;

enableProdMode();

Error.stackTraceLimit = Infinity;

const PORT = process.env.PORT || 4200;

const app = express();

// Use Compressions
app.use(compression());

// Access logs
var accessLogStream = createWriteStream(join(join(DIST_FOLDER, "logs", "access.log")), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

app.engine("html", ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP),
    ],
}));

app.set("view engine", "html");
// app.set("views", "src");
app.set("views", join(DIST_FOLDER, "browser"));

app.get("*.*", express.static(join(DIST_FOLDER, "browser"), { cacheControl: true, setHeaders: function(res, path) {
    let shortCache = /\.(js|css|json)$/;
    let longCache = /\.(woff|woff2|ico|ttf|eot|png|jpg|svg|jpeg|gif)$/;
    if( shortCache.test(path) ) {
        res.setHeader("Cache-Control","max-age=1296000000,must-revalidate");
    } else if ( longCache.test(path) ) {
        res.setHeader("Cache-Control","max-age=2592000000,must-revalidate");
    }
} }));

app.get('/404*', (req, res) => {
    res.status(404).render("index", { req });
});

app.get('/500*', (req, res) => {
    res.status(500).render("index", { req });
});

const routes = [
    "/",
    "/register*",
    "/login*",
    "/register/freelancer",
    "/welcome/freelancer",
    "/search*",
    "/search-fl*",
    "/freelancer*",
    "/how-it-works*",
    "/categories*",
    "/FAQ*",
    "/projects*",
    "/profile*",
    "/post-job*",
    "/forgot-password*",
    "/terms*",
    "/panel*",
    "/profile*",
    "/about*"
];

app.get(routes, (req, res) => {
    res.render("index", { req });
});

app.get('*', (req, res) => {
    res.status(404).render("index", { req });
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});
