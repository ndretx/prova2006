import React, { useEffect } from "react";
import { View, Text, FlatList,  StyleSheet } from "react-native";
import CountryEntity from "../entity/country-entity";
import { useState } from "react";
import { Image } from "expo-image";

export default function HomePage() {
  const [countries, setCountries] = useState<CountryEntity[]>([]);

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
    };

    fetch("https://restcountries.com/v3.1/all", requestOptions)
      .then(response => response.json())
      
      .then(result => { 
        const countryList: CountryEntity[] = result.map(item => ({
            //definindo a lista que recberá os parametros
          id: item.name.common,
          flagUrl: item.flags.svg,
          name: item.name.common,
          ptName: item.translations.por.common,
          capital: item.capital,
          population: item.population,
        }));
        setCountries(countryList);
        // alteração de estado recebe a lista gerada pelo map
      })
      .catch(error => console.log('error', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de países</Text>
      <FlatList
        renderItem={({ item }) => ( 
          
           <View>
              <Image style={styles.flag} source={{ uri: item.flagUrl }} />
            
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
            <Text>Nome em português: {item.ptName}</Text>
            <Text>Capital: {item.capital}</Text>
            <Text>Populaçao: {item.population}</Text>
            </View>
        )}
        data={countries}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 50,
    marginHorizontal: 50,
  },
  card: {
    aspectRatio: 2.5,
    backgroundColor: "white",
    elevation: 15,
    shadowColor: "red",
    margin: 20,
    padding: 0,
  },
  flag: {
    width: 80,
    height: 80,
    margin: 10,
  },
});
