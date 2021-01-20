let GameManager = {
    setGameStart: function(classType){
        this.resetPlayer(classType);
        this.setPreFight(); 
    },
    resetPlayer: function(classType){
        switch(classType){
            case "link":
                player = new Player(classType, 200, 0, 200, 100, 50);
                break; 
            case "merlin":
                player = new Player(classType, 100, 0, 300, 150, 25);
                break;
            case "skaven":
                player = new Player(classType, 50, 0, 200, 100, 50);
                break;   
    }
    let getInterface = document.querySelector(".interface");
    getInterface.innerHTML = '<img src="img/' + classType.toLowerCase() + '.png" class="img-avatar"><div><h3>' + classType + '</h3> <p>Health: ' + player.health + '</p><p>Mana: ' + player.mana + '</p><p>Strength: ' + player.strength + '</p><p>Agility: ' + player.agility + '</p><p>Speed: ' + player.speed + '</p></div>'; 
},
    setPreFight: function(){

    }
}