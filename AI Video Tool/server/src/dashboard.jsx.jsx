import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ userName = "Creator" }) {
  const [ideas, setIdeas] = useState('');
  const [welcome, setWelcome] = useState('Loading...');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/dashboard/welcome?name=${userName}`)
      .then(res => {
        setWelcome(res.data.welcomeMessage);
        setIdeas(res.data.ideas);
      })
      .catch(err => {
        setWelcome("Couldn't load message 😢");
        console.error(err);
      });
  }, [userName]);

  return (
    <div className="p-8 text-white bg-gradient-to-br from-black to-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">{welcome}</h1>
      <h2 className="text-2xl font-semibold mb-2">🎥 Suggested YouTube Video Ideas:</h2>
      <pre className="bg-gray-800 p-4 rounded-xl whitespace-pre-wrap">{ideas}</pre>
    </div>
  );
}
