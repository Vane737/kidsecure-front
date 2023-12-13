import { useEffect, useRef, useState } from 'react';
import { ImageClassifier, FilesetResolver } from "@mediapipe/tasks-vision";
import io from "socket.io-client";
import api from '../../api/kidsecureApi';

const socket = io('https://notifications-0v22.onrender.com/');

const ImageClassifierComponent = () => {
  const videoRef = useRef(null);
  const fightAlertDivRef = useRef(null);
  const [imageClassifier, setImageClassifier] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const createImageClassifier = async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      const classifier = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `/assets/model.tflite`
        },
        maxResults: 1,
        runningMode: 'VIDEO'
      });
      setImageClassifier(classifier);
    } catch (error) {
      console.log('Error al crear el clasificador de imágenes:', error);
    }
  };

  useEffect(() => {
    createImageClassifier();
  }, []);

  const toggleProcessing = () => {
    if (isProcessing) {
      stopProcessing();
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    if (videoRef.current) {
      const streamPromise = navigator.mediaDevices.getUserMedia({ video: true });
      streamPromise.then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", handleVideoLoadedData);
      }).catch((error) => {
        console.error('Error al obtener el video:', error);
        setIsProcessing(false);
      });
    }
  };

  const stopProcessing = () => {
    setIsProcessing(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isProcessing) {
      startProcessing();
    } else {
      stopProcessing();
    }
  }, [isProcessing]);

  const handleVideoLoadedData = () => {
    if (isProcessing) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  const predictWebcam = async () => {
    if (!imageClassifier || !videoRef.current || videoRef.current.readyState !== 4) {
      return;
    }

    try {
      const startTimeMs = performance.now();
      const classificationResult = await imageClassifier.classifyForVideo(
        videoRef.current,
        startTimeMs
      );
      const classifications = classificationResult.classifications;

      if (classifications.length > 0 && classifications[0].categories.length > 0) {
        const category = classifications[0].categories[0];
        const fightAlertDiv = fightAlertDivRef.current;
        if (category.score > 0.9 && category.categoryName === "violencia") {
          console.log("**Alerta! Posible pelea detectada.**");
          console.log(`- Categoría: ${category.categoryName}`);
          console.log(`- Confianza: ${Math.round(category.score * 100)}%`);

          fightAlertDiv.classList.add("fightAlertDivActive");
          fightAlertDiv.style.backgroundColor = "red";
          fightAlertDiv.innerText = "¡Alerta! Posible pelea detectada.";

          // Iniciar el temporizador cuando se detecta un acto de violencia
          startRecordingTime();
          if (!recording) {
            startRecording();
          }
        } else {
          fightAlertDiv.classList.remove("fightAlertDivActive");
          fightAlertDiv.style.backgroundColor = "";
          fightAlertDiv.innerText = "No se ha encontrado ningun acto de violencia";
        }
      }

      if (isProcessing) {
        window.requestAnimationFrame(predictWebcam);
      }
    } catch (error) {
      console.error('Error al clasificar el video:', error);
    }
  };

  const startRecording = () => {
    try {
      startRecordingTime();

      const stream = videoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const webmBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        await sendToServer(webmBlob);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Detener la grabación después de 10 segundos
      setTimeout(() => {
        stopRecording();
      }, 10000);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current.stop();
      setRecording(false);
      console.log('Se ha detenido la grabacion');
      // Detener el temporizador cuando se detiene la grabación
      stopRecordingTime();
    } catch (error) {
      console.error('Error al detener la grabación:', error);
    }
  };

  const sendToServer = (file) => {
    console.log('Se está enviando el video al servidor....');

    const formData = new FormData();
    formData.append('video', file, 'violence_detection_videoss');

    api.post(`/aws-recognition/upload/video`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Respuesta del servidor:', response.data.videoUrl);
        console.log('Video guardado exitosamente en el servidor.');
        console.log('Se procedera a enviar la notificacion');

        socket.emit('notification', {
          type: "Posible acto de violencia detectado",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          videoUrl: response.data.videoUrl,
          user_id: 1
        });

      })
      .catch((error) => {
        console.error('Error al enviar el video al servidor:', error);
      });
  };

  const startRecordingTime = () => {
    setRecordingTime(0);

    const timerId = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);

      if (recordingTime >= 10) {
        // Detener el temporizador y la grabación después de 10 segundos
        clearInterval(timerId);
        stopRecording();
      }
    }, 1000);
  };

  const stopRecordingTime = () => {
    setRecordingTime(0);
  };

  return (
    <div className='p-5 container w-full'>
       <div className="flex justify-between px-5 pt-3 items-center mt-3 w-full">
          <h1 className="text-2xl font-semibold text-gray-400">
            DETECCIÓN DE VIOLENCIA
          </h1>
          <button className='bg-customPink rounded-md p-2 pr-4 pl-4 my-2' onClick={toggleProcessing}>
            {isProcessing ? 'Detener procesamiento' : 'Iniciar procesamiento'}
          </button>
        </div>
        <div className='flex justify-center w-full'>
          <div className="App text-center items-center">
            <video ref={videoRef} autoPlay playsInline muted />
            <div ref={fightAlertDivRef} className="fightAlertDiv text-2xl bg-primary text-white"></div>
          </div>
        </div>
    </div>
  );
};

export default ImageClassifierComponent;
