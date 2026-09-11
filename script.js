// 1. Ambil Nama Tamu dari URL (Misal: namadomain.com/?to=Budi)
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if(guestName) {
    document.getElementById('guest-name').innerText = guestName;
}

// 2. Logika Buka Undangan & Play Musik
const coverOverlay = document.getElementById('cover-overlay');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let isPlaying = false;

function openInvitation() {
    coverOverlay.classList.add('open');
    document.body.style.overflowY = 'auto'; // Mengizinkan scroll
    musicBtn.style.display = 'flex';
    
    // Play audio
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('spin');
    }).catch(e => {
        console.log("Autoplay dicegah oleh browser. User harus menekan tombol musik.");
    });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('spin');
    } else {
        bgMusic.play();
        musicBtn.classList.add('spin');
    }
    isPlaying = !isPlaying;
}

// 3. Countdown Timer (Ubah tanggal sesuai kebutuhan)
const weddingDate = new Date("Dec 12, 2026 08:00:00").getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = days < 10 ? '0'+days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0'+hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0'+minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0'+seconds : seconds;
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "<h3>Acara Sedang Berlangsung</h3>";
    }
}, 1000);

// 4. Scroll Animation (Fade In saat elemen masuk viewport)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// 5. Submit Form RSVP dummy
document.getElementById('wishes-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih atas ucapan dan konfirmasinya!');
    this.reset();
});

// 6. Registrasi PWA Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Path menggunakan './' agar aman saat di-deploy di subfolder GitHub Pages
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
