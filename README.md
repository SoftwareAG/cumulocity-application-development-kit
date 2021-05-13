# gps

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


