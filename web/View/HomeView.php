<?php

class HomeView extends View {


    /**
     * Display the home page of ListFunnel
     *
     * @return void
     */

    public function displayHome(){
        
        $this->page .= "<div class='row'>";

        $this->page .= "<div class='box container'><div class='card col-sm-4' style='width: 18rem'>";
        $this->page .= "<img src='img/top_chrono.jpg' class='card-img-top ' >";
        $this->page .= "<div class='card-body'>";
        $this->page .= "<h5 class='card-title'>Créez votre compte</h5>";
        $this->page .= "<p class='card-text'>En 3 minutes - Top CHRONO</p>";
        $this->page .= "<a href='index.php?controller=user&action=signUp' class='btn btn-warning newUser home'>NOUVEAU COMPTE</a>";
        $this->page .= "</div></div>";

        $this->page .= "<div class='card col-sm-4' style='width: 18rem'>";
        $this->page .= "<div class='card-body'>";
        $this->page .= "<h5 class='card-text'>Connectez-vous</h5>";
        $this->page .= "<p class='card-text'>C'est parti !</p>";
        $this->page .= "<a href='index.php?controller=user&action=connect' class='btn btn-warning connect home'>CONNEXION</a></div>";
        $this->page .= "<img src='img/reseaux.jpg' class='card-img-top' >";
        $this->page .= "</div>";

        $this->page .= "<div class='card col-sm-4' style='width: 18rem'>";
        $this->page .= "<img src='img/engrenages.png' class='card-img-top' >";
        $this->page .= "<div class='card-body'>";
        $this->page .= "<h5 class='card-text'>Fonctionnalités</h5>";
        $this->page .= "<p class='card-text'>Facile, vous synchronisez vos listes Trello !</p>";
        $this->page .= "<a href='index.php?controller=home&action=info' class='btn btn-warning info home'>INFORMATIONS</a>";
        $this->page .= "</div></div>";

        $this->page .= "</div></div>";
        $this->displayPage();
    }
}