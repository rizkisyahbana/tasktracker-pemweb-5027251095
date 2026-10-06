let tugas = [{id: 1, judul: "Contoh", matkul: "Web", deadline: "2026-12-01", selesai: false}];
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

render();