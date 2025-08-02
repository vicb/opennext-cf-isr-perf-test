import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// Removed withRegionalCache import - not needed for KV cache
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";
import { purgeCache } from "@opennextjs/cloudflare/overrides/cache-purge/index";

// Using KV incremental cache as requested - much faster than R2!
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  // Large site configuration with KV incremental cache for maximum performance
  // KV already uses Cloudflare's Tiered Cache globally - no regional cache needed
  incrementalCache: kvIncrementalCache,
  
  // Durable Objects queue for ISR revalidation
  queue: doQueue,
  
  // Sharded tag cache for large sites using Durable Objects
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
  
  // Enable cache interception for better performance
  enableCacheInterception: true,
  
  // Automatic cache purge for on-demand revalidation
  cachePurge: purgeCache({ type: "direct" }),
});
