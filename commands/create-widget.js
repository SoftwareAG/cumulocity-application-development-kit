const fs = require('fs');
const path = require('path');
const mc = require('make-case');
var copy = require('recursive-copy');
var rif = require('replace-in-file');
const { spawn } = require('child_process');

async function createWidget(args) {

    let destination = process.cwd();

    //assume cli, if not we MUST have certain elements set.
    if (args.destination !== undefined) {
        destination = args.destination;
    }

    console.log("DESTINATION: ", destination);

    // Create the workspace if it doesn't already exist. 
    if (fs.existsSync(`${destination}/angular.json`)) {
        console.log("You are in an Angular project this command should be run in an empty directory.");
        return;
    }

    if (fs.existsSync(`${destination}/${args.name}`)) {
        console.log(`Cannot create project, ${args.name} already exists`);
        return;
    }

    let cumulocity_version = args.ver ? `apps@${args.ver}` : "apps@latest";

    console.log(`Using Cumulocity version ${cumulocity_version}`);

    //ng new Project-Name
    //cd Project - Name;
    let command = `npx @c8y/cli new ${args.name} cockpit -a @c8y/${cumulocity_version} `;
    console.log(`Creating ${args.name} - ${command}`);
    let child = spawn(command, { encoding: 'utf8', shell: true, cwd: destination });
    for await (const data of child.stdout) {
        console.log(`${data}`);
    };


    // EXPECT widget name in kebab/dotted/or "separated in some way"
    // form a.b.c <=> d_e-f <=> g h i   , single identifiers will work if required

    let camelTest = /^[a-z]+(?:[A-Z][a-z]+)*$/;
    let pascalTest = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
    let className = args.name;
    let dottedName = args.name;
    let dashedName = args.name;

    // if the name is Pascal fine, if not is it camel, if not convert
    // finally if camel upper the first char to make Pascal
    if (!pascalTest.test(className)) {
        if (!camelTest.test(args.name)) {
            className = mc.toCamelCase(args.name); //remove any separators and format nicely
            className = className.charAt(0).toUpperCase() + className.slice(1); //ensure PascalCase for class names etc...        
            dashedName = mc.toDashCase(args.name);
            dottedName = mc.toDotCase(args.name);
        }
        else {
            //camel to pascal and create dashed
            dashedName = className.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
            dottedName = mc.toDotCase(dashedName);
            className = className.charAt(0).toUpperCase() + className.slice(1); //ensure PascalCase for class names etc...        
        }

    }
    else {
        //
        dashedName = className.charAt(0).toLowerCase() + className.slice(1); //to make conversion easier camelCase it        
        dashedName = dashedName.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        dottedName = mc.toDotCase(dashedName);
    }


    //debug
    //console.log("__CLASSNAME__ => " + className);
    //console.log("__DASHEDNAME__ => " + dashedName); // filenames and css classnames
    //console.log("__DOTTEDNAME__ => " + dottedName); // namespaces and config ids

    console.log("Scaffolding widget");
    let pkgFile = `${destination}/${args.name}/package.json`;
    try {
        console.log(`Modifying ${pkgFile}, adding cumulocity details, runtime widget entries and dev-dependencies`);
        const packageJSON = JSON.parse(fs.readFileSync(pkgFile));
        packageJSON.c8y.application.name = 'cockpit';
        packageJSON.c8y.application.contextPath = 'cockpit';
        packageJSON.c8y.application.key = 'cockpit-application-key';
        packageJSON['interleave'] = {};
        packageJSON['interleave']["dist\\bundle-src\\custom-widget.js"] = `${dashedName}-CustomWidget`;
        packageJSON['interleave']["dist/bundle-src/custom-widget.js"] = `${dashedName}-CustomWidget`;
        packageJSON['devDependencies']["caniuse-lite"] = "1.0.30001237";
        packageJSON['devDependencies']["css-loader"] = "3.5.3";
        packageJSON['devDependencies']["gulp"] = "4.0.2";
        packageJSON['devDependencies']["gulp-bump"] = "3.2.0";
        packageJSON['devDependencies']["gulp-filter"] = "6.0.0";
        packageJSON['devDependencies']["gulp-replace"] = "1.0.0";
        packageJSON['devDependencies']["gulp-zip"] = "5.0.2";
        packageJSON['devDependencies']["ng-packagr"] = "9.1.1";
        packageJSON['devDependencies']["typescript"] = "3.5.3";
        packageJSON['devDependencies']["url-loader"] = "4.1.1";
        packageJSON['devDependencies']["webpack"] = "4.43.0";
        packageJSON['devDependencies']["webpack-cli"] = "3.3.11";
        packageJSON['devDependencies']["webpack-external-import"] = "2.2.3";
        packageJSON.scripts.buildRuntime = `gulp`;
        fs.writeFileSync(pkgFile, JSON.stringify(packageJSON, null, 4));
    } catch (err) {
        console.log(`Modifying ${pkgFile}, FAILED`);
        console.error(err);
        return;
    }


    // Use the above to generate the files for the new widget
    // args contains the type of thing we are using (the template dir)
    // This options structure allows us to rename and replace internal 
    // refs to the various names with the correct values from above
    var options = {
        overwrite: true,
        dot: true,
        junk: false,
        rename: function (filePath) {
            let newName = filePath.replace(/\_\_DASHEDNAME\_\_/g, dashedName);
            newName = newName.replace(/\_\_DOTTEDNAME\_\_/g, dottedName);
            newName = newName.replace(/\_\_CLASSNAME\_\_/g, className);
            return newName;
        }
    };

    // I don't care about efficiency just the final result... 
    // so multiple passes required for replace contents
    //Now update replacements in the destination files 
    const rifOpts = {
        files: [
            `${destination}/${args.name}/*`,
            `${destination}/${args.name}/**`
        ],
        from: /\_\_CLASSNAME\_\_/g,
        to: className,
    };

    try {
        const copyRes = await copy(path.join(__dirname, '..', 'templates', args.type), `${destination}/${args.name}`, options);
        console.info('Copied ' + copyRes.length + ' files');
        await rif(rifOpts);
        rifOpts.from = /\_\_DOTTEDNAME\_\_/g;
        rifOpts.to = dottedName;
        await rif(rifOpts);
        rifOpts.from = /\_\_DASHEDNAME\_\_/g;
        rifOpts.to = dashedName;
        await rif(rifOpts);

        //rename webpack after - publish removes the file if we don't make it something else
        fs.rename(`${destination}/${args.name}/webpack.config.js.tmpl`, `${destination}/${args.name}/webpack.config.js`, (err) => err ? console.log(err) : console.log("renamed"));

    }
    catch (error) {
        console.error('Error occurred:', error);
    }

}

module.exports = createWidget;