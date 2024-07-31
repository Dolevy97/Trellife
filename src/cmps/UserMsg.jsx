import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'
// import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from '../services/socket.service'

import successIcon from '../assets/imgs/Icons/success.svg'

export function UserMsg() {
	const [msg, setMsg] = useState(null)
	const timeoutIdRef = useRef()

	useEffect(() => {
		const unsubscribe = eventBus.on('show-msg', msg => {
			setMsg(msg)
			if (timeoutIdRef.current) {
				timeoutIdRef.current = null
				clearTimeout(timeoutIdRef.current)
			}
			timeoutIdRef.current = setTimeout(closeMsg, 2000)
		})

		// socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
		// 	showSuccessMsg(`New review about me ${review.txt}`)
		// })

		return () => {
			unsubscribe()
			// socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
		}
	}, [])

	function closeMsg() {
		setMsg(null)
	}

	function msgClass() {
		return msg ? 'visible' : ''
	}
	return (
		<section className={`user-msg ${msg?.type} ${msgClass()}`}>
			{msg?.type === 'success' && <img className='user-msg-icon' src={successIcon} alt="success icon" />}
			{msg?.txt}
		</section>
	)
}
