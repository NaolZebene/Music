import React from 'react'

import {FaPlus} from "react-icons/fa"

function NavBar() {
  return (
    <div className='nav'>
        <div className='navigation'>
            <div className='icons'>
                <FaPlus className='plus-icon'></FaPlus>
            </div>
        </div>
    </div>
  )
}

export default NavBar