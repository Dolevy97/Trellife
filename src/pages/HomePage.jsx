export function HomePage() {
    return (
        <section className="homepage-container">
            <section className="homepage-top">
                <div className="container">
                    <div className="inner-container">
                        <div className="left-container">
                            <div className="text-block">
                                <div>
                                    <h1>Trello brings all your tasks, teammates, and tools together</h1>
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
        </section >
    )
}

