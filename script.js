/* ==================================== */
/* KOMENTAR: FUNGSI NAVIGASI MOBILE     */
/* ==================================== */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle (buka/tutup) menu saat tombol hamburger diklik
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat link navigasi diklik (agar lebih rapi di mobile)
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
});

/* ==================================== */
/* KOMENTAR: FUNGSI GARASI MOBIL (ADD TO GARAGE) */
/* ==================================== */
// Array untuk menyimpan mobil yang ditambahkan
const garage = [];
const garageCountElement = document.getElementById('garage-count');
const garageList = document.getElementById('garage-list');

const modal = document.getElementById('garage-modal');
const btn = document.getElementById('garage-btn');
const closeBtn = document.querySelector('.modal-content .close-btn');

// Fungsi untuk memperbarui tampilan garasi (modal dan counter)
function updateGarageDisplay() {
    garageList.innerHTML = '';
    
    if (garage.length === 0) {
        garageList.innerHTML = `<li id="empty-garage-msg">Your garage is currently empty. Add your favorite 911s!</li>`;
    } else {
        garage.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.model}</span>
                <span>$${item.price.toLocaleString('en-US')}</span>
                <button onclick="removeFromGarage(${index})" aria-label="Remove ${item.model}">Remove</button>
            `;
            garageList.appendChild(listItem);
        });
    }

    // Update jumlah mobil di header dan modal
    garageCountElement.textContent = garage.length;
    document.getElementById('modal-garage-count').textContent = garage.length;
}

// Fungsi untuk menambahkan mobil ke garasi
function addToGarage(model, price) {
    const newCar = { model: model, price: parseInt(price) };
    garage.push(newCar);
    updateGarageDisplay();
    alert(`${model} has been added to your Garage selection!`);
}

// Fungsi untuk menghapus mobil dari garasi (dibuat global agar bisa dipanggil dari onclick di HTML)
window.removeFromGarage = function(index) {
    garage.splice(index, 1); 
    updateGarageDisplay();
    if (garage.length === 0) {
        garageList.innerHTML = `<li id="empty-garage-msg">Your garage is currently empty. Add your favorite 911s!</li>`;
    }
}

// Event listener untuk tombol "Add to Garage" di setiap produk
document.querySelectorAll('.add-to-garage').forEach(button => {
    button.addEventListener('click', (e) => {
        // Ambil data dari atribut data-model dan data-price
        const model = e.target.getAttribute('data-model');
        const price = e.target.getAttribute('data-price');
        addToGarage(model, price);
    });
});

// Event listener untuk membuka modal garasi
btn.onclick = function() {
    modal.style.display = 'block';
    updateGarageDisplay(); // Pastikan garasi terbaru ditampilkan
}

// Event listener untuk menutup modal (tombol X)
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Event listener untuk menutup modal (klik di luar area modal)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Inisialisasi tampilan saat pertama kali dimuat
updateGarageDisplay();