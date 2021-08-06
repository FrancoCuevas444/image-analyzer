const classesConfig = [
    {
        property: "time_of_day",
        name: "Time of Day",
        options: ["day", "night"],
        isMultiSelect: false,
    },
    {
        property: "severity",
        name: "Severity",
        options: ["low", "medium", "high"],
        isMultiSelect: false,
    },
    {
        property: "part",
        name: "Part",
        options: ["front_window", "side_window", "back_window", "side_door", "front", "back"],
        isMultiSelect: true,
    }
]

export default classesConfig;