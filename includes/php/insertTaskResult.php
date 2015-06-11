<?php
require "Bdd.php";

$data = $_POST["taskdata"];
$pid = $_POST["pid"];

$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO TASKRESULT (VIEW, PATTERN, KICK, SNARE, OPENHH, CLOSEDHH, TIME, TIMEPLAYING, NBSELECTED, NBKICKSELECTED, NBSNARESELECTED, NBOHHSELECTED, NBCHHSELECTED, NBLISTENED, NBKICKLISTENED, NBSNARELISTENED, NBOHHLISTENED, NBCHHLISTENED, QPAT, QRES, PID) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$params=array($data["view"], $data["pattern"], $data["selection"]["Kick"], $data["selection"]["Snare"], $data["selection"]["OpenHH"], $data["selection"]["ClosedHH"], $data["time"], $data["timeplaying"], $data["nbSelected"]["total"], $data["nbSelected"]["Kick"], $data["nbSelected"]["Snare"],$data["nbSelected"]["OpenHH"],$data["nbSelected"]["ClosedHH"], $data["nbListened"]["total"], $data["nbListened"]["Kick"], $data["nbListened"]["Snare"], $data["nbListened"]["OpenHH"], $data["nbListened"]["ClosedHH"], $data["qpat"], $data["qres"], $pid);
$sucess += $bd->executer($query, $params);

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>"
}
