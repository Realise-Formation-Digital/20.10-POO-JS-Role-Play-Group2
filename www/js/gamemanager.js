let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "Link":
                player = new Player(classType, 100, 0, 10, 10, 20, 1);
                break;
            case "Merlin":
                player = new Player(classType, 150, 0, 300, 150, 100, 1);
                break;
            case "Skaven":
                player = new Player(classType, 50, 0, 100, 200, 100, 50);
                break;
            case "Elf":
                player = new Player(classType, 500, 0, 1000, 2000, 1000, 5000);
                break;
        }
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.png "class="img-avatar"><div><h3>' +
        classType + '</h3> <p class= "health-player">HP: ' + player.hp + '</p><p>XP: ' + player.xp + '</p><p>Strength: ' + player.str + '</p><p>Endurance: ' + player.end + '</p><p>Gold: ' + player.gold + '</p><p>Weapon Bonus: ' + player.wpns + '</p></div><div><h3>Inventaire: </h3>';
    },
    // Create fight screne with arena and actions
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        //let getActions2 = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        getHeader.innerHTML = '<p>Welcome to the Arena hero, what will you do next?</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Start your first fight</a>';
        //getActions2.innerHTML = '<a href="#" class="btn-prefight" onclick="#">Check Inventory</a>';
        getArena.style.visibility = "visible";
    },

    // Create Enemy
    setFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        // create enemy 
        let enemy00 = new Enemy("Goblin", 100, 1, 50, 100, 100, 100);
        let enemy01 = new Enemy("Troll", 200, 1, 60, 110, 10, 10);
        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));
        //console.log(chooseRandomEnemy); OK!
        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00;
                break;
            case 1:
                enemy = enemy01;
                break;
        }
        getHeader.innerHTML = '<p>What will you do next?</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()">Attack!</a>';
        getEnemy.innerHTML = '<img src="img/' + enemy.enemyType.toLowerCase() + '.png" alt= "' + enemy.enemyType + 
        '" class="img-avatar"><div><h3>' + enemy.enemyType + '</h3> <p class= "health-enemy">HP: ' + enemy.hp + 
        '</p><p>XP: ' + enemy.xp + '</p><p>Strength: ' + enemy.str + '</p><p>Endurance: ' + enemy.end + 
        '</p><p>Gold: ' + enemy.gold + '</p><p>Weapon Bonus: ' + enemy.wpns + '</p></div>';
    }
}



