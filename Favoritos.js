import React, { useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';

function PainelFavoritos({ favoritos }) {

  return (
    <View>
      <Text style={styles.title}>Favoritos</Text>
      <View style={{marginTop: 16,}}>
      {favoritos.length > 0 ? (
        favoritos.map((atleta, index) => (
          <View key={index} style={styles.cardFavorito}>
            <Image
              style={styles.imageAtleta}
              source={{ uri: atleta.player_image }}
            />
            <View style={{marginLeft: 12,}}>
            <Text style={styles.titleCard}>{atleta.player_name}</Text>
            <Text>{atleta.player_age} anos</Text>
            <Text>{atleta.player_number} - {atleta.player_type} no {atleta.team_name}</Text>
            <Text>{atleta.player_goals} gol(s) em {atleta.player_match_played} jogos</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>Nenhum atleta favorito.</Text>
      )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardFavorito: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: "center",
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
    marginVertical: 8,
  },
  disabledButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'gray',
  },
});

export default PainelFavoritos;
