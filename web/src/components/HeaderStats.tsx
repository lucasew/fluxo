import { useLazyLoadQuery, useSubscription } from 'react-relay';
import { graphql } from 'relay-runtime';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatSpeed } from '../utils/format';

const HeaderStatsQuery = graphql`
  query HeaderStatsQuery {
    torrents {
      downloadSpeed
      uploadSpeed
    }
  }
`;

const HeaderStatsSubscription = graphql`
  subscription HeaderStatsSubscription {
    torrentUpdated {
      id
      downloadSpeed
      uploadSpeed
    }
  }
`;

export default function HeaderStats() {
  const data = useLazyLoadQuery(HeaderStatsQuery, {});

  useSubscription({
    subscription: HeaderStatsSubscription,
    variables: {},
  });

  const totalDownload = data.torrents.reduce((acc, t) => acc + t.downloadSpeed, 0);
  const totalUpload = data.torrents.reduce((acc, t) => acc + t.uploadSpeed, 0);

  return (
    <>
        <div className="flex items-center gap-1">
            <ArrowDown size={14} className="text-success" />
            <span>{formatSpeed(totalDownload)}</span>
        </div>
        <div className="flex items-center gap-1">
            <ArrowUp size={14} className="text-info" />
            <span>{formatSpeed(totalUpload)}</span>
        </div>
    </>
  );
}
