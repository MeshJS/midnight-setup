# Publishing @meshsdk/midnight-setup to npm

## Prerequisites

1. **npm Account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **Organization**: Create the `@meshsdk` organization on npm (if not already created)
3. **Login**: Login to npm from the terminal

```bash
npm login
```

## Publishing Steps

### 1. Build the Package

```bash
# From the root directory
yarn build:all

# Or just build the library package
cd packages/api
yarn build
```

### 2. Test the Package Locally (Optional)

Before publishing, you can test the package locally:

```bash
cd packages/api

# Create a tarball
npm pack

# This creates a file like: meshsdk-midnight-setup-1.0.0.tgz
# You can install this in another project to test:
# npm install /path/to/meshsdk-midnight-setup-1.0.0.tgz
```

### 3. Update Version (if needed)

```bash
cd packages/api

# Update version (patch, minor, or major)
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 4. Publish to npm

```bash
cd packages/api

# Publish to npm
npm publish

# For first-time publishing of a scoped package
npm publish --access public
```

### 5. Verify the Package

After publishing, verify it's available:

```bash
npm view @meshsdk/midnight-setup
```

Try installing it in a test project:

```bash
npm install @meshsdk/midnight-setup
```

## Publishing Checklist

Before publishing, make sure:

- [ ] All tests pass
- [ ] Build completes successfully (`yarn build:all`)
- [ ] README.md is complete and up-to-date
- [ ] package.json has correct version number
- [ ] package.json has correct repository URLs
- [ ] LICENSE file is included
- [ ] No sensitive information in the package
- [ ] .npmignore is properly configured
- [ ] TypeScript types are being exported correctly

## Automated Publishing with GitHub Actions (Optional)

You can automate publishing with GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: yarn install
      
      - name: Build
        run: yarn build:all
      
      - name: Publish to npm
        run: |
          cd packages/api
          npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Package Contents

The published package will include:

- `dist/` - Compiled JavaScript and TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT License
- `package.json` - Package metadata

Files excluded (via `.npmignore`):
- `src/` - Source TypeScript files
- `tsconfig*.json` - TypeScript configuration
- Test files
- Development configurations

## Update Repository URLs

Before publishing, make sure to update the repository URLs in `packages/api/package.json`:

```json
{
  "homepage": "https://github.com/MeshJS/midnight-setup",
  "repository": {
    "type": "git",
    "url": "https://github.com/MeshJS/midnight-setup.git"
  },
  "bugs": {
    "url": "https://github.com/MeshJS/midnight-setup/issues"
  }
}
```

## Post-Publishing

After publishing:

1. **Tag the Release on GitHub**:
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

2. **Create a GitHub Release**: Go to your GitHub repository and create a release with the changelog

3. **Announce**: Share on social media, Discord, etc.

4. **Update Documentation**: Update any external documentation with the new version

## Troubleshooting

### Error: 403 Forbidden

- Make sure you're logged in: `npm whoami`
- Verify you have permissions for the `@meshsdk` organization
- For first publish of scoped package, use `--access public`

### Error: Version Already Exists

- You can't republish the same version
- Update the version number in package.json

### Error: Missing Dependencies

- Make sure all dependencies are properly listed in package.json
- Use `peerDependencies` for large packages that users should install separately

## Support

For issues or questions:
- GitHub Issues: https://github.com/MeshJS/midnight-setup/issues
- Discord: https://discord.gg/meshjs

