const ElevenLabsService = {
    apiKey: null,
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    baseUrl: 'https://api.elevenlabs.io/v1',
    currentAudio: null,

    init(apiKey) {
        this.apiKey = apiKey;
    },

    async speak(text, options = {}) {
        try {
            if (!text || !text.trim()) {
                throw new Error('No text provided for speech synthesis');
            }

            return this.fallbackSpeak(text);
            
        } catch (error) {
            console.error('Speech synthesis failed:', error);
            return this.fallbackSpeak(text);
        }
    },

    fallbackSpeak(text) {
        return new Promise((resolve) => {
            try {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                    
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = 0.8;
                    utterance.pitch = 0.9;
                    utterance.volume = 1.0;
                    utterance.lang = 'en-US';
                    
                    const setVoice = () => {
                        const voices = window.speechSynthesis.getVoices();
                        const preferredVoice = voices.find(voice => 
                            voice.lang.includes('en') && 
                            (voice.name.includes('Male') || 
                             voice.name.includes('Google') ||
                             voice.name.includes('Microsoft'))
                        ) || voices.find(voice => voice.lang.includes('en')) || voices[0];
                        
                        if (preferredVoice) {
                            utterance.voice = preferredVoice;
                        }
                        
                        utterance.onend = () => resolve();
                        utterance.onerror = () => resolve();
                        
                        try {
                            window.speechSynthesis.speak(utterance);
                        } catch (e) {
                            console.error('Speech error:', e);
                            resolve();
                        }
                    };

                    if (window.speechSynthesis.getVoices().length > 0) {
                        setVoice();
                    } else {
                        window.speechSynthesis.onvoiceschanged = setVoice;
                        setTimeout(setVoice, 1000);
                    }
                } else {
                    console.warn('Speech synthesis not supported');
                    resolve();
                }
            } catch (error) {
                console.error('Fallback speech error:', error);
                resolve();
            }
        });
    },

    stop() {
        try {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }
            
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } catch (error) {
            console.error('Failed to stop speech:', error);
        }
    },

    isPlaying() {
        return ('speechSynthesis' in window && window.speechSynthesis.speaking);
    }
};

ElevenLabsService.init(null);
