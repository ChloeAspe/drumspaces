<?php
/*
    *===================================================================================================*
    * Bdd
    * Connexion à la base de donnée et traitements sql  
    * Author : Turquois la souris
    * Date : 04/03/2015
    * Requis : connect_bd.php
    * Version : 1.0
    *===================================================================================================*
*/ 
class Bdd{
    static $objBddInstance;
    public $intLastInsertId;
    public $objBdd;
    public $strMdp;
    public $strUser;
    public $strDbName;
	public $strHost;
    /**
     * __construct 
     * Constructeur de la class Bdd
     * Private pour éviter que l'on puisse instancier plusiseurs fois la classe.
    */
    private function __construct(){
        // Paramétres de connexion contenu dans le fichier connect_bd.php dans le dossier include/parametres
        require 'connectBdd.php';
        $this->strHost     = $config['host'];
        $this->strUser     = $config['user'];
        $this->strMdp = $config['mdp'];
        $this->strDbName   = $config['base'];
        $this->intLastInsertId = 0;
         try {
             /* Information classe PDO : http://www.php.net/manual/fr/class.pdo.php */
             $this->objBdd = new PDO('mysql:host='.$this->strHost.';dbname='.$this->strDbName, $this->strUser, $this->strMdp);
            /* Rapport d'erreurs : Emet une exception */
             $this->objBdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);					
        } catch (PDOException $e) {
				$this->exeption($e);
        } 	
    }
    
    /**
     * exeption
     * En cas d'exception levée par PDO, on redirige vers la class Exception pour le traitement de l'erreur
     * @param object $e contient toute les informations àl'erreur attrapée
     * @param string $strMess message, par default vide, que l'on souhaite enregistrer dans le rapport d'erreur
    */
    public function exeption($e,$strMess=''){
        var_dump($e);die;
        /*Exception:enregistreException($e,$strMess);*/
    }
    
    /** 
     * initialisation
     * Fonctiion singleton est un patron de conception (design pattern) dont l'objet est de restreindre l'instanciation d'une classe à un seul objet 
     * (ou bien à quelques objets seulement). Il est utilisé lorsque l'on a besoin d'exactement un objet pour coordonner des opérations dans un système. 
     * Le modèle est parfois utilisé pour son efficacité, lorsque le système est plus rapide ou occupe moins de mémoire avec peu d'objets qu'avec beaucoup 
     * d'objets similaires. On implémente le singleton en écrivant une classe contenant une méthode qui crée une instance uniquement s'il n'en existe pas encore. 
     * Sinon elle renvoie une référence vers l'objet qui existe déjà.
     * @return object 
    */
    public static function initialisation(){
        /* self appelle une méthode déclarée avec le mot-clef static. Cette méthode n'a pas accès aux propriétés non statiques de la classe. */
        if(!isset(self::$objBddInstance)) {
            self::$objBddInstance = new self();
        }
	
	return self::$objBddInstance;
    }
    /**
     * fermerBdd
     * Permet de fermer la connexion vers la base de donnée.
    */
    public function fermerBdd(){
            $this->objBdd = NULL;
            unset($this->objBdd);
    }
    /**
     * getLastInsertId
     * Getter permettant de récupérer l'id de la derniére ligne inserée en base de donnée
     * @return id 
    */
    public function getLastInsertId(){
            return $this->intLastInsertId;
    }
    /**
     * getBdd
     * Getter permettant de récupérer la connexion à la base de donnée
     * @return object  
    */
    public function getBdd(){
            return $this->objBdd;
    }
    
    /**
     * array_ok
     * Permet de vérifier que le paramétre passé à la fonction est bien un tableau et qu'il n'est pas vide.
     * @param array $array tableau que l'on souhaite soumettre au test
     * @param array $arrayMess tableau contenant les message d'erreur que l'on souhaite transmettre. Par default vide.
     *              $arrayMess[0] : Message si $array n'est pas un tableau 
     *              $arrayMess[1] : Message si $array est vide
     * @return bool 
    */
    public function array_ok($array,$arrayMess=array(1=>'Un tableau est attendu en paramétre !','Le tableau est vide')){
        if(is_array($array)){
            if(!empty($array)){
                return true;
            }else{
                $this->erreur($arrayMess[1]);
                return false;
            }
        }else{
            $this->erreur($arrayMess[0]);
            return false;
        }
    }
    
    /**
     * executer
     * Permet d'executer une requête preparée
     * @param string $query rêquete 
     * @param array $arrayParam tableau contenant les variables à inserées dans la requête
     * @return bool 
    */
    public function executer($query,$arrayParam){
        try{
            /* De base PDO prends tout les paramétres pour des string dans le cas d'une requête préparée sans précision du type de la variable. 
            PDO::PARAM_STRING appliquera un équsivalent de mysql_real_escape_string() sur la variable liée.*/
            $pdoQuery = $this->objBdd->prepare($query);
            $mixResult=$pdoQuery->execute($arrayParam);
            $this->intLastInsertId = $this->objBdd->lastInsertId();
            return $mixResult;
        }catch(Exception $e){
            $this->exeption($e, 'Erreur lors de l\'insertion');
            return false;       
        }
    }
     /**
     * query
     * Permet d'executer une requête 
     * @param string $req rêquete 
     * @return mixed 
    */
    public function requete($req){
        try{
            $result = $this->objBdd->query($req);
            return $result->fetchAll();
        }catch(Exception $e){
            $this->exeption($e, 'Erreur lors de l\'insertion');
            return false;       
        }
    }    
    /**
     * erreur
     * Gestion des erreurs soulevés dans une méthode de la class bdd (hors erreur PDO)
     * @param string $strMess message à afficher
    */
    public function erreur($strMess){
        var_dump($strMess);
        die;
    }
    
    /**
     *  Déstructeur de la class Bdd
    */
    public function __destruct() {
            $this->fermerBdd();
            unset($this);
    }	
} 