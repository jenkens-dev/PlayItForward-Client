// React Imports
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Custom Imports
import EventCard from './EventCard';
import notFoundGif from '../media/animations/event-not-found.gif';
import Modal from '../components/Modal';
//file generated by running npm run apollo:generate, this looks at our graphql schema and creates types for typescript based on the schema
import { getEvents } from '../generated/getEvents';
import { getEvents_getEvents } from '../generated/getEvents';
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
        id
        displayName
      }
    }
  }
`;

//graphql mutation to sign up volunteers for an event
const ADD_VOLUNTEER = gql`
  mutation addVolunteer($volunteerId: Int!, $eventId: Int!) {
    addVolunteer(volunteerId: $volunteerId, eventId: $eventId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const EventCardCollection = () => {
  //useQuery hook takes our gql query and makes a request to the backend
  //the return value is held in data
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [addVolunteer] = useMutation(ADD_VOLUNTEER);

  const handleAttendClick = async () => {
    const volunteerId = parseInt(localStorage.getItem('volunteerId')!);
    let mutationResult = await addVolunteer({
      variables: {
        eventId: selectedEventId,
        volunteerId,
      },
    });
    if (mutationResult.data.addVolunteer.ok) {
      closeModal();
      //add notfication of successful signup
    }
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { loading, error, data } = useQuery<getEvents>(GET_EVENTS);

  if (loading || !data) return null;
  const { getEvents: events } = data;

  const selectedEvent = !!selectedEventId
    ? events.find(event => event.id === selectedEventId)
    : null;

  return (
    <div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
        <p>
          {selectedEvent?.title} by {selectedEvent?.nonprofit['displayName']}
        </p>
        <p>{selectedEvent?.date}</p>
        <p>{selectedEvent?.location}</p>
        <button
          onClick={handleAttendClick}
          style={{
            position: 'absolute',
            bottom: 5,
            right: 10,
            color: 'white',
            background: '#2a4365',
            padding: '5px',
            borderRadius: '15px',
          }}>
          Attend
        </button>
      </Modal>
      {!error ? (
        <div>
          <div>
            {/* List Of Events from Props */}
            {data.getEvents.map(event => {
              return (
                <EventCard
                  event={event}
                  key={event.id}
                  addModalContent={() => {
                    setSelectedEventId(event.id);
                  }}
                  toggleModal={toggleModal}
                />
              );
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
