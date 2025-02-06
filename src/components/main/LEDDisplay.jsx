import React, { useState, useEffect } from 'react';
import { fetchGPIOStatus } from '../../services/api';

const LEDDisplay = () => {
  const [pinValues, setPinValues] = useState({
    pin36: 0,
    pin37: 0,
    pin38: 0,
    pin40: 0,
  });

  useEffect(() => {
    const getGPIOStatus = async () => {
      const status = await fetchGPIOStatus();
      console.log(status);
      setPinValues(status);
    };

    getGPIOStatus();

    const intervalId = setInterval(getGPIOStatus, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const red = pinValues?.pin40 === 1;
  const yellow = pinValues?.pin38 === 1;
  const green = pinValues?.pin36 === 1;

  const containerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '15px',
  };

  const ledContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>GPIO Status</div>
      <div style={ledContainerStyle}>
        <LED color="green" isOn={green} />
        <LED color="yellow" isOn={yellow} />
        <LED color="red" isOn={red} />
      </div>
    </div>
  );
};

const LED = ({ color, isOn }) => {
  const ledStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: isOn ? color : 'gray',
    boxShadow: isOn ? `0 0 10px 5px ${color}` : 'none',
  };

  return <div style={ledStyle}></div>;
};

export default LEDDisplay;
