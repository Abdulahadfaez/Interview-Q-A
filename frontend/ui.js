(() => {
    function ensureToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.position = 'fixed';
            container.style.top = '20px';
            container.style.right = '20px';
            container.style.zIndex = '9999';
            container.style.display = 'grid';
            container.style.gap = '10px';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type = 'info') {
        const container = ensureToastContainer();
        const toast = document.createElement('div');
        const colors = {
            info: '#2563eb',
            success: '#16a34a',
            error: '#dc2626'
        };

        toast.textContent = message;
        toast.style.background = colors[type] || colors.info;
        toast.style.color = 'white';
        toast.style.padding = '12px 16px';
        toast.style.borderRadius = '12px';
        toast.style.boxShadow = '0 16px 40px rgba(15, 23, 42, 0.2)';
        toast.style.fontSize = '14px';
        toast.style.maxWidth = '320px';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        container.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 250);
        }, 3000);
    }

    function ensurePageLoader() {
        let overlay = document.getElementById('page-loader');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'page-loader';
            overlay.innerHTML = '<div class="loader-spinner"></div><div class="loader-text">Loading...</div>';
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.background = 'rgba(15, 23, 42, 0.45)';
            overlay.style.backdropFilter = 'blur(4px)';
            overlay.style.display = 'none';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.flexDirection = 'column';
            overlay.style.gap = '14px';
            overlay.style.zIndex = '9998';
            overlay.style.color = 'white';

            const style = document.createElement('style');
            style.textContent = `
                #page-loader .loader-spinner {
                    width: 54px;
                    height: 54px;
                    border: 4px solid rgba(255,255,255,0.35);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: ui-spin 0.75s linear infinite;
                }
                #page-loader .loader-text {
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                }
                @keyframes ui-spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(overlay);
        }
        return overlay;
    }

    function showPageLoader(text = 'Loading...') {
        const overlay = ensurePageLoader();
        overlay.querySelector('.loader-text').textContent = text;
        overlay.style.display = 'flex';
    }

    function hidePageLoader() {
        const overlay = document.getElementById('page-loader');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    window.ui = {
        showToast,
        showPageLoader,
        hidePageLoader
    };
})();
