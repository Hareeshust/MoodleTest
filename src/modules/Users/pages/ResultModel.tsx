import React, { useState } from "react";
import scoreImage from "../../../assets/Score-crad.png";
import downloadCertificate from "../../../assets/Download-certificate.png";

export const ResultModel = () => {
  const [passScore, setPassScore] = useState(90);
  return (
    <>
      <div
        id="backdrop"
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          top: "0",
          left: "0",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          pointerEvents: "all",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={scoreImage} alt="Score Card" className={"img-fluid"} />
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              bottom: "2rem",
            }}
          >
            <p
              style={{ color: "#fff", fontSize: "4rem", fontWeight: "bolder" }}
            >
              YOU HAVE PASSED SCORING
            </p>
            <p
              style={{ color: "#fff", fontSize: "6rem", fontWeight: "bolder" }}
            >
              {passScore}%
            </p>
            <img
              src={downloadCertificate}
              alt="Score Card"
              className={"img-fluid"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultModel;
