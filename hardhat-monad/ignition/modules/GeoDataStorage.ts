import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GeoDataStorageModule = buildModule("GeoDataStorageModule", (m) => {
  const geoDataStorage = m.contract("GeoDataStorage");

  return { geoDataStorage }; // << PENTING: Harus ada 'return'
});

export default GeoDataStorageModule;
