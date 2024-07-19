import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardDetails } from './pages/BoardDetails'
import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { TaskDetails } from './pages/TaskDetails.jsx'
import { BoardCreate } from './cmps/BoardCreate.jsx'
import { loadBoards } from './store/actions/board.actions.js'



export function RootCmp() {
    loadBoards() //For the header to from anywhere
    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main className='full'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="board" element={<BoardIndex />}>
                        <Route path="add" element={<BoardCreate />} />
                    </Route>
                    <Route path="board/:boardId/" element={<BoardDetails />} >
                        <Route path=":groupId/:taskId" element={<TaskDetails />} />
                    </Route>
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


