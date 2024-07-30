import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import axios from 'axios';

export default function Apply() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = 'https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=java&l=austin%2C%20tx&radius=25';
      const options = {
        headers: {
          'x-rapidapi-key': '992ea23370msh35e1b27346283d7p10da43jsn9e8cbde86ac4', // Replace with your actual RapidAPI key
          'x-rapidapi-host': 'indeed-indeed.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.get(url, options);
        setJobs(response.data); // Adjust this based on the actual response structure
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error)
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="certify-container bg-page_background min-h-screen w-full  ">
      <PageHeader pageName="Apply" heading="Get Your Dream Job" bookmarkedChanllenges={false} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>{job.title}</li> // Adjust the property name based on the actual job object structure
          ))}
        </ul>
      )}
    </div>
  );
}
