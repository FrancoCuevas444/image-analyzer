# Image Annotaror

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
0) Run `npm i nodemon -g`
1) In the project directory run `npm install`
2) Then, in the same directory run `yarn`. To install `yarn` use `npm install --global yarn`.
3) Then `cd` into `/client` folder, and run `npm install` there as well.
4) In the root folder create a `/imgs` folder and insert the images you want to analyze

## Run project

Once everything is setup, in the root folder run `npm run dev`.

Open a browser and go to [http://localhost:3000](http://localhost:3000) to use the tool.

## Result

The result can be found in ``state_1.json`` and ``state_1.csv``.

## Configure the classes

To configure the classes you want to use, modify the ``/client/src/classesConfig.js`` file.

Here is an example:
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
