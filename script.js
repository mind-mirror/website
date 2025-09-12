// Download availability system
const DOWNLOAD_CONFIG = {
    available: false, // Set to true when ready for download
    platforms: {
        windows: { available: false, url: '#' },
        mac: { available: false, url: '#' },
        linux: { available: false, url: '#' }
    }
};

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Download system
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadStatus = document.getElementById('download-status');
    
    downloadButtons.forEach(button => {
        const platform = button.dataset.platform;
        const platformConfig = DOWNLOAD_CONFIG.platforms[platform];
        
        if (!platformConfig.available) {
            button.classList.add('disabled');
        }
        
        button.addEventListener('click', function() {
            if (platformConfig.available) {
                // Redirect to download
                window.open(platformConfig.url, '_blank');
                showDownloadStatus('Download started!', 'available');
            } else {
                showDownloadStatus('Downloads are not yet available. Coming soon!', 'unavailable');
            }
        });
    });
    
    // Show initial status
    if (!DOWNLOAD_CONFIG.available) {
        showDownloadStatus('Downloads coming soon! Sign up for updates.', 'unavailable');
    }
});

function showDownloadStatus(message, type) {
    const statusElement = document.getElementById('download-status');
    statusElement.textContent = message;
    statusElement.className = `download-status ${type}`;
}

// Enable downloads (call this function when ready)
function enableDownloads(platformUrls = {}) {
    DOWNLOAD_CONFIG.available = true;
    
    Object.keys(platformUrls).forEach(platform => {
        if (DOWNLOAD_CONFIG.platforms[platform]) {
            DOWNLOAD_CONFIG.platforms[platform].available = true;
            DOWNLOAD_CONFIG.platforms[platform].url = platformUrls[platform];
        }
    });
    
    // Remove disabled class from buttons
    document.querySelectorAll('.download-btn').forEach(button => {
        const platform = button.dataset.platform;
        if (DOWNLOAD_CONFIG.platforms[platform].available) {
            button.classList.remove('disabled');
        }
    });
    
    showDownloadStatus('Downloads are now available!', 'available');
}

// Example usage to enable downloads:
// enableDownloads({
//     windows: 'https://releases.mindmirror.app/windows/MindMirror-Setup.exe',
//     mac: 'https://releases.mindmirror.app/mac/MindMirror.dmg',
//     linux: 'https://releases.mindmirror.app/linux/MindMirror.AppImage'
// });

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});