import { Suspense } from 'react';
import TorrentList from '../components/TorrentList';

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Torrents</h1>
      </div>

      <Suspense fallback={
         <div className="grid grid-cols-1 gap-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="card bg-base-100 shadow-md h-32 animate-pulse">
                <div className="card-body">
                    <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-base-300 rounded w-1/2"></div>
                </div>
             </div>
           ))}
         </div>
      }>
        <TorrentList />
      </Suspense>
    </div>
  )
}
