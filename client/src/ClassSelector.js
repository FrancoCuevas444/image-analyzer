import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const buttonGroupStyles = makeStyles({
    root: {
        alignItems: 'center',
    }
});

const buttonStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 26,
        padding: '0 10px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        background: 'linear-gradient(45deg, #6FE0A5 30%, #A5FF53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(105, 255, 137, .3)',
        color: 'white',
        height: 26,
        padding: '0 10px',
    },
});

function ClassSelector(props) {
    const { name, isMultiSelect, options, defaultOptions=[], onValueChange } = props;
    const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
    const classesButton = buttonStyles();
    const classesButtonGroup = buttonGroupStyles();

    return (
        <div className={"flex-row"}>
            <h3>{name}</h3>
            { generateOptions(options, selectedOptions, setSelectedOptions, isMultiSelect, onValueChange, classesButton, classesButtonGroup) }
        </div>
    )
}

function generateOptions(options, selectedOptions, setSelectedOptions, isMultiSelect, onValueChange, classesButton, classesButtonGroup) {
    let finalOptions = [];
    options.forEach(option => {
        finalOptions.push(
            <ToggleButton classes={{root: classesButton.root, selected: classesButton.selected}} key={option} value={option}>
                {option}
            </ToggleButton>
        );
    })

    const handleChange = (event, newValue) => {
        setSelectedOptions(newValue);
        onValueChange(newValue);
    };

    return (
        <ToggleButtonGroup
            className={classesButtonGroup.root}
            value={selectedOptions}
            onChange={handleChange}
            exclusive={!isMultiSelect}
        >
            {finalOptions}
        </ToggleButtonGroup>
    )
}

export default ClassSelector;