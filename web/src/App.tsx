import { Suspense } from 'react'
import TorrentList from './components/TorrentList'
import StatsBar from './components/StatsBar'
import AddTorrentModal from './components/AddTorrentModal'

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Fluxo</a>
        </div>
        <div className="flex-none">
          <label htmlFor="add-torrent-modal" className="btn btn-primary">
            Add Torrent
          </label>
        </div>
      </div>

      {/* Stats Bar */}
      <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
        <StatsBar />
      </Suspense>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <Suspense fallback={<div className="loading loading-spinner loading-lg"></div>}>
          <TorrentList />
        </Suspense>
      </div>

      {/* Add Torrent Modal */}
      <AddTorrentModal />
    </div>
  )
}

export default App
