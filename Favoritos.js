import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

function PainelFavoritos({ favoritos }) {
  return (
    <View>
      <Text style={styles.title}>Favoritos</Text>
      {favoritos.length > 0 ? (
        favoritos.map((atleta, index) => (
          <View key={index} style={styles.cardFavorito}>
            <Image
              style={styles.imageAtleta}
              source={{ uri: atleta.player_image }}
            />
            <Text style={styles.titleCard}>{atleta.player_name}</Text>
            <Text>Idade: {atleta.player_age}</Text>
            <Text>País: {atleta.player_country}</Text>
            <Text>Posição: {atleta.player_type}</Text>
            <Text>Time: {atleta.team_name}</Text>
            <View style={styles.hr} />
          </View>
        ))
      ) : (
        <Text>Nenhum atleta favorito.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    textAlign: 'center',
  },
  cardFavorito: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  imageAtleta: {
    width: 72,
    height: 72,
    borderRadius: 6,
  },
  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});

export default PainelFavoritos;
