const classesConfig = [
    {
        property: "quality",
        name: "Quality",
        options: ["ok", "blurry", "dark", "flash/sun", "other_bad"],
        isMultiSelect: false,
    },
    {
        property: "object",
        name: "Object",
        options: ["no_vehicle", "motocycle", "van", "pickup", "truck", "bus", "other_vehicle", "ok_car", "broken_car", "multiple_vehicle"],
        isMultiSelect: false,
    },
    {
        property: "photo_dimension",
        name: "Photo Dimension",
        options: ["partial", "almost_complete", "complete"],
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
        options: ["bumper_dent", "bumper_other", "door_dent", "glass_shatter", "h_lamp_broken", "t_lamp_broken", "scratch", "smash", "front", "back", "other"],
        isMultiSelect: true,
    }
]

module.exports = classesConfig;