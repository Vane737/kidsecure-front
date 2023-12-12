import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import api from "../../api/kidsecureApi";
import { MyModalAccept } from "../../components/utils/MyModalAccept";

export const VerifyPersonnel = () => {
  const { id } = useParams(); // id del niño
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [text, setText] = useState("");

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (!capturedImage) {
      // Verifica si se ha capturado una imagen antes de enviarla
      console.log("Debes capturar una imagen primero.");
      return;
    }

    const data = new FormData();
    data.append("photo", capturedImage); // Agrega la imagen capturada al objeto FormData

    api
      .post("/authorized-person/verify", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setText('Es una persona autorizada')
        setIsOpen(true);
        console.log(res);
        // navigate("/personal");
      })
      .catch((err) => {
        setIsOpen(true);
        setText('No es una persona autorizada!!!')
        console.log(err);
      });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured-image.png", { type: "image/png" });
          setCapturedImage(file);
        });
    }
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
    }
  };

  return (
    <div className="w-full p-5 container">
      <div className="">
        <div className="mt-3 px-5 py-5 w-full">
          <h1 className="text-2xl font-semibold text-gray-400 pb-5">VERIFICACION DE PERSONA AUTORIZADA</h1>
        </div>
        <div className="flex w-full pl-9 items-center justify-around">
          <div className=" w-2/4 border-r-gray-400">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/png"
              className="w-96 h-96"
            />
            <button className="bg-customPink rounded-md w-96 mb-9 text-center px-5 py-2 text-white" onClick={captureImage}>
              CAPTURAR
            </button>
          </div>
          <div className="w-2/4 border-l-gray-400">
            {capturedImage && (
              <img className="w-96 h-72" src={URL.createObjectURL(capturedImage)} alt="Imagen Capturada" />
            )}
            {capturedImage ? (
              <button className="bg-customGreen w-96 px-5 rounded-md text-center py-2 mt-11 text-white" onClick={handleVerifySubmit}>
                VERIFICAR
              </button>
            ) : null}
          </div>
        </div>
        {isOpen && <MyModalAccept Text={text} estados={closeModal} />}
      </div>
    </div>
  );
};