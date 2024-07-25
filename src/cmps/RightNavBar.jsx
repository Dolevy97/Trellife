


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
                        <img src="../../../src\assets\imgs\TaskDetails-icons\activity.svg" alt="" />
                        <span>Activity</span>
                    </div>

                    <div className="change-background-container">
                        <span>Change background</span>
                    </div>

                    <div className="collapse-all-container">
                        <img src="../../../src\assets\imgs\Icons\collapse.svg" alt="" />
                        <span>Collapse all</span>
                    </div>

                    <div className="delete-board-container">
                        <img src="../../../src\assets\imgs\TaskDetails-icons\trash.svg" alt="" />
                        <span> Delete board</span>
                    </div>

                </section>
            </section>
        </section>
    )
}