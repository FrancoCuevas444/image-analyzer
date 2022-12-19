# Image Analyzer

Este proyecto fue construido en el margen del proyecto de grado _"Tasación de siniestros de automóviles mediante reconocimiento de imágenes aplicando inteligencia computacional"_. El objetivo del proyecto es mediante una interfaz web permitir etiquetar un conjunto de imágenes de vehículos del BSE.

## Setup
0) Correr el comando `npm i nodemon -g`
1) En el directorio del proyecto ejecutar `npm install`
2) Luego, en el mismo directorio ejecutar `yarn`. Para instalar `yarn` usar `npm install --global yarn`.
3) Luego `cd` a la carpeta `/client`, y correr `npm install`.
4) En el directorio raiz crear la carpeta `/imgs` e insertar las imágenes que se quieren analizar.

## Ejecutar proyecto

Una vez que está todo configurado, ejectuar en la raiz el comando `npm run dev`.

Abrir un navegador e ir a [http://localhost:3000](http://localhost:3000) para utilizar la herramienta.

## Resultados

El resultado del etiquetado se encuentra ``state_1.json`` y ``state_1.csv``.

## Configurar las etiquetas

Para configurar las etiquetas que se desean utilizar, modificar el ``/client/src/classesConfig.js``.

Aquí hay un ejemplo:
```
const classesConfig = [
    {
        property: "time_of_day",
        name: "Time of Day",
        options: ["day", "night"],
        isMultiSelect: false,
    },
    {
        property: "object",
        name: "Object",
        options: ["no_vehicle", "other_vehicle", "ok_car", "broken_car"],
        isMultiSelect: false,
    },
    {
        property: "severity",
        name: "Severity",
        options: ["low", "medium", "high"],
        isMultiSelect: false,
    },
    {
        property: "damage_type",
        name: "Damage Type",
        options: ["bumper_dent", "door_dent", "glass_shatter", "h_lamp_broken", "t_lamp_broken", "scratch", "smash", "other"],
        isMultiSelect: true,
    }
]

module.exports = classesConfig;
```
