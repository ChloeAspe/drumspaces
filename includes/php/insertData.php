<?php
require "Bdd.php";



$data = $_POST["data"];


$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO PARTICIPANT (PNAME, PEMAIL) VALUES (?,?)";
$params=array($data["pid"], "TTOIZUDIZ@UHZU.hg");
$sucess += $bd->executer($query, $params);
$pid = $bd->getLastInsertId();

// loop through all TASKRESULTS in EXPERESULT
$i=0;
$length = count($data["taskResults"]);
for($i; $i<$length; $i++) {
	$tr=$data["taskResults"][$i];
	$query="INSERT INTO TASKRESULT (VIEW, PATTERN, KICK, SNARE, OPENHH, CLOSEDHH, TIME, NBSELECTED, NBLISTENED, PID) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?)";
	$params=array($tr["view"], $tr["pattern"], $tr["selection"]["Kick"], $tr["selection"]["Snare"], $tr["selection"]["OpenHH"], $tr["selection"]["ClosedHH"], $tr["time"], $tr["nbSelected"], $tr["nbListened"], $pid);
	$sucess += $bd->executer($query, $params);
}
$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>"
}
