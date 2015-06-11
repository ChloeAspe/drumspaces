<?php
require "Bdd.php";

$bd = Bdd::initialisation();
$pt=$_POST["pinfo"];
$sucess = true;

$query="INSERT INTO PARTICIPANT (PNAME, PEMAIL) VALUES (?,?)";
$params=array($pt["name"], $pt["email"]);
$sucess += $bd->executer($query, $params);
$pid = $bd->getLastInsertId();

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>",
	"participant": "<?php echo $pid ?>"
}
