// scripts/uploadPoints.ts
import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  // GANTI DENGAN ALAMAT KONTRAK ANDA YANG BENAR
  const contractAddress = "0x3156d5001D3665E011E932AeCF48a75F4AF87a9C";

  // 1. Baca file JSON
  const jsonFilePath = path.join(__dirname, "../koordinat_gps_decimal.json");
  const fileContent = fs.readFileSync(jsonFilePath, "utf-8");
  const dataPoints = JSON.parse(fileContent);

  // 2. Sambungkan ke kontrak yang sudah di-deploy
  const geoStorage = await ethers.getContractAt("GeoDataStorage", contractAddress);
  console.log(`Terhubung ke kontrak di alamat: ${await geoStorage.getAddress()}`);

  // Presisi untuk mengubah angka desimal menjadi integer (10^6 untuk 6 desimal)
  const PRECISION = 1000000;

  // 3. Loop melalui setiap data point dan kirim ke blockchain
  for (const point of dataPoints) {
    console.log(`Mengirim data untuk Code: ${point.Code} (ID dari JSON: ${point.Name})...`);

    const latInt = Math.round(point["Latitude_decimal"] * PRECISION);
    const lonInt = Math.round(point["Longitude_decimal"] * PRECISION);
    const elevInt = Math.round(point["Elevation"] * PRECISION);

    // Panggil fungsi dengan 4 argumen yang benar, sesuai urutan di smart contract
    const tx = await geoStorage.addPoint(
      point.Code, // Argumen pertama adalah string 'code'
      latInt,
      lonInt,
      elevInt
    );

    // Tunggu transaksi selesai
    await tx.wait();
    console.log(`  -> Sukses! Transaksi hash: ${tx.hash}`);
  }

  console.log("✅ Semua data berhasil di-upload ke blockchain!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});