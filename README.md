# Alle

## Screenshots 

<p float="left">
  <img src="https://user-images.githubusercontent.com/49379112/141329841-a251e23c-5a27-49b2-b901-aeeefd679b31.png" width="300px" alt="login">
  <img src="https://user-images.githubusercontent.com/49379112/141329869-b5243044-b82f-40b4-beae-a673d34ace61.png" width="300px" alt="new account">
  <img src="https://user-images.githubusercontent.com/49379112/141329876-05194a98-37f6-4e6a-92a2-690d84222323.png" width="300px" alt="home">
  <img src="https://user-images.githubusercontent.com/49379112/141329888-9f655e55-8ee8-4691-8e26-2025ec88f5f9.png" width="300px" alt="item page">
  <img src="https://user-images.githubusercontent.com/49379112/141329897-4b7b3653-3ec3-4093-9121-0f133611c920.png" width="300px" alt="new item">
</p>

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

(trabalho da faculdade)

