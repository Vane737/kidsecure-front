
// export default ImageClassifierComponent;
import { useEffect, useRef, useState } from 'react';
import { ImageClassifier, FilesetResolver } from "@mediapipe/tasks-vision";

const ImageClassifierComponent = () => {
  const videoRef = useRef(null);
  const fightAlertDivRef = useRef(null);
  const [imageClassifier, setImageClassifier] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

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
          
          // Aqui debe iniciarse el proceso de emitir el evento y crear la notificacion
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
      const stream = videoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadLink(url);
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Detiene la grabación después de 10 segundos
      setTimeout(() => {
        stopRecording();
      }, 10000);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };


  const stopRecording = async () => {
    try {
      mediaRecorderRef.current.stop();
      setRecording(false);
  
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
  
      const formData = new FormData();
      formData.append('video', blob, 'violence_detection_video.webm');
  
      // const response = await fetch('/guardar-video', {
      //   method: 'POST',
      //   body: formData,
      // });
  
      // if (response.ok) {
      //   console.log('Video guardado exitosamente en el servidor.');
      // } else {
      //   console.error('Error al guardar el video en el servidor.');
      // }
  
      chunksRef.current = [];
    } catch (error) {
      console.error('Error al detener la grabación:', error);
    }
  };
  // const stopRecording = () => {
  //   try {
  //     mediaRecorderRef.current.stop();
  //     setRecording(false);
  //     if (videoRef.current.srcObject) {
  //       const tracks = videoRef.current.srcObject.getTracks();
  //       tracks.forEach(track => track.stop());
  //       videoRef.current.srcObject = null;
  //     }
  //   } catch (error) {
  //     console.error('Error al detener la grabación:', error);
  //   }
  // };

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
            {/* {downloadLink && (
              <a href={downloadLink} download="violence_detection_video.webm">
                Descargar Video
              </a>
            )} */}
          </div>
        </div>
    </div>
  );
};

export default ImageClassifierComponent;



