function DataExportModal({ isOpen, onClose, user }) {
    try {
        const [journalTypes, setJournalTypes] = React.useState([]);
        const [selectedType, setSelectedType] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [exportStats, setExportStats] = React.useState({});

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        React.useEffect(() => {
            if (isOpen && user) {
                loadJournalTypes();
            }
        }, [isOpen, user]);

        const loadJournalTypes = async () => {
            try {
                const types = [
                    { key: 'sports_journal', name: 'Sports Social Journey', icon: 'activity' },
                    { key: 'highlight_emotion', name: 'Highlight Moments Journey', icon: 'star' },
                    { key: 'career_journal', name: 'Career Flow Journey', icon: 'trending-up' },
                    { key: 'sleep_journal', name: 'Dream Dialogue Journey', icon: 'moon' }
                ];

                const stats = {};
                for (const type of types) {
                    try {
                        const logs = await trickleListObjects(`${type.key}:${user.phone}`, 21, true);
                        stats[type.key] = logs.items.length;
                    } catch (error) {
                        stats[type.key] = 0;
                    }
                }

                setJournalTypes(types);
                setExportStats(stats);
            } catch (error) {
                console.error('Failed to load journal types:', error);
            }
        };

        const handleExport = async () => {
            if (!selectedType) return;

            try {
                setLoading(true);
                const logs = await trickleListObjects(`${selectedType}:${user.phone}`, 21, true);
                const logData = logs.items.map(item => item.objectData);
                
                const reportContent = await ExportService.generateReport(user.phone, selectedType, logData);
                const filename = `JEC_${ExportService.getJournalTypeName(selectedType).replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.txt`;
                
                ExportService.downloadAsText(reportContent, filename);
                alert('Report downloaded successfully!');
            } catch (error) {
                console.error('Failed to export data:', error);
                alert('Export failed. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">Export Journey Data</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Select Journey to Export</h3>
                                <div className="grid gap-4">
                                    {journalTypes.map((type) => (
                                        <label key={type.key} className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="radio"
                                                name="journalType"
                                                value={type.key}
                                                checked={selectedType === type.key}
                                                onChange={(e) => setSelectedType(e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <i data-lucide={type.icon} className="w-5 h-5 text-blue-600"></i>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{type.name}</h4>
                                                <p className="text-sm text-gray-600">{exportStats[type.key]} days completed</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleExport}
                                disabled={loading || !selectedType}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
                                {loading ? 'Generating Report...' : 'Download Report'}
                            </button>
                        </div>
                    </div>

                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>Close</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('DataExportModal component error:', error);
        reportError(error);
    }
}
