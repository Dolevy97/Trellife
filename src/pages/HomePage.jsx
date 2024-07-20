export function HomePage() {
    return (
        <section className="homepage-container">
            <section className="homepage-first">
                <div className="container">
                    <div className="inner-container">
                        <div className="left-container">
                            <div className="text-block">
                                <div>
                                    <h1>Trellife brings all your tasks, teammates, and tools together</h1>
                                    <p>Keep everything in the same place—even if your team isn’t.</p>
                                </div>
                                <div className="spacer"></div>
                            </div>
                            <form className="homepage-form">
                                <input type="email" name="" id="" />
                                <button>Sign up - It's free!</button>
                            </form>
                        </div>
                        <div className="right-container">
                            <img src="../../../src/assets/imgs/homepage.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="homepage-second">
                <div className="header">
                    <div className="inner-header">
                        <div className="text-block">
                            <div className="text-title">
                                <p className="trellife-101">Trellife 101</p>
                                <p className="subtitle">A productivity powerhouse</p>
                            </div>
                            <div className="text-content">
                                <p>Simple, flexible, and powerful.
                                All it takes are boards, lists,
                                and cards to get a clear view of who’s doing what and what needs to get done.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section >
    )
}

