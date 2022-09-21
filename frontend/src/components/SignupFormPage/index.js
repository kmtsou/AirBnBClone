import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [valErrors, setValErrors] = useState([]);

  // useEffect(() => {
  //   let formErrors = []
  //   if (!email.includes('@')) formErrors.push('Please provide a valid email')
  //   setValErrors(formErrors);
  // }, [email])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <ul>
          {errors.map((error, idx) => <li key={idx} className='signup-error-line'>{error}</li>)}
        </ul>
        <div className="signup-input-line">
          <label>
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input-box"
            placeholder="Email"
          />
        </div>
        <div className="signup-input-line">
          <label>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input-box"
            placeholder="Username"
          />
        </div>
        <div className="signup-input-line">
          <label>
            First name:
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="signup-input-box"
            placeholder="First Name"
          />
        </div>
        <div className="signup-input-line">
          <label>
            Last name:
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="signup-input-box"
            placeholder="Last Name"
          />
        </div>
        <div className="signup-input-line">
          <label>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input-box"
            placeholder="Password"
          />
        </div>
        <div className="signup-input-line">
          <label>
            Confirm Password:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="signup-input-box"
            placeholder="Confirm Password"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="signup-input-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
