import React, {useState, useEffect} from 'react';
import {SideBySideMagnifier} from 'react-image-magnifiers';
import ClassSelector from './ClassSelector';
import classesConfig from "./classesConfig";
import './App.css';

function App() {
    const [imagesInfo, setImagesInfo] = useState({});
    const [imageFiles, setImageFiles] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const leftPress = useKeyPress("ArrowLeft");
    const rightPress = useKeyPress("ArrowRight");

    const handleFilterChange = function (filterProperty, newValue) {
        let newImagesInfo = JSON.parse(JSON.stringify(imagesInfo));
        newImagesInfo[imageFiles[currentImageIndex]][filterProperty] = newValue;
        setImagesInfo(newImagesInfo);
    }
    useEffect(() => {
        preloadImagesInfo(setImagesInfo);
    }, [])

    useEffect(() => {
        fetch('/api/list')
            .then(response => response.json())
            .then(data => {
                setImageFiles(data.filter(f => f.endsWith(".jpg")));
            })
            .catch((reason) => console.log(reason));
    }, []);

    useEffect(() => {
        if (!imagesInfo || (Object.keys(imagesInfo).length === 0)) {
            return;
        }

        fetch("/api/state/1", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(imagesInfo),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((reason) => console.log(reason));
    }, [imagesInfo]);

    useEffect(() => {
        if (imageFiles.length && rightPress) {
            setCurrentImageIndex(prevState =>
                prevState < imageFiles.length - 1 ? prevState + 1 : prevState
            );
        }
    }, [imageFiles, rightPress]);

    useEffect(() => {
        if (imageFiles.length && leftPress) {
            setCurrentImageIndex(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [imageFiles, leftPress]);

    const currentImageName = imageFiles[currentImageIndex];
    const imageUrl = imageFiles.length > 0 ? `/${currentImageName}` : "";

    return (
        <div className="App">
            <div key={currentImageName} className="main-container">
                <h3>{currentImageName}</h3>
                {generateFilters(handleFilterChange, imagesInfo[currentImageName])}
                <SideBySideMagnifier
                    key={imageUrl}
                    imageSrc={imageUrl}
                    style={{width: 800}}
                    fillAvailableSpace={false}
                    switchSides={false}
                />
            </div>
        </div>
    );
}

function preloadImagesInfo(setImagesInfo) {
    fetch("/api/state/1")
        .then(async resp => {
            const jsonResp = await resp.json();
            console.log(jsonResp);
            if (resp.ok && jsonResp && Object.keys(jsonResp).length !== 0) {
                setImagesInfo(jsonResp);
                return;
            }

            console.log("state file not found");
            fetch('/api/list')
                .then(response => response.json())
                .then(data => {
                    let newImagesInfo = {}
                    data.forEach(d => {
                        newImagesInfo[d] = {};
                        classesConfig.forEach(classConfig => {
                            newImagesInfo[d][classConfig.property] = [];
                        });
                    });
                    setImagesInfo(newImagesInfo);
                })
                .catch((reason) => console.log(reason));
        })
        .catch(err => {
            console.log(err);
        });
}

function generateFilters(handleFilterChange, currentImageInfo) {
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
                defaultOptions={currentImageInfo ? currentImageInfo[classConfig.property] : []}
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
