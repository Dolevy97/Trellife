
export function AppFooter() {

	return (
		<footer className="app-footer full">
			<p>Trellife</p>
            
            {import.meta.env.VITE_LOCAL ? 
                <span className="local-services">Local Services</span> : 
                <span className="remote-services">Remote Services</span>}
		</footer>
	)
}