'use strict'

import Navbar from "./components/Navbar"
import Board from "./components/Board"

const Homepage = () => {
    return (
        <div
            className='w-full h-full flex flex-col gap-6 overx'>
            <Navbar />
            <Board />
        </div>
    )
}

export default Homepage