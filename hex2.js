
/***************************************************************************
* FUNCTION: getRandomInt
*
* Description: returns a random integer based on the input minimum and maximum
****************************************************************************/
function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***************************************************************************
* FUNCTION: addEdgeRiver
*
* Description: This function adds a N-S flowing river to the map and returns it
****************************************************************************/
function addEdgeRiver(worldMap, rows, columns)
{
    // North-south River
    let X = getRandomInt(1, columns);
    let Y = 0;
    // Potentially enable if specific endpoint is needed
    //let xEnd = getRandomInt(1, columns);
    let min_distance_before_turn = 3;

    // Start here
    worldMap[Y][X] = 1;

    let distance = 0;
    let direction = 0;

    while (X > 0 && X < columns - 1 && Y >= 0 && Y < rows - 1)
    {
        if (direction % 3 == 0)
        {
            Y++;
        }
        else if (direction % 3 == 1 || direction % 3 == -1)
        {
            // Even or odd?
            if (Y % 2 == 0)
            {
                //Even
                Y++;
            }
            else
            {
                //Odd
                X++;
                Y++;
            }
        }
        else if (direction % 3 == 2 || direction % 3 == -2)
        {
            //Even or odd?
            if (Y % 2 == 0)
            {
                //Even
                Y++;
                X--;
            }
            else
            {
                //Odd
                Y++;
            }
        }
        worldMap[Y][X] = 1;

        
        if (distance > min_distance_before_turn)
        {
            distance = 0;
            let change = getRandomInt(1,2);
            if (change == 1)
                direction++;
            else
                direction--;
        }    
        distance++;
    }
return worldMap;
}

/***************************************************************************
* FUNCTION: addGold
*
* Description: Adds a shiny GOLD tile to the map
****************************************************************************/
function addGold(worldMap, rows, columns)
{

    // Create array of rows
    let pOIBlacklist = new Array();
    // Each row is an array as long as the required columns
    for (var i = 0; i < rows; i++){
        pOIBlacklist[i] = new Array(columns);
    }

    // Fill each cell of each row with a zero (Anything Goes) to begin
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            pOIBlacklist[i][j] = 0;
        }
    }

    let isValid = false;
    let goldRow = 0;
    let goldColumn = 0;
    let attempts = 0;

    while (isValid != true && attempts < 30)
    {
        goldRow = getRandomInt(0, rows - 1)
        goldColumn = getRandomInt(0, columns - 1)

        console.log("Row: " + goldRow + " Column: " + goldColumn);

        if (isAllowed(pOIBlacklist,goldRow,goldColumn))
        {
            worldMap[goldRow][goldColumn] = 3;
            pOIBlacklist[goldRow][goldColumn] = 1;
            isValid = true;
        }


        attempts++;
    }

    return worldMap;
}

/***************************************************************************
* FUNCTION: addRiver
*
* Description: Adds a flowing river with a few bends to the map
****************************************************************************/
function addRiver(worldMap, rows, columns)
{
    //plzwork
    // Define random starting position
    let X = getRandomInt(1, columns);
    let Y = getRandomInt(1, rows);
    let river_max_length = 30;
    let min_distance_before_turn = 3;

    // Start here
    worldMap[X][Y] = 1;
    let length = 0;
    let distance = 0;
    let direction = 0;

    while (X > 0 && X < columns - 1 && Y > 0 && Y < rows - 1 && length < river_max_length)
        {
            console.log("Direction is: ", + direction);
            if (direction % 4 == 0)
            {
                Y++;
            }
            else if (direction % 4 == 1 || direction % 4 == -1)
            {
                X++;
            }
            else if (direction % 4 == 2 || direction % 4 == -2)
            {
                Y--;
            }
            else if (direction % 4 == 3 || direction % 4 == -3)
                X--;
            worldMap[X][Y] = 1;

            
            if (distance > min_distance_before_turn)
            {
                distance = 0;
                let change = getRandomInt(1,2);
                if (change == 1)
                    direction++;
                else
                    direction--;
            }    
            distance++;
            length++;
        }
    return worldMap;
}

/***************************************************************************
* FUNCTION: generateMap
*
* Description: Generates a 2D array that will serve as a blank canvas of a world
****************************************************************************/
function generateMap() {
    var scale = document.getElementById("worldSize").value;
    //console.log(scale);
    //console.log(userID);
    // Set map boundaries
    let rows = scale;
    let columns = scale;
    console.log(columns);
    // Create array of rows
    let worldMap = new Array();
    // Each row is an array as long as the required columns
    for (var i = 0; i < scale; i++){
        worldMap[i] = new Array(columns);
    }

    // Fill each cell of each row with a zero (Basic Terrain) to begin
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            worldMap[i][j] = 0;
        }
    }
    
    return worldMap;
}

