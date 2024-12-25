import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      
      const today = new Date();

      
      const upcoming = eventList.filter(event => new Date(event.date) >= today);
      const previous = eventList.filter(event => new Date(event.date) < today);

      setUpcomingEvents(upcoming);
      setPreviousEvents(previous);
    });

   
    return () => unsubscribe();
  }, []);

  
  const handleCreateEvent = () => {
    
    navigate('/dashboard');
  };

  return (
    <div className="dashboard p-6 bg-white">
      
      

      <h2 className="text-black font-bold mt-8 mb-4 text-2xl">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map(event => (
            <div key={event.id} className="border rounded-lg shadow-lg p-4 bg-rgb(255,255,255) w-[450px]">
              <h3 className="text-black font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-2xl">No upcoming events.</p>
        )}
      </div>

      <h2 className="text-black font-bold mt-8 mb-4 text-2xl">Previous Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {previousEvents.length > 0 ? (
          previousEvents.map(event => (
            <div key={event.id} className="border rounded-lg shadow-md p-4 bg-white w-[450px]">
              <h3 className="text-black font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No previous events.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
