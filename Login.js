// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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

  return (
    <View>
      <Text>Nome de Usuário</Text>
      <TextInput
        placeholder="Digite seu nome de usuário"
        onChangeText={setUsername}
      />
      <Text>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
