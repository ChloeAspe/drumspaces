<?php
/*
    *===================================================================================================*
    * Bdd
    * Connexion � la base de donn�e et traitements sql  
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
     * Private pour �viter que l'on puisse instancier plusiseurs fois la classe.
    */
    private function __construct(){
        // Param�tres de connexion contenu dans le fichier connect_bd.php dans le dossier include/parametres
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
     * En cas d'exception lev�e par PDO, on redirige vers la class Exception pour le traitement de l'erreur
     * @param object $e contient toute les informations �l'erreur attrap�e
     * @param string $strMess message, par default vide, que l'on souhaite enregistrer dans le rapport d'erreur
    */
    public function exeption($e,$strMess=''){
        var_dump($e);die;
        /*Exception:enregistreException($e,$strMess);*/
    }
    
    /** 
     * initialisation
     * Fonctiion singleton est un patron de conception (design pattern) dont l'objet est de restreindre l'instanciation d'une classe � un seul objet 
     * (ou bien � quelques objets seulement). Il est utilis� lorsque l'on a besoin d'exactement un objet pour coordonner des op�rations dans un syst�me. 
     * Le mod�le est parfois utilis� pour son efficacit�, lorsque le syst�me est plus rapide ou occupe moins de m�moire avec peu d'objets qu'avec beaucoup 
     * d'objets similaires. On impl�mente le singleton en �crivant une classe contenant une m�thode qui cr�e une instance uniquement s'il n'en existe pas encore. 
     * Sinon elle renvoie une r�f�rence vers l'objet qui existe d�j�.
     * @return object 
    */
    public static function initialisation(){
        /* self appelle une m�thode d�clar�e avec le mot-clef static. Cette m�thode n'a pas acc�s aux propri�t�s non statiques de la classe. */
        if(!isset(self::$objBddInstance)) {
            self::$objBddInstance = new self();
        }
	
	return self::$objBddInstance;
    }
    /**
     * fermerBdd
     * Permet de fermer la connexion vers la base de donn�e.
    */
    public function fermerBdd(){
            $this->objBdd = NULL;
            unset($this->objBdd);
    }
    /**
     * getLastInsertId
     * Getter permettant de r�cup�rer l'id de la derni�re ligne inser�e en base de donn�e
     * @return id 
    */
    public function getLastInsertId(){
            return $this->intLastInsertId;
    }
    /**
     * getBdd
     * Getter permettant de r�cup�rer la connexion � la base de donn�e
     * @return object  
    */
    public function getBdd(){
            return $this->objBdd;
    }
    
    /**
     * array_ok
     * Permet de v�rifier que le param�tre pass� � la fonction est bien un tableau et qu'il n'est pas vide.
     * @param array $array tableau que l'on souhaite soumettre au test
     * @param array $arrayMess tableau contenant les message d'erreur que l'on souhaite transmettre. Par default vide.
     *              $arrayMess[0] : Message si $array n'est pas un tableau 
     *              $arrayMess[1] : Message si $array est vide
     * @return bool 
    */
    public function array_ok($array,$arrayMess=array(1=>'Un tableau est attendu en param�tre !','Le tableau est vide')){
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
     * Permet d'executer une requ�te prepar�e
     * @param string $query r�quete 
     * @param array $arrayParam tableau contenant les variables � inser�es dans la requ�te
     * @return bool 
    */
    public function executer($query,$arrayParam){
        try{
            /* De base PDO prends tout les param�tres pour des string dans le cas d'une requ�te pr�par�e sans pr�cision du type de la variable. 
            PDO::PARAM_STRING appliquera un �qusivalent de mysql_real_escape_string() sur la variable li�e.*/
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
     * Permet d'executer une requ�te 
     * @param string $req r�quete 
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
     * Gestion des erreurs soulev�s dans une m�thode de la class bdd (hors erreur PDO)
     * @param string $strMess message � afficher
    */
    public function erreur($strMess){
        var_dump($strMess);
        die;
    }
    
    /**
     *  D�structeur de la class Bdd
    */
    public function __destruct() {
            $this->fermerBdd();
            unset($this);
    }	
} 