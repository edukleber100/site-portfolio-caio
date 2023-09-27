const videos = document.querySelectorAll('video');

videos.forEach(video => {
    let isMuted = true;

    function toggleMutedState() {
        isMuted = !isMuted;
        video.muted = isMuted;
    }

    video.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen().then(() => {
                toggleMutedState();
                video.play();
            });
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen().then(() => {
                toggleMutedState();
                video.play();
            });
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
            video.webkitRequestFullscreen().then(() => {
                toggleMutedState();
                video.play();
            });
        }
    });

    video.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement === null) {
            video.muted = true;
            isMuted = true;
        }
    });

    video.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitIsFullScreen) {
            video.muted = true;
            isMuted = true;
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape" && (document.fullscreenElement || document.webkitIsFullScreen)) {
            if (!isMuted) {
                toggleMutedState();
            }
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });
});
