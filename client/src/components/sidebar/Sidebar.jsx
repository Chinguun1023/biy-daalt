import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [cats,setCats]=useState([])

  useEffect(()=>{
    const getCats=async()=>{
      const res = await axios.get("/categories")
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className='sidebarTitle'>ABOUT ME</span> 
        <img src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg" alt="" />
        <p>
        This year, please share with us your strange and memorable moments from the places you have traveled.
        You can also choose your next travel destination by looking at other people's posts
        </p>
      </div>
      <div className="sidebarIteam">
      {/* <div className="sidebarTitle">CATEGORIES</div>
      <ul className="sidebarList">
        {cats.map((c)=>(
          <Link to={`/?cat=${c.name}`} className='link'>
          <li className="sidebarListItem">{c.name}</li>
          </Link>
        ))}
        
      </ul> */}
    </div>
    <div className="sidebarIteam">
      <span className='sidebarTitle'>FOLLOW US</span>
      <div className="sidebarSocial">
      <i className="sideIcon fa-brands fa-square-facebook"></i>
      <i className="sideIcon fa-brands fa-square-twitter"></i>
      <i className="sideIcon fa-brands fa-square-pinterest"></i>
      <i className="sideIcon fa-brands fa-square-instagram"></i>
      </div>
    </div>
    </div>
  )
}
