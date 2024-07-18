import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function AppHeader() {
	const navigate = useNavigate()

	return (
		<header className="app-header full">
			<NavLink to="/">
				<div className='logo-wrapper'>
					<div className='logo'></div>
				</div>
			</NavLink>
			<nav>
				<Link to={'/board'}>Board</Link>
			</nav>
		</header>
	)
}
