import { useSelector } from 'react-redux';
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='self-center rounded-full h-24 w-24 object-cover cursor-pointer' src= {currentUser.profilePicture} alt="propic" />
        <input type="text" defaultValue={currentUser.username} placeholder='Username' id='username' className='bg-slate-100 rounded-lg p-3' />
        <input type="email" defaultValue={currentUser.email} placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-3' />
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-3' />
        <button className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80 mt-2 font-medium'>Update</button>
      </form>
      <div className='mt-5 flex justify-between'>
        <span className='text-red-700 font-medium cursor-pointer'>Delete Account</span>
        <span className='text-red-700 font-medium cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile