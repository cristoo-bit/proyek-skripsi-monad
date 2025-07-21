const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("▶ uploadPoints.js loaded");

  // 1) Your deployed GeoDataStorage address:
  const CONTRACT_ADDRESS = "0x00f91460cde919760e0a0af02d5d8d0b0480d154";

  // 2) Grab ethers from the Hardhat runtime
  const { ethers } = hre;
  console.log(`🎯 Using ethers version: ${ethers ? "loaded" : "MISSING"}`);

  // 3) Get contract instance
  const geo = await ethers.getContractAt("GeoDataStorage", CONTRACT_ADDRESS);
  console.log(`🔗 Connected to GeoDataStorage at ${CONTRACT_ADDRESS}`);

  // 4) Load JSON
  const filePath = path.join(__dirname, "..", "koordinat_gps_decimal.json");
  console.log("📂 Reading JSON from:", filePath);
  if (!fs.existsSync(filePath)) {
    console.error("❌ JSON file not found!");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log(`✅ Loaded ${data.length} points`);

  // 5) Loop and send on-chain
  for (const pt of data) {
    const lat  = Math.round(pt.Latitude_decimal * 1e9);
    const lon  = Math.round(pt.Longitude_decimal * 1e9);
    const elev = Math.round(pt.Elevation);

    console.log(`⏳ Uploading #${pt.Name} (${pt.Code}): lat=${lat},lon=${lon},elev=${elev}`);
    const tx = await geo.addPoint(pt.Code, lat, lon, elev);
    await tx.wait();
    console.log(`✅ #${pt.Name} txHash: ${tx.hash}`);
  }

  console.log("🎉 All GPS points uploaded!");
}

main().catch((e) => {
  console.error("❌ uploadPoints.js error:", e);
  process.exit(1);
});
