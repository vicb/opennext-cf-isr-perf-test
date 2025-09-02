// middleware.js
import { WorkerEntrypoint } from "cloudflare:workers";

import { runWithCloudflareRequestContext } from "../.open-next/cloudflare/init.js";
import { handler as middlewareHandler } from "../.open-next/middleware/handler.mjs";
export { DOQueueHandler } from "../.open-next/.build/durable-objects/queue.js";
export { DOShardedTagCache } from "../.open-next/.build/durable-objects/sharded-tag-cache.js";

export default class Middleware extends WorkerEntrypoint {
  async fetch(request) {
    return runWithCloudflareRequestContext(request, this.env, this.ctx, async () => {
      // Process the request through Next.js middleware layer and OpenNext routing layer
      const reqOrResp = await middlewareHandler(request, this.env, this.ctx);

      // If middleware returns a Response, send it directly (e.g., redirects, blocks, ISR/SSG cache Hit)
      if (reqOrResp instanceof Response) {
        return reqOrResp;
      }

      // Proxy to the server worker with cache disabled for dynamic content
      return this.env.DEFAULT_WORKER.fetch(reqOrResp, {
        // We return redirects as is
        redirect: "manual",
        cf: {
          cacheEverything: false,
        },
      });
    });
  }
}