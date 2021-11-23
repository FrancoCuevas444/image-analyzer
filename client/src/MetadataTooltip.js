import React, {useEffect, useState} from 'react';
import {Checkbox} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip';

/*
{
    "complaint": "M204933",
    "accident": "9241/2020",
    "brand": "CHEVROLET",
    "model": "N4PONIX 1.4 LTZ",
    "type": "car",
    "color": "AZUL",
    "damage_comment": "PTA DEL DER Y ZOCALO DER",
    "car_year": 2013,
    "damaged_parts": [
        {
            "part": "back_lamp",
            "part_text": "FAROL TRASERO DER",
            "task": "replace",
            "hours": 0.25
        }
    ]
}
*/

const checkboxStyles = theme => ({
    root: {
        color: 'white',
        fill: 'white',
        padding: '2px',
    },
});

const CustomCheckbox = withStyles(checkboxStyles)(Checkbox);

function MetadataTooltip(props) {
    const {metadata, selectedParts, setSelectedParts} = props;

    return (
        <div className={"metadata-box"}>
            <h3>Metadata</h3>
            <div className={"flex-column"}>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Denuncia:</h4>
                    <p className={"metadata-values"}>{metadata.complaint}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Siniestro:</h4>
                    <p className={"metadata-values"}>{metadata.accident}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Marca:</h4>
                    <p className={"metadata-values"}>{metadata.brand}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Modelo:</h4>
                    <p className={"metadata-values"}>{metadata.model}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Tipo:</h4>
                    <p className={"metadata-values"}>{metadata.type}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Color:</h4>
                    <p className={"metadata-values"}>{metadata.color}</p>
                </div>
                <div className={"flex-row"}>
                    <h4 className={"metadata-labels"}>Year:</h4>
                    <p className={"metadata-values"}>{metadata.car_year}</p>
                </div>
            </div>
            <h3>Parts</h3>
            <div className={"flex-row"}>
                {getMetadataOptions(metadata.damaged_parts ? metadata.damaged_parts : [], selectedParts, setSelectedParts)}
            </div>
            <div className={"small-width flex-row"}>
                <h4 className={"metadata-labels"}>Comment:</h4>
                <p>{metadata.damage_comment}</p>
            </div>
        </div>
    )
}

function getMetadataOptions(damagedPartsMetadata, selectedParts, setSelectedParts) {
    let checks = [];
    damagedPartsMetadata.forEach((p, i) => {
        checks.push(
            <div className={"flex-row-center"}>
                <CustomCheckbox checked={selectedParts && selectedParts.includes(i)} onChange={(event) => setSelectedParts(event, i)} key={i} color="default"/>
                <p>{p.part.toUpperCase()}</p>
                <Tooltip title={`(${p.part_text}, ${p.task}, ${p.hours})`}>
                    <InfoIcon />
                </Tooltip>
            </div>
        )
    });

    return (
        <div className={"flex-column"}>
            {checks}
        </div>
    );
}

export default MetadataTooltip;