import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%'
  },

  text: {
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;