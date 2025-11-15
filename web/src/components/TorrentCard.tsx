import { useFragment, useMutation } from 'react-relay'
import { graphql } from 'relay-runtime'

const TorrentCardFragment = graphql`
  fragment TorrentCard_torrent on Torrent {
    id
    name
    status
    bytesCompleted
    bytesTotal
    downloadSpeed
    uploadSpeed
    peers {
      total
    }
  }
`

const StartTorrentMutation = graphql`
  mutation TorrentCardStartMutation($id: ID!) {
    startTorrent(id: $id)
  }
`

const StopTorrentMutation = graphql`
  mutation TorrentCardStopMutation($id: ID!) {
    stopTorrent(id: $id)
  }
`

const RemoveTorrentMutation = graphql`
  mutation TorrentCardRemoveMutation($id: ID!) {
    removeTorrent(id: $id)
  }
`

interface Props {
  torrent: any
}

function TorrentCard({ torrent }: Props) {
  const data = useFragment(TorrentCardFragment, torrent)
  const [startTorrent] = useMutation(StartTorrentMutation)
  const [stopTorrent] = useMutation(StopTorrentMutation)
  const [removeTorrent] = useMutation(RemoveTorrentMutation)

  const bytesCompleted = BigInt(data.bytesCompleted)
  const bytesTotal = BigInt(data.bytesTotal)
  const progress = bytesTotal > 0 ? Number((bytesCompleted * 100n) / bytesTotal) : 0

  const formatSpeed = (bytesPerSec: number) => {
    if (bytesPerSec < 1024) return `${bytesPerSec} B/s`
    if (bytesPerSec < 1024 * 1024) return `${(bytesPerSec / 1024).toFixed(1)} KB/s`
    return `${(bytesPerSec / 1024 / 1024).toFixed(1)} MB/s`
  }

  const handleStart = () => {
    startTorrent({ variables: { id: data.id } })
  }

  const handleStop = () => {
    stopTorrent({ variables: { id: data.id } })
  }

  const handleRemove = () => {
    if (confirm('Are you sure you want to remove this torrent?')) {
      removeTorrent({ variables: { id: data.id } })
    }
  }

  const statusBadge = () => {
    switch (data.status) {
      case 'DOWNLOADING':
        return <span className="badge badge-primary">{data.status}</span>
      case 'SEEDING':
        return <span className="badge badge-success">{data.status}</span>
      case 'STOPPED':
        return <span className="badge badge-ghost">{data.status}</span>
      default:
        return <span className="badge">{data.status}</span>
    }
  }

  return (
    <tr>
      <td>
        <div className="font-bold truncate max-w-md">{data.name}</div>
      </td>
      <td>{statusBadge()}</td>
      <td>
        <div className="flex items-center gap-2">
          <progress
            className="progress progress-primary w-20"
            value={progress}
            max="100"
          ></progress>
          <span className="text-sm">{progress.toFixed(1)}%</span>
        </div>
      </td>
      <td>{formatSpeed(data.downloadSpeed)}</td>
      <td>{formatSpeed(data.uploadSpeed)}</td>
      <td>{data.peers.total}</td>
      <td>
        <div className="flex gap-2">
          {data.status === 'STOPPED' ? (
            <button className="btn btn-sm btn-success" onClick={handleStart}>
              Start
            </button>
          ) : (
            <button className="btn btn-sm btn-warning" onClick={handleStop}>
              Stop
            </button>
          )}
          <button className="btn btn-sm btn-error" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TorrentCard
