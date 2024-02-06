  import React, {ReactNode, useState} from 'react'

  import {
 
    FaBars,
    FaUserAlt,
    FaRegChartBar,

    FaMusic,
    FaRecordVinyl
  }from "react-icons/fa";


  import { NavLink , NavLinkProps} from 'react-router-dom';


  interface SideBarProps {
    children:ReactNode
  }

  const SideBar:React.FC<SideBarProps> = ({ children }) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
      {
          path:"/",
          name:"Music",
          icon:<FaMusic/>
      },
      {
          path:"/artist",
          name:"Artist",
          icon:<FaUserAlt/>
      },
      {
          path:"/analytics",
          name:"Analytics",
          icon:<FaRegChartBar/>
      },
      
  ]
    return (
      <div className="container">
            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                <div className="top_section">
                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Addis</h1>
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                        <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
          </div>
    )
  }

  export default SideBar