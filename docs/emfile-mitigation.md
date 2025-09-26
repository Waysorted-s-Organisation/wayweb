# EMFILE (Too Many Open Files) Mitigation

If you encounter `Worker initialization failure: EMFILE` during local `npm install` or build:

## Root Cause
`EMFILE` indicates the process opened more file descriptors than the OS (or Node worker threads) can handle concurrently. Large frameworks (Next.js + SWC/Turbopack) and many transient dependencies can spike concurrent file opens, especially on networked or case-insensitive file systems.

## Quick Fixes
1. Prefer `npm ci` over `npm install` for reproducible, faster installs.
2. Clear and re-create lock / modules only when necessary:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache verify
   npm ci
   ```
3. Limit parallelism (Node 20+ honors `--max_old_space_size` but for file handles we can reduce worker usage):
   ```bash
   export TURBOPACK_MAX_THREADS=4   # if using turbopack dev
   export SWC_WORKER_COUNT=4        # swc parallel workers
   ```
4. Add an `.npmrc` to cap fetch concurrency (already reasonable by default, but you can lower):
   ```ini
   fetch-retries=3
   fetch-retry-mintimeout=10000
   fetch-retry-maxtimeout=60000
   maxsockets=25
   ```
5. (macOS) Raise the soft limit only if it's actually low (yours is already high):
   ```bash
   ulimit -n 65536
   ```

## Azure Build Notes
The GitHub Actions workflow uses `npm ci` and does not run dev Turbopack, so this issue should not appear in CI/CD.
