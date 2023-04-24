import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { auth, database } from '../config/firebase';
const menuBg = require('../assets/cipherBg3.png');
const easyBtn = require('../assets/easy.png');
const mediumBtn = require('../assets/medium.png');
const hardBtn = require('../assets/hard.png');
const infoBtn = require('../assets/info.png');
const profileBtn = require('../assets/profile.png');
const menuLogo = require('../assets/menuLogo.png');
const homeBg = require('../assets/homeBg.png');

const Home = () => {
  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useEffect(() => {
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
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={menuBg} style={styles.backImage}>
        <View style={styles.container}>
          <Image source={homeBg} style={styles.menuLogo} />
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaesarCipherGame')}
          >
            <Image source={easyBtn} style={styles.gameButtons} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaesarCipherGame')}
          >
            <Image source={mediumBtn} style={styles.gameButtons} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaesarCipherGame')}
          >
            <Image source={hardBtn} style={styles.gameButtons} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaesarCipherGame')}
          >
            <Image source={infoBtn} style={styles.infoButtons} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CaesarCipherGame')}
          >
            <Image source={profileBtn} style={styles.infoButtons} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  gameButtons: {
    width: 250,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  menuLogo: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  infoButtons: {
    width: 150,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    paddingBottom: 24,
    paddingTop: 14
  },
  backImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
