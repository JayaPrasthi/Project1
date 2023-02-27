import React, {useState} from 'react';
import { NavLink} from "react-router-dom";

const Login = () =>{
  
  const[email, setEmail ] = useState( '');
  const[password, setPassword] = useState ('');
  const[isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false );
  
  const handleLogout = () =>{
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }
  
  const loginUser = async  (e) =>{
      e.preventDefault();

      const res = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers: {
             "Content-Type" : "application/json"
        }, 
        body: JSON.stringify({
           email, 
           password
        })
      });

      const data = res.json();

      if(res.status === 400 || !data){
        window.alert("Invalid Credentials")
      }else{
        window.alert("Login Successful")
        localStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
        window.location.href = '/Dashboard';
      }
  }

  return(
    <>
    <section>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            {isLoggedIn ?
              <>
                <h2 className="text-uppercase text-center mt-2 mb-2">You are logged in</h2>
                <div align="center"> <br/>
                <button type="button" className="btn btn-primary"   onClick={handleLogout}>Logout</button>
                </div>
              </>
              :
              <>
                <h2 className="text-uppercase text-center mt-2 mb-2"> Login In  </h2>
                <form method="POST">
                  <div className="form-outline mb-2"> 
                    <label> Email</label>
                    <input type="email" name="email" className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                  </div>

                  <div className="form-outline mb-2">
                    <label> Password </label>
                    <input type="password" name="password" className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                  </div>

                  <div className="form-outline mb-2" align="center"> 
                    <NavLink to="/Signup"> Create an Account </NavLink>
                  </div>

                  <div align="center">
                    <button type="button" className="btn btn-success" name="signup" value="register" onClick={loginUser}>
                      Login
                    </button>
                  </div>
                </form>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Login;
