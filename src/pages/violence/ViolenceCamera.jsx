import { useRef, useState } from 'react';
import RecordRTC from 'recordrtc'
import api from '../../api/kidsecureApi';


export const ViolenceCamera = () => {

  const [recording, setRecording] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [violenceList, setViolenceList] = useState([]);
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

  const getContentModeration = (jobId) => {
    api
      .post(`/aws-recognition/getContentModeration`, {"jobId": "6212f44eb959a70ddbe803d7c98b411888fe6fff368856cb8104fd63a7fac1a5"})
      .then((res) => {
        console.log("Esto devuelve:", res.data);
        if (res.data.length === 0) {
          // Si el array tiene longitud 0, vuelve a hacer la petición
          getContentModeration(jobId);
        } else {
          // Si el array tiene longitud distinta de 0, actualiza el estado
          setViolenceList(res.data);
          // navigate("/salas");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIndentifyViolence = () => {
    setIsButtonPressed(true);
    api
      .post(`/aws-recognition/contentModeration/video`, formData)
      .then((res) => {
        console.log("Esto devuelve:", res.data.JobId);
        setJobId(res.data.JobId);

        // Llama a la función recursiva
        getContentModeration(res.data.JobId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {isButtonPressed && (
        <>
           <h2 className="text-lg text-gray-400 font-semibold mb-2">Resultado del analisis</h2>
          {violenceList.length === 0 ? (
            <p className='text-lg text-gray-600'>Procesando video...</p>
          ) : (
            <ul className=''>
              {violenceList.map((violence, index) => (
                <li key={index} className='flex justify-between items-center border-b py-2'><span>  Tipo de violencia idenfitificada: {violence.ModerationLabel.Name} </ span > </li>
              ))}
            </ul>
          )}
        </>
      )}
         
        </div>
      </div>
    </div>
  );
};





