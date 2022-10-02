import Image from 'next/image'
import React from 'react'

type Props = {}

const Files = ({ filesToShow }: any) => {
  return (
    <div className="flex flex-col w-full">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  File Link
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Upload time
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Uploader
                </th>
              </tr>
            </thead>
            <tbody>
              {filesToShow
                .filter((e: any) => e.fileHash.length > 0)
                .sort((a: any, b: any) => b.uploadTime - a.uploadTime)
                .map((file: any, key: number) => (
                  <tr key={key}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 flex justify-center items-center">
                          <a
                            href={`https://${file.fileHash}.ipfs.w3s.link/${file.fileName}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src="/files.png" alt="" />
                          </a>
                        </div>
                        <div className="ml-3 w-[100px]">
                          <p className="text-gray-900 whitespace-no-wrap font-bold">
                            Hash
                          </p>
                          <p className="text-gray-400 whitespace-no-wrap">
                            {file.fileHash.slice(0, 20) + '...'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {file.fileName.slice(0, 20)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {file.fileDescription}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {file.fileSize} Bytes
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {file.fileType}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-[200px]">
                      <p className="text-gray-900 wrap ">
                        {new Date(file.uploadTime * 1000).toString()}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-blue-700 ">
                        <a
                          href={`https://debank.com/profile/${file.uploader}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file.uploader.slice(0, 20)}...
                        </a>
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Files
