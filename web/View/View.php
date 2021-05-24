<?php

abstract class View
{

    protected $page;


    /**
     * Add head of page
     */
    public function __construct()
    {
        $this->page = file_get_contents('template/head.html');
        $this->page .= file_get_contents('template/nav.html');

        $paramGet = extractParameters();
        $controller = $paramGet['controller'];
        if (isset($_GET['controller'])) {
            $controller = ucfirst($_GET['controller']);
            
        } else {
            $controller = 'Home';
        }
        $this->page = str_replace('{optionCss}', $controller, $this->page);
        $this->page = str_replace('{optionJs}', $controller, $this->page);

        if (isset($_SESSION['user'])) {

            $optionConnect = "<a class='nav-link' href='index.php?controller=user&action=myParam'>Mon Compte</a>";
            $optionConnect .= "<a class='nav-link' href='index.php?controller=user&action=logout'>Se déconnecter</a>";
        } else {
            $optionConnect = "<a class='nav-link' href='index.php?controller=user&action=connect'>S'authentifier</a>";
            $optionConnect .= "<a class='nav-link' href='index.php?controller=user&action=signUp'>Nouveau Compte</a>";
        }

        $this->page = str_replace('{optionConnect}', $optionConnect, $this->page);
    }
    /**
     * Display the content of the page and add footer of this page 
     * Single echo of the view
     * 
     * @return void
     */
    protected function displayPage()
    {
        $this->page .= file_get_contents("template/footer.html");
        echo $this->page;
    }
}
