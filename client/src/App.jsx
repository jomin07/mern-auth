import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIN from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';

const App = () => {
  return (
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/sign-in" element={<SignIN />}/>
            <Route path="/sign-up" element={<SignUp />}/>
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />}/>
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Dashboard />}/>
              <Route path="/admin/edit-user/:userId" element={<EditUser />}/>
              <Route path="/admin/add-user" element={<AddUser />}/>
            </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App