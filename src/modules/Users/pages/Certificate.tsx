import React, { MouseEventHandler, useEffect } from "react";
import downloadCertificate from "../../../assets/Download-certificate.png";
import returnToHome from "../../../assets/Return-home.png";
import certificatePng from "../../../assets/Certificate.png";
import { format } from 'date-fns';

const Certificate = (props: {
  name: string;
  score: any;
  isPassed:boolean;
  completionTime: number;
  closeModal: MouseEventHandler;
}) => {
  const passScore =  parseInt(props.score);
  const passed = props.isPassed;
  const button = passed ? downloadCertificate : returnToHome;
  const textContentClass = passed ? "modalTextContainerSuccessCert" : "modalTextContainerFailuer";
  let context:any=null;
  let canvas:HTMLCanvasElement;
  const year = new Date().getFullYear();
  const date = new Date();
  useEffect(() => {
    canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
     context = canvas.getContext("2d");
     addTextToImage(props.name,context)
  }, []);
  const addTextToImage=(text:string,context:any) =>{
    const img = new Image();
    img.src = certificatePng;
    img.onload = function () {
        context!.drawImage(img, 0, 0, canvas.width,canvas.height);
        context!.lineWidth = 1;
        context!.fillStyle = "#c9ab3c";
        context!.font = "34px Snell Roundhand, cursive";
        context!.fillText(text, 400, 318);
        context!.fillStyle = "#e8ce12";
        context!.font = "34px Snell Roundhand, cursive";
        context!.fillText(year, 465, 609);
        context!.fillStyle = "#060404c7";
        context!.font = "30px Segoe UI";
        context!.fillText(passScore+"%", 669, 374);
        context!.font = "20px Segoe UI";
        context!.fillText(date.toLocaleDateString('en-us'), 547, 473);
        
        context!.font = "18px Segoe UI";
        context!.fillText(props.completionTime+" minutes", 600, 422);
        const downloadbtn = document.getElementById("certificate-download") as HTMLAnchorElement;
        downloadbtn!.href = canvas.toDataURL();
    };
    
}

  return (
    <>
      <div className="backDrop">
        <div className="modalBody" id="cert">
        <canvas
        id="myCanvas"
        width="1000"
        height="700"
        
      >
      </canvas>
          <div className={textContentClass}>
            <a href='#'  id="certificate-download"  download
            >
            <img
              src={button}
              alt="Score Card"
              className="img-fluid resultAction"
              onClick={props.closeModal}
            />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;
function moment(now: any) {
    throw new Error("Function not implemented.");
}

