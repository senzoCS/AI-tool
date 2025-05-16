import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { saveAs } from 'file-saver';

export default function EditorPage() {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const [trimmedUrl, setTrimmedUrl] = useState('');

  const handleTrim = async () => {
    const res = await fetch('http://localhost:5000/api/editor/trim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoUrl, startTime, endTime })
    });
    const data = await res.json();
    setTrimmedUrl(data.trimmedUrl);
  };

  const handleDownload = () => {
    if (trimmedUrl) {
      saveAs(trimmedUrl, 'edited-video.mp4');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Video Editor</h2>

      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      {videoUrl && (
        <ReactPlayer
          ref={videoRef}
          url={videoUrl}
          controls
          width="100%"
          height="auto"
        />
      )}

      <div className="my-4 flex gap-4">
        <input
          type="number"
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
          className="border p-2 w-1/2"
          placeholder="Start time (s)"
        />
        <input
          type="number"
          value={endTime}
          onChange={(e) => setEndTime(Number(e.target.value))}
          className="border p-2 w-1/2"
          placeholder="End time (s)"
        />
      </div>

      <button
        onClick={handleTrim}
        className="bg-blue-700 text-white px-4 py-2 rounded"
      >
        Trim Video
      </button>

      {trimmedUrl && (
        <div className="mt-4">
          <video src={trimmedUrl} controls width="100%" />
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white mt-2 px-4 py-2 rounded"
          >
            Download Edited Video
          </button>
        </div>
      )}
    </div>
  );
}
