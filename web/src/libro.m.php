<?php

include_once('db.php');
class Libro{

  public function getALL(){
    $db = new DB();
    $dbConn = $db->connection();
    $sql = $dbConn->prepare("SELECT * FROM libro");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    $data = $sql->fetchAll();
    $dbConn = null;
    return $data;
  }

  public function getOne($id){
    $db = new DB();
    $dbConn = $db->connection();
    $sql = $dbConn->prepare("SELECT * FROM libro where id = ?");
    $sql->execute(array($id));
    $data = $sql->fetch(PDO::FETCH_ASSOC);
    $dbConn = null;

    if(!$data){
      return array(
        "mensaje" => "No encontrado",
      );
    }
    return $data;
  }

  public function updateOne($post, $id){
    $db = new DB();
    $dbConn = $db->connection();
    $sql = " UPDATE libro SET libro = ?, autor= ? WHERE id = ?";
    $statement = $dbConn->prepare($sql);
    $statement->execute( array(
      $post['libro'],
      $post['autor'],
      $id
    ));
    $dbConn = null;
    return array(
      "mensaje" => "libro actualizado"
    );
  }

  public function deleteOne($id){
    $db = new DB();
    $dbConn = $db->connection();
    $statement = $dbConn->prepare("DELETE FROM libro where id=:id");
    $statement->bindValue(':id', $id);
    $statement->execute();
    return array(
      "mensaje" => "libro eliminado"
    );
  }

  public function postOne($post){
    $db = new DB();
    $dbConn = $db->connection();
    $input = $post;
    $sql = "INSERT INTO libro
          (libro, autor)
          VALUES
          (:libro, :autor)";

    $statement = $dbConn->prepare($sql);
    $db->bindAllValues($statement, $input);
    $statement->execute();
    $postId = $dbConn->lastInsertId();

    $dbConn = null;
    if($postId)  {
      $input['id'] = $postId;
      return $input;
	  }else{
      return array(
        "mensaje" => "error al guardar libro"
      );
    }
  }
}