<?php

session_start();

// Include ici le fichier de config du site
include "config/config_monsite.php";
// Include View en premier + Model
include "View/View.php";
include "Model/Model.php";
// Include ici les controller
include "Controller/Controller.php";
include "Controller/HomeController.php";



$paramGet = extractParameters();
$controller = $paramGet['controller'];
$action = $paramGet['action'];


$controller = new $controller();

$controller->$action();



function extractParameters()
{

    /**
     * restrict user via param URL
     *
     * @return array
     */

    // Ajout des controller autoriser
    $controllerAuth = ['HomeController', 'UserController'];
    // Ajout des actions autoriser 
    $actionAuth = ['displayHome', 'signUp', 'validSignUp', 'connect', 'validConnect', 'getToken', 'syncAllFunnel'];

    /**
     * Get the controller from URL
     * 
     * @return void
     */

    if (isset($_GET['controller'])) {
        $controller = ucfirst($_GET['controller'] . "Controller");
    } else {
        // Controller par défaut 
        $controller = 'HomeController';
    }



    /**
     * Get the action From URL
     * 
     * @return void
     */

    if (isset($_GET['action'])) {
        $action = $_GET['action'];
    } else {
        // Action par défaut
        $action = 'displayHome';
    }
    // Bloque si pas de session pour les controller pas autorisé 
    if (!isset($_SESSION['user'])) {
        if (!in_array($controller, $controllerAuth) || !in_array($action, $actionAuth)) {
            // Controller + action par défaut si l'utilisateur n'est pas autorisé 
            $controller = 'HomeController';
            $action = "displayHome";
        }
    }
    
    return (['controller' => $controller, 'action' => $action]);
}
