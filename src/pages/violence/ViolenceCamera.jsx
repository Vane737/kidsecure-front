import { useRef, useState } from 'react';
// import {  useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc'
import api from '../../api/kidsecureApi';
// import api from '../../API/axios';
// import Pagination from '../../components/utils/Pagination';

export const ViolenceCamera = () => {

  const [recording, setRecording] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [violenveList, setViolenceList] = useState([]);
  const videoRef = useRef(null);
  const recorderRef = useRef(null);
   // Crear un formulario para enviar el archivo
   const formData = new FormData();
  formData.append("bucketName", "bucketpersons");
  formData.append("videoId", "video_niÃ±o-es-maltratado.mp4.mp4");
  

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

  const handleIndentifyViolence = ()=>{
    api
    .post(`/aws-recognition/contentModeration/video`, formData
    )
    .then((res) => {
      console.log("Esto devuelve:", res.data.JobId);
      setJobId(res.data.JobId)
      api
        .post(`/aws-recognition/getContentModeration`, {"jobId": jobId}
        )
        .then((res) => {
          console.log("Esto devuelve:", res.data);
          setViolenceList(res.data)
          // navigate("/salas");
        })
        .catch((err) => {
          console.log(err);
        });
      // navigate("/salas");
    })
    .catch((err) => {
      console.log(err);
    });

  }

  const convertSegAHorMinSeg = (totalSegundos) => {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;
  
    // Formatear los resultados con ceros a la izquierda si es necesario
    const horasFormateadas = horas.toString().padStart(2, '0');
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');
  
    return `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
  }

  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
      <div className='flex justify-between px-5 py-5 items-center'>
            <h1 className="text-2xl font-semibold text-gray-400">DETECCIÓN DE VIOLENCIA</h1>
            <button className='bg-customGreen rounded-md p-2 font-semibold pr-4 pl-4 text-white'
            onClick={handleIndentifyViolence}>Detectar Violencia</button>
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

        <div className="px-5 mt-4">
          <h2 className="text-lg text-gray-400 font-semibold mb-2">Resultado del analisis</h2>
          <ul>
            {violenveList.map((violence, i) => (
              <li key={i} className="flex justify-between items-center border-b py-2">
                <span>  Tipo de violencia idenfitificada: {violence.ModerationLabel.Name} </ span > 
                {/* <span>Tipo de violencia idenfitificada: {violence.ModerationLabel.Name} </ span >  <span> En minuto {convertSegAHorMinSeg(violence.Timestamp)}</span> */}
    
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};





