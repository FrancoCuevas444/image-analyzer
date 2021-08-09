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