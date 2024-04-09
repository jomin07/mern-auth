import { useState } from "react"
import { useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth";

const AddUser= () => {
  const [ formData, setFormData ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

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
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
        navigate('/admin');
      } catch (error) {
        setLoading(false);
        setError(true);
      }
  }

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="font-semibold text-3xl my-12 text-center">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email" id="email" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="p-3 bg-slate-100 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 hover:opacity-95 p-3 text-white font-medium rounded-lg uppercase disabled:opacity-80"> {loading ? 'Loading' : 'Add User'} </button>
        
      </form>

      <p className="text-red-700 font-medium mt-3"> {error && 'Something went wrong!'} </p>
    </div>
  )
}

export default AddUser;