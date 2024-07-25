import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { BoardDetails } from './pages/BoardDetails'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg.jsx'
import { TaskDetails } from './pages/TaskDetails.jsx'
import { BoardCreate } from './cmps/BoardCreate.jsx'
import { AppLayout } from './AppLayout'
import { loadBoards } from './store/actions/board.actions.js'
import { Auth } from './pages/Auth.jsx'

export function RootCmp() {
	loadBoards()
	return (
		<div className="main-container">
			<UserMsg />
			<main className='full'>
				<Routes>
					<Route element={<Auth />} path="/login" />
					<Route element={<Auth />} path="/signup" />
					<Route path="/" element={<>
						<AppHeader isHomePage={true} />
						<HomePage />
					</>} />
					<Route element={<AppLayout isHomePage={false} />}>
						<Route path="board" element={<BoardIndex />}>
							<Route path="add" element={<BoardCreate />} />
						</Route>
						<Route path="board/:boardId" element={<BoardDetails />}>
							<Route path=":groupId/:taskId" element={<TaskDetails />} />
						</Route>
					</Route>
				</Routes>
			</main>
		</div>
	)
}
