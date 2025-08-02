# Next.js ISR Performance Benchmark on Cloudflare

A performance benchmarking application for **Incremental Static Regeneration (ISR)** in Next.js, deployed to **Cloudflare Workers** using **OpenNext** with optimized caching configuration.

## 🎯 Purpose

This application demonstrates and benchmarks ISR performance using:
- **Workers KV** for ultra-fast incremental cache storage
- **Durable Objects** for reliable queue processing and tag cache
- **OpenNext Cloudflare adapter** for seamless deployment
- **Real-world API integration** with revalidation testing

## ⚡ OpenNext Configuration

Our setup follows the "large site" architecture pattern with:

| Component | Implementation | Purpose |
|-----------|---------------|---------|
| **Incremental Cache** | Workers KV | Ultra-fast global cache distribution |
| **Tag Cache** | Sharded Durable Objects | High-load on-demand revalidation |
| **Queue** | Durable Objects | Reliable ISR processing |
| **Cache Interception** | Enabled | Reduced cold start times |
| **Auto Cache Purge** | Direct mode | Immediate cache invalidation |

## 🧪 Demo Routes

### Pre-generated Routes (Built at Deploy)
- `/demo/1`, `/demo/2`, `/demo/3`
- `/demo/foo`, `/demo/bar`, `/demo/baz`

### Dynamic Routes (Generated on First Request)
- `/demo/test`, `/demo/hello`, `/demo/world`, `/demo/performance`
- Any other `/demo/[slug]` route

**Revalidation:** Every 10 seconds via ISR

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Cloudflare account
- Wrangler CLI

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Preview with Workers runtime
npm run preview
```

### Deployment

```bash
# Build and deploy to Cloudflare
npm run deploy

# Or just build
npm run build
```

## 📊 Performance Testing

### What to Observe

1. **First Load Performance**
   - Pre-generated routes should load instantly
   - Dynamic routes may have slight delay on first request

2. **Cache Behavior**
   - Subsequent visits should be ultra-fast (KV cache hits)
   - Data updates every 10 seconds while maintaining performance

3. **ISR Revalidation**
   - Refresh within 10 seconds → cached data
   - Wait 10+ seconds → fresh data via background revalidation

### Testing Tips

- Use browser DevTools Network tab to observe cache behavior
- Compare load times between pre-generated vs dynamic routes
- Test with multiple geographic locations to see KV global distribution
- Monitor timestamps and random values to verify revalidation

## 🛠 Technical Stack

- **Framework:** Next.js 15.3.5
- **Runtime:** Cloudflare Workers (Node.js compatibility)
- **Deployment:** OpenNext Cloudflare adapter
- **Cache:** Workers KV + Durable Objects
- **Styling:** Tailwind CSS

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home page with benchmark info
│   └── demo/[slug]/page.tsx  # ISR demo routes
├── open-next.config.ts       # OpenNext configuration
├── wrangler.jsonc           # Cloudflare Workers config
└── public/_headers          # Static asset caching rules
```

## 🔧 Configuration Files

### `open-next.config.ts`
```typescript
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  enableCacheInterception: true,
  cachePurge: purgeCache({ type: "direct" }),
});
```

### Key Environment Variables
- `NEXT_INC_CACHE_KV_PREFIX` - KV cache key prefix (default: "incremental-cache")
- `NEXTJS_ENV` - Environment for Next.js config loading

## 📈 Benchmarking Results

This setup provides:
- **Sub-millisecond** cache hits via Workers KV
- **Global distribution** with Cloudflare's edge network
- **Reliable ISR** processing via Durable Objects
- **10-second revalidation** with maintained performance

## 📚 Resources

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare/caching)
- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Cloudflare Workers KV](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and experiment with different caching configurations or add additional benchmarking scenarios.
