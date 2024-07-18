import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { DropdownMenu } from './DropdownMenu'

export function AppHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [menuToOpen, setMenuToOpen] = useState(null)

	const navigate = useNavigate()

	function handleMenuChange(menu) {
		if (menuToOpen === menu) {
			setIsMenuOpen(!isMenuOpen)
		} else {
			setIsMenuOpen(true)
			setMenuToOpen(menu)
		}
	}

	return (
		<header className="app-header full">
			<div className='flex'>
				<NavLink to="/">
					<div className='logo-wrapper'>
						<div className='logo'></div>
					</div>
				</NavLink>
				<section className="header-links">
					<article className='logo-wrapper' onClick={() => {
						handleMenuChange('Boards')
					}}>
						<p className='header-link-text' title='Boards'>Boards</p>
						<img src="../src\assets\styles\imgs\Icones\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
					</article>
					<article className='logo-wrapper' onClick={() => {
						handleMenuChange('Recent')
					}}>
						<p className='header-link-text' title='Recent'>Recent</p>
						<img src="../src\assets\styles\imgs\Icones\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
					</article>
					<article className='logo-wrapper' onClick={() => {
						handleMenuChange('Starred')
					}}>
						<p className='header-link-text' title='Starred'>Starred</p>
						<img src="../src\assets\styles\imgs\Icones\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
					</article>
					<article className='logo-wrapper' onClick={() => {
						handleMenuChange('Templates')
					}}>
						<p className='header-link-text' title='Templates'>Templates</p>
						<img src="../src\assets\styles\imgs\Icones\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
					</article>
				</section>
			</div>
			<nav>
				<Link to={'/board'}>Board</Link>
			</nav>
			{isMenuOpen && <DropdownMenu menu={menuToOpen} setIsMenuOpen={setIsMenuOpen} />}
		</header>
	)
}
