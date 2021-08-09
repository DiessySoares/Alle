# Alle

## Dependencias 

Node 16+

- Ionic:

   Ionic CLI                     : 6.16.1\
   Ionic Framework               : @ionic/angular 5.6.11\
   @angular/cli                  : 12.0.5\

- Capacitor:

   Capacitor CLI      : 3.1.1\
   @capacitor/android : 3.1.1\
   @capacitor/core    : 3.1.1\

## Instalação

Na pasta do projeto execute o comando no terminal

```
npm i
```

```
npm install -g ionic
```

## Run

Na pasta do projeto execute o comando no terminal

```
ionic serve
```

## Build (Windows - android)

Na pasta do projeto execute o comando no terminal

```
ionic capacitor build android
```
Caso o erro "Unable to find command: capacitor build" sejá apresentando use esses comandos

```
npm uninstall -g capacitor
npm uninstall -g ionic
npm cache clean -f
npm install npm -g
npm install -g @ionic/cli
ionic cap sync
```

e por fim execute novamente 

```
ionic capacitor build android
```

