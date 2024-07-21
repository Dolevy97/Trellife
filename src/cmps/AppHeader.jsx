import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { DropdownMenu } from './DropdownMenu'
import { BoardCreate } from './BoardCreate'

export function AppHeader({ isHomePage }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [menuToOpen, setMenuToOpen] = useState(null)
	const [isAdding, setIsAdding] = useState(false)

	const navigate = useNavigate()

	function handleMenuChange(menu) {
		if (menuToOpen === menu) {
			setIsMenuOpen(false)
			setMenuToOpen(null)
		} else {
			setIsMenuOpen(true)
			setMenuToOpen(menu)
		}
	}

	return (
		<section className={`outer-header ${isHomePage ? 'homepage' : ''}`}>
			<header className={`app-header full ${isHomePage ? 'homepage' : ''}`}>
				<div className='flex'>
					<div onClick={() => navigate('/')} className={`logo-wrapper  ${isHomePage ? 'homepage' : ''}`}>
						<div className='logo'></div>
						<span className='logo-text'>Trellife</span>
					</div>
					<section className={`header-links ${isHomePage ? 'homepage' : ''}`}>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Boards' ? 'active' : ''}`} onClick={() => {
							handleMenuChange('Boards')
						}}>
							<p className='header-link-text' title='Boards'>Boards</p>
							<img src="../../../src\assets\imgs\Icons\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Recent' ? 'active' : ''}`} onClick={() => {
							handleMenuChange('Recent')
						}}>
							<p className='header-link-text' title='Recent'>Recent</p>
							<img src="../../../src\assets\imgs\Icons\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Starred' ? 'active' : ''}`} onClick={() => {
							handleMenuChange('Starred')
						}}>
							<p className='header-link-text' title='Starred'>Starred</p>
							<img src="../../../src\assets\imgs\Icons\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Templates' ? 'active' : ''}`} onClick={() => {
							handleMenuChange('Templates')
						}}>
							<p className='header-link-text' title='Templates'>Templates</p>
							<img src="../../../src\assets\imgs\Icons\arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<button onClick={() => { setIsAdding(true) }} className="btn-create">
							Create
						</button>
						{isAdding && <BoardCreate setIsAdding={setIsAdding} />}
					</section>
				</div>
				<Link to={'/board'}>Board</Link>
				<nav>
					<section className={`homepage-links ${isHomePage ? 'homepage' : ''}`}>
						<article className="btn-login">
							Log in
						</article>
						<article className="btn-register">
							Get Trellife for free
						</article>
					</section>
				</nav>
				{isMenuOpen && <DropdownMenu menu={menuToOpen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
			</header>
		</section>
	)
}
