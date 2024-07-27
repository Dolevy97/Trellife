import { useNavigate } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { DropdownMenu } from './DropdownMenu'
import { BoardCreate } from './BoardCreate'
import { useSelector } from 'react-redux'
import { login, logout } from '../store/actions/user.actions'

export function AppHeader({ isHomePage }) {
	const user = useSelector(storeState => storeState.userModule.user)

	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [menuToOpen, setMenuToOpen] = useState(null)
	const [isAdding, setIsAdding] = useState(false)

	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const [userMenuStyle, setUserMenuStyle] = useState({})
	const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })

	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
	const [isHamburgerMenuAnimating, setIsHamburgerMenuAnimating] = useState(false)

	const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
	const [createButtonPosition, setCreateButtonPosition] = useState(null)

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
		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [])

	useEffect(() => {
		if (!user) {
			guestLogin()
		}
	}, [user])

	function toggleHamburgerMenu() {
		if (isHamburgerMenuAnimating) return

		setIsHamburgerMenuAnimating(true)
		setIsHamburgerMenuOpen(!isHamburgerMenuOpen)

		if (!isHamburgerMenuOpen) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		setTimeout(() => {
			setIsHamburgerMenuAnimating(false)
		}, 500)
	}

	async function guestLogin() {
		await login({ username: 'Guest', password: '1234' })
	}

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

	function handleMenuChange(menu, event, fromMore = false) {
		if (menuToOpen === menu) {
			setIsMenuOpen(false)
			setMenuToOpen(null)
		} else if (fromMore) {
			setMenuPosition({ top: 40.703125, left: 148.28125 })
			setIsMenuOpen(true)
			setMenuToOpen(menu)
			setIsMoreMenuOpen(false)
		} else {
			const rect = event.currentTarget.getBoundingClientRect()
			setMenuPosition({
				top: rect.bottom,
				left: rect.left
			})
			setIsMenuOpen(true)
			setMenuToOpen(menu)
		}
	}

	function onLogout() {
		logout()
		navigate('/')
	}

	function toggleMoreMenu() {
		setIsMoreMenuOpen(!isMoreMenuOpen)
	}

	return (
		<section className={`outer-header ${isHomePage ? 'homepage' : ''}`}>
			<header className={`app-header full ${isHomePage ? 'homepage' : ''}`} ref={appHeaderRef}>
				<div className='flex'>
					<div onClick={() => navigate('/')} className={`trellife-logo-wrapper  ${isHomePage ? 'homepage' : ''}`}>
						<div className='logo'></div>
						<span className='logo-text'>Trellife</span>
					</div>
					<section className={`header-links ${isHomePage ? 'homepage' : ''}`}>
						{/* <article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Boards' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Boards', e)}>
							<p className='header-link-text' title='Boards'>Boards</p>
							<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article> */}
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Recent' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Recent', e)}>
							<p className='header-link-text' title='Recent'>Recent</p>
							<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Starred' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Starred', e)}>
							<p className='header-link-text' title='Starred'>Starred</p>
							<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
						<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Templates' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Templates', e)}>
							<p className='header-link-text' title='Templates'>Templates</p>
							<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
						</article>
					</section>
					<article className={`logo-wrapper more ${(isMoreMenuOpen || isMenuOpen) ? 'active' : ''}`} onClick={toggleMoreMenu}>
						<p className='header-link-text' title='More'>More</p>
						<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
					</article>


					{isMoreMenuOpen && <>
						<section className="more-menu">
							<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Recent' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Recent', e, true)}>
								<p className='header-link-text' title='Recent'>Recent</p>
								<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
							</article>
							<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Starred' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Starred', e, true)}>
								<p className='header-link-text' title='Starred'>Starred</p>
								<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
							</article>
							<article className={`logo-wrapper ${isMenuOpen && menuToOpen === 'Templates' ? 'active' : ''}`} onClick={(e) => handleMenuChange('Templates', e, true)}>
								<p className='header-link-text' title='Templates'>Templates</p>
								<img src="../../../src/assets/imgs/Icons/arrow-down.svg" className='svg-arrow-down' alt="arrow-down" />
							</article>
						</section>
					</>}


					<button onClick={(e) => {
						const rect = e.target.getBoundingClientRect()
						setCreateButtonPosition({ top: rect.bottom, left: rect.left })
						setIsAdding(true)
					}} className="btn-create">
						<span className='desktop-create'>Create</span>
						<span className='mobile-create'><img src="../../../src/assets/imgs/Icons/add.svg" /></span>
					</button>
					{isAdding && <BoardCreate setIsAdding={setIsAdding} createButtonPosition={createButtonPosition} />}
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

				{isHomePage && <article className="hamburger-container" onClick={toggleHamburgerMenu}>
					<div className={`hamburger ${isHamburgerMenuOpen ? 'is-open' : ''}`}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</article>}

				{isHomePage &&
					<nav className={`hamburger-menu ${isHamburgerMenuOpen ? 'is-open' : ''} ${isHamburgerMenuAnimating ? 'is-animating' : ''}`}>
						<div className="login-signup-homepage-container">
							<article onClick={() => navigate('/signup')} className="btn-register">
								Get Trellife for free
							</article>
							<article onClick={() => navigate('/login')} className="btn-login">
								Log in
							</article>
						</div>
					</nav>}

				{isMenuOpen && <DropdownMenu menu={menuToOpen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} position={menuPosition} />}
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
