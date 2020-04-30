import React from 'react';
import { StyleSheet, View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Table({libros = [], editar, eliminar}) {

  let length = libros.length;
  return (
    <View style={styles.card}>
      <View style={styles.headers}>
        <Text style={styles.titulo}>Nombre</Text>
        <Text style={styles.titulo}>Autor</Text>
        <Text style={styles.opcion}>E.</Text>
        <Text style={styles.opcion}>B.</Text>
      </View>

      {libros.map((libro, i) => {
        let estilos = [];
        if (length-1 != i){
          estilos = [
            styles.row, 
            {
              borderBottomColor: "grey",
              borderBottomWidth: 1,
            }
          ]
        }else{
          estilos = [styles.row];
        }
        return (
          <View style={estilos} key={i}>
            <Text style={styles.rowItem1}>{libro.libro}</Text>
            <Text style={styles.rowItem1}>{libro.autor}</Text>
            <TouchableOpacity onPress={()=>editar(libro)} style={styles.rowItem2}><Icon name="edit" size={20} color="#ff9800"/></TouchableOpacity>
            <TouchableOpacity onPress={() => eliminar(libro)} style={styles.rowItem2}><Icon name="trash" size={20} color="red"/></TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 2,
    marginLeft: "2.5%",
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  headers:{
    flexDirection: "row",
    marginTop: 15,
    height: 40
  },
  titulo: {
    color: "black",
    width: "35%",
    overflow: "hidden"
  },
  opcion: {
    color: "grey",
    width: "15%",
    overflow: "hidden",
  },
  row:{
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    paddingTop: 10,
  },
  rowItem1:{
    color: "grey",
    width: "35%",
    overflow: "hidden"
  },
  rowItem2:{
    width: "15%",
    overflow: "hidden"
  }
});