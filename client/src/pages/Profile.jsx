import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from '../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [ image, setImage ] = useState(undefined);
  const [ imagePercent, setImagePercent ] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [ updateSuccess, setUpdateSuccess ] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() =>{
    if (image) {
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async (image) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  }

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () =>{
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data));
          return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  const handleSignOut = async () =>{
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])}/>

        {/*
        firebase storage rules 
        allow read;
        allow write: if
        request.resource.size < 2 * 1024 * 1024 &&
        request.resource.contentType.matches('image/.*') */}
        
        <img className='self-center rounded-full h-24 w-24 object-cover cursor-pointer' src= {formData.profilePicture || currentUser.profilePicture} alt="propic" onClick={() => fileRef.current.click()}/>

        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        
        <input type="text" defaultValue={currentUser.username} placeholder='Username' id='username' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>
        
        <input type="email" defaultValue={currentUser.email} placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>

        <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}/>

        <button className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80 mt-2 font-medium'> {loading ? 'Loading...' : 'Update'} </button>

      </form>

      <div className='mt-5 flex justify-between'>
        <span onClick={handleDeleteAccount} className='text-red-700 font-medium cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 font-medium cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 font-medium mt-3'> {error && 'Something went wrong!'} </p>
      <p className='text-green-700 font-medium mt-3'> {updateSuccess && 'User is updated successfully!'} </p>
    </div>
  )
}

export default Profile;