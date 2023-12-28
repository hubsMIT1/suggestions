import React, { useState, useEffect } from 'react';
import './Slider.css'
import image1 from './slide_img/image3.jpg';
import image2 from './slide_img/image2.jpg';
import image3 from './slide_img/image1.jpeg';
// import image2 from './slider/image(2).jpg';
// import image2 from './slider/image(2).jpg';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      url: image1,
      text: ''
    },
    {
      url: image2,
      text: ''
    },
    {
      url: image3,
      text: ''
    }
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const previousSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className="slider-container">
      <div className="arrow left-arrow" onClick={previousSlide}>&lt;</div>
      <img src={images[currentIndex].url} alt={images[currentIndex].text} className="slider-image" />
      <p className="slider-text">{images[currentIndex].text}</p>
      {/* <button onClick={previousSlide} className="slider-button">Previous</button>
      <button onClick={nextSlide} className="slider-button">Next</button> */}
      <div className="arrow right-arrow" onClick={nextSlide}>&gt;</div>
    </div>
  );
}

export default Slider;
