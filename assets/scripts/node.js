// TIPE DATA & VARIABEL
let daftarPesan = [];

// AMBIL DATA DARI LOCAL STORAGE
function ambilDariStorage() {
    let tersimpan = localStorage.getItem("pesanKu");
    if (tersimpan) {
        daftarPesan = JSON.parse(tersimpan);
    }
}

// SIMPAN KE LOCAL STORAGE
function simpanKeStorage() {
    localStorage.setItem("pesanKu", JSON.stringify(daftarPesan));
}

// TAMBAH PESAN
function tambahPesan(nama, email, pesan) {
    let pesanBaru = {
        id: Date.now(),
        nama: nama,
        email: email,
        pesan: pesan,
        waktu: new Date().toLocaleString()
    };
    daftarPesan.push(pesanBaru);
    simpanKeStorage();
    
    if (document.getElementById("daftarPesan")) {
        tampilkanSemuaPesan();
    }
}

// TAMPILKAN SEMUA PESAN + TOMBOL HAPUS
function tampilkanSemuaPesan() {
    let container = document.getElementById("daftarPesan");
    
    if (!container) return;
    
    if (daftarPesan.length === 0) {
        container.innerHTML = "<p>Belum ada pesan</p>";
        return;
    }  
    let hasil = "";
    for (let i = 0; i < daftarPesan.length; i++) {
        let p = daftarPesan[i];
        hasil += `
            <div class="pesan-item" data-id="${p.id}">
                <strong>${p.nama}</strong> 
                <small>${p.waktu}</small>
                <p>${p.pesan}</p>
                <button class="btn-hapus" data-id="${p.id}">Hapus</button>
            </div>
        `;
    }
    container.innerHTML = hasil;
    
    let tombolHapus = document.querySelectorAll(".btn-hapus");
    for (let i = 0; i < tombolHapus.length; i++) {
        tombolHapus[i].addEventListener("click", function() {
            let idPesan = Number(this.getAttribute("data-id"));
            hapusPesanById(idPesan);
        });
    }
}

// HAPUS PESAN BERDASARKAN ID
function hapusPesanById(id) {
    let pesanBaru = [];
    for (let i = 0; i < daftarPesan.length; i++) {
        if (daftarPesan[i].id !== id) {
            pesanBaru.push(daftarPesan[i]);
        }
    }
    daftarPesan = pesanBaru;
    simpanKeStorage();
    tampilkanSemuaPesan();
    alert("Pesan dihapus!");
}

// HANDLE FORM DI CONTACT.HTML
document.addEventListener("DOMContentLoaded", function() {
    ambilDariStorage();
    
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            
            let inputNama = document.getElementById("nama");
            let inputEmail = document.getElementById("email");
            let textareaPesan = document.getElementById("pesan");
            
            if (!inputNama || !inputEmail || !textareaPesan) return;
            
            let nama = inputNama.value;
            let email = inputEmail.value;
            let pesan = textareaPesan.value;
            
            if (nama === "" || email === "" || pesan === "") {
                alert("Semua harus diisi");
                return;
            }
            
            tambahPesan(nama, email, pesan);
            
            inputNama.value = "";
            inputEmail.value = "";
            textareaPesan.value = "";
            
            alert("Pesan terkirim!");
        });
    }
    
    if (document.getElementById("daftarPesan")) {
        tampilkanSemuaPesan();
    }
});