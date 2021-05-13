#!/usr/bin/env node
//import { createWidget } from './commands/create-widget';
//import { addCommand } from './commands/add-command';
const fs = require('fs');
const path = require('path');

const createWidget = require('./commands/create-widget');
const addCommand = require('./commands/add-command');
const yargs = require('yargs');

// dynamic way to add new templates 
const TEMPLATES = fs.readdirSync(path.join(__dirname, 'templates'));

//
// Use the yargs parser to get the command line in a decent 
// manner - pass that to a handler defined in the command sub dir
//
yargs
    .scriptName('gps-cli')
    //create the component skeleton
    .command({
        command: 'create [type] [name]',
        aliases: ['g'],
        describe: 'Generates from a template',
        handler: createWidget,
        builder: {
            type: {
                demand: true,
                choices: TEMPLATES,
            },
            name: {
                demand: true,
            },
            tenant: {
                demand: false,
            },
            ver: {
                demand: false,
            },
        },
    })
    //add elements to the widget
    // .command({
    //     command: 'add [type] [names...]',
    //     aliases: ['g'],
    //     describe: 'Add dependencies or class ',
    //     handler: addCommand,
    //     builder: {
    //         type: {
    //             demand: true,
    //             choices: ['dependency', 'class'],
    //             default: 'dependency',
    //         },
    //         names: {
    //             demand: true,
    //             array: true,
    //         },
    //     },
    // })
    .parse(process.argv.slice(2)); //ignore the first two args

