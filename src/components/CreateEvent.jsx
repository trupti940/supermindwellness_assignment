import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateEvent = ({ onEventCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      
      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
      });
      setSuccessMessage("Event created successfully!");
      setErrorMessage('');

      
      if (onEventCreated) {
        onEventCreated(); 
      }

      
      setTitle('');
      setDescription('');
      setDate('');

      
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500); 
    } catch (error) {
      console.error("Error creating event: ", error);
      setErrorMessage("Error creating event. Please try again.");
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleCreateEvent} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Create Event</h2>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
