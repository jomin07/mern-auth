import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200">
        <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
            <Link to={'/'}>
              <h1 className="font-bold">Auth App</h1>
            </Link>
            <ul className="flex gap-6">
              <Link to={'/'}><li>Home</li></Link>
              <Link to={'/about'}><li>About</li></Link>
              <Link to={'/profile'}><li>Profile</li></Link>
              <Link to={'/sign-up'}><li>Sign Up</li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Header;