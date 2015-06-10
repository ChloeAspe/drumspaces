<?php
require "Bdd.php";

$data = $_POST["taskdata"];
$pid = $_POST["pid"];

$bd = Bdd::initialisation();
$sucess = true;

$query="INSERT INTO TASKRESULT (VIEW, PATTERN, KICK, SNARE, OPENHH, CLOSEDHH, TIME, TIMEPLAYING, NBKICKSELECTED, NBSNARESELECTED, NBOHHSELECTED, NBCHHSELECTED, NBKICKLISTENED, NBSNARELISTENED, NBOHHLISTENED, NBCHHLISTENED, SATISFACTION, PID) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$params=array($data["view"], $data["pattern"], $data["selection"]["Kick"], $data["selection"]["Snare"], $data["selection"]["OpenHH"], $data["selection"]["ClosedHH"], $data["time"], $data["timeplaying"], $data["nbSelected"]["Kick"], $data["nbSelected"]["Snare"],$data["nbSelected"]["OpenHH"],$data["nbSelected"]["ClosedHH"], $data["nbListened"]["Kick"], $data["nbListened"]["Snare"], $data["nbListened"]["OpenHH"], $data["nbListened"]["ClosedHH"], $data["satisfaction"], $pid);
$sucess += $bd->executer($query, $params);

$bd->fermerBdd();

?>

{
	"result":"<?php echo $sucess ?>"
}
