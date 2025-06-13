import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://random-image-pepebigotes.vercel.app/api/random-image";

const RandomImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const updateImage = () => {
      setImageUrl(API_URL + `?sig=${Math.random()}`);
    };

    updateImage();
    const interval = setInterval(updateImage, 90000);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={imageUrl}
      alt="Background"
      className="background-img"
      style={{
        transition: "opacity 1s ease-in-out",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

export default RandomImage;
