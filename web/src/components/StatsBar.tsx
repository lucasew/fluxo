import { useLazyLoadQuery, useSubscription } from 'react-relay'
import { graphql } from 'relay-runtime'

const StatsQuery = graphql`
  query StatsBarQuery {
    sessionStats {
      torrents
      peers
      portsAvailable
    }
  }
`

const StatsSubscription = graphql`
  subscription StatsBarSubscription {
    statsUpdated {
      torrents
      peers
      portsAvailable
    }
  }
`

function StatsBar() {
  const data = useLazyLoadQuery(StatsQuery, {})

  useSubscription({
    subscription: StatsSubscription,
    variables: {},
  })

  return (
    <div className="stats shadow w-full bg-base-100 mt-4">
      <div className="stat">
        <div className="stat-title">Torrents</div>
        <div className="stat-value text-primary">{data.sessionStats.torrents}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Peers</div>
        <div className="stat-value text-secondary">{data.sessionStats.peers}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Ports Available</div>
        <div className="stat-value">{data.sessionStats.portsAvailable}</div>
      </div>
    </div>
  )
}

export default StatsBar
