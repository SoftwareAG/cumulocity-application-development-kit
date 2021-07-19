<!-- @format -->

# Software AG - Cumulocity Application Development Kit

<img src="https://github.com/SoftwareAG/cumulocity-application-development-kit/blob/master/images/gps.png" alt="Developed by Global Presales (Software AG)" width="200"/>

<sub><sup>Developed by Global Presales (Software AG)</sup></sub>

## Introduction

> TLDR; the easiest way to use this tool is via the vscode extension `cumulocity-helper` which can be found [here](https://marketplace.visualstudio.com/items?itemName=JohnHeath.cumulocity-helper)

Our goal in Software AG - Global Presales is to facilitate the sales process by providing accelerators to aid in the production of demos and sales assets.

The goal of this tool is to remove some of the overhead when starting new cumulocity projects. There are many common tasks and I believe that a lot of them can be automated. By generating the boilerplate we allow the user to jump straight in with creating content.

The longer term goal of this tool is that it is intended to be a common entry point when starting projects involving npm/angular.

## Features

_N.B. We will be adding new features as needed so the list below will expand over time and with requests._\_

-   Create runtime widget for the Cumulocity Application Builder.
    -   Scaffolds the code in a standard way.
    -   provides scripts for building runtime widget
    -   provides scripts allowing incremental build using `c8ycli server`
    -   run the tool and build a working widget without any further steps
    -   _Future : we will allow you to add common features to the generated project such as charts, common services etc..._

## Prerequisites

The tool is intended for the creation of Angular and Node based assets (at the time of writing). Therefore you will need as a minimum to have a version of [node](https://nodejs.org/en/) installed.

If your organisation does not allow global installation you should install locally and use [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) to run the commands

```
    npx cadk ...
```

When you install this package it will also install the @c8y/cli package locally and it will use this to create the base dashboard application for incrementally developing your widget.

You can use the c8ycli in the following way within your project directory, see [documentation](https://www.npmjs.com/package/@c8y/cli) for arguments and how to use it.

```
    npx c8ycli [options] [command]
```

## Installation

There are 2 ways to install this tool.

-   install locally in an npm project when you are restricted in what you can install, or don't want to install globally
    -   _Note that the executable will only be available within the project directory_

```
npm init -Y # Either use an existing node project or create a node project using npm (generates package.json)
npm i cumulocity-adk
npx cadk create widget --name my-cool-widget

```

![Charts](/images/npminstall.gif)

-   Install globally (like any application) to make the command line tool available on the path (use in any directory)

```
npm install -g cumulocity-adk
cadk create widget --name my-cool-widget

```

![Charts](/images/npxrun.gif)

## Usage

### create widget

_N.B. this command can take several minutes to finish depending on your machine and internet connection_

```
    npx cadk create widget --name <name> [--version <c8ysdk-version>]
```

![create widget](/images/npxcadk.gif)

The `--name` parameter is **required**, and **should be entered as a dashed name** because internally it uses this to produce Class and package names using the separator.

```
  #--name my-cool-package produces the following names in the output

  MyCoolPackage
  my-cool-package
  my.cool.package

```

The `--version` parameter is optional and for 99% of users it should be ignored.When omitted ` @c8y/apps@latest` is used to drive the `c8ycli new cockpit` command that is run as part of create widget.

If used, the version supplied should be in the form ` --version 1006.6.31` as it replaces the `latest`.

## ChangeLog

-   v1.2.1 - added support for vscode extension and removed npm installs. This provides a quicker process and control over when the install happens.
    -   added `--destination` to allow for the command line to create assets in a specified directory. [optional] - defaults to current directory.
    -   added export to allow create widget command to be run from code, made async.

---

These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.

Contact us at [TECHcommunity](mailto:technologycommunity@softwareag.com?subject=Github/SoftwareAG) if you have any questions.
