const DomainHandler = {
    checkDomain() {
        const currentDomain = window.location.hostname;
        const unwantedKeywords = ['trickle', 'preview'];
        
        return unwantedKeywords.some(keyword => 
            currentDomain.toLowerCase().includes(keyword)
        );
    },

    showDomainNotice() {
        if (this.checkDomain()) {
            console.log('Currently using temporary domain, recommend configuring custom domain jecflow.com');
        }
    },

    getRecommendedDomain() {
        return 'jecflow.com';
    },

    init() {
        this.showDomainNotice();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updatePageMetadata();
            });
        } else {
            this.updatePageMetadata();
        }
    },

    updatePageMetadata() {
        const titleElement = document.querySelector('title');
        if (titleElement && this.checkDomain()) {
            titleElement.textContent = 'JEC Flow Platform - jecflow.com';
        }
    }
};

DomainHandler.init();
