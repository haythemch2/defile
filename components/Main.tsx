import React, { useState } from 'react'
import { getFilesFromPath } from 'web3.storage'
import { makeStorageClient } from '../utils/Web3Storage'
const Main = ({ contract, account, loading, setLoading }: any) => {
  const [description, setDescription] = useState('')

  async function storeFiles(files: any) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

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
    if (loading) {
      return alert('wait ')
    }
    setLoading(true)

    const file = [files[0]]

    // upload files
    let cid = await storeFiles(files)

    let uploadedFile = file[0]
    contract.methods
      .uploadFile(
        cid,
        uploadedFile.size,
        uploadedFile.type,
        uploadedFile.name,
        description,
      )
      .send({ from: account })
      .on('transactionHash', (hash: any) => {
        setLoading(false)
        form.reset()
        window.location.reload()
      })
      .on('eror', (e: any) => {
        window.alert('error')
        console.log(e)
      })
  }
  return (
    <div className="w-[450px] h-[160px] border border-blue-200 rounded-lg p-4 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full h-full justify-between items-center"
      >
        <input
          className="bg-transparent outline-0 w-full"
          placeholder="File description"
          id="fileSescription"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block w-full">
          <span className="sr-only">Choose File</span>
          <input
            type="file"
            className="outline-0 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        <button
          type="submit"
          className="w-[350px] h-[37px] rounded-lg bg-blue-500 text-white"
        >
          Upload File
        </button>
      </form>
    </div>
  )
}

export default Main
