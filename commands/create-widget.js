const fs = require('fs');
const path = require('path');
const mc = require('make-case');
var copy = require('recursive-copy');
var rif = require('replace-in-file');
const { spawn } = require('child_process');

async function createWidget(args) {
    console.log(args);
    // Create the workspace if it doesn't already exist. 
    if (fs.existsSync('angular.json')) {
        print("You are already in an Angular project this command will create the whole project");
        return;
    }

    if (fs.existsSync(`${args.project}`)) {
        print(`Cannot create project, ${args.project} already exists`);
        return;
    }

    //ng new Project-Name
    //cd Project - Name;
    console.log(`Creating ${args.project}`);
    let command = `c8ycli new ${args.project} cockpit -a @c8y/apps@latest `;
    let child = spawn(command, { encoding: 'utf8', shell: true });
    for await (const data of child.stdout) {
        console.log(`${data}`);
    };


    console.log("Changing to project directory");
    process.chdir(args.project);

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
    console.log("__CLASSNAME__ => " + className);
    console.log("__DASHEDNAME__ => " + dashedName); // filenames and css classnames
    console.log("__DOTTEDNAME__ => " + dottedName); // namespaces and config ids

    console.log("modifying package.json");
    const packageJSON = JSON.parse(fs.readFileSync("package.json"));
    packageJSON.c8y.application.name = '"cockpit"';
    packageJSON.c8y.application.contextPath = '"cockpit"';
    packageJSON.c8y.application.key = '"cockpit-application-key"';
    // "tabsHorizontal": true,
    //     "upgrade": true,
    //         "rightDrawer": true,
    //             "breadcrumbs": false,
    //                 "sensorAppOneLink": "http://onelink.to/pca6qe",
    //                     "sensorPhone": true,
    //                         "contentSecurityPolicy": "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' *.billwerk.com http: https: ws: wss:;  script-src 'self' open.mapquestapi.com *.twitter.com *.twimg.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data:; font-src * data:; frame-src *;";

    packageJSON.scripts.buildRuntime = `gulp`;
    // packageJSON.scripts["buildMajor"] = `"cd projects/${dashedName}-widget && npm version major && ng build ${dashedName}-widget && cd ../../dist/${dashedName}-widget && npm pack && move *.tgz ../"`;
    // packageJSON.scripts["serve"] = `"ng build ${dashedName}-widget && npm i dist/${dashedName}-widget && ng s"`;
    fs.writeFileSync("package.json", JSON.stringify(packageJSON, null, 4));

    // console.log("creating proxy-conf.json");
    // let tenant = args.tenant ? args.tenant : "http://your-tenant.cumulocity.com";
    // const proxyJSON = {
    //     "/": {
    //         "target": tenant,
    //         "secure": false,
    //         "changeOrigin": true,
    //         "logLevel": "info"
    //     }
    // };
    // fs.writeFileSync("proxy-conf.json", JSON.stringify(proxyJSON, null, 4));


    // console.log("Adding proxy to angular.json");
    // const angularJSON = JSON.parse(fs.readFileSync("angular.json"));
    // angularJSON.projects[`${args.project}`].architect.serve["proxyConfig"] = "src/proxy.conf.json";
    // fs.writeFileSync("angular.json", JSON.stringify(angularJSON, null, 4));



    // I don't care about efficiency just the final result...
    // so multiple passes required for replace contents
    //Now update replacements in the destination files 
    const fetchOpts = {
        files: [
            `app.module.ts`
        ],
        from: /import\ \{\ CoreModule/g,
        to: `import { ${className}Widget } from './src/${dashedName}/${dashedName}-widget.component'
        import { ${className}WidgetConfig } from './src/${dashedName}/${dashedName}-widget.config.component'
        import { CoreModule, HOOK_COMPONENTS`,
    };

    await rif(fetchOpts);

    fetchOpts.from = /imports\:\ \[/g;
    fetchOpts.to = `  declarations: [${className}Widget, ${className}WidgetConfig],      // 1.
        entryComponents: [${className}Widget, ${className}WidgetConfig],
        providers: [{
            provide: HOOK_COMPONENTS,                         // 2.
            multi: true,
            useValue: [
                {
                    id: 'global.presales.${dottedName}.widget',
                    label: '${className} Widget',
                    description: '${className} Widget',
                    //previewImage: preview.previewImage,
                    component: ${className}Widget,
                    configComponent: ${className}WidgetConfig,
                    data : {
                        ng1 : {
                            options: { noDeviceTarget: false,
                            noNewWidgets: false,
                            deviceTargetNotRequired: false,
                            groupsSelectable: true
                            },
                        }
                    }
                }
            ]
        }],
        imports: [`;
    await rif(fetchOpts);

    doThis = true;
    if (doThis) {
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
        let destination = process.cwd();
        const rifOpts = {
            files: [
                `*`,
                `**`
            ],
            from: /\_\_CLASSNAME\_\_/g,
            to: className,
        };

        try {
            const copyRes = await copy(path.join(__dirname, '..', 'templates', args.type), destination, options);
            console.info('Copied ' + copyRes.length + ' files');
            await rif(rifOpts);
            rifOpts.from = /\_\_DOTTEDNAME\_\_/g;
            rifOpts.to = dottedName;
            await rif(rifOpts);
            rifOpts.from = /\_\_DASHEDNAME\_\_/g;
            rifOpts.to = dashedName;
            await rif(rifOpts);
            console.log(`npm install base (local) ${args.project}`);
            command = `npm install`;
            child = spawn(command, { encoding: 'utf8', shell: true });
            for await (const data of child.stdout) {
                console.log(`${data}`);
            };
            console.log(`npm adding dev dependencies (local) for ${args.project}`);
            command = `npm install --save-dev gulp-cli gulp  webpack webpack-cli webpack-dev-middleware webpack-external-import url-loader css-loader gulp-bump gulp-filter gulp-replace gulp-zip ng-packagr`;
            child = spawn(command, { encoding: 'utf8', shell: true });
            for await (const data of child.stdout) {
                console.log(`${data}`);
            };
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    }

}

module.exports = createWidget;