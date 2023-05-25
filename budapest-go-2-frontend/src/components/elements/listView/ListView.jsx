import React, { useEffect, useState, forwardRef } from "react";
import "./listView.css";

const ListView = forwardRef(({ listElements }, ref) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [prevSelectedOption, setPrevSelectedOption] = useState(null);

    useEffect(() => {
        prevSelectedOption && prevSelectedOption.classList.remove("selectedOption");
        selectedOption && selectedOption.classList.add("selectedOption");
    }, [selectedOption, prevSelectedOption]);

    const handleOnOptionClick = (element, event) => {
        const target = event.target;
        setPrevSelectedOption(selectedOption);
        setSelectedOption(target);
        setSelectedObject(listElements.filter((stop) => stop.id === element.id)[0]);
    };

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.value = (selectedOption&&selectedOption.innerText)??null;
            ref.current.selected = selectedObject??{};
        }
    }, [ref, selectedOption]);

    return (
        <div className="listBody" ref={ref}>
            <div className="column">
                {listElements && listElements.length > 0 ? listElements.map((element) => (
                        <div key={element.id} className="option" onClick={(event) => handleOnOptionClick(element, event)}>
                            {element.name}
                        </div>)) : <p>empty</p>
                }
            </div>
        </div>
    );
});

export default ListView;
