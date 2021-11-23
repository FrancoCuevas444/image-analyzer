import React, {useState, useEffect} from 'react';
import {SideBySideMagnifier} from 'react-image-magnifiers';
import ClassSelector from './ClassSelector';
import classesConfig from "./classesConfig";
import './App.css';
import MetadataTooltip from "./MetadataTooltip";

function App() {
    const [imageInfo, setImageInfo] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const leftPress = useKeyPress("ArrowLeft");
    const rightPress = useKeyPress("ArrowRight");

    const handleFilterChange = function (filterProperty, newValue) {
        let newImageInfo = JSON.parse(JSON.stringify(imageInfo));
        newImageInfo.state[filterProperty] = newValue;
        setImageInfo(newImageInfo);
    }

    const handlePartsChange = (event, index) => {
        let newImageInfo = JSON.parse(JSON.stringify(imageInfo));
        if (event.target.checked) {
            newImageInfo.state["selected_parts"].push(index);
        } else {
            newImageInfo.state["selected_parts"] = newImageInfo.state["selected_parts"].filter(e => e === index);
        }

        setImageInfo(newImageInfo);
    };

    useEffect(() => {
        loadImageInfo(currentImageIndex, setImageInfo);
    }, [currentImageIndex]);

    const currentImageName = imageInfo ? imageInfo.filename: "";
    const currentImageState = imageInfo ? imageInfo.state : null;

    useEffect(() => {
        if (!currentImageState || (Object.keys(currentImageState).length === 0)) {
            return;
        }

        saveImageState(currentImageName, currentImageState);
    }, [currentImageName, currentImageState]);

    useEffect(() => {
        if (rightPress) {
            setCurrentImageIndex(prevState => prevState + 1);
        }
    }, [rightPress]);

    useEffect(() => {
        if (leftPress) {
            setCurrentImageIndex(prevState => prevState - 1);
        }
    }, [leftPress]);

    const imageUrl = `/${currentImageName}`;

    return (
        <div className="App">
            <div key={currentImageName} className="main-container">
                <h3>{currentImageName}</h3>
                {generateFilters(handleFilterChange, currentImageState)}
                <div className={"flex-row"}>
                    <MetadataTooltip
                        metadata={imageInfo.metadata ? imageInfo.metadata: {}}
                        setSelectedParts={handlePartsChange}
                        selectedParts={imageInfo && imageInfo.state ? imageInfo.state["selected_parts"]: null}
                    />
                    <SideBySideMagnifier
                        key={imageUrl}
                        imageSrc={imageUrl}
                        style={{width: 700}}
                        fillAvailableSpace={false}
                        switchSides={false}
                    />
                </div>
            </div>
        </div>
    );
}

function saveImageState(currentImageName, currentImageState) {
    fetch(`/api/state?filename=${currentImageName}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentImageState),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((reason) => console.log(reason));
}

function loadImageInfo(currentImageIndex, setImageInfo) {
    fetch(`/api/files/${currentImageIndex}`)
        .then(async resp => {
            const jsonResp = await resp.json();
            console.log(jsonResp);
            if (resp.ok && jsonResp && Object.keys(jsonResp).length !== 0) {
                setImageInfo(jsonResp);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

function generateFilters(handleFilterChange, currentImageState) {
    let filters = []
    classesConfig.forEach(classConfig => {
        filters.push(
            <ClassSelector
                key={classConfig.property}
                property={classConfig.property}
                name={classConfig.name}
                options={classConfig.options}
                isMultiSelect={classConfig.isMultiSelect}
                onValueChange={(newValue) => handleFilterChange(classConfig.property, newValue)}
                defaultOptions={currentImageState ? currentImageState[classConfig.property] : []}
            />
        );
    });

    return filters;
}

const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({key}) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};

export default App;
