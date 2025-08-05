import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={25}
            priority
          />
          <span className="text-2xl font-bold">ISR Performance Benchmark</span>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Next.js ISR on Cloudflare via OpenNext</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            This application benchmarks <strong>Incremental Static Regeneration (ISR)</strong> performance 
            for Next.js applications deployed to Cloudflare Workers using OpenNext.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">⚡ OpenNext Configuration</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Incremental Cache:</strong> Workers KV (ultra-fast global distribution)</li>
              <li><strong>Tag Cache:</strong> Sharded Durable Objects (high-load on-demand revalidation)</li>
              <li><strong>Queue:</strong> Durable Objects (reliable ISR processing)</li>
              <li><strong>Cache Interception:</strong> Enabled (reduced cold starts)</li>
              <li><strong>Auto Cache Purge:</strong> Direct mode (immediate invalidation)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">🧪 Demo Route: /demo/[slug]</h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Revalidation:</strong> Every 10 seconds
              </div>
              <div>
                <strong>Pre-fetched Routes:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {['1', '2', '3', 'foo', 'bar', 'baz'].map(slug => (
                    <code key={slug} className="bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-xs">
                      /demo/{slug}
                    </code>
                  ))}
                </div>
              </div>
              <div>
                <strong>Dynamic Routes:</strong> Generated on first request (try <code>/demo/test</code>)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold mb-4">🚀 Test ISR Performance</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Visit the demo routes to see ISR in action. Each page shows timestamps, random values, 
            and access counts that update every 10 seconds via ISR.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Pre-generated Routes (Built at Deploy)</h3>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', 'foo', 'bar', 'baz'].map(slug => (
                  <Link
                    key={slug}
                    href={`/demo/${slug}`}
                    prefetch={false}
                    className="bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    /demo/{slug}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Dynamic Routes (Generated on First Request)</h3>
              <div className="flex flex-wrap gap-2">
                {['test', 'hello', 'world', 'performance'].map(slug => (
                  <Link
                    key={slug}
                    href={`/demo/${slug}`}
                    prefetch={false}
                    className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 px-3 py-2 rounded-md text-sm transition-colors"
                  >
                    /demo/{slug}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">📊 What to Observe:</h3>
          <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
            <li>• <strong>First load:</strong> Pre-generated routes should load instantly</li>
            <li>• <strong>Dynamic routes:</strong> May have slight delay on first request (cache miss)</li>
            <li>• <strong>Subsequent visits:</strong> All routes should be cached and load quickly</li>
            <li>• <strong>Revalidation:</strong> Data updates every 10 seconds while maintaining cache performance</li>
          </ul>
        </div>
      </main>
      
      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-6 flex-wrap justify-center text-sm text-gray-600 dark:text-gray-400">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://opennext.js.org/cloudflare/caching"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            OpenNext Docs
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Next.js ISR Docs
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://developers.cloudflare.com/workers/runtime-apis/kv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Cloudflare KV Docs
          </a>
        </div>
      </footer>
    </div>
  );
}
