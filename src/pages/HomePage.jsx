import { useSelector } from "react-redux"
import { login } from "../store/actions/user.actions"
import { useNavigate } from "react-router"

import homepageImage from '../assets/imgs/homepage.png'

import boardDetailsScreenshot from '../assets/imgs/board-details-screenshot.png'
import dragAndDropScreenshot from '../assets/imgs/drag-and-drop-screenshot.png'
import taskDetailsScreenshot from '../assets/imgs/task-details-screenshot.png'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';


export function HomePage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    const sideTextsRef = useRef([])
    const swiperRef = useRef()

    const navigate = useNavigate()

    async function onSignIn() {
        try {
            await login({ username: 'Guest', password: '1234' })
            navigate('/board')
        } catch (err) {
            console.log('error logging in:', err)
        }
    }

    function onChangeSlide(slideIdx) {
        sideTextsRef.current.forEach(st => st.classList.remove('selected'))
        sideTextsRef.current[slideIdx].classList.add('selected')
    }

    function onSideTextClick(idx) {
        swiperRef.current.swiper.slideTo(idx)
    }

    return (
        <section className="homepage-container">
            <section className="homepage-first">
                <div className="container">
                    <div className="left-container">
                        <div className="text-block">
                            <div>
                                <h1>Trellife brings all your tasks, teammates, and tools together</h1>
                                <p>Keep everything in the same place—even if your team isn’t.</p>
                            </div>
                            <div className="spacer"></div>
                        </div>
                        <div className="homepage-get-started">
                            {/* <input type="email" name="" id="" /> */}
                            <button onClick={onSignIn}>Start demo</button>
                        </div>
                    </div>
                    <div className="right-container">
                        <img src={homepageImage} alt="" />
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
                <div className="homepage-info header">
                    <div className="side-texts">
                        <div onClick={() => onSideTextClick(0)} ref={st => sideTextsRef.current[0] = st} className="side-text selected">
                            <h3>Boards</h3>
                            <p>Trellife boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”</p>
                        </div>
                        <div onClick={() => onSideTextClick(1)} ref={st => sideTextsRef.current[1] = st} className="side-text">
                            <h3>Lists</h3>
                            <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trellife.</p>
                        </div>
                        <div onClick={() => onSideTextClick(2)} ref={st => sideTextsRef.current[2] = st} className="side-text">
                            <h3>Cards</h3>
                            <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
                        </div>
                    </div>
                    <div className="swiper-container">

                        <Swiper
                            ref={swiperRef}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            className="swiper"
                            onSlideChange={slide => onChangeSlide(slide.activeIndex)}
                        >

                            <SwiperSlide><img src={boardDetailsScreenshot} /></SwiperSlide>
                            <SwiperSlide><img src={dragAndDropScreenshot} /></SwiperSlide>
                            <SwiperSlide><img src={taskDetailsScreenshot} /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>

        </section >
    )
}

