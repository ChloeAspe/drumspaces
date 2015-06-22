<?php
require "Bdd.php";

$setsPerGroup=5; // TO BE DEFINED : 45? 90?

$evName = $_POST["name"];
$evEmail = $_POST["email"];


$bd = Bdd::initialisation();

// create evaluator
$query="INSERT INTO EVALUATOR (ENAME, EEMAIL) VALUES (?,?)";
$params=array($evName, $evEmail);
$bd->executer($query, $params);
$eid = $bd->getLastInsertId();

// determine evaluator group --> which portion of TASKRESULTS will be eval)
$nbTaskResults = $bd->requete('Select count(*) as NB from TASKRESULT');
$nbTaskResults = (int)$nbTaskResults[0]['NB'];
$nbGroups= round($nbTaskResults/$setsPerGroup,0,PHP_ROUND_HALF_DOWN);
$eGroup = $eid %$nbGroups +1;
$minTID = ($eGroup-1) * $setsPerGroup +1;
$maxTID = $eGroup * $setsPerGroup ;

// get portion of TASKRESULT to be evaluated by this user
$query2 = "SELECT TID, PATTERN, KICK, SNARE, OPENHH, CLOSEDHH, PID FROM TASKRESULT 
WHERE TID>".$minTID." AND TID<=".$maxTID;
$setList = $bd->requete($query2);
$setList = json_encode($setList);

$bd->fermerBdd();

?>

{
	"evId":"<?php echo $eid ?>",
	"evGroup":"<?php echo $eGroup ?>",
	"setList":<?php echo $setList ?>
}
