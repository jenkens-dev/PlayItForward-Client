// React Imports
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Custom Imports
import EventCard from './EventCard';
import notFoundGif from '../media/animations/event-not-found.gif';
//file generated by running npm run apollo:generate, this looks at our graphql schema and creates types for typescript based on the schema
import { getEvents } from '../generated/getEvents';
// This component holds multiple Event Cards accessible through scrolling
// Layout:
// List of Events

//graphql query object returns all events
const GET_EVENTS = gql`
  query getEvents {
    getEvents {
      id
      image
      title
      date
      location
      nonprofit {
        displayName
      }
    }
  }
`;

const EventCardCollection = () => {
  //useQuery hook takes our gql query and makes a request to the backend
  //the return value is held in data
  const { loading, error, data } = useQuery<getEvents>(GET_EVENTS);
  if (loading || !data) return null;
  console.log(data);
  return (
    <div>
      {!error ? (
        <div className="event-list-pg-events-container flex justify-center items-center">
          <div className="flex flex-col xl:flex-row justify-center items-center w-screen">
            {/* List Of Events from Props */}
            {data.getEvents.map(event => {
              return <EventCard event={event} key={event.id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="event-list-page-image-container flex justify-center items-center">
          <div className="event-list-page-image-container flex flex-col justify-center items-center">
            <img className="h-64" src={notFoundGif} alt="" />
            <h2 className="block font-bold text-lg">
              Oops! Couldn't Find Any Events!
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCardCollection;
