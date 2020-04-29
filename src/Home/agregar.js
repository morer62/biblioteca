import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function({titulo,autor, visible, onClose, onTittuloChange, onAutorChange, guardar, cancelar}){
  return(
    <Modal
      transparent={true}
      onRequestClose={() => onClose()}
      visible={visible}
      animated={true}
      animationType="fade"
    >
      <View style={styles.modal}>
        <View style={styles.card}>
          <Text>Nombre del Libro:</Text>
          <TextInput 
            style={styles.inputs}
            value={titulo}
            onChangeText={text => onTittuloChange(text)}
            />
          <Text>Nombre del Autor:</Text>
          <TextInput 
            style={styles.inputs}
            value={autor}
            onChangeText={text => onAutorChange(text)}
            />
            <View style={{flexDirection: "row", marginTop: 10}}>
              <Button title="Cancelar"color="#e82e2e" onPress={() => cancelar()}/>
              <Button title="Agregar" color="#4278e8" onPress={() => guardar()}/>
            </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal:{
    flex: 1,
    backgroundColor: "rgba(50,50,50,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card:{
    width: "90%",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 15,
  },
  inputs:{
    width: "100%",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 3
  }
});