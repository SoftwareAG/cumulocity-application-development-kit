# Software AG - Cumulocity Application Development Kit
## Introduction
Our goal in Software AG - Global Presales is to facilitate the sales process by providing accelerators to aid in the production of demos and sales assets. 

The goal of this tool is to remove some of the overhead when starting new cumulocity projects. There are many common tasks and I believe that a lot of them can be automated. By generating the boilerplate we allow the user to jump straight in with creating content. 

The longer term goal of this  tool is that it is intended to be a common entry point when starting projects involving npm/angular. 

## Features

*N.B. We will be adding new features as needed so the list below will expand over time and with requests.*_ 

* Create runtime widget for the Cumulocity Application Builder. 
  * Scaffolds the code in a standard way. 
  * provides scripts for building runtime widget
  * provides scripts allowing incremental build using ```c8ycli server```
  * run the tool and build a working widget without any further steps
  * *Future : we will allow you to add common features to the generated project such as charts, common services etc...*

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

* install locally in an npm project when you are restricted in what you can install, or  don't want to install globally 
  * *Note that the executable will only be available within the project directory*

```
npm init -Y # Either use an existing node project or create a node project using npm (generates package.json)
npm i cumulocity-adk
npx cadk create widget --name my-cool-widget

```
![Charts](/images/npminstall.gif)


* Install globally (like any application) to make the command line tool available on the path (use in any directory)

```
npm install -g cumulocity-adk
cadk create widget --name my-cool-widget

```
![Charts](/images/npxrun.gif)

## Usage

### create widget

```
    npx cadk create widget --name <name> [--version <c8ysdk-version>]
```

![Charts](/images/npxcadk.gif)


The ```--name``` parameter is __required__, and __should be entered as a dashed name__ because internally it uses this to produce Class and package names using the separator. 

```
  #--name my-cool-package produces the following names in the output
  
  MyCoolPackage
  my-cool-package
  my.cool.package
  
```

The ```--version``` parameter is optional, if omitted ``` @c8y/apps@latest``` is used

The format of this should be in the form ``` --version 1006.6.31``` . 


