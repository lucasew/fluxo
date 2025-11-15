import { useLazyLoadQuery, useSubscription } from 'react-relay'
import { graphql } from 'relay-runtime'
import TorrentCard from './TorrentCard'

const TorrentListQuery = graphql`
  query TorrentListQuery {
    torrents {
      id
      ...TorrentCard_torrent
    }
  }
`

const TorrentUpdatedSubscription = graphql`
  subscription TorrentListUpdatedSubscription {
    torrentUpdated {
      id
      ...TorrentCard_torrent
    }
  }
`

const TorrentAddedSubscription = graphql`
  subscription TorrentListAddedSubscription {
    torrentAdded {
      id
      ...TorrentCard_torrent
    }
  }
`

function TorrentList() {
  const data = useLazyLoadQuery(TorrentListQuery, {})

  // Subscribe to torrent updates
  useSubscription({
    subscription: TorrentUpdatedSubscription,
    variables: {},
  })

  useSubscription({
    subscription: TorrentAddedSubscription,
    variables: {},
  })

  if (!data.torrents || data.torrents.length === 0) {
    return (
      <div className="alert alert-info">
        <span>No torrents yet. Add one to get started!</span>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Down Speed</th>
            <th>Up Speed</th>
            <th>Peers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.torrents.map((torrent) => (
            <TorrentCard key={torrent.id} torrent={torrent} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TorrentList
