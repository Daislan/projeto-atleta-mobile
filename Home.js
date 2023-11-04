import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function PesquisarAtletas({ navigation }) {
  const [textoBusca, setTextoBusca] = useState('');
  const [resultado, setResultado] = useState([]);

  const atualizarTexto = (value) => {
    setTextoBusca(value.toLowerCase());
  };

  const buscarAtletas = async () => {
    try {
      const apiUrl = 'https://apiv3.apifootball.com/?action=get_players&player_name=' + textoBusca + '&APIkey=23a2495a633253850a9ad8999dd626eb7639663230f50f483ed40b33ea5ede3c';
      console.log('URL da API:', apiUrl);
      
      const response = await axios.get(apiUrl);
      console.log('Resposta da API:', response.data);

      if (response.data && Array.isArray(response.data)) {
        setResultado(response.data);
      } else {
        setResultado([]);
      }
    } catch (error) {
      console.log('Erro durante a busca:', error);
      Alert.alert('Erro durante a busca');
    }
  };

  return (
    <View>
      <Text>Pesquisa de Atletas</Text>
      <TextInput
        placeholder="Digite o nome do atleta"
        onChangeText={atualizarTexto}
      />
      <TouchableOpacity onPress={buscarAtletas}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      <View>
        {resultado.map((atletaAtual, index) => (
          <Text key={index}>
            Nome do Atleta: {atletaAtual.player_name}
          </Text>
        ))}
      </View>
    </View>
  );
}
