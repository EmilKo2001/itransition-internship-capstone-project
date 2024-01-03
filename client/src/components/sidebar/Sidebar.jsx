import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import axios from "axios";

export default function Sidebar() {
  const [cats, setCats] = useState([])
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories")
      setCats(res.data)
    }
    getCats()
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">FEATURING</span>
        <img
          src="https://downloadhere.co/resource/templates/upload/downloadHere1636105873dH3.jpg"
          alt="This is the picture from downloadhere.co"
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
