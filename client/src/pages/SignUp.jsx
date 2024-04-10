import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [ formData, setFormData ] = useState({});
  const [errors, setErrors] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

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
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
        navigate('/sign-in');
      } catch (error) {
        setLoading(false);
        setError(true);
      }
  }

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-7 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        {errors.username && <p className="text-red-700 font-medium">{errors.username}</p>}

        <input type="text" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        {errors.email && <p className="text-red-700 font-medium">{errors.email}</p>}

        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        {errors.password && <p className="text-red-700 font-medium">{errors.password}</p>}

        <button disabled={loading} className="bg-slate-700 hover:opacity-95 p-3 mt-3 text-white font-medium rounded-lg uppercase disabled:opacity-80"> {loading ? 'Loading' : 'Sign Up'} </button>
        <OAuth />
      </form>

      <div className="flex mt-5 gap-2">
        <p>Have an Account?</p>
        <Link to={'/sign-in'}><span className="text-blue-600 font-medium">Sign In</span></Link>
      </div>
      <p className="text-red-700 font-medium mt-3"> {error && 'Something went wrong!'} </p>
    </div>
  )
}

export default SignUp;