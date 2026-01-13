const AudioService = {
    currentAudio: null,
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 0,
    progressCallback: null,

    sounds: {
        mood: 'https://cdn.freesound.org/previews/316/316847_5123451-lq.mp3',
        sleep: 'https://cdn.freesound.org/previews/316/316848_5123451-lq.mp3', 
        career: 'https://cdn.freesound.org/previews/316/316849_5123451-lq.mp3',
        inspiration: 'https://cdn.freesound.org/previews/316/316850_5123451-lq.mp3',
        journey: 'https://cdn.freesound.org/previews/316/316851_5123451-lq.mp3',
        sports: 'https://cdn.freesound.org/previews/316/316852_5123451-lq.mp3',
        moments: 'https://cdn.freesound.org/previews/316/316853_5123451-lq.mp3',
        flow: 'https://cdn.freesound.org/previews/316/316854_5123451-lq.mp3',
        learn: 'https://cdn.freesound.org/previews/316/316855_5123451-lq.mp3',
        services: 'https://cdn.freesound.org/previews/316/316856_5123451-lq.mp3',
        ritual: 'https://cdn.freesound.org/previews/317/317827_5123451-lq.mp3',
        breathing: 'https://cdn.freesound.org/previews/317/317828_5123451-lq.mp3',
        gratitude: 'https://cdn.freesound.org/previews/317/317829_5123451-lq.mp3',
        melatonin: 'https://cdn.freesound.org/previews/317/317830_5123451-lq.mp3',
        sleepbreath: 'https://cdn.freesound.org/previews/317/317831_5123451-lq.mp3'
    },

    soundNames: {
        mood: 'Gentle Rain',
        sleep: 'Rain Drops',
        career: 'Rain Storm', 
        inspiration: 'Ocean Rain',
        journey: 'Mountain Rain',
        sports: 'Forest Rain',
        moments: 'Light Rain',
        flow: 'Heavy Rain',
        learn: 'Soft Rain',
        services: 'Night Rain',
        ritual: 'Sacred Bells',
        breathing: 'Breathing Wind',
        gratitude: 'Gentle Breeze',
        melatonin: 'Night Wind',
        sleepbreath: 'Calm Wind'
    },

    play(soundKey, onProgress) {
        try {
            this.stop();
            this.progressCallback = onProgress;
            
            if (this.sounds[soundKey]) {
                this.currentAudio = new Audio(this.sounds[soundKey]);
                this.currentAudio.volume = 0.3;
                this.currentAudio.loop = true;
                
                this.currentAudio.addEventListener('loadedmetadata', () => {
                    if (this.currentAudio) {
                        this.duration = this.currentAudio.duration || 0;
                    }
                });
                
                this.currentAudio.addEventListener('timeupdate', () => {
                    if (this.currentAudio && this.progressCallback) {
                        this.currentTime = this.currentAudio.currentTime || 0;
                        this.progressCallback(this.currentTime, this.duration);
                    }
                });
                
                this.currentAudio.play().then(() => {
                    this.isPlaying = true;
                    this.isPaused = false;
                }).catch(error => {
                    console.log('Audio play failed:', error);
                    this.stop();
                });
            }
        } catch (error) {
            console.error('Audio service play error:', error);
            this.stop();
        }
    },

    pause() {
        try {
            if (this.currentAudio && this.isPlaying && !this.currentAudio.paused) {
                this.currentAudio.pause();
                this.isPaused = true;
                this.isPlaying = false;
            }
        } catch (error) {
            console.error('Audio service pause error:', error);
        }
    },

    resume() {
        try {
            if (this.currentAudio && this.isPaused) {
                this.currentAudio.play().then(() => {
                    this.isPaused = false;
                    this.isPlaying = true;
                }).catch(error => {
                    console.error('Audio resume failed:', error);
                });
            }
        } catch (error) {
            console.error('Audio service resume error:', error);
        }
    },

    stop() {
        try {
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
                this.currentAudio = null;
            }
            this.isPlaying = false;
            this.isPaused = false;
            this.currentTime = 0;
            this.duration = 0;
            this.progressCallback = null;
        } catch (error) {
            console.error('Audio service stop error:', error);
        }
    },

    setVolume(volume) {
        try {
            if (this.currentAudio) {
                this.currentAudio.volume = Math.max(0, Math.min(1, volume));
            }
        } catch (error) {
            console.error('Audio service volume error:', error);
        }
    },

    getSoundName(soundKey) {
        return this.soundNames[soundKey] || 'Nature Sound';
    }
};
