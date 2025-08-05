// app/demo/[slug]/page.tsx
import Link from "next/link";

export const revalidate = 10; // Revalidate the page after 10 seconds

const slugsToPrefetch = [
    '1',
    '2',
    '3',
    'foo',
    'bar',
    'baz'
]

export async function generateStaticParams() {
  return slugsToPrefetch.map(slug => ({ slug }));
}

interface FakeData {
  slug: string;
  randomValue: number;
  timestamp: string;
  accessCount: number;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  // Await params to get the actual slug value
  const { slug } = await params;
  
  // Fetch data from your deployed Google Cloud Function API
  const res = await fetch(
    `https://isr-backend-api-451041921684.us-central1.run.app/api/fakedata/${slug}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch API data');
  }
  const data: FakeData = await res.json();

  // Check if this is a pre-generated route
  const isPrefetched = slugsToPrefetch.includes(slug);
  const pageBuiltAt = new Date().toLocaleString();

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ISR Diagnostics for <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{slug}</code></h1>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
          isPrefetched 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {isPrefetched ? '🚀 Pre-generated Route' : '⚡ Dynamic Route'}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">📊 API Data</h2>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">API Timestamp:</strong>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">{data.timestamp}</div>
            </div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Random Value:</strong>
              <div className="font-mono text-lg font-bold text-purple-600 dark:text-purple-400">{data.randomValue}</div>
            </div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Access Count:</strong>
              <div className="font-mono text-lg font-bold text-orange-600 dark:text-orange-400">{data.accessCount}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">🏗️ Build Info</h2>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Page Built At:</strong>
              <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">{pageBuiltAt}</div>
            </div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Route Type:</strong>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {isPrefetched 
                  ? 'Generated at build time via generateStaticParams()' 
                  : 'Generated on-demand via ISR'
                }
              </div>
            </div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Revalidation:</strong>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Every 10 seconds</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">💡 Testing Tips:</h3>
        <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
          <li>• Refresh this page multiple times within 10 seconds - data should remain cached</li>
          <li>• Wait 10+ seconds and refresh - data should update via ISR</li>
          <li>• Compare load times between pre-generated and dynamic routes</li>
          <li>• Check Network tab to see cache behavior</li>
        </ul>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/"
          prefetch={false}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          ← Back to Home
        </Link>
        <Link
          href={`/demo/${slug}`}
          prefetch={false}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          🔄 Refresh Page
        </Link>
      </div>
    </main>
  );
}
