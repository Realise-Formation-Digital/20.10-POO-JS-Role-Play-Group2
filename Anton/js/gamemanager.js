let GameManager = {
    setGameStart: function (classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function (classType) {
        switch (classType) {
            case "link":
                player = new Player(classType, 200, 50, 200, 100, 50);
                break;
            case "merlin":
                player = new Player(classType, 150, 100, 300, 150, 25);
                break;
            case "skaven":
                player = new Player(classType, 50, 10, 200, 100, 50);
                break;
            case "Elf":
                player = new Player(classType, 50, 10, 200, 100, 50);
                break;
        }
        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.png "class="img-avatar"><div><h3>' +
        classType + '</h3> <p class= "health-player">Health: ' + player.health + '</p><p>Mana: ' + player.mana + 
        '</p><p>Strength: ' + player.strength + '</p><p>Agility: ' + player.agility + '</p><p>Speed: ' + player.speed + 
        '</p></div>';
    },
    // Create fight screne with arena
    setPreFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        getHeader.innerHTML = '<p>Task: Find an enemy!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for an enemy!</a>';
        getArena.style.visibility = "visible";
    },

    // Create Advesaryy
    setFight: function () {
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        // create enemy 
        let enemy00 = new Enemy("Goblin", 100, 1, 50, 100, 100);
        let enemy01 = new Enemy("Troll", 2, 1, 60, 110, 110);
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
        '" class="img-avatar"><div><h3>' + enemy.enemyType + '</h3> <p class= "health-enemy">Health: ' + enemy.health + 
        '</p><p>Mana: ' + enemy.mana + '</p><p>Strength: ' + enemy.strength + '</p><p>Agility: ' + enemy.agility + 
        '</p><p>Speed: ' + enemy.speed + '</p></div>';
    }
}



