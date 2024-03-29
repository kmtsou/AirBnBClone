import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from "./components/Spots";
import SpotShow from "./components/Spots/SpotShow";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import UpdateSpotForm from "./components/Spots/UpdateSpotForm";
import UserSpots from "./components/Spots/CurrentSpots";
import UserBookings from "./components/Bookings/CurrentBookings";
import Footer from "./components/Footer";
import "./App.css"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/" exact>
              <SpotIndex />
            </Route>
            <Route path='/spots/current' exact>
              <UserSpots />
            </Route>
            <Route path="/spots/new" exact>
              <CreateSpotForm />
            </Route>
            <Route path="/spots/:spotId" exact>
              <SpotShow />
            </Route>
            <Route path="/spots/:spotId/update" exact={true}>
              <UpdateSpotForm />
            </Route>
            <Route path='/bookings/current' exact>
              <UserBookings />
            </Route>
            <Route>
              Page Not Found
            </Route>
          </Switch>
          <Footer />
          <div className="social-links-container">
            <div className="social-text">Airbnb clone by Kevin Tsou</div>
            <div className="links-container">
              <a className="social-link" href="https://github.com/kmtsou" target='_blank' rel='noopener noreferrer'>Github</a>
              <a className="social-link" href="https://www.linkedin.com/in/kevin-tsou-07aa99111/" target='_blank' rel='noopener noreferrer'>LinkedIn</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
