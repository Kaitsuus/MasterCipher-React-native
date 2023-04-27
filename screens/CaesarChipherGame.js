import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import {
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Modal
} from 'react-native';
import caesarCipher from './caesarCipher';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Timer from '../src/components/Timer';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const menuBg = require('../assets/gameBg.png');

function CaesarCipherGame() {
  const [gameOver, setGameOver] = useState(false);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState(Math.floor(Math.random() * 25) + 1);
  const [word, setWord] = useState(getRandomWord());
  const [encryptedWord, setEncryptedWord] = useState(caesarCipher(word, shift));
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const [shakeAnimation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });
  

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  // Generate a random word
  function getRandomWord() {
    const words = [
      'HELLO',
      'WORLD',
      'JAVASCRIPT',
      'PROGRAMMING',
      'CRYPTOGRAPHY'
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function handleTimerEnd() {
    setGameOver(true);
  }

  function resetGame() {
    setGameOver(false);
  }

  function handleSubmit() {
    if (guess.toUpperCase() === word) {
      setMessage('You guessed correctly!');
    } else {
      setMessage("Sorry, that's not the right answer. Try again!");

      // Trigger shake animation
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
  }

  // Apply shake animation to the view
  const animatedStyle = {
    transform: [
    { translateX: shakeAnimation }
    ]
  };

  // Generate a new encrypted word and shift value
  function generateNewWord() {
    setGuess('');
    setMessage('');
    setShift(Math.floor(Math.random() * 26));
    setWord(getRandomWord());
  }

  // Update the encrypted word whenever the shift or the original word changes
  React.useEffect(() => {
    setEncryptedWord(caesarCipher(word, shift));
  }, [word, shift]);

  return (
    <View style={styles.container}>
      <ImageBackground source={menuBg} style={styles.backImage}>
        <Text style={styles.title}>Aikaa jäljellä</Text>
        <Timer initialTime={60} onTimerEnd={handleTimerEnd} />
        <View style={styles.gameContainer}>
        <Animated.View style={[styles.animationContainer, animatedStyle]}>
              <Animated.View style={[styles.animationContainer, { transform: [{ translateY }] }]}>
                <Text style={styles.text}>Murrettava sana on</Text>
                <Text style={styles.animatedText}>{encryptedWord}</Text>
              </Animated.View>
          <TextInput
            style={styles.input}
            placeholder="Ciphered Word"
            value={guess}
            onChangeText={setGuess}
          />
          <Button title="Murra" onPress={handleSubmit} />
        </Animated.View>
        </View>
        <Modal visible={gameOver}>
        <View>
          <Text>Game Over</Text>
          <Button title="Try Again" onPress={resetGame} />
        </View>
      </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  animatedText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  backImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  animationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CaesarCipherGame;
