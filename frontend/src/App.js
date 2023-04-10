import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from "react-router-dom"
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import UserAnalytics from './components/UserAnalytics';
import UserList from './components/UserList';
import PostAnalytics from './components/PostAnalytics';
import Error from './Error';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/useranalytics" element={<UserAnalytics />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/postanalytics" element={<PostAnalytics />} />
        <Route path="*" element={<Error />} />
      </Routes>
     
    </>
  );
}

export default App;
