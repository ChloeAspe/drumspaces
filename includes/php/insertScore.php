<?php
require "Bdd.php";


$score = $_POST["score"];
$eid = $_POST["eid"];
$tid = $_POST["tid"];


$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO EVALRESULT (SCORE, EID, TID) VALUES (?,?,?)";
$params=array($score, $eid, $tid);
$sucess += $bd->executer($query, $params);
$evid = $bd->getLastInsertId();

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>"
}