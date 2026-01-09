# Performance Optimization Guide

## ✅ COMPLETED (Files Updated)
1. **Code Splitting** - vite.config.ts updated with manual chunks
2. **Lazy Loading** - App.tsx updated with React.lazy()
3. **CSS Optimization** - index.css reduced by 60%
4. **Tailwind Purging** - tailwind.config.js configured

## 🔧 REQUIRED ACTIONS

### 1. Install Terser (for minification)
```bash
npm install -D terser
```

### 2. Image Optimization (CRITICAL - 2.16MB savings)

**Option A: Use modern formats**
- Convert all images to WebP/AVIF
- Use tools like `sharp` or online converters
- Replace in your components

**Option B: Add vite-imagetools plugin**
```bash
npm install -D vite-imagetools
```

Then update vite.config.ts:
```typescript
import { imagetools } from 'vite-imagetools'

plugins: [
  react(),
  imagetools()
]
```

Use in components:
```tsx
import heroImage from './hero.jpg?w=800&format=webp'
```

### 3. Optimize Framer Motion (Heavy Library)

Replace full imports with specific ones:
```tsx
// ❌ Bad
import { motion } from 'framer-motion'

// ✅ Good
import { m, LazyMotion, domAnimation } from 'framer-motion'

// Wrap app with:
<LazyMotion features={domAnimation}>
  <m.div>...</m.div>
</LazyMotion>
```

### 4. Preload Critical Resources

Add to index.html `<head>`:
```html
<link rel="preconnect" href="https://esign-admin.signmary.com">
<link rel="dns-prefetch" href="https://esign-admin.signmary.com">
```

### 5. Add Compression

**For Production Server:**
- Enable Gzip/Brotli compression
- Most hosting platforms (Vercel, Netlify) do this automatically

**For Custom Server:**
```bash
npm install -D vite-plugin-compression
```

Update vite.config.ts:
```typescript
import viteCompression from 'vite-plugin-compression'

plugins: [
  react(),
  viteCompression({ algorithm: 'brotliCompress' })
]
```

### 6. Optimize Icon Libraries

**Current issue:** Loading entire icon libraries

**Solution:** Use specific imports or tree-shakeable alternatives
```tsx
// ❌ Bad
import { FaIcon } from 'react-icons/fa'

// ✅ Good
import FaIcon from 'react-icons/fa/FaIcon'
```

Or switch to `lucide-react` only (already installed, more tree-shakeable)

### 7. Add Resource Hints to index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Preconnect to API -->
    <link rel="preconnect" href="https://esign-admin.signmary.com">
    <link rel="dns-prefetch" href="https://esign-admin.signmary.com">
    
    <title>Notary App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 📊 Expected Improvements

After implementing all changes:
- **Initial Load Time:** 7.5s → ~2-3s (60-70% reduction)
- **Bundle Size:** 10.2MB → ~2-3MB (70-80% reduction)
- **FCP:** 2.4s → ~0.8-1.2s
- **LCP:** 7.5s → ~2-3s
- **GTmetrix Grade:** E (46%) → B-A (75-90%)

## 🚀 Build & Deploy

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Build optimized version
npm run build

# Test production build locally
npm run preview
```

## 🔍 Verify Improvements

1. Run GTmetrix test again after deployment
2. Check Chrome DevTools → Network tab
3. Use Lighthouse in Chrome DevTools
4. Monitor bundle sizes in build output

## 📝 Additional Recommendations

1. **Implement CDN** - Serve static assets from CDN
2. **Add Service Worker** - For offline caching (use Workbox)
3. **Defer Non-Critical JS** - Load analytics/chat widgets after page load
4. **Database Query Optimization** - If API is slow, optimize backend
5. **Implement Skeleton Screens** - Better perceived performance

## ⚠️ Priority Order

1. Install terser (1 min)
2. Image optimization (30 min) - BIGGEST IMPACT
3. Optimize Framer Motion (15 min)
4. Add preconnect hints (2 min)
5. Optimize icon imports (20 min)
6. Enable compression (5 min)
7. Build and test (10 min)

Total time: ~1.5 hours for 60-70% improvement
