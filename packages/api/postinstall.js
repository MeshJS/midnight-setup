#!/usr/bin/env node

/**
 * Post-install script to download ZK parameters
 * Runs automatically after npm install
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n📦 @meshsdk/midnight-setup - Setting up ZK parameters...\n');

// Find the script path (works both in development and after npm install)
const scriptPath = path.join(__dirname, 'fetch-zk-params.sh');

if (!fs.existsSync(scriptPath)) {
  console.warn('⚠️  fetch-zk-params.sh not found. Skipping ZK params download.');
  console.warn('   You can download them manually later with:');
  console.warn('   sh node_modules/@meshsdk/midnight-setup/fetch-zk-params.sh\n');
  process.exit(0);
}

try {
  // Make script executable
  fs.chmodSync(scriptPath, '755');
  
  // Execute the script
  execSync(`sh "${scriptPath}"`, { 
    stdio: 'inherit',
    cwd: process.cwd() // Run from user's project directory
  });
  
  console.log('\n✅ ZK parameters downloaded successfully!\n');
} catch (error) {
  console.warn('\n⚠️  Failed to download ZK parameters automatically.');
  console.warn('   This is usually fine - you can download them manually:');
  console.warn(`   sh node_modules/@meshsdk/midnight-setup/fetch-zk-params.sh`);
  console.warn('\n   Or set custom params directory:');
  console.warn(`   ZK_PARAMS_DIR=/custom/path sh node_modules/@meshsdk/midnight-setup/fetch-zk-params.sh\n`);
  
  // Don't fail the installation
  process.exit(0);
}

