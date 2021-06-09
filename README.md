# Software AG - Global Presales CLI 
## Introduction
Our goal in Software AG - Global Presales is to facilitate the sales process by providing accelerators to aid in the production of demos and sales assets. 

The goal of this tool is to remove some of the overhead when starting new cumulocity projects. There are many common tasks and I believe that a lot of them can be automated. By generating the boilerplate we allow the user to jump straight in with creating content. 

The longer term goal of this  tool is that it is intended to be a common entry point when starting projects involving npm/angular. 

## Features

*N.B. We will be adding new features as needed so the list below will expand over time and with requests.*_ 

* Cumulocity Application Builder - create runtime widget. 
  * Scaffolds the code in a standard way. 
  * provides scripts for building runtime widget
  * provides scripts allowing incremental build using ```c8ycli server```
  * run the tool and build a working widget without any further steps
  * *Future : we will allow you to add common features to the generated project such as charts, common services etc...*

## Prerequisites

The tool is intended for the creation of Angular and Node based assets (at the time of writing). Therefore you will need as a minimum to have a version of [node](https://nodejs.org/en/) installed. 

For Widget creation it will also be assumed you have angular installed 


## Installation

install either locally 

```
npm install gps-cli
```

or globally 

```
npm install -g gps-cli
```

to run local version use :

```
npx gps-cli create widget --name my-cool-widget
```

or a glocal version 

```
gps-cli create widget --name my-cool-widget
```

## NOTES

The ```--name``` parameter is required, and should be entered as a dashed name because internally it uses this to produce Class and package names using the separator. 

```
  #--name my-cool-package produces the following names in the output
  
  MyCoolPackage
  my-cool-package
  my.cool.package
  
```


