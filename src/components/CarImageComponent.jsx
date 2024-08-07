import React, { useState, useEffect } from 'react';
import { Image, Button, Tooltip } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const carImages = {
  Sedan: [
    process.env.PUBLIC_URL + '/images/sedan_front.png',
    process.env.PUBLIC_URL + '/images/sedan_back.png',
    process.env.PUBLIC_URL + '/images/sedan_left.png',
    process.env.PUBLIC_URL + '/images/sedan_right.png',
    
  ],
  SUV: [
    process.env.PUBLIC_URL + '/images/suv_front.png',
    process.env.PUBLIC_URL + '/images/suv_back.png',
    process.env.PUBLIC_URL + '/images/suv_left.png',
    process.env.PUBLIC_URL + '/images/suv_right.png',
    
  ],
  Coupe: [
    process.env.PUBLIC_URL + '/images/coupe_front.png',
    process.env.PUBLIC_URL + '/images/coupe_back.png',
    process.env.PUBLIC_URL + '/images/coupe_left.png',
    process.env.PUBLIC_URL + '/images/coupe_right.png',
    
  ],
};

const CarImageComponent = ({ carType }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [icons, setIcons] = useState(carImages[carType].map(() => []));

  useEffect(() => {
    setIcons(carImages[carType].map(() => []));
    setCurrentImageIndex(0);
  }, [carType]);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % carImages[carType].length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + carImages[carType].length) % carImages[carType].length);
  };

  const placeIcon = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const newIcon = { x: offsetX, y: offsetY, type: 'square', color: 'red' };
    setIcons((prevIcons) => {
      const updatedIcons = [...prevIcons];
      updatedIcons[currentImageIndex] = [...updatedIcons[currentImageIndex], newIcon];
      return updatedIcons;
    });
  };

  return (
    <div>
      <div style={{ position: 'relative', display: 'inline-block', width: '100%', height: '500px' }}>
        <Image
          src={carImages[carType][currentImageIndex]}
          alt="Car"
          preview={false}
          onClick={placeIcon}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {icons[currentImageIndex].map((icon, index) => (
          <Tooltip key={index} title={`Icon at (${icon.x}, ${icon.y})`}>
            <div
              style={{
                position: 'absolute',
                top: icon.y,
                left: icon.x,
                width: '10px',
                height: '10px',
                backgroundColor: icon.color,
                borderRadius: icon.type === 'circle' ? '50%' : '0',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </Tooltip>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={prevImage} style={{ marginRight: '10px' }} />
        <Button icon={<ArrowRightOutlined />} onClick={nextImage} />
      </div>
    </div>
  );
};

export default CarImageComponent;
