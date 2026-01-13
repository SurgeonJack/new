const VoiceService = {
    recognition: null,
    synthesis: null,
    isInitialized: false,
    isPaused: false,
    currentUtterance: null,
    isListening: false,
    silenceTimer: null,
    autoListening: false,

    init() {
        if (this.isInitialized) return;
        
        try {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = true;
                this.recognition.interimResults = true;
                this.recognition.lang = 'en-US';
                this.recognition.maxAlternatives = 1;
            }

            if ('speechSynthesis' in window) {
                this.synthesis = window.speechSynthesis;
            }
            
            this.isInitialized = true;
        } catch (error) {
            console.error('Voice service initialization failed:', error);
        }
    },

    startAutoListening(onResult, onError, onFinalResult) {
        this.init();
        
        if (!this.recognition) {
            if (onError) onError('Browser does not support speech recognition');
            return;
        }

        this.autoListening = true;
        this.isListening = true;
        let finalTranscript = '';
        let interimTranscript = '';

        this.recognition.onresult = (event) => {
            interimTranscript = '';
            finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if ((finalTranscript + interimTranscript).trim() && this.synthesis && this.synthesis.speaking) {
                this.synthesis.cancel();
            }

            if (onResult) {
                onResult(finalTranscript + interimTranscript, false);
            }

            if (finalTranscript) {
                clearTimeout(this.silenceTimer);
                this.silenceTimer = setTimeout(() => {
                    if (finalTranscript.trim() && onFinalResult) {
                        onFinalResult(finalTranscript.trim());
                        finalTranscript = '';
                        interimTranscript = '';
                    }
                }, 1500);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            if (event.error !== 'no-speech') {
                setTimeout(() => {
                    if (this.autoListening) {
                        this.startAutoListening(onResult, onError, onFinalResult);
                    }
                }, 1000);
            }
        };

        this.recognition.onend = () => {
            if (this.autoListening) {
                setTimeout(() => {
                    if (this.autoListening) {
                        try {
                            this.recognition.start();
                        } catch (error) {
                            console.warn('Failed to restart speech recognition:', error);
                        }
                    }
                }, 100);
            }
        };

        try {
            this.recognition.start();
        } catch (error) {
            console.error('Failed to start speech recognition:', error);
            this.isListening = false;
            if (onError) onError('Unable to start speech recognition');
        }
    },

    stopAutoListening() {
        this.autoListening = false;
        this.isListening = false;
        clearTimeout(this.silenceTimer);
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (error) {
                console.warn('Failed to stop speech recognition:', error);
            }
        }
    },

    speak(text, onStart, onEnd) {
        this.init();
        
        if (!this.synthesis) {
            console.warn('Browser does not support speech synthesis');
            return;
        }

        try {
            this.synthesis.cancel();
            this.currentUtterance = new SpeechSynthesisUtterance(text);
            this.currentUtterance.lang = 'en-US';
            this.currentUtterance.rate = 0.9;
            this.currentUtterance.pitch = 1.0;
            this.currentUtterance.volume = 0.8;
            
            if (onStart) {
                this.currentUtterance.onstart = onStart;
            }
            
            if (onEnd) {
                this.currentUtterance.onend = onEnd;
            }
            
            this.synthesis.speak(this.currentUtterance);
        } catch (error) {
            console.error('Speech synthesis failed:', error);
        }
    },

    pauseSpeech() {
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.pause();
            this.isPaused = true;
        }
    },

    resumeSpeech() {
        if (this.synthesis && this.synthesis.paused) {
            this.synthesis.resume();
            this.isPaused = false;
        }
    },

    stopSpeech() {
        if (this.synthesis) {
            this.synthesis.cancel();
            this.isPaused = false;
            this.currentUtterance = null;
        }
    },

    isSpeaking() {
        return this.synthesis && this.synthesis.speaking;
    },

    async getJackResponse(userMessage, chatHistory) {
        try {
            const systemPrompt = `You are Dr. Jack, a warm, professional flow mentor and surgeon. You have 12 years of flow research experience and have been featured in European newspapers.

Your characteristics:
- Warm, professional, and empathetic
- Expert in flow science and mental wellness guidance
- Able to provide practical advice and methods
- Keep responses concise and clear, usually 2-3 sentences

Please provide targeted flow guidance based on the user's questions.

Chat history: ${JSON.stringify(chatHistory.slice(-5))}`;

            const response = await invokeAIAgent(systemPrompt, userMessage);
            return response || 'I understand your feelings. Let\'s find suitable flow methods together.';
        } catch (error) {
            console.error('Failed to get AI response:', error);
            return 'Sorry, I can\'t respond right now. But we can try some simple breathing exercises to relax.';
        }
    }
};

if (typeof window !== 'undefined') {
    VoiceService.init();
}
