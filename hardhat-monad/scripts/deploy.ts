// scripts/deploy.ts

async function main() {
  // Menghitung waktu 1 tahun di masa depan untuk `unlockTime`
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = (await ethers.provider.getBlock("latest"))!.timestamp + ONE_YEAR_IN_SECS;

  // Menentukan jumlah ETH yang akan dikunci
  const lockedAmount = ethers.parseEther("0.001");

  const Lock = await ethers.getContractFactory("Lock");

  // Kirim `unlockTime` sebagai argumen saat deploy
  // dan kirim `lockedAmount` karena constructor-nya 'payable'
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with 0.001 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}