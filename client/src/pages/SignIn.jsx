
const SignIn = () => {
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-7 text-center">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="p-3 bg-slate-100 rounded-lg"/>
        <input type="email" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg"/>
        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg"/>
        <button>SIGN UP</button>
      </form>
    </div>
  )
}

export default SignIn;