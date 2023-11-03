// LoginScreen.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'usuariodetest' && password === 'senhadetest') {
      navigation.navigate('Home');
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
    label: {
      color: '#4A4A4A',
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#D7D7D7',
      borderRadius: 4,
      height: 46,
      padding: 12,
      marginTop: 4,
      marginBottom: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput style={styles.input}
        placeholder="Digite seu nome de usuário"
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title="Login" color={'#1BC286'} onPress={handleLogin} style={styles.btn}/>
    </View>
  );
};

export default LoginScreen;
