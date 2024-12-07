// src/App.js
import { Routes, Route } from 'react-router-dom';
import Login from './SignIn/Login/Login';
import SignUp from './SignIn/SignUp/signUp';
import Landing from './SignIn/Landing/Landing';
import Home from './HomePage/Home';
import ChatRoom from './Chatroom/Chatroom';
import Navbar from './Profile/profile';
import HobbiesForm from './Questionaire/Hobbies/Hobbies';
import HabitsForm from './Questionaire/Habits/Habits';
import AcademicDetails from './Questionaire/institute/institute';
import DemographicDetails from './Questionaire/language/lang';
import AboutMe from './Questionaire/about/about';
import ProfileCreation from './Questionaire/profile/profile';
import ProfilePictureUpload from './Questionaire/picture/picture';
import SwipeCards from './swipe_card/Swipecard';
import Matches from './Matches/matches';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path = "/Home" element = {<Home/>}/>   
      <Route path="/chat" element={<ChatRoom />} /> {/* Chat Room Route */}
      <Route path = "/profile" element = {<Navbar/>}/>
    <Route path="/Hobbies" element = {<HobbiesForm/>}/>
      <Route path="/Habits" element = {<HabitsForm/>}/>
      <Route path = "/institute" element ={<AcademicDetails/>}/>
      <Route path = "/language" element ={<DemographicDetails/>}/>
      <Route path = "/About" element ={<AboutMe/>}/>
      <Route path = "/create_profile" element ={<ProfileCreation/>}/>
      <Route path = "/upload_picture" element ={<ProfilePictureUpload/>}/>
      <Route path = "/swipe" element ={<SwipeCards/>}/>
      <Route path = "/matches" element = {<Matches/>}/>


        
    </Routes>
  );
}

export default App;
