// scripts/checkPoints.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  // 1) Your deployed GeoDataStorage address
  const CONTRACT_ADDRESS = "0x00f91460cde919760e0a0af02d5d8d0b0480d154";

  // 2) Show us what RPC URL we’re actually using
  console.log("🔗 RPC_URL =", process.env.RPC_URL);

  // 3) Grab ethers & provider
  const { ethers } = hre;
  const provider = ethers.provider;

  // 4) What network is this provider on?
  const net = await provider.getNetwork();
  console.log("🌐 Network:", net);

  // 5) Do we even have code at the address?
  const code = await provider.getCode(CONTRACT_ADDRESS);
  console.log("📦 Code at address (first 10 chars):", code.slice(0, 10));

  if (code === "0x") {
    console.error("❌ No contract code found at that address! Check your address or RPC.");
    process.exit(1);
  }

  // 6) OK, attach & fetch data
  const geo = await ethers.getContractAt("GeoDataStorage", CONTRACT_ADDRESS);
  const total = await geo.totalPoints();
  console.log("📊 Total points on-chain:", total.toString());

  // 7) Fetch a sample point
  const p1 = await geo.getPoint(1);
  console.log("🔎 Point #1 data:", [
    p1[0].toString(),
    p1[1],
    p1[2].toString(),
    p1[3].toString(),
    p1[4].toString(),
    p1[5].toString(),
  ]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
