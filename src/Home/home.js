import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TouchableOpacity, 
  ToastAndroid, 
  ScrollView, 
  Alert } 
from 'react-native';
import { 
  getLibros, 
  postLibro, 
  deleteLibro,
  updateLibro }
from '../provider/libro.p';
import Table from './table';
import AgregarModal from './agregar';
import EditarModal from './editar';

export default class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      libros: [],
      agregarModal: false,
      libroA : "",
      autorA : "",

      editarModal: false,
      libroE : "",
      autorE : "",
      idE    : 0 ,
    }
  }

  componentDidMount(){
    getLibros().then(libros =>{
      this.setState({libros: libros});
    }).catch(e => console.log(e));
  }

  onAdd = () => {
    let { libroA, autorA } = this.state;

    if(libroA.trim() == "" || autorA.trim() == ""){
      ToastAndroid.show("Todos los campos son necesarios", ToastAndroid.SHORT);
      return;
    }

    postLibro(libroA.trim(), autorA.trim()).then( x => {
      if(!x.error){
        let libros = this.state.libros;
        libros.push(x.libro);
        this.setState({libros: libros})
        ToastAndroid.show('Agregado', ToastAndroid.SHORT);
      }else{
        ToastAndroid.show('Error', ToastAndroid.SHORT);
      }
      this.onAgregarClose();
    }).catch(e => console.log(e));
  }
  
  onEdit = (libro) => {
    this.setState({
      editarModal: true,
      libroE: libro.libro,
      autorE: libro.autor,
      idE : libro.id
    })
  }

  onDelete = async (libro) => {
    
    let PromesaAlert = new Promise((resolve, reject) =>{
      Alert.alert(
        "Eliminar", 
        "¿Estás seguro de eliminar el libro?", 
        [
          { text: "Cancelar", onPress: () => resolve(false), style: "cancel" },
          { text: "OK", onPress: () => resolve(true) }
        ],
        { cancelable: false }
      )
    })
   
    let borrar = await PromesaAlert;
    
    if(borrar){
      deleteLibro(libro.id).then( eliminado =>{
        if(eliminado){
          let libros = this.state.libros;
          let index = -1;

          for(let i =0; i < libros.length; i++){
            if(libros[i].id == libro.id){
              index = i;
              break;
            }
          }

          if(index != -1){
            libros.splice(index, 1);
            this.setState({libros: libros});
            ToastAndroid.show("Libro Eliminado", ToastAndroid.SHORT);
          }
        }else{
          ToastAndroid.show("error al eliminar Libro", ToastAndroid.SHORT);
        }
      }).catch(e => console.log(e))
    }
  }

  onAgregar1Change = (text) => this.setState({libroA: text})
  
  onAgregar2Change = (text) => this.setState({autorA: text})
  
  onEditar1Change  = (text) => this.setState({libroE: text})
  
  onEditar2Change  = (text) => this.setState({autorE: text})

  onAgregarClose = () =>{
    this.setState({
      agregarModal: false,
      libroA: "",
      autorA: ""
    });
  }

  onEditarClose = () => {
    this.setState({
      editarModal: false,
      libroE: "",
      autorE: "",
      idE: 0
    });
  }

  update = () => {
    let { idE, libroE, autorE } = this.state;

    if(libroE.trim() == "" || autorE.trim() == ""){
      ToastAndroid.show("Todos los campos son necesarios", ToastAndroid.SHORT);
      return;
    }

    updateLibro(idE, libroE.trim(), autorE.trim()).then(valor =>{
      if(valor){
        let { libros } = this.state;
        let index = -1;

        for(let i =0; i < libros.length; i++){
          if(libros[i].id == idE){
            index = i;
            break;
          }
        }

        if(index != -1){
          libros.splice(index, 1);
          libros.push({
            id: idE,
            libro: libroE.trim(),
            autor: autorE.trim()
          })
          this.setState({libros: libros});
          ToastAndroid.show("Libro Actualizado", ToastAndroid.SHORT);
        }
      }
    }).catch(e => console.log(e));

    this.onEditarClose();
  }

  render(){
    return (
      <ScrollView style={{flex:1, backgroundColor: "#f1f1f1"}}>
        <StatusBar backgroundColor="#414348"/>
        
        <View style={styles.containerB}>
          <TouchableOpacity style={styles.button} onPress={() => this.setState({agregarModal: true})}>
            <Text style={styles.buttonT}>Agregar Libro</Text>
          </TouchableOpacity>
        </View>

        <Table libros={this.state.libros} editar={this.onEdit} eliminar={this.onDelete}/>

        <AgregarModal 
          visible={this.state.agregarModal}
          onClose={this.onAgregarClose}
          onTittuloChange={this.onAgregar1Change}
          onAutorChange={this.onAgregar2Change}
          guardar={this.onAdd}
          cancelar={this.onAgregarClose}
          titulo={this.state.libroA}
          autor={this.state.autorA}
        />

        <EditarModal 
          visible={this.state.editarModal}
          onclose={this.onEditarClose}
          onTittuloChange={this.onEditar1Change}
          onAutorChange={this.onEditar2Change}
          guardar={this.update}
          cancelar={this.onEditarClose}
          titulo={this.state.libroE}
          autor={this.state.autorE}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerB: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  button:{
    width: "35%",
    backgroundColor: "#4278e8",
    padding: 5,
    borderRadius: 8,
  },
  buttonT: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 17
  },
});