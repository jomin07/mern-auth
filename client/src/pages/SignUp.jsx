import { useState } from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
  const [ formData, setFormData ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        setLoading(true);
        setError(false);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
  }

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-7 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 hover:opacity-95 p-3 text-white font-medium rounded-lg uppercase disabled:opacity-80"> {loading ? 'Loading' : 'Sign Up'} </button>
      </form>

      <div className="flex mt-5 gap-2">
        <p>Have an Account?</p>
        <Link to={'/sign-in'}><span className="text-blue-600 font-medium">Sign In</span></Link>
      </div>
      <p className="text-red-700 font-medium mt-3"> {error && 'Something went wrong!'} </p>
    </div>
  )
}

export default SignUp