document.addEventListener("DOMContentLoaded", () => {
  const formPenjualan = document.getElementById("form-penjualan");
  const formPembelian = document.getElementById("form-pembelian");
  const daftarStok = document.getElementById("daftar-stok");
  const laporanTransaksi = document.getElementById("laporan-transaksi");

  const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
  const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  if (formPenjualan) {
    formPenjualan.onsubmit = (e) => {
      e.preventDefault();
      const barang = document.getElementById("barang").value;
      const jumlah = parseInt(document.getElementById("jumlah").value);
      const harga = parseInt(document.getElementById("harga").value);
      const stok = getData("stok");
      const transaksi = getData("transaksi");

      let barangAda = stok.find(item => item.nama === barang);
      if (barangAda) {
  barangAda.jumlah += jumlah;
} else {
  stok.push({ nama: barang, jumlah }); // ini dia! langsung pakai jumlah
}

      transaksi.push({ barang, jumlah, harga, jenis: "penjualan", waktu: new Date().toISOString() });

      setData("stok", stok);
      setData("transaksi", transaksi);
      alert("Penjualan disimpan!");
      formPenjualan.reset();
    };
  }

  if (formPembelian) {
    formPembelian.onsubmit = (e) => {
      e.preventDefault();
      const barang = document.getElementById("barang").value;
      const jumlah = parseInt(document.getElementById("jumlah").value);
      const stok = getData("stok");
      const transaksi = getData("transaksi");

      let barangAda = stok.find(item => item.nama === barang);
      if (barangAda) barangAda.jumlah += jumlah;
      else stok.push({ nama: barang, jumlah });

      transaksi.push({ barang, jumlah, harga: 0, jenis: "pembelian", waktu: new Date().toISOString() });

      setData("stok", stok);
      setData("transaksi", transaksi);
      alert("Pembelian disimpan!");
      formPembelian.reset();
    };
  }

  if (daftarStok) {
    const stok = getData("stok");
    daftarStok.innerHTML = stok.map(item => `<li>${item.nama}: ${item.jumlah}</li>`).join("");
  }

  if (laporanTransaksi) {
    const transaksi = getData("transaksi");
    laporanTransaksi.innerHTML = transaksi.map(item =>
      `<li>[${item.jenis}] ${item.barang} - ${item.jumlah} @ ${item.harga || '-'} (${new Date(item.waktu).toLocaleString()})</li>`
    ).join("");
  }
});