function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState(null);
        const [showLogin, setShowLogin] = React.useState(false);
        const [showRegister, setShowRegister] = React.useState(false);
        const [showDashboard, setShowDashboard] = React.useState(false);
        const [showVoiceChat, setShowVoiceChat] = React.useState(false);
        const [showOrderModal, setShowOrderModal] = React.useState(false);
        const [showOrderHistory, setShowOrderHistory] = React.useState(false);
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [selectedProduct, setSelectedProduct] = React.useState(null);
        const [selectedOrder, setSelectedOrder] = React.useState(null);
        const [user, setUser] = React.useState(null);

        React.useEffect(() => {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
            
            const savedUser = AuthService.getCurrentUser();
            if (savedUser) {
                setUser(savedUser);
            }
        }, []);

        const handleLogin = () => setShowLogin(true);
        const handleLogout = () => {
            AuthService.logout();
            setUser(null);
            setShowDashboard(false);
            localStorage.removeItem('jecMemberAuth');
            window.location.reload();
        };

        const handleLoginSuccess = (userData) => {
            setUser(userData);
            setShowLogin(false);
        };

        const handleStartExperience = () => {
            if (typeof window.EMRPanel !== 'undefined' && window.EMRPanel.open) {
                window.EMRPanel.open();
            } else if (user) {
                setShowDashboard(true);
            } else {
                setShowLogin(true);
            }
        };

        const handleOrder = (product) => {
            setSelectedProduct(product);
            setShowOrderModal(true);
        };

        const handlePayOrder = (order) => {
            setSelectedOrder(order);
            setShowPaymentModal(true);
        };

        const handleBenefitClick = (benefitId) => {
            setCurrentPage(benefitId);
        };

        const handleSectionClick = (section) => {
            setCurrentPage(section);
        };

        const closePage = () => setCurrentPage(null);

        const renderCurrentPage = () => {
            switch (currentPage) {
                case 'sports':
                    return React.createElement(SportsSocialPage, {
                        isOpen: true,
                        onClose: closePage,
                        user: user
                    });
                case 'ritual':
                    return React.createElement(RitualMeditationPage, {
                        isOpen: true,
                        onClose: closePage,
                        user: user
                    });
                case 'emotion':
                    return React.createElement(NutritionalRhythmPage, {
                        isOpen: true,
                        onClose: closePage,
                        user: user
                    });
                case 'career':
                    return React.createElement(CareerRhythmPage, {
                        isOpen: true,
                        onClose: closePage,
                        user: user
                    });
                case 'sleep':
                    return React.createElement(SleepWellPage, {
                        isOpen: true,
                        onClose: closePage
                    });
                case 'journey':
                    return React.createElement(FlowJourneyPage, {
                        isOpen: true,
                        onClose: closePage
                    });
                case 'services':
                    return React.createElement(ServicesPage, {
                        isOpen: true,
                        onClose: closePage,
                        user: user,
                        onOrder: handleOrder
                    });
                case 'learn':
                    return React.createElement(LearnMorePage, {
                        isOpen: true,
                        onClose: closePage
                    });
                case 'sports':
                    return React.createElement(SportsSocialPage, {
                        isOpen: true,
                        onClose: closePage
                    });
                case 'moments':
                    return React.createElement(HighlightMomentsPage, {
                        isOpen: true,
                        onClose: closePage
                    });
                case 'flow':
                    return React.createElement(CareerFlowPage, {
                        isOpen: true,
                        onClose: closePage
                    });
                default:
                    return null;
            }
        };

        const childComponents = [
            React.createElement(Header, {
                key: 'header',
                onStartExperience: handleStartExperience,
                onLearnMore: () => setCurrentPage('learn'),
                onServices: () => setCurrentPage('services'),
                onLogin: handleLogin,
                user: user,
                onLogout: handleLogout
            }),
            React.createElement(HeroSection, {
                key: 'hero',
                onStartJourney: () => setCurrentPage('journey'),
                onLearnMore: () => setCurrentPage('learn')
            }),
            React.createElement(BenefitsList, {
                key: 'benefits',
                onBenefitClick: handleBenefitClick
            }),
            React.createElement(PlatformInfo, {
                key: 'platform',
                onSectionClick: handleSectionClick
            }),
            React.createElement(EmailSubscriptionSection, {
                key: 'subscription'
            })
        ];

        // Add current page if it exists
        const currentPageElement = renderCurrentPage();
        if (currentPageElement) {
            childComponents.push(React.cloneElement(currentPageElement, { key: `page-${currentPage}` }));
        }

        // Add modals with conditional rendering
        if (showLogin) {
            childComponents.push(React.createElement(LoginModal, {
                key: 'login',
                isOpen: showLogin,
                onClose: () => setShowLogin(false),
                onSwitchToRegister: () => {
                    setShowLogin(false);
                    setShowRegister(true);
                },
                onLoginSuccess: handleLoginSuccess
            }));
        }

        if (showRegister) {
            childComponents.push(React.createElement(RegisterModal, {
                key: 'register',
                isOpen: showRegister,
                onClose: () => setShowRegister(false),
                onSwitchToLogin: () => {
                    setShowRegister(false);
                    setShowLogin(true);
                },
                onRegisterSuccess: handleLoginSuccess
            }));
        }

        if (showDashboard) {
            childComponents.push(React.createElement(UserDashboard, {
                key: 'dashboard',
                user: user,
                isOpen: showDashboard,
                onClose: () => setShowDashboard(false),
                onStartVoiceChat: () => setShowVoiceChat(true),
                onViewOrders: () => setShowOrderHistory(true)
            }));
        }

        if (showVoiceChat) {
            childComponents.push(React.createElement(VoiceAssistant, {
                key: 'voice',
                isOpen: showVoiceChat,
                onClose: () => setShowVoiceChat(false),
                user: user
            }));
        }

        if (showOrderModal) {
            childComponents.push(React.createElement(OrderModal, {
                key: 'order',
                isOpen: showOrderModal,
                onClose: () => setShowOrderModal(false),
                product: selectedProduct,
                user: user,
                onOrderSuccess: () => {
                    setShowOrderModal(false);
                    setShowOrderHistory(true);
                },
                onPayOrder: handlePayOrder
            }));
        }

        if (showOrderHistory) {
            childComponents.push(React.createElement(OrderHistory, {
                key: 'history',
                isOpen: showOrderHistory,
                onClose: () => setShowOrderHistory(false),
                user: user,
                onPayOrder: handlePayOrder
            }));
        }

        if (showPaymentModal) {
            childComponents.push(React.createElement(PaymentModal, {
                key: 'payment',
                isOpen: showPaymentModal,
                onClose: () => setShowPaymentModal(false),
                order: selectedOrder,
                onPaymentSuccess: () => {
                    setShowPaymentModal(false);
                    alert('Payment successful!');
                }
            }));
        }

        return React.createElement('div', { className: 'min-h-screen' }, childComponents);
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
