import fs from "fs-extra";
import path from "path";

const SOURCE_ROOT = path.resolve(__dirname, "../sdks");
const dest_param = process.argv[2];
if (!dest_param) {
  console.error(
    "Please provide a destination path: npm run migrate-modules <path-to-node-modules>"
  );
  process.exit(1);
}
const DEST_ROOT = path.resolve(dest_param);

// List of SDK packages to copy
const SDK_PACKAGES = [
  "permit2-sdk",
  "router-sdk",
  "sdk-core",
  "uniswapx-sdk",
  "universal-router-sdk",
  "v2-sdk",
  "v3-sdk",
  "v4-sdk",
];

async function copyDistFiles() {
  try {
    for (const pkg of SDK_PACKAGES) {
      const sourcePath = path.join(SOURCE_ROOT, pkg, "dist");

      console.log("sourcePath", sourcePath);

      const destPath = path.join(DEST_ROOT, "@uniswap", pkg, "dist");

      console.log("destPath", destPath);

      // Ensure source exists
      if (!fs.existsSync(sourcePath)) {
        console.error(`Source path doesn't exist: ${sourcePath}`);
        continue;
      }

      // Ensure destination directory exists
      await fs.ensureDir(path.dirname(destPath));

      // Delete existing dist folder if it exists
      if (fs.existsSync(destPath)) {
        console.log(`🚨 Deleting existing dist folder: ${destPath}`);
        await fs.remove(destPath);
        console.log(`✅ Deleted ${destPath}`);
      }

      // Copy dist folder as fresh copy
      await fs.copy(sourcePath, destPath);

      console.log(`✅ Copied ${pkg} dist files`);
    }
    console.log("All dist files copied successfully!");
  } catch (error) {
    console.error("Error copying dist files:", error);
    process.exit(1);
  }
}

copyDistFiles();
