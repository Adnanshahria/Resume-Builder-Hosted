# Vercel Build Error: Rollup Linux Module Not Found

## The Problem

When deploying to Vercel, the build fails with the following error:

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
...
npm has a bug related to optional dependencies
```

## Root Cause

This error occurs because of a mismatch between the operating system used for development (Windows) and the deployment environment (Linux).

1.  **Vite** uses **Rollup** for bundling.
2.  **Rollup** relies on native binary components to run efficiently.
3.  When you run `npm install` on **Windows**, npm installs `@rollup/rollup-win32-x64-msvc` and records it in `package-lock.json`.
4.  It often **excludes** or fails to properly resolve the optional dependency for Linux (`@rollup/rollup-linux-x64-gnu`) because it's not needed on your local machine.
5.  When **Vercel** (which runs on Linux) explicitly tries to install dependencies based on that `package-lock.json`, it fails to find or install the required Linux binary because it wasn't strictly locked or was marked as optional/incompatible in the lockfile generated on Windows.

## Solution

To fix this, you need to regenerate the `package-lock.json` file to ensure all optional dependencies (including platform-specific ones) are correctly resolved.

### Steps to Fix

1.  **Clear your local installs:**
    Delete the `node_modules` folder and the `package-lock.json` file.
    ```powershell
    Remove-Item -Recurse -Force node_modules
    Remove-Item -Force package-lock.json
    ```

2.  **Reinstall dependencies:**
    Run a fresh install. This forces npm to re-evaluate the dependency tree.
    ```powershell
    npm install
    ```

3.  **Push the changes:**
    Commit the **newly generated** `package-lock.json` and push it to GitHub.
    ```powershell
    git add package-lock.json
    git commit -m "Regenerate package-lock.json to fix Vercel rollup error"
    git push
    ```

4.  **Redeploy on Vercel:**
    Vercel should now recognize the updated lockfile and be able to install the correct Linux dependencies.

### Alternative Solution (If the above fails)

If the standard reinstall doesn't work, you can explicitly add the Linux binary as an optional dependency in your `package.json` (inside the `apps/web/package.json` or root `package.json`).

Add this to `optionalDependencies`:

```json
"optionalDependencies": {
  "@rollup/rollup-linux-x64-gnu": "*"
}
```

Then run `npm install` and push the changes.
