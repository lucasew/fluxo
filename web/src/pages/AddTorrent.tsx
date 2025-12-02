import { useState, useCallback } from 'react';
import { useMutation } from 'react-relay';
import { graphql } from 'relay-runtime';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Link as LinkIcon, FileText } from 'lucide-react';
// @ts-ignore
import parseTorrent from 'parse-torrent';
import { Buffer } from 'buffer';

// Ensure Buffer is available globally for parse-torrent if needed
if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

const AddTorrentMutation = graphql`
  mutation AddTorrentMutation($input: AddTorrentInput!) {
    addTorrent(input: $input) {
      id
      name
    }
  }
`;

export default function AddTorrent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'magnet' | 'file'>('magnet');
  const [magnetUri, setMagnetUri] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [commit, isInFlight] = useMutation(AddTorrentMutation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    let uriToAdd = '';

    try {
        if (activeTab === 'magnet') {
            if (!magnetUri.trim()) throw new Error('Magnet URI is required');
            uriToAdd = magnetUri.trim();
        } else {
            if (!file) throw new Error('File is required');

            // Read file
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            try {
                // Parse torrent file
                const parsed = parseTorrent(buffer);
                // Convert back to magnet URI as the backend supports adding by URI (magnet)
                // If backend supports raw torrent file upload, we'd use a different mutation or input.
                // The prompt says: "na tela de adicionar torrent dá opção do usuário upar um magnet e se não precisar mexer no backend bota suporte pra upar .torrent também"
                // "como .torrent é bencode dá pra decodificar os dados de lá e converter .torrent pra bencode mas só faz isso se for trivial"
                // parse-torrent can convert buffer to magnet uri easily.
                uriToAdd = parseTorrent.toMagnetURI(parsed);
            } catch (err) {
                console.error(err);
                throw new Error('Invalid .torrent file');
            }
        }

        commit({
            variables: {
                input: {
                    uri: uriToAdd,
                }
            },
            onCompleted: (response, errors) => {
                setIsProcessing(false);
                if (errors) {
                    setError(errors[0].message);
                } else {
                    navigate('/');
                }
            },
            onError: (err) => {
                setIsProcessing(false);
                setError(err.message);
            }
        });

    } catch (err: any) {
        setIsProcessing(false);
        setError(err.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm gap-2 pl-0 mb-4">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-6">Add Torrent</h2>

            <div role="tablist" className="tabs tabs-boxed mb-6">
                <a
                    role="tab"
                    className={`tab ${activeTab === 'magnet' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('magnet')}
                >
                    <LinkIcon size={16} className="mr-2" /> Magnet Link
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'file' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('file')}
                >
                    <FileText size={16} className="mr-2" /> .torrent File
                </a>
            </div>

            <form onSubmit={handleSubmit}>
                {activeTab === 'magnet' ? (
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Magnet URI</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 font-mono text-xs"
                            placeholder="magnet:?xt=urn:btih:..."
                            value={magnetUri}
                            onChange={(e) => setMagnetUri(e.target.value)}
                        ></textarea>
                    </div>
                ) : (
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Upload .torrent file</span>
                        </label>
                        <div className="border-2 border-dashed border-base-300 rounded-box p-8 text-center hover:bg-base-200 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept=".torrent"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            <Upload className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm opacity-70">
                                {file ? file.name : 'Click or drag file here'}
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mt-4 text-sm">
                        <span>{error}</span>
                    </div>
                )}

                <div className="card-actions justify-end mt-6">
                    <button
                        type="submit"
                        className={`btn btn-primary ${isInFlight || isProcessing ? 'loading' : ''}`}
                        disabled={isInFlight || isProcessing}
                    >
                        {(isInFlight || isProcessing) ? 'Adding...' : 'Add Torrent'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
