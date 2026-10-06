let tugas = [];
let filter = "semua";
 
const form = document.querySelector("#form");
const daftar = document.querySelector("#daftar");
const error = document.querySelector("#error");
const kosong = document.querySelector("#kosong");
const counter = document.querySelector("#counter");
const filterBar = document.querySelector("#filter");
 
function render() {
  daftar.textContent = "";
 
  const tampil = tugas.filter(function (t) {
    if (filter === "aktif") return !t.selesai;
    if (filter === "selesai") return t.selesai;
    return true;
  });
 
  for (const t of tampil) {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    if (t.selesai) li.classList.add("selesai");
 
    const cek = document.createElement("input");
    cek.type = "checkbox";
    cek.checked = t.selesai;
 
    const teks = document.createElement("span");
    teks.textContent = ` ${t.judul} (${t.matkul}) - ${t.deadline} `;
 
    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.className = "hapus";
 
    li.append(cek, teks, hapus);
    daftar.append(li);
  }
 
  kosong.hidden = tampil.length > 0;
  counter.textContent = tugas.filter((t) => !t.selesai).length + " tugas aktif";
 
  for (const b of filterBar.querySelectorAll("button")) {
    b.classList.toggle("on", b.dataset.filter === filter);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const judul = document.querySelector("#judul").value.trim();
  const matkul = document.querySelector("#matkul").value.trim();
  const deadline = document.querySelector("#deadline").value;
 
  if (judul.length < 3) {
    error.textContent = "Judul minimal 3 karakter.";
    return;
  }
  if (!deadline) {
    error.textContent = "Deadline wajib diisi.";
    return;
  }
 
  error.textContent = "";
  tugas.push({ id: Date.now(), judul, matkul, deadline, selesai: false });
  form.reset();
  render();
});
 
daftar.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
 
  if (e.target.matches(".hapus")) {
    tugas = tugas.filter((t) => t.id !== id);
  } else if (e.target.matches("input[type=checkbox]")) {
    const t = tugas.find((t) => t.id === id);
    t.selesai = e.target.checked;
  }
  render();
});
 
filterBar.addEventListener("click", function (e) {
  if (e.target.dataset.filter) {
    filter = e.target.dataset.filter;
    render();
  }
});

render();