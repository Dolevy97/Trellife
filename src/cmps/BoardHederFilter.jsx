


export function BoardHederFilter({onClose}) {



    return (
        <section className="BoardHederFilter">
            <header>
                <span>Filter</span>
                <div className="close-btn-wrapper" onClick={onClose}>
                    <img src="../../../src/assets/imgs/Icons/close.svg" alt="Close" />
                </div>
            </header>
            <div className="filter-info">
                <div className="search-container">
                    <span>Keywords</span>
                    <input type="text" />
                </div>
                <span>Search cards, members, labels, and more.</span>
            </div>
            <div className="members-container">
                <span>members</span>
            </div>
            <div className="labels-container">
                <span>labels</span>
            </div>
        </section>
    )
}