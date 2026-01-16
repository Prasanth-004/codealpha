// Sample images data
const images = [
    { src: 'https://picsum.photos/400/300?random=1', category: 'all', alt: 'Image 1' },
    { src: 'https://picsum.photos/400/300?random=2', category: 'family', alt: 'Family Image 1' },
    { src: 'https://picsum.photos/400/300?random=3', category: 'albums', alt: 'Album Image 1' },
    { src: 'https://picsum.photos/400/300?random=4', category: 'all', alt: 'Image 2' },
    { src: 'https://picsum.photos/400/300?random=5', category: 'family', alt: 'Family Image 2' },
    { src: 'https://picsum.photos/400/300?random=6', category: 'albums', alt: 'Album Image 2' },
    { src: 'https://picsum.photos/400/300?random=7', category: 'all', alt: 'Image 3' },
    { src: 'https://picsum.photos/400/300?random=8', category: 'family', alt: 'Family Image 3' },
    { src: 'https://picsum.photos/400/300?random=9', category: 'albums', alt: 'Album Image 3' },
    { src: 'https://picsum.photos/400/300?random=10', category: 'all', alt: 'Image 4' },
    { src: 'https://picsum.photos/400/300?random=11', category: 'family', alt: 'Family Image 4' },
    { src: 'https://picsum.photos/400/300?random=12', category: 'albums', alt: 'Album Image 4' },
];

let currentIndex = 0;
let filteredImages = images;

// Load gallery
function loadGallery(filter = 'all') {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
    filteredImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" data-index="${index}">
            <div class="overlay">
                <span>View</span>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// Open lightbox
function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    img.src = filteredImages[currentIndex].src;
    img.alt = filteredImages[currentIndex].alt;
    lightbox.style.display = 'flex';
}

// Close lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Change image
function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = filteredImages.length - 1;
    if (currentIndex >= filteredImages.length) currentIndex = 0;
    const img = document.getElementById('lightbox-img');
    img.src = filteredImages[currentIndex].src;
    img.alt = filteredImages[currentIndex].alt;
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        loadGallery(btn.dataset.filter);
    });
});

// Close lightbox on click outside
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Initial load
loadGallery();