import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation(); 

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
    
        return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
     <Image source={require('../../assets/images/logo.png')} style={styles.image} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 24,
    },
    image: {
        resizeMode: 'contain',
        height: '50%',
        width: '50%'
    },
})

export default Splash