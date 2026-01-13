function Header({ onStartExperience, onLearnMore, onServices, onLogin, user, onLogout }) {
    try {
        const [showMobileMenu, setShowMobileMenu] = React.useState(false);
        const [showDomainTip, setShowDomainTip] = React.useState(false);

        React.useEffect(() => {
            const currentDomain = window.location.hostname;
            if (currentDomain.includes('trickle') || currentDomain.includes('preview')) {
                setShowDomainTip(true);
                setTimeout(() => setShowDomainTip(false), 5000);
            }
        }, []);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [showMobileMenu]);

        return (
            <header data-name="header" data-file="components/Header.js" className="relative z-10 p-6">
                {showDomainTip && (
                    <div className="bg-blue-500 text-white text-center py-2 px-4 text-sm mb-4 rounded-lg">
                        💡 Recommended official domain: jecflow.com
                    </div>
                )}
                
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                            <span className="jec-artistic-logo">JEC</span>
                        </div>
                        <span className="text-white font-semibold text-xl">Rhythm healing</span>
                    </div>
                    
                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="text-white hover:text-purple-200 transition-colors">Home</a>
                        <button onClick={onServices} className="text-white hover:text-purple-200 transition-colors">Services</button>
                        <button onClick={onLearnMore} className="text-white hover:text-purple-200 transition-colors">Learn More</button>
                        
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-white text-sm">Welcome, {user.name}</span>
                                <button 
                                    onClick={() => {
                                        if (typeof window.EMRPanel !== 'undefined' && window.EMRPanel.open) {
                                            window.EMRPanel.open();
                                        } else {
                                            onStartExperience();
                                        }
                                    }}
                                    className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-50 transition-colors">
                                        Rebuild your confidence
                                </button>
                                <button 
                                    onClick={onLogout}
                                    className="text-white hover:text-purple-200 transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={onLogin}
                                className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-50 transition-colors">
                                Login/Register
                            </button>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white p-2"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}>
                        <i data-lucide="menu" className="w-6 h-6"></i>
                    </button>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="md:hidden mt-4 bg-white rounded-2xl p-4 shadow-lg">
                        <div className="space-y-3">
                            <button onClick={onServices} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Services
                            </button>
                            <button onClick={onLearnMore} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                Learn More
                            </button>
                            {user ? (
                                <div className="space-y-2">
                                    <p className="px-4 py-2 text-sm text-gray-600">Welcome, {user.name}</p>
                                    <button onClick={onStartExperience} className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg">
                                        Start Journey
                                    </button>
                                    <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button onClick={onLogin} className="block w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg">
                                    Login/Register
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
