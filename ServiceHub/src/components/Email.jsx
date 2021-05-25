import React from 'react';
import '../styles/auth_styles.css';
import {Link} from 'react-router-dom'
import {useState,useEffect} from 'react'
import firebase from '../firebase';
import {useDispatch} from 'react-redux';
import { setActiveUser,setUserLogOutState } from '../redux/user/userActions';

import LogOut from './Logout'


const Email = () => {

    const dispatch = useDispatch();
    const [heading, setHeading] = useState('Register');
    const [user,setUser]= useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailError,setEmailError]=useState('');
    const [passwordError,setPasswordError]=useState('');
    const [hasAccount,setHasAccount]=useState(false);


    const clearErrors = () =>{
        setEmailError('');
        setPasswordError('');
      }
      const clearInputs =() =>{
        setEmail('');
        setPassword('');
      }
      const handleLogin =() =>{
          clearErrors();
          firebase
          .auth()
          .signInWithEmailAndPassword(email,password)
          .then((result)=>{
            dispatch(setActiveUser(result.user.email))
            localStorage.setItem('user',JSON.stringify(user))
          })
          .catch(err => {
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
          });
      };
      const handleSignup =() =>{
        clearErrors();
        firebase
          .auth()
          .createUserWithEmailAndPassword (email,password)
          .then((result)=>{
            dispatch(setActiveUser(result.user.email))
            localStorage.setItem('user',JSON.stringify(user))
          })
          .catch(err => {
            switch(err.code){
              case "auth/email-already-in-use":
              case "auth/invalid-email": 
                setEmailError(err.message);
                break;
              case "auth/weak-password":
                setPasswordError(err.message);
                break;
            }
          });
      };
      const handleLogout =()=>{
        firebase.auth().signOut()
        .then(()=>{
          dispatch(setUserLogOutState())
          }).catch((err)=>alert(err.message))
        localStorage.removeItem('user');
      };
      const authListener =()=>{
        firebase.auth().onAuthStateChanged((user) =>{
          if(user){
              clearInputs();
            setUser(user);
            dispatch(setActiveUser(
              user.email))
            localStorage.setItem('user',JSON.stringify(user))
          }
          else{
            setUser("");
          }
         
        });
      };
      useEffect(()=>{
          authListener();
      }, []);
      return (
        <div> 
              <div class="bg1"></div>
              <div class="bg1 bg2"></div>
              <div class="bg1 bg3"></div>

            {user ? (<LogOut/>) : (
              <section className="login">
              <div className="loginContainer">
                <p className="text-3xl text-center">{heading}</p>
              <div className="btnContainer">
                  <Link to="/email"><button className="button">Email</button></Link>
                  </div>
                  <div className="Mobile">
                  <Link to="/mobile"><button className="button">Mobile</button></Link>
                  </div>
              <label id='username'>UserName</label>
              <input type="text"required value={email} onChange={(e) => setEmail(e.target.value)}/>
              <p className="errorMsg">{emailError}</p>
              <label>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              <p className="errorMsg">{passwordError}</p>
              <div className="btnContainer">
                        {hasAccount ? (
                            <>
                            <button className="button" onClick={handleLogin}>Sign In</button>
                            <p>Don't Have an Account ? <span onClick={ () => {setHasAccount(!hasAccount); setHeading('Register');}}>Sign Up</span></p>
                            </>
                        ):(
                                <>
                                <button className="button" onClick={handleSignup}>Sign Up</button>
                                <p>Have an Account ? <span onClick={ () => {setHasAccount(!hasAccount); setHeading('Login')}}>Sign In</span>
                                </p>
                                </>
                        )}
    
                    </div>
            </div>
            </section>
            )}
        </div>
        
            
      );
    }
    
    export default Email;