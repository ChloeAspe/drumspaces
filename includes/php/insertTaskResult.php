<?php
require "Bdd.php";

$data = $_POST["taskdata"];
$pid = $_POST["pid"];

$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO TASKRESULT (VIEW, PATTERN, KICK, SNARE, OPENHH, CLOSEDHH, TIME, NBSELECTED, NBLISTENED, PID) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?)";
$params=array($data["view"], $data["pattern"], $data["selection"]["Kick"], $data["selection"]["Snare"], $data["selection"]["OpenHH"], $data["selection"]["ClosedHH"], $data["time"], $data["nbSelected"], $data["nbListened"], $pid);
$sucess += $bd->executer($query, $params);

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>"
}
