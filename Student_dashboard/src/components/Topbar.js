import { Link, useLocation } from "react-router-dom"

export default function Topbar({ setMenuStatus, isOpen, linkType }) {
    
const location = useLocation()
const { pathname } = location
const splitLocation = pathname.split("/")

  function handleToggle(e) {
    if (isOpen) {
      setMenuStatus({[e.target.name]: false});
    } else {
      setMenuStatus({[e.target.name]: true});
    }
  }

  return (
    <li 
      style={{textTransform: "capitalize"}} 
      onClick={(e) => handleToggle(e)}
    >
      <Link 
        name={linkType} 
        className={splitLocation[1] === linkType ? "active" : ""} 
        to={`/${linkType}`}
      >{linkType}
      </Link>
    </li>
  )
}