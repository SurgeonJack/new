function LoginModal({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) {
    try {
        const [formData, setFormData] = React.useState({ account: '', password: '' });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [showForgotPassword, setShowForgotPassword] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        const handleOAuthLogin = async (provider) => {
            setLoading(true);
            setError('');

            try {
                // Simulate OAuth flow
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const mockUser = {
                    name: provider === 'google' ? 'Google User' : 'Apple User',
                    email: `user@${provider}.com`,
                    phone: `${provider}_${Date.now()}`,
                    provider: provider,
                    registeredAt: new Date().toISOString()
                };

                // Save to database
                await trickleCreateObject('user', mockUser);
                onLoginSuccess(mockUser);
                onClose();
            } catch (err) {
                setError(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`);
            } finally {
                setLoading(false);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const user = await AuthService.login(formData.account, formData.password);
                onLoginSuccess(user);
                onClose();
            } catch (err) {
                setError('Login failed, please check your phone/email and password');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold gradient-text">Login to JEC</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    <div className="space-y-4 mb-6">
                        <button
                            type="button"
                            onClick={() => handleOAuthLogin('google')}
                            className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleOAuthLogin('apple')}
                            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                            </svg>
                            <span className="font-medium">Continue with Apple</span>
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone/Email</label>
                            <input
                                type="text"
                                value={formData.account}
                                onChange={(e) => setFormData({...formData, account: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter phone number or email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">{error}</div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                        <div className="mt-4 text-center">
                            <button 
                                onClick={() => setShowForgotPassword(true)}
                                className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                                Forgot Password?
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="text-gray-600">Don't have an account?</span>
                            <button 
                                onClick={onSwitchToRegister}
                                className="text-purple-600 hover:text-purple-800 font-medium ml-1">
                                Register Now
                            </button>
                        </div>
                </div>
                
                {showForgotPassword && (
                    <ForgotPasswordModal 
                        isOpen={showForgotPassword}
                        onClose={() => setShowForgotPassword(false)}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('LoginModal component error:', error);
        reportError(error);
    }
}
