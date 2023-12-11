import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, Image, TextInput, ScrollView, ActivityIndicator, TouchableHighlight, Alert } from 'react-native';
import axios from 'axios';
import PainelFavoritos from './Favoritos';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PesquisarAtletas({ navigation,}) {
  const [textoBusca, setTextoBusca] = useState('');
  const [resultado, setResultado] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [dadosClima, setDadosClima] = useState(null);
  
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
  
  const buscarInformacoesClima = async () => {
    
    try {
      const apiUrl = 'https://api.hgbrasil.com/geoip?key=b62e6cb0';
      const response = await axios.get(apiUrl);

      console.log('Resposta da API GeoIP:', response.data);

      const { region, country_name } = response.data;

      // Agora, você pode usar as informações de região/estado e país para obter dados meteorológicos
      const climaApiUrl = `https://api.hgbrasil.com/weather?key=b62e6cb0&region=${region}&country_name=${country_name}`;
      const climaResponse = await axios.get(climaApiUrl);

      console.log('Resposta da API de Clima:', climaResponse.data);

      if (climaResponse.data && climaResponse.data.results && climaResponse.data.results.temp) {
        setDadosClima(climaResponse.data.results);
      } else {
        setDadosClima(null);
        console.log('Dados meteorológicos não encontrados na resposta da API de Clima.');
      }

    } catch (error) {
      console.log('Erro durante a busca de informações de localização ou clima:', error);
      Alert.alert('Erro durante a busca de informações de localização ou clima');
    }
  };
  

  const adicionarAosFavoritos = (atleta) => {
    if (!favoritos.some((favorito) => favorito.player_name === atleta.player_name)) {
       setFavoritos([...favoritos, atleta]);
        // Faça a lógica para atualizar a lista de favoritos no estado ou onde ela está armazenada
      } else {
        alert('O atleta já foi adicionado!');
        // O atleta já está na lista de favoritos, você pode mostrar uma mensagem ou fazer outra ação, se necessário.
      }
    
  };

  const styles = StyleSheet.create({

    container: {
      padding: 16,
      flex: 1,
    },
    input: {
      backgroundColor: 'white',
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      height: 46,
      padding: 14,
      marginTop: 16,
      marginBottom: 16,
      flex: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    cardAtleta: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: 'white',
      borderRadius: 8,
    },
    scrollView: {
      marginTop: 16,
    },
    titleCard: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 4,
    },
    imageAtleta: {
      width: 72,
      height: 72,
      borderRadius: 6,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderRadius: 6,
      backgroundColor: '#FFFFFF',
    },
    buttonBusca: {
      backgroundColor: '#1BC286',
      alignItems: 'center',
      padding: 13,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisa de Atletas</Text>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <TextInput style={styles.input}
          placeholder="Digite o nome do atleta"
          onChangeText={atualizarTexto}
        />
        <TouchableHighlight onPress={buscarInformacoesClima}>
          <View style={styles.buttonBusca}>
            <Text style={{ color: 'white' }}>Buscar Informações de Clima</Text>
          </View>
        </TouchableHighlight>
        {dadosClima && (
        <View style={styles.cardAtleta}>
          <Text style={styles.titleCard}>Informações de Clima</Text>
          <Text>Temperatura: {dadosClima.temp} C°</Text>
          <Text>Data: {dadosClima.date}</Text>
          <Text>Hora: {dadosClima.time}</Text>
          <Text>Descrição: {dadosClima.description}</Text>
          <Text>Condição Atual: {dadosClima.currently}</Text>
          </View>
      )}
        <TouchableHighlight onPress={buscarAtletas}>
          <View style={styles.buttonBusca}>
            <Text style={{color: 'white',}}>Buscar</Text>
          </View>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollView}>
        {resultado.map((atletaAtual, index) => (
          <View key={index} style={styles.cardAtleta}>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
            <Image
              style={styles.imageAtleta} 
              source={{
                uri: atletaAtual.player_image,
              }}
            />
            <View style={{marginLeft: 12,}}>
              <Text style={styles.titleCard}>
                {atletaAtual.player_name}
              </Text>
              <Text>
                {atletaAtual.team_name}
              </Text>
            </View>
            </View>
            <View style={{marginTop: 12,}}>
              <TouchableHighlight onPress={() => adicionarAosFavoritos(atletaAtual)} >
                  <View style={styles.button}>
                    <Text>Adicionar aos favoritos</Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>
        ))}
        <PainelFavoritos favoritos={favoritos}/>
      </ScrollView>
      {/* <PainelFavoritos favoritos={favoritos}/> */}
    </View>
  );
}
