function RetreatExperiencePage({ isOpen, onClose }) {
    try {
        const retreatPrograms = [
            {
                id: 1,
                title: '巴厘岛心流静修',
                duration: '4天3晚',
                location: '巴厘岛乌布',
                price: '$1,800',
                image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                highlights: ['日出瑜伽', '冥想训练', '心流工作坊', '自然疗愈'],
                dates: ['2024年3月15-18日', '2024年4月12-15日', '2024年5月10-13日']
            },
            {
                id: 2,
                title: '马尔代夫海洋心流',
                duration: '5天4晚',
                location: '马尔代夫',
                price: '$2,500',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                highlights: ['海洋冥想', '浮潜体验', '沙滩静修', '星空观察'],
                dates: ['2024年2月20-24日', '2024年3月25-29日', '2024年4月22-26日']
            },
            {
                id: 3,
                title: '瑞士山地静修',
                duration: '6天5晚',
                location: '瑞士阿尔卑斯山',
                price: '$3,200',
                image: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                highlights: ['高山徒步', '雪山冥想', '温泉疗愈', '心流滑雪'],
                dates: ['2024年1月28-2月2日', '2024年2月25-3月2日', '2024年3月18-23日']
            }
        ];

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }, []);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold gradient-text">静修体验计划</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <i data-lucide="x" className="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {retreatPrograms.map((program) => (
                                <div key={program.id} className="retreat-card bg-white rounded-2xl overflow-hidden shadow-lg">
                                    <img src={program.image} alt={program.title} className="w-full h-48 object-cover"/>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                                        <p className="text-gray-600 mb-2">{program.duration} • {program.location}</p>
                                        
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">活动亮点:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {program.highlights.map((highlight, index) => (
                                                    <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                                                        {highlight}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h4 className="font-semibold mb-2">可选日期:</h4>
                                            {program.dates.map((date, index) => (
                                                <p key={index} className="text-sm text-gray-600">{date}</p>
                                            ))}
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-purple-600">起价 {program.price}</span>
                                            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
                                                立即预订
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute bottom-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2">
                        <i data-lucide="arrow-left" className="w-4 h-4"></i>
                        <span>退出</span>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RetreatExperiencePage component error:', error);
        reportError(error);
    }
}
