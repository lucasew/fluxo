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
    <div className="flex flex-col text-[10px] sm:text-xs leading-none gap-0.5 min-w-[80px]">
        <div className="flex items-center justify-end gap-1 text-info">
            <span>{formatSpeed(totalUpload)}</span>
            <ArrowUp size={12} />
        </div>
        <div className="flex items-center justify-end gap-1 text-success">
            <span>{formatSpeed(totalDownload)}</span>
            <ArrowDown size={12} />
        </div>
    </div>
  );
}
