import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className="w-full h-[80px] bg-blue-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-xl font-bold">Defile </h1>
      <h3>Decentralized file storage system</h3>
    </div>
  )
}

export default NavBar
