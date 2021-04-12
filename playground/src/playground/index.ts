/** @format */

import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";

export function playground(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        console.log("schematic works");
        return tree;
    };
}
