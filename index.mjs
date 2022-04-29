#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import yargs from 'yargs';
import bodyParser from 'body-parser';
import axios from 'axios';

const argv = yargs(process.argv)
    .option('port', { alias: 'p', description: 'Specify the port the server is running on', type: 'number' })
    .option('verbose', { alias: 'v', description: 'Requests will be logged', type: 'boolean' })
    .option('url', { alias: 'u', description: 'The url to redirect requests to (eg https://cat-fact.herokuapp.com)', type: 'string', requiresArg: true })
    .help().alias('help', 'g').argv;

const port = argv.port || 80;
let redirect = argv.url;
const verbose = argv.verbose;

if (!redirect) {
    redirect = argv._[2]; // If they miss the -u or --url parameter
}
if (redirect?.endsWith('/')) {
    redirect = redirect.slice(0, -1);
}


var app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', function (req, res) {
    try {
        var url = redirect + req.url;

        console.log(`${req.method} ${url}`);
        if (verbose) {
            console.log(req.body);
        }

        if (verbose) {
            console.log(req.headers);
        }
        var options = {
            url: url,
            body: req.body,
            header: req.headers,
            method: req.method
        };
        axios.request(options).then((response) => {
            if (verbose) {
                console.log(response);
            }
            res.send(response.data);
        }).catch((error) => {                  
            res.status(error.response.status).send(error.response.data);
            console.error(error?.response);
        });
    } catch (err) {
        console.error(`Failed ${err}`);
    }
});

app.listen(port, () => {
    console.log(`proxy listening on http://localhost:${port} redirecting to ${redirect}`);
});
