import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { DropdownMenu } from './DropdownMenu'
import { BoardCreate } from './BoardCreate'
import { useSelector } from 'react-redux'
import { guestLogin, logout } from '../store/actions/user.actions'

export function AppHeader({ isHomePage }) {
	const user = useSelector(storeState => storeState.userModule.user)

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [menuToOpen, setMenuToOpen] = useState(null)
	const [isAdding, setIsAdding] = useState(false)
	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const [userMenuStyle, setUserMenuStyle] = useState({});

	const userMenuRef = useRef()
	const appHeaderRef = useRef()
	const accountProfileRef = useRef()

	const navigate = useNavigate()


	useEffect(() => {
		handleResize()

		window.addEventListener('resize', handleResize)
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			window.removeEventListener('resize', handleResize)
			document.removeEventListener('mousedown', handleClickOutside)
		};
	}, [userMenuRef, appHeaderRef])

	useEffect(() => {
		if (!user) {
			guestLogin()
		}
	}, [user])

	function handleResize() {
		const headerWidth = appHeaderRef.current.offsetWidth;
		const screenWidth = window.innerWidth;

		const rightInset = Math.max(0, (screenWidth - headerWidth) / 2) + 2;
		setUserMenuStyle({
			inset: `48px ${rightInset}px auto auto`
		})
	}

	function handleClickOutside(event) {
		if (userMenuRef.current && !userMenuRef.current.contains(event.target) && !accountProfileRef.current.contains(event.target)) {
			setUserMenuOpen(false)
		}
	}

	function handleMenuChange(menu) {
		if (menuToOpen === menu) {
			setIsMenuOpen(false)
			setMenuToOpen(null)
		} else {
			setIsMenuOpen(true)
			setMenuToOpen(menu)
		}
	}

	function onLogout() {
		logout()
		navigate('/')
	}
	
	return (
		<section className={`outer-header ${isHomePage ? 'homepage' : ''}`}>
			<header className={`app-header full ${isHomePage ? 'homepage' : ''}`} ref={appHeaderRef}>
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
				<nav>
					<section className={`homepage-links ${isHomePage ? 'homepage' : ''}`}>
						<article onClick={() => navigate('/login')} className="btn-login">
							Log in
						</article>
						<article onClick={() => navigate('/signup')} className="btn-register">
							Get Trellife for free
						</article>
					</section>
				</nav>
				{!isHomePage && user && <section ref={accountProfileRef} title='account' onClick={() => setUserMenuOpen(!userMenuOpen)} className="user-profile">
					<img className='user-profile-img' src={user.imgUrl} />
				</section>}
				{isMenuOpen && <DropdownMenu menu={menuToOpen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
			</header>
			{userMenuOpen &&
				<section className='user-menu' ref={userMenuRef} style={userMenuStyle}>
					<h2>Account</h2>
					<div className="account-info">
						<img className='user-profile-img' src={user.imgUrl} />
						<div className="user-info">
							<div className="user-fullname">{user.fullname}</div>
							<div className="user-username">{user.username}</div>
						</div>
					</div>
					<nav className='user-menu-nav'>
						<ul className='nav-list'>
							<li>
								<button onClick={onLogout} className='nav-list-item'>
									<span className='span-container'>
										<span className="nav-item-text">
											Log out
										</span>
									</span>
								</button>
							</li>
						</ul>
					</nav>
				</section>}
		</section>
	)
}
