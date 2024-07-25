


export function RightNavBar({ onClose, isRightNavBarOpen }) {



    return (
        <section>
            <div></div>
            <section className={`right-nav-bar-container ${!isRightNavBarOpen ? 'is-close' : ''}`}>
                <section className="right-nav-bar-header">
                    <div>
                        <span>Menu</span>

                    </div>
                    <div className="close-btn-wrapper" onClick={onClose}>
                        <img src="../../../src/assets/imgs/Icons/close.svg" alt="Close" />
                    </div>
                    <hr className="header-sep" />
                </section>
                <section className="right-nav-bar-body">

                    <div className="activity-container">
                        <div className="activity-wrapper">
                            <img src="../../../src\assets\imgs\TaskDetails-icons\activity.svg" alt="" />
                            <span>Activity</span>
                        </div>
                    </div>

                    <div className="change-background-container">
                        <div className="change-background-wrapper" >
                            <img src="../../../src\assets\imgs\TaskDetails-icons\card.svg" alt="" />
                        <span>Change background</span>
                        </div>
                    </div>

                    <div className="collapse-all-container">
                        <div className="collapse-all-wrapper">
                        <img src="../../../src\assets\imgs\Icons\collapse.svg" alt="" />
                        <span>Collapse all</span>
                        </div>
                    </div>

                    <div className="delete-board-container">
                        <div className="delete-board-wrapper">
                        <img src="../../../src\assets\imgs\TaskDetails-icons\trash.svg" alt="" />
                        <span> Delete board</span>
                        </div>
                    </div>

                </section>
            </section>
        </section>
    )
}