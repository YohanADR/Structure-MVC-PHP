<?php

abstract class Model {


protected $connexion;

/**
 * Connect on BDD with define on config.php
 * @return void
 */
public function __construct()
{
    // connexion
    try {
        $this->connexion = new PDO("mysql:host=" . SERVER . ";dbname="
            . BASE, USER, PASSWORD);
        $this->connexion->exec("SET NAMES 'UTF8'");
    } catch (Exception $e) {
        echo 'Erreur : ' . $e->getMessage();
    }
}



}