import React, { useEffect, useState, forwardRef } from "react";
import "./listView.css";
/*
    TODO: Experiencing with changing variable from ref.current.value to value.
*/

const ListView = forwardRef(({ listElements }, ref) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [prevSelectedOption, setPrevSelectedOption] = useState(null);

    useEffect(() => {
        prevSelectedOption && prevSelectedOption.classList.remove("selectedOption");
        selectedOption && selectedOption.classList.add("selectedOption");
    }, [selectedOption]);

    const handleOnOptionClick = (event) => {
        const target = event.target;
        setPrevSelectedOption(selectedOption);
        setSelectedOption(target);
    };

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.value = (selectedOption&&selectedOption.innerText)??null;
            ref.current.selected = (selectedOption&&selectedOption)??null;

        }
    }, [ref, selectedOption]);

    return (
        <div className="listBody" ref={ref}>
            <div className="column">
                {listElements && listElements.map((element) => (
                        <div key={element.name} className="option" onClick={handleOnOptionClick}>
                            {element.name}
                        </div>
                    ))}
            </div>
        </div>
    );
});

export default ListView;
