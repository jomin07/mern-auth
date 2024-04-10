import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [ formData, setFormData ] = useState({});
  const [ errors, setErrors ] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data));
          return;
        }
        dispatch(signInSuccess(data));
        // Check if user isAdmin
        if (data.isAdmin) {
          // Redirect to admin dashboard
          navigate('/admin');
      } else {
          // Redirect to regular user dashboard
          navigate('/');
      }
      } catch (error) {
        dispatch(signInFailure(error));
      }
  }

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-7 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <input type="text" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        {errors.email && <p className="text-red-700 font-medium">{errors.email}</p>}

        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        {errors.password && <p className="text-red-700 font-medium">{errors.password}</p>}

        <button disabled={loading} className="bg-slate-700 hover:opacity-95 p-3 text-white font-medium rounded-lg uppercase disabled:opacity-80"> {loading ? 'Loading' : 'Sign In'} </button>
        <OAuth />
      </form>

      <div className="flex mt-5 gap-2">
        <p>New User?</p>
        <Link to={'/sign-up'}><span className="text-blue-600 font-medium">Sign Up</span></Link>
      </div>
      <p className="text-red-700 font-medium mt-3"> {error ? error.message || 'Something went wrong!' : ''} </p>
    </div>
  )
}

export default SignIn;