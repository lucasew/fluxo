import { useState } from 'react'
import { useMutation } from 'react-relay'
import { graphql } from 'relay-runtime'

const AddTorrentMutation = graphql`
  mutation AddTorrentModalMutation($input: AddTorrentInput!) {
    addTorrent(input: $input) {
      id
      name
    }
  }
`

function AddTorrentModal() {
  const [uri, setUri] = useState('')
  const [addTorrent, isInFlight] = useMutation(AddTorrentMutation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!uri.trim()) {
      alert('Please enter a magnet link or torrent URL')
      return
    }

    addTorrent({
      variables: {
        input: {
          uri: uri.trim(),
        },
      },
      onCompleted: () => {
        setUri('')
        // Close modal
        const modal = document.getElementById('add-torrent-modal') as HTMLInputElement
        if (modal) modal.checked = false
      },
      onError: (error) => {
        alert(`Error adding torrent: ${error.message}`)
      },
    })
  }

  return (
    <>
      <input type="checkbox" id="add-torrent-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Torrent</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Magnet Link or Torrent URL</span>
              </label>
              <input
                type="text"
                placeholder="magnet:?xt=urn:btih:..."
                className="input input-bordered w-full"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                disabled={isInFlight}
              />
            </div>
            <div className="modal-action">
              <label htmlFor="add-torrent-modal" className="btn">
                Cancel
              </label>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isInFlight || !uri.trim()}
              >
                {isInFlight ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Add'
                )}
              </button>
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="add-torrent-modal">
          Close
        </label>
      </div>
    </>
  )
}

export default AddTorrentModal