/***************************************************************************
* FUNCTION: addMtn
*
* Description: Adds a rocky mountain range to the world
****************************************************************************/
function addMtn(worldMap, rows, columns)
{
    //plzwork
    // Define random starting position
    let X = getRandomInt(1, columns);
    let Y = getRandomInt(1, rows);
    let mtn_max_length = 12;
    let min_distance_before_turn = 1;

    // Start here
    worldMap[X][Y] = 4;
    let length = 0;
    let distance = 0;
    let direction = 0;

    while (X > 0 && X < columns - 1 && Y > 0 && Y < rows - 1 && length < mtn_max_length)
        {
            if (direction % 4 == 0)
            {
                Y++;
            }
            else if (direction % 4 == 1 || direction % 4 == -1)
            {
                X++;
            }
            else if (direction % 4 == 2 || direction % 4 == -2)
            {
                Y--;
            }
            else if (direction % 4 == 3 || direction % 4 == -3)
                X--;
            worldMap[X][Y] = 4;

            
            if (distance > min_distance_before_turn)
            {
                distance = 0;
                let change = getRandomInt(1,2);
                if (change == 1)
                    direction++;
                else
                    direction--;
            }    
            distance++;
            length++;
        }
    return worldMap;
}

/***************************************************************************
* FUNCTION: updateMap
*
* Description: Clears the map display and generates a fresh one based on the
* worldMap array
****************************************************************************/
function updateMap(worldMap)
{
    map = document.getElementById("hexMap");
    // Clear the currently displayed map
    while (map.firstChild)
    {
        map.removeChild(map.lastChild);
    }
    
    // Update the html with current map data
    for (let i = 0; i < worldMap.length; i++)
    {
        for (let j = 0; j < worldMap[i].length; j++)
        {
            var tile = document.createElement('img');
            if (worldMap[i][j] == 0)
            {
                tile.className = "hexLand"
                tile.addEventListener("click", () => {
                    for (let row = 0; row < worldMap.length; row++)
                    {
                        for (let col = 0; col < worldMap[row].length; col++)
                        {
                            if (worldMap[row][col] == 2)
                            {
                                worldMap[row][col] = 0;
                            }
                        }
                    }
                    worldMap[i][j] = 3;
                    updateMap(worldMap);
                })
            }
            else if (worldMap[i][j] == 1)
            {
                tile.className = "hexWater"
            }
            else if (worldMap[i][j] == 2)
            {
                tile.className = "hexLandMan"
            }
            else if (worldMap[i][j] == 3)
            {
                tile.className = "hexGold"
            }
            else if (worldMap[i][j] == 4)
            {
                tile.className = "hexMtn"
            }
            map.appendChild(tile);
        }
        var indent = document.createElement('p');
        map.appendChild(indent);
    }
}

/***************************************************************************
* FUNCTION: wipeDatabase
*
* Description: Clears the table on the database to make room for new maps
****************************************************************************/
async function wipeDatabase()
{
    var urlInfo = "db_hex_wipe.php";
    $.post(urlInfo);
}
const timer = ms => new Promise(res => setTimeout(res, ms)) //gotta slow down this upload so server doesn't freak out
async function uploadToDatabase(worldMap){
    //wipeDatabase();
    loadbar = document.getElementById("load");
    var urlInfo = "db_hex_upload.php";
    var scale = document.getElementById("worldSize").value;
    var total = worldMap.length*worldMap.length;
    var progress = 0;
    let count = 0;
    rows = scale;
    for (let i = 0; i < worldMap.length; i++){
        for (let j = 0; j < worldMap[i].length; j++){
            count++;
            $.post(urlInfo,{
                    h_id: ((i * rows) + j),
                    h_x : i,
                    h_y : j,
                    h_terrain : worldMap[i][j],
                    h_entity : 0
                },
            function(data, status){
                //console.log('hex x '+i+' y '+j);
            });
            await timer(50)
            progress = Math.round((count/total)*100);
            loadbar.style.width = progress*5+"px";
        }
    }
}

// Button to generate a map
generateButton = document.getElementById("genMap")
generateButton.addEventListener("click", () => {
    worldMap = generateMap();
    updateMap(worldMap);
    
});

// Button to wipe the map
wipeButton = document.getElementById("wipeMap")
wipeButton.addEventListener("click", () => {
    wipeDatabase();
    
});

// Uploads map to database
uploadButton = document.getElementById("uploadMap")
uploadButton.addEventListener("click", () => {
    uploadToDatabase(worldMap);
});

// Adds a river
updateButton = document.getElementById("addRiver")
updateButton.addEventListener("click", () => {
    var scale = document.getElementById("worldSize").value;
    addRiver(worldMap, scale, scale);
    updateMap(worldMap)
});

// Adds a river from the edege
updateButton = document.getElementById("addEdgeRiver")
updateButton.addEventListener("click", () => {
    var scale = document.getElementById("worldSize").value;
    addEdgeRiver(worldMap, scale, scale);
    updateMap(worldMap)
});

// Adds GOLD
updateButton = document.getElementById("addGold")
updateButton.addEventListener("click", () => {
    var scale = document.getElementById("worldSize").value;
    addGold(worldMap, scale, scale);
    updateMap(worldMap)
});

// Adds a mountain
updateButton = document.getElementById("addMtn")
updateButton.addEventListener("click", () => {
    var scale = document.getElementById("worldSize").value;
    addMtn(worldMap, scale, scale);
    updateMap(worldMap)
});
