import { useRef, useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc'
// import api from '../../API/axios';
// import Pagination from '../../components/utils/Pagination';

export const ViolenceCamera = () => {

  const [recording, setRecording] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const videoRef = useRef(null);
  const recorderRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    recorderRef.current = new RecordRTC(stream, { type: 'video' });
    recorderRef.current.startRecording();
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      setVideoFile(new File([blob], 'recorded-video.webm', { type: 'video/webm' }));
    });
    setRecording(false);
  };

  const playVideo = () => {
    if (videoRef.current && videoFile) {
      const videoUrl = URL.createObjectURL(videoFile);
      videoRef.current.src = videoUrl;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
      <div className='flex justify-between px-5 py-5 items-center'>
            <h1 className="text-2xl font-semibold text-gray-400">DETECCIÓN DE VIOLENCIA</h1>
        </div>
        <div className="flex justify-center items-center">
          <video
            ref={videoRef}
            controls
            className="w-full max-w-2xl mb-4"
          ></video>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`bg-customGreen text-white px-4 py-2 rounded mr-4 ${
              recording ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={startRecording}
            disabled={recording}
          >
            Grabar
          </button>
          <button
            className={`bg-customPink text-white px-4 py-2 rounded mr-4 ${
              !recording ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={stopRecording}
            disabled={!recording}
          >
            Detener
          </button>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="border p-2 rounded mr-4"
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={playVideo}
            disabled={!videoFile}
          >
            Visualizar Video
          </button>
        </div>
      </div>
    </div>
  );
};





