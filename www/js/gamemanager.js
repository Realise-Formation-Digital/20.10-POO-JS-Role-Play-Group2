let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Link":
                player = new Player(classType, 400, 0, 10, 2, 30, 0);
                break;
            case "Merlin":
                player = new Player(classType, 200, 0, 10, 2, 30, 0);
                break;
            case "Skaven":
                player = new Player(classType, 300, 0, 10, 3, 30, 0);
                break;
            case "Elf":
                player = new Player(classType, 400, 0, 20, 4, 30, 0);
                break;
        }
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.png "class="img-avatar"><div><h3>' +
        classType + '</h3> <p class= "health-player">HP: ' + player.hp + '</p><p class="xp-player">XP: ' + player.xp + '</p><p>Strength: ' + 
        player.str + '</p><p>Speed: ' + player.spd + '</p><p class="gold-player">Gold: ' + player.gold + '</p><p>Weapon Bonus: ' + 
        player.wpns + '</p></div>' + '<img src="img/inventory.png"> <div><h3>Inventory: </h3><p>Life potion (+50 hp)<button onclick="lifePotion()">Use</button><p>Wooden Stick (+1 str)</p></div>';
    },
    // Create fight screne with arena and actions
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        let getfightDetails = document.querySelector(".fightDetails");
        getHeader.innerHTML = '<p>Welcome to the Arena hero, what will you do next?</p>';
        //Generate enemy
        getActions.innerHTML = '<a class="btn-prefight" onclick="GameManager.setFight()">Start your first fight</a>';
        //getfightDetails.style.visibility = "visible";
        getArena.style.visibility = "visible";
    },

    // Create enemey and choose random one
    setFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        // create enemy 
        let enemy00 = new Enemy("Goblin", 50, 1, 10, 2, 1, 1);
        let enemy01 = new Enemy("Troll", 100, 1, 20, 1, 2, 1);
        let enemy02 = new Enemy("Guardian", 150, 1, 25, 3, 100, 0);
        let enemy03 = new Enemy("Minion", 200, 1, 30, 4, 10, 2);
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(4));
        //console.log(chooseRandomEnemy); OK!
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
            case 2:
                enemy = enemy02;
                break;
            case 3:
                enemy = enemy03;
                break;
        }
        getHeader.innerHTML = '<p>What will you do next?</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>';
        getEnemy.innerHTML = '<img src="img/' + enemy.enemyType.toLowerCase() + '.png" alt= "' + enemy.enemyType + 
        '" class="img-avatar"><div><h3>' + enemy.enemyType + '</h3> <p class= "health-enemy">HP: ' + enemy.hp + 
        '</p><p class="xp-enemy">XP: ' + enemy.xp + '</p><p>Strength: ' + enemy.str + '</p><p>Speed: ' + enemy.spd + 
        '</p><p class="gold-enemy">Gold: ' + enemy.gold + '</p><p>Weapon Bonus: ' + enemy.wpns + '</p></div>';
    }
    


}



//Save Load

function save(){
    
    alert('Game Saved');
    console.log("Save");
}

function load(){

    alert('This will delete current data, continue?');
    console.log("Load");
}


