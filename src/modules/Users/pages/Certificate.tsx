import React, { MouseEventHandler, useContext, useEffect } from "react";
import downloadCertificate from "../../../assets/Download-certificate.png";
import returnToHome from "../../../assets/Return-home.png";
import certificatePng from "../../../assets/Certificate.png";
import { format } from 'date-fns';
import { QuestionContext } from "../../Questions/QuestionContext";

const Certificate = (props: {
  name: string;
  score: any;
  isPassed:boolean;
  completionTime: number;
  closeModal: MouseEventHandler;
}) => {
  const { totalQuestions,remainingTimeDisplay } = useContext(QuestionContext);
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
  const calculateTimeDifference = (totalCount:any,remainigTime:any)=>{
    const startTime = new Date();
    startTime.setHours(1);
    startTime.setMinutes(totalCount);
    startTime.setSeconds(1);
    const endtime = new Date();
    endtime.setHours(1);
    endtime.setMinutes(remainigTime.split(":")[0]);
    endtime.setSeconds(remainigTime.split(":")[1]);
    const difference = startTime.valueOf()-endtime.valueOf();
   return  Math.round(((difference % 86400000) % 3600000) / 60000);
    
  }
  let completionTime = calculateTimeDifference(totalQuestions,remainingTimeDisplay);
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
        const month  = date.toLocaleString('default', { month: 'long' });
        context!.fillText(month +" "+date.getDate()+" "+date.getFullYear(), 495, 473);
        
        context!.font = "18px Segoe UI";
        context!.fillText(completionTime+" minutes", 600, 422);
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

