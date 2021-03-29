const fs = require('fs');
const path = require('path');
const mc = require('make-case');
var copy = require('recursive-copy');
var rif = require('replace-in-file');

async function createWidget(args) {
    console.log(args);

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
    const rifopts = {
        files: [
            '*',
            '**'
        ],
        from: /\_\_CLASSNAME\_\_/g,
        to: className,
    };

    try {
        const copyres = await copy(path.join(__dirname, '..', 'templates', args.type), process.cwd(), options);
        console.info('Copied ' + copyres.length + ' files');
        await rif(rifopts);
        rifopts.from = /\_\_DOTTEDNAME\_\_/g;
        rifopts.to = dottedName;
        await rif(rifopts);
        rifopts.from = /\_\_DASHEDNAME\_\_/g;
        rifopts.to = dashedName;
        await rif(rifopts);
    }
    catch (error) {
        console.error('Error occurred:', error);
    }

}

module.exports = createWidget;