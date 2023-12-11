import { useEffect, useRef, useState } from 'react';
import { ImageClassifier, FilesetResolver } from "@mediapipe/tasks-vision";
import Webcam from 'react-webcam';

const ImageClassifierComponent = () => {
  const webcamRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const webcamPredictionsRef = useRef(null);
  const [imageClassifier, setImageClassifier] = useState(null);

  // Crea el clasificador de imágenes
  const createImageClassifier = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm"
    );
    const classifier = await ImageClassifier.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`
      },
      maxResults: 1,
      runningMode: "VIDEO"
    });
    setImageClassifier(classifier);
  };

  // Inicializa el clasificador de imágenes cuando se monta el componente
  useEffect(() => {
    createImageClassifier();
    return () => {
      if (imageClassifier) {
        imageClassifier.close();
      }
    };
  }, []);

  // Realiza la clasificación en tiempo real y actualiza los resultados
  const predictWebcam = async () => {
    if (imageClassifier && webcamRef.current && webcamRef.current.video.readyState === 4) {
      const startTimeMs = performance.now();
      const classificationResult = await imageClassifier.classifyForVideo(webcamRef.current.video, startTimeMs);
      const classifications = classificationResult.classifications;
      if (classifications.length > 0 && classifications[0].categories.length > 0) {
        const p = webcamPredictionsRef.current;
        p.className = "webcamPredictions";
        p.innerText =
          "Classification: " +
          classifications[0].categories[0].label +
          "\n Confidence: " +
          Math.round(parseFloat(classifications[0].categories[0].score) * 100) +
          "%";
      }
      classificationResult.close();
      if (webcamRunning) {
        window.requestAnimationFrame(predictWebcam);
      }
    }
  };

  // Activa o desactiva la webcam y comienza o detiene la clasificación
  const enableCam = async () => {
    if (webcamRunning) {
      setWebcamRunning(false);
      if (webcamRef.current && webcamRef.current.video.srcObject) {
        webcamRef.current.video.srcObject.getTracks().forEach(track => track.stop());
      }
    } else {
      setWebcamRunning(true);
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      webcamRef.current.video.srcObject = stream;
      webcamRef.current.video.addEventListener("loadeddata", () => {
        predictWebcam();
      });
    }
  };

  return (
    <div className='my-6'>
      <div className="App">
        <Webcam ref={webcamRef} />
        <button onClick={enableCam}>
          {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS"}
        </button>
        <div ref={webcamPredictionsRef} className="webcamPredictions"></div>
      </div>
    </div>
  );
};

export default ImageClassifierComponent;
