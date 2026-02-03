# GitHub Pages Setup Instructions

Your repository is now configured with automated GitHub Pages deployment! 🎉

## Automatic Deployment

A GitHub Actions workflow has been set up to automatically:
1. Build the Next.js application
2. Generate static files in the `out/` folder
3. Deploy to GitHub Pages

This happens automatically on every push to the `main` branch.

## Enable GitHub Pages (One-Time Setup)

Follow these steps to enable GitHub Pages for your repository:

### Step 1: Go to Repository Settings

1. Open your repository on GitHub
2. Click **Settings** (top navigation bar)

### Step 2: Navigate to Pages

1. In the left sidebar, scroll down to **Pages**
2. Click on **Pages**

### Step 3: Configure Source

Under "Build and deployment":

1. **Source:** Select **GitHub Actions** from the dropdown
   - This tells GitHub to use the workflow file we created
   - The workflow file is located at `.github/workflows/deploy-github-pages.yml`

2. Click **Save** (if required)

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see a workflow running (or completed)
3. Wait for it to finish (usually takes 1-2 minutes)
4. Once complete, you'll see a green checkmark ✓

### Step 5: Access Your Site

Your application will be available at:

```
https://<your-username>.github.io/<repository-name>/
```

For example:
- If your username is `johndoe`
- And your repository is named `EasyConf`
- Your URL will be: `https://johndoe.github.io/EasyConf/`

## Verify Deployment

1. Go back to **Settings** → **Pages**
2. You'll see a message: "Your site is live at https://..."
3. Click the link to open your application
4. The EasyConf tool should load and work perfectly!

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy-github-pages.yml`) automatically:

- ✅ Checks out your code
- ✅ Sets up Node.js environment
- ✅ Installs dependencies (`npm ci`)
- ✅ Builds the static export (`npm run build`)
- ✅ Uploads the `out/` folder as an artifact
- ✅ Deploys to GitHub Pages

## Manual Deployment

If you want to manually trigger a deployment:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select branch (main)
5. Click **Run workflow** button

## Troubleshooting

### Issue: Workflow fails with permissions error

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### Issue: 404 error on GitHub Pages

**Solution:**
1. Make sure you selected **GitHub Actions** as the source (not "Deploy from a branch")
2. Check that the workflow completed successfully in the Actions tab
3. Wait a few minutes for DNS propagation

### Issue: Page loads but app doesn't work

**Solution:**
1. Check browser console (F12) for errors
2. Verify that all assets are loading correctly
3. Make sure the workflow built successfully
4. Try clearing browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Changes not showing up

**Solution:**
1. Push your changes to the `main` branch
2. Wait for the workflow to complete (check Actions tab)
3. Clear browser cache
4. GitHub Pages may take 1-2 minutes to update

## Custom Domain (Optional)

If you want to use a custom domain like `easyconf.yourdomain.com`:

1. Go to **Settings** → **Pages**
2. Enter your custom domain in the "Custom domain" field
3. Follow GitHub's instructions for DNS configuration
4. Add a `CNAME` file to your repository with your domain name

## Benefits of GitHub Pages Deployment

✅ **Free hosting** - No cost for public repositories
✅ **HTTPS enabled** - Automatic SSL certificate
✅ **Automatic updates** - Deploy on every push
✅ **Reliable** - GitHub's infrastructure
✅ **Fast** - CDN distribution worldwide
✅ **No server management** - Completely static

## Local Testing

Before pushing changes, you can test locally:

```bash
# Build the application
npm run build

# Test the built files
cd out
python3 -m http.server 8000
# Or use any static file server

# Open http://localhost:8000
```

## What Gets Deployed

The deployment includes:
- Built Next.js application (static HTML/CSS/JS)
- All assets (fonts, icons, images)
- Optimized and minified code
- Size: ~916KB total

The deployed application:
- ✅ Works completely offline (after initial load)
- ✅ No backend required
- ✅ All data stored in browser localStorage
- ✅ Fast loading times
- ✅ Mobile-friendly

---

## Next Steps

1. ✅ Enable GitHub Pages in Settings → Pages
2. ✅ Wait for first deployment to complete
3. ✅ Access your live application
4. ✅ Share the URL with your team!

Your application is now live and accessible to anyone with the URL!
