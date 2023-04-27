import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const Timer = ({ initialTime, onTimerEnd }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      onTimerEnd();
    }
  }, [time]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.timer}>{formatTime()}</Text>;
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
});

export default Timer;