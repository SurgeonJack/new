function ForgotPasswordModal({ isOpen, onClose }) {
    try {
        const [step, setStep] = React.useState('input'); // input, verify, reset
        const [account, setAccount] = React.useState('');
        const [verificationCode, setVerificationCode] = React.useState('');
        const [newPassword, setNewPassword] = React.useState('');
        const [confirmPassword, setConfirmPassword] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [countdown, setCountdown] = React.useState(0);
        const [sentCode, setSentCode] = React.useState('');

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [step]);

        React.useEffect(() => {
            let timer;
            if (countdown > 0) {
                timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            }
            return () => clearTimeout(timer);
        }, [countdown]);

        const sendVerificationCode = async () => {
            if (!account.trim()) {
                setError('Please enter phone number or email');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const users = await trickleListObjects('user', 100, true);
                const user = users.items.find(u => 
                    u.objectData.phone === account || u.objectData.email === account
                );
                
                if (!user) {
                    setError('Phone number or email not found');
                    setLoading(false);
                    return;
                }

                // Generate 6-digit verification code
                const code = Math.floor(100000 + Math.random() * 900000).toString();
                setSentCode(code);
                
                // Simulate sending SMS/Email
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                console.log(`Verification code sent to ${account}: ${code}`);
                alert(`Verification code sent! Code: ${code} (Demo)`);
                
                setStep('verify');
                setCountdown(60);
            } catch (err) {
                setError('Failed to send verification code');
            } finally {
                setLoading(false);
            }
        };

        const verifyCode = async () => {
            if (verificationCode !== sentCode) {
                setError('Invalid verification code');
                return;
            }
            setStep('reset');
            setError('');
        };

        const resetPassword = async () => {
            if (newPassword !== confirmPassword) {
                setError('Password confirmation does not match');
                return;
            }
            if (newPassword.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            setLoading(true);
            setError('');

            try {
                const users = await trickleListObjects('user', 100, true);
                const user = users.items.find(u => 
                    u.objectData.phone === account || u.objectData.email === account
                );
                
                if (user) {
                    await trickleUpdateObject('user', user.objectId, {
                        ...user.objectData,
                        password: newPassword
                    });
                    alert('Password reset successfully!');
                    onClose();
                }
            } catch (err) {
                setError('Password reset failed');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-60 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold gradient-text">Reset Password</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i data-lucide="x" className="w-6 h-6"></i>
                        </button>
                    </div>

                    {step === 'input' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone/Email
                                </label>
                                <input
                                    type="text"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter registered phone or email"
                                />
                            </div>
                            
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            
                            <button
                                onClick={sendVerificationCode}
                                disabled={loading}
                                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                                {loading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </div>
                    )}

                    {step === 'verify' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter 6-digit code"
                                    maxLength="6"
                                />
                                <p className="text-sm text-gray-600 mt-2">
                                    Code sent to {account}
                                </p>
                            </div>
                            
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            
                            <div className="flex space-x-3">
                                <button
                                    onClick={sendVerificationCode}
                                    disabled={countdown > 0}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50">
                                    {countdown > 0 ? `Resend (${countdown}s)` : 'Resend'}
                                </button>
                                <button
                                    onClick={verifyCode}
                                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                                    Verify
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'reset' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter new password"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                            
                            <button
                                onClick={resetPassword}
                                disabled={loading}
                                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50">
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ForgotPasswordModal component error:', error);
        reportError(error);
    }
}