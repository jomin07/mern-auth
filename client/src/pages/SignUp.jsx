import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-7 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="p-3 bg-slate-100 rounded-lg"/>
        <input type="email" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg"/>
        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg"/>
        <button className="bg-slate-700 hover:opacity-95 p-3 text-white font-medium rounded-lg uppercase disabled:opacity-80">Sign Up</button>
      </form>

      <div className="flex mt-5 gap-2">
        <p>Have an Account?</p>
        <Link to={'/sign-in'}><span className="text-blue-600 font-medium">Sign In</span></Link>
      </div>
    </div>
  )
}

export default SignUp