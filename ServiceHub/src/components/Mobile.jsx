import React,{useState,useEffect} from 'react'
import firebase from '../firebase'
import '../styles/auth_styles.css';
import LogOut from './Logout';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom'
import { setActiveUser,setUserLogOutState } from '../redux/user/userActions';

const Mobile = () => {
    const dispatch = useDispatch();
    const [number,setNumber] = useState('');
    const [user,setUser]= useState('');

    const clearInputs =() =>{
        setNumber('');
      }

    const handleClick = () => {
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
        firebase
          .auth()
          .signInWithPhoneNumber("+91"+number, recaptcha)
          .then((e) => {
            let code = prompt("enter otp");
            if (code == null) {
              return;
            }
            e.confirm(code).then((res) => {
                dispatch(setActiveUser(res.user.phoneNumber
              ))
                  localStorage.setItem('user',JSON.stringify(user))

            });
          })
          .catch(() => {
            console.log("error");
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
            dispatch(setActiveUser(user.phoneNumber))
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
              <div class="btnContainer">
                  <Link to="/email"><button className="button">Email</button></Link>
                  </div>
                  <div class="btnContainer">
                  <Link to="/mobile"><button className="button">Mobile</button></Link>
                  </div>
              <label>Enter mobile Number</label><br/>
              <input type="text" required value={number} onChange={(e) => setNumber(e.target.value)}/>
              <div class="btnContainer">
              {<button className="button" onClick={handleClick}>Get OTP</button> }
              </div>      
              <div id="recaptcha-container"></div>
              <br/>
              <label></label>
            </div>
            </section>
            )}
        </div>
        
            
      );
    }
    
    export default Mobile;