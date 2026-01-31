# SBOM

This project publishes a CycloneDX Software Bill of Materials (SBOM).

## Generate

From the repo root:

```sh
corepack enable
npm_config_yes=true npx @cyclonedx/cyclonedx-npm --output-file sbom.cdx.json --output-format json
```

Commit the updated `sbom.cdx.json` to the repository.

## Validate (basic)

Parse the file and print key fields:

```sh
node -e "const fs=require('fs');const d=JSON.parse(fs.readFileSync('sbom.cdx.json','utf8'));console.log('bomFormat:',d.bomFormat);console.log('specVersion:',d.specVersion);console.log('version:',d.version);console.log('components:',(d.components||[]).length);"
```

## Current File

- `sbom.cdx.json` (CycloneDX JSON format)
