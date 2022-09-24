import React, { useState } from 'react'
import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
const Main = () => {
  let ipfs: IPFSHTTPClient | undefined
  const projectId = '<YOUR PROJECT ID>'
  const projectSecret = '<YOUR PROJECT SECRET>'
  const authorization =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret, 'base64')
  try {
    ipfs = create({
      url: 'https://ipfs.infura.io:5001/api/v0',
      headers: {
        authorization,
      },
    })
  } catch (error) {
    console.error('IPFS error ', error)
    ipfs = undefined
  }
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [filesToUpload, setFilesToUpload] = React.useState<
    { cid: CID; path: string }[]
  >([])

  /**
   * @description event handler that uploads the file selected by the user
   */
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const files = (form[1] as HTMLInputElement).files

    if (!files || files.length === 0) {
      return alert('No files selected')
    }
    if (!description || description.length === 0) {
      return alert('no description provided')
    }
    setLoading(true)

    const file = files[0]
    // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file)
    setFilesToUpload([
      ...filesToUpload,
      {
        cid: result.cid,
        path: result.path,
      },
    ])
    setLoading(false)
    form.reset()
  }
  return (
    <div>
      {ipfs ? (
        <form onSubmit={onSubmitHandler}>
          <input
            id="fileSescription"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input name="file" type="file" />
          <button type="submit">Upload File</button>
        </form>
      ) : (
        <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
      )}
    </div>
  )
}

export default Main
