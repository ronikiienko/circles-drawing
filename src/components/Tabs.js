import React from 'react';


export const Tabs = ({openedTab, tabsArray, setOpenedTab}) => {
    const handleChange = (event) => setOpenedTab(event.target.id);

    return (
        <div className="tabs-buttons-container">
            {tabsArray.map(tab => {
                return <span className={`tab-button${openedTab === tab.id ? ' active' : ''}`} onClick={handleChange}
                             key={tab.id} id={tab.id}>{tab.label}</span>;
            })}
        </div>
    );
};
