<?php
require "Bdd.php";

$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO PARTICIPANT (PNAME, PEMAIL) VALUES (?,?)";
$params=array("TOTO", "TTOIZUDIZ@UHZU.hg");
$sucess += $bd->executer($query, $params);
$pid = $bd->getLastInsertId();

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>",
	"participant": "<?php echo $pid ?>"
}
