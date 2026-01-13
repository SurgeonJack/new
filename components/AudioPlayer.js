function AudioPlayer({ soundKey, className = "" }) {
    try {
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [isPaused, setIsPaused] = React.useState(false);
        const [volume, setVolume] = React.useState(0.3);
        const [currentTime, setCurrentTime] = React.useState(0);
        const [duration, setDuration] = React.useState(0);
        const [error, setError] = React.useState(false);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, [isPlaying, isPaused]);

        React.useEffect(() => {
            return () => {
                AudioService.stop();
            };
        }, []);

        const handleProgress = (current, total) => {
            setCurrentTime(current);
            setDuration(total);
            setError(false);
        };

        const togglePlay = () => {
            try {
                if (isPlaying) {
                    AudioService.pause();
                    setIsPlaying(false);
                    setIsPaused(true);
                } else if (isPaused) {
                    AudioService.resume();
                    setIsPlaying(true);
                    setIsPaused(false);
                } else {
                    AudioService.play(soundKey, handleProgress);
                    setIsPlaying(true);
                    setIsPaused(false);
                    setError(false);
                }
            } catch (err) {
                console.error('Audio toggle failed:', err);
                setError(true);
                setIsPlaying(false);
                setIsPaused(false);
            }
        };

        const handleVolumeChange = (e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            AudioService.setVolume(newVolume);
        };

        const formatTime = (time) => {
            if (!time || isNaN(time)) return '0:00';
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };

        const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

        return (
            <div className={`bg-white bg-opacity-90 rounded-xl p-4 ${className}`}>
                <div className="flex items-center space-x-3 mb-3">
                    <button
                        onClick={togglePlay}
                        disabled={error}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            error ? 'bg-gray-400 text-white cursor-not-allowed' :
                            isPlaying ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-white hover:bg-green-600'
                        }`}>
                        <i data-lucide={error ? 'alert-circle' : isPlaying ? 'pause' : 'play'} className="w-5 h-5"></i>
                    </button>
                    
                    <span className="text-sm text-gray-700 flex-1">
                        {error ? 'Audio unavailable' : AudioService.getSoundName(soundKey)}
                    </span>
                    
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        disabled={error}
                        className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
                    />
                </div>
                
                <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                                error ? 'bg-gray-400' : 'bg-blue-500'
                            }`}
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('AudioPlayer component error:', error);
        reportError(error);
    }
}
