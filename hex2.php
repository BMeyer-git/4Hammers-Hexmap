<?php 
session_name('4hammers');
session_start();
// $link = mysqli_connect(); Database login information here
$action = 'nothing';

require('../functions.php');
$ip = getenv('REMOTE_ADDR');

if (!isset($_SESSION['login'])){
	if ($action != "process" && $action != "logout"){
		if(isset($_COOKIE['cookname'])){
			$sql = "select * from users where u_name = '".$_COOKIE['cookname']."' ";
			
			if($result = mysqli_query($link, $sql)){
			  if (mysqli_num_rows($result) == 1){
				$row = mysqli_fetch_array($result);
     	 		$_SESSION['login'] = $row['u_name'];
      			$_SESSION['u_pass'] = $row['u_pass'];
	  			$_SESSION['sec'] = $row['u_sec'];
	  			$_SESSION['u_id'] = $row['u_id'];
				$_SESSION['dark'] = $row['u_dark'];
				$_SESSION['kingdom'] = $row['u_kingdom'];
				//$_SESSION['guest'] = 0;
				$_SESSION['u_sex'] = $row['u_sex'];
				$_SESSION['exp'] = $row['u_exp'];
				$_SESSION['level'] = $row['u_level'];
				$_SESSION['title'] = $row['u_title'];
				$_SESSION['coin'] = $row['u_coin']; 
				if ($row['u_sex'] == 1){
					$_SESSION['pro'] = 'his';
				}
				elseif ($row['u_sex'] == 2) {
					$_SESSION['pro'] = 'her';
				}
				else {
					$_SESSION['pro'] = 'it';
				}
				if (!isset($_SESSION['old_date'])){
					$_SESSION['old_date'] = $row['u_time'];
				}
				$_SESSION['stay'] = $row['u_logged'];
				$_SESSION['cookie'] = 'logged';
			  }
			}
   		}
    }
}
$dog = $_SESSION['u_id'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map</title>
    <link rel="stylesheet" href="hex2.css">
</head>
<script type="text/javascript">
    var userID = "<?php echo "$dog"?>";
</script>
<body>
    <h1>4HammersForge Map Generator</h1>   
	<div> 
		World Size: <input type="text" id="worldSize" value="25" size="5">
	</div>
	<div>
		<button id="genMap">Generate Map</button>
		<button id="wipeMap">Wipe Map</button>
		<button id="uploadMap">Upload Map</button>
		<button id="addRiver">addRiver</button>
		<button id="addMtn">Add Mountain</button>
		<button id="addGold">Add Gold</button>
		<button id="addEdgeRiver">addEdgeRiver</button>
	</div>
	<div id="loadContainer">
		<div id="load"></div>
	</div>
    <div class="hexMain">
        <div class="hexContainer" id="hexMap">
            <!-- Examples of an empty land tile and a player tile -->
            <!-- <img src="empty.png" alt=""> -->
            <!-- <img src="man.png" alt=""> -->
        </div>
    </div>
    <div></div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="hex2.js"></script>
</html>