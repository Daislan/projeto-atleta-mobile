import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function PesquisarAtletas({ navigation }) {
  const [textoBusca, setTextoBusca] = useState('');
  const [resultado, setResultado] = useState([]);

  const atualizarTexto = (value) => {
    setTextoBusca(value.toLowerCase());
  };

  const buscarAtletas = async () => {
    try {
      const apiUrl = 'https://apiv3.apifootball.com/?action=get_players&player_name=' + textoBusca + '&APIkey=4304886204bef55c53ac21b93e8a4e9e02d6cc1dc9376db24a52f1d82bec47f8';
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

  const styles = StyleSheet.create({

    container: {
      padding: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D7D7D7',
      borderRadius: 4,
      height: 46,
      padding: 12,
      marginTop: 12,
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisa de Atletas</Text>
      <TextInput style={styles.input}
        placeholder="Digite o nome do atleta"
        onChangeText={atualizarTexto}
      />
      <Button title="Buscar" color={'#1BC286'} onPress={buscarAtletas}/>
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
