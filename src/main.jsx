import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ConsultationNav from './pages/ConsultationNavigator.jsx';
import Navbar from './components/user/Navbar.jsx';
import Footer from './components/user/Footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/contexts/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import { NameProvider } from './components/contexts/NameContext.jsx';
import { PetProvider } from './components/contexts/PetContext.jsx';
import VetVisit from './pages/VetVisit.jsx';
import ProtectedRoutes from './Auth/ProtectedRoutes.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import Admin from './pages/Admin.jsx';
import Vet from './pages/Vet.jsx';
import VetVisitsPage from './pages/VetVisitsPage.jsx';
import VetConsultations from './pages/VetConsultations.jsx';
import MedicalEvidence from './pages/MedicalEvidence.jsx';
import Video from './pages/consultation/Video.jsx';

import Text from './pages/consultation/Text.jsx';
import TextCons from './pages/consPages/TextCons.jsx';
import ConsultationLayout from './components/layouts/ConsultationLayout.jsx';
import VetLayout from './components/layouts/VetLayout.jsx';
import NotFound from './pages/NotFound.jsx';
import Test from './pages/Test.jsx';
import VetTextCons from './pages/consPages/VetTextCons.jsx';
import { ConsProvider } from './components/contexts/ConsContext.jsx';
import VideoCons from './pages/consPages/VideoCons.jsx';
import RestrictedPage from './Auth/RestrictedPage.jsx';
import NotValidConsPage from './pages/NotValidConsPage.jsx';
import VetVideoCons from './pages/consPages/VetVideoCons.jsx'
import TodaysConsultationLayout from './components/layouts/TodaysConsultationLayout.jsx';
import TodayAllCons from './pages/TodayAllCons.jsx';
import ChatConnectionService from './components/services/ChatConnectionService.jsx';
import { ChatProvider } from './components/contexts/ChatContext.jsx';
import Loading from './pages/Loading.jsx'
import TestLayout from './components/layouts/TestLayout.jsx';
import TestPage from './pages/test/OutletTest.jsx'

const Main = () => {
  const currentPath = useLocation();

  

  return (
    <CartProvider>
    <NameProvider>
      <PetProvider>
        <ConsProvider>
          <ChatProvider>
        <ToastContainer autoClose={400}/>
        <div className="appContainer">
        {(currentPath.pathname !== '/login' && currentPath.pathname !== '/signup' &&  !currentPath.pathname.startsWith('/test') && currentPath.pathname !== '/vet' && currentPath.pathname !== '/loading') && <Navbar/>}

        <Routes>
          <Route path='/test' element={<TestLayout/>}>
            <Route path='page1' element={<TestPage/>}/>
          </Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route element={<ProtectedRoutes accessRole={['User','Admin']}/>}>
            <Route path='/vetvisit' element={<VetVisit/>}/>
            <Route path='/consultation' element={<ConsultationLayout/>}>
                <Route index element={<ConsultationNav/>}/>
                <Route path='video' >
                  <Route index element={<Video/>}/>
                  <Route element={<RestrictedPage/>}>
                  <Route path='chat' element={<VideoCons/>}/>
                  </Route>
                </Route>

                <Route path='text'>
                  <Route index element={<Text/>} />
                  <Route path='chat/:consId' element={<TextCons/>} />   
                </Route>
            </Route>
            
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>

          <Route element={<ProtectedRoutes accessRole={['Admin']}/>}>
            <Route path='/admin' element={<Admin/>}/>
          </Route>

          <Route element={<ProtectedRoutes accessRole={['Vet','Admin']}/>}>
            <Route path='/vet' element={<VetLayout/>}>
              <Route path='visits' >
                <Route index element={<VetVisitsPage/>}/>
                <Route path='pets' element={<MedicalEvidence/>}/>
              </Route>
              <Route path='consultations' element={<TodayAllCons/>}/>
                  <Route index />
                  <Route path='text/:consId' element={<VetTextCons/>}/> 
                  <Route path='video/:consId' element={<VetVideoCons/>}/>
              </Route>   
            </Route>
          
          <Route path='/unauthorized' element={<Unauthorized/>}/>
          <Route path='/notvalid' >
            <Route path='video' element={<NotValidConsPage type={'video'}/>}/>
            <Route path='text' element={<NotValidConsPage type={'text'}/>}/>
            <Route path='emerg' element={<NotValidConsPage type={'emerg'}/>}/>
          </Route>
          
          <Route path='*' element={<NotFound/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/loading' element={<Loading/>}/>
        </Routes>

      {(!currentPath.pathname.startsWith('/login') && !currentPath.pathname.startsWith('/signup') && !currentPath.pathname.startsWith('/vet/')) && <Footer/>}
      </div>
        </ChatProvider>
        </ConsProvider>
      </PetProvider>
    </NameProvider>
  </CartProvider>
  
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Main />
  </Router>
);

