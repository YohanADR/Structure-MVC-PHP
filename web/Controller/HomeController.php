<?php

include "Model/HomeModel.php";
include "View/HomeView.php";

class HomeController extends Controller

{
    public function __construct()
    {   
        $this->model = new HomeModel();
        $this->view = new HomeView();
    }

    /**
     * Display the home page of ListFunnel
     *
     * @return void
     */
    
    public function displayHome(){

        $this->view->displayHome();
        
    }
}