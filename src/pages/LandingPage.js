// React Imports
import React from "react";

// Custom Imports
import Navbar from "../components/Navbar";
import EventCardCollection from "../components/EventCardCollection";
import trophyGif from "../media/animations/trophy-rotate.gif";

// This functional component renders the landing page
// Layout (from top --> bottom):
// Navbar, Logo, Upcoming Events
const LandingPage = () => {
  return (
    <div className="landing-page flex flex-col w-screen">
      {/* Navbar */}
      <Navbar />

      {/* Logo */}
      <div className="landing-pg-logo flex items-center justify-center h-64">
        <img className="h-64" src={trophyGif} alt="" />
      </div>

      {/* Upcoming Events */}
      <div className="landing-pg-upcoming-events flex flex-col items-center justify-center w-screen flex-grow">
        <h1 className="font-bold text-xl pb-1">UPCOMING EVENTS</h1>
        <EventCardCollection />
      </div>
    </div>
  );
};

export default LandingPage;