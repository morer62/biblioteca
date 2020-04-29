const getLibros = async () => {
  try{
    let url = "https://php-libros.herokuapp.com/api/libros";

    let response = await fetch(url);
    response = await response.json();

    return response;
  }catch(e){
    console.log(e);
    return []
  }
}

const postLibro = async (titulo, autor) => {
  let libro = new FormData();
  libro.append("libro", titulo);
  libro.append("autor", autor);

  try{
    let url = "https://php-libros.herokuapp.com/api/libros?put=0";
    let response = await fetch(url, {
      method: "POST", 
      body: libro, 
    });

    response = await response.json();
    if(response.mensaje == null){
      return {
        libro: response,
        error : false
      }

    }else{
      return {
        libro: [],
        error : false
      }
    }
  }catch(e){
    console.log(e);
    return {
      libro: [],
      error : false
    }
  }
}

const deleteLibro = async (id) => {
  try {
    let url = `https://php-libros.herokuapp.com/api/libros?id=${id}`;
    let response = await fetch(url, { method: "DELETE" });

    response = await response.json();

    if (response.mensaje != "libro eliminado"){
      return false;
    }
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}

const updateLibro = async (id, titulo, autor) => {
  let libro = new FormData();
  libro.append("libro", titulo);
  libro.append("autor", autor);

  try{
    let url = `https://php-libros.herokuapp.com/api/libros?id=${id}&put=1`;
    let response = await fetch(url, { method: "POST", body: libro });

    response = await response.json();

    if (response.mensaje != "libro actualizado"){
      return false;
    }
    return true;
  }catch(e){
    console.log(e);
  }
}
export {getLibros, postLibro, deleteLibro, updateLibro};