// scripts/deploy-geodata.ts
import { ethers } from "hardhat";

async function main() {
  console.log("Mempersiapkan pabrik kontrak GeoDataStorage...");
  const GeoDataStorage = await ethers.getContractFactory("GeoDataStorage");

  console.log("Men-deploy kontrak...");
  const geoDataStorage = await GeoDataStorage.deploy();

  // Ganti .deployed() dengan .waitForDeployment()
  await geoDataStorage.waitForDeployment();

  // Ganti .address dengan await .getAddress()
  const deployedAddress = await geoDataStorage.getAddress();
  console.log(`✅ Kontrak GeoDataStorage berhasil di-deploy ke alamat: ${deployedAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});