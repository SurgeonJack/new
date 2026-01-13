function VoiceAssistant({ isOpen, onClose, user }) {
    try {
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [isSpeaking, setIsSpeaking] = React.useState(false);
        const [currentInput, setCurrentInput] = React.useState('');
        const [textInput, setTextInput] = React.useState('');
        const [messages, setMessages] = React.useState([
            { role: 'assistant', content: `Hello ${user?.name || ''}! I'm Dr. Jack. I'm delighted to have this flow conversation with you. Please tell me how you're feeling today or if you have any concerns.` }
        ]);
        const [isActive, setIsActive] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [messages, isSpeaking]);

        React.useEffect(() => {
            if (isOpen && !isActive) {
                startVoiceSession();
            }
            
            return () => {
                if (isActive) {
                    VoiceService.stopAutoListening();
                    VoiceService.stopSpeech();
                }
            };
        }, [isOpen]);

        const startVoiceSession = () => {
            setIsActive(true);
            
            VoiceService.startAutoListening(
                (text, isFinal) => {
                    setCurrentInput(text);
                },
                (error) => {
                    console.error('Voice recognition error:', error);
                },
                (finalText) => {
                    setCurrentInput('');
                    if (finalText.trim()) {
                        handleSendMessage(finalText);
                    }
                }
            );
        };

        const handleSendMessage = async (text) => {
            if (!text.trim()) return;
            
            VoiceService.stopSpeech();
            setIsSpeaking(false);
            setIsProcessing(true);
            
            const userMessage = { role: 'user', content: text };
            setMessages(prev => [...prev, userMessage]);
            
            try {
                const response = await VoiceService.getJackResponse(text, messages);
                const assistantMessage = { role: 'assistant', content: response };
                setMessages(prev => [...prev, assistantMessage]);
                
                setIsSpeaking(true);
                await ElevenLabsService.speak(response);
                setIsSpeaking(false);
                
            } catch (error) {
                console.error('Failed to get response:', error);
                const errorMessage = { role: 'assistant', content: 'Sorry, I cannot respond right now. Please try again later.' };
                setMessages(prev => [...prev, errorMessage]);
            } finally {
                setIsProcessing(false);
            }
        };

        const handleTextSubmit = () => {
            if (textInput.trim()) {
                handleSendMessage(textInput);
                setTextInput('');
            }
        };

        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleTextSubmit();
            }
        };

        const handleClose = () => {
            VoiceService.stopAutoListening();
            VoiceService.stopSpeech();
            setIsActive(false);
            onClose();
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col relative">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold gradient-text">Dr. Jack Voice Companion</h2>
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                        message.role === 'user' 
                                            ? 'bg-purple-600 text-white' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            
                            {currentInput && (
                                <div className="flex justify-end">
                                    <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-purple-300 text-purple-800 border-2 border-purple-400 border-dashed">
                                        {currentInput}...
                                    </div>
                                </div>
                            )}
                            
                            {isProcessing && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 px-4 py-3 rounded-2xl flex items-center space-x-2">
                                        <div className="loading-spinner"></div>
                                        <span className="text-gray-600">Dr. Jack is thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <input
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleTextSubmit}
                                disabled={!textInput.trim()}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
                                <i data-lucide="send" className="w-5 h-5"></i>
                            </button>
                        </div>
                        
                        <div className="flex items-center justify-center">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                                isActive 
                                    ? 'bg-green-500 text-white voice-button-active' 
                                    : 'bg-gray-400 text-white'
                            }`}>
                                <i data-lucide="mic" className="w-8 h-8"></i>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                            {isProcessing ? 'Dr. Jack is thinking...' : 
                             isSpeaking ? 'Dr. Jack is responding...' :
                             isActive ? 'Listening to your voice, or type above' : 'Voice assistant activated'}
                        </p>
                    </div>

                    <button 
                        onClick={handleClose}
                        className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('VoiceAssistant component error:', error);
        reportError(error);
    }
}
