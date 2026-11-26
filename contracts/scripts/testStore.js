const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const energyData = await hre.ethers.getContractAt("EnergyData", CONTRACT_ADDRESS);

  const _deviceId = "DHT11";
  const _humidity = "60";
  const _weight = "15.5";
  const _gas = "120";
  const hash =
    "467fd95471005594ea74d83b953625dbe8a1d759fd934cfd2d6d3389cfa3f677";
  

  const tx = await energyData.storeData(_deviceId, _humidity, _weight, _gas, hash);
  console.log("⛓️ tx sent:", tx.hash);

  await tx.wait();
  console.log("✅ tx mined");

  const count = await energyData.getCount();
  console.log("📦 count:", count.toString());

  const rec = await energyData.getRecord(0);
  console.log("📄 record[0]:", rec);
}

main().catch((e) => {
  console.error("❌ test failed:", e);
  process.exitCode = 1;
});