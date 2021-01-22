let player;

// Create player:
function Player(classType, hp, xp, str, end, gold, wpns) {
    this.classType = classType;
    this.hp = hp;
    this.xp = xp;
    this.str = str;
    this.end = end;
    this.gold = gold;
    this.wpns = wpns;
}

// Functions: 
function playerAttack () {
    let calcBaseDamage;
    calcBaseDamage = player.str * player.end / 1000;
    console.log("calcBaseDamage");

    // Adding random generator to add a bit of luck
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = calcBaseDamage + offsetDamage;
    // Number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(player.end) + 1);
    let attackValues = [calcOutputDamage, numberOfHits];
    return attackValues;
}


function enemyAttack() {
    let calcBaseDamage;
    calcBaseDamage = enemy.str * enemy.end / 1000;
    // Adding random generator to add a bit of luck
    let offsetDamage = Math.floor(Math.random() * Math.floor(10));
    let calcOutputDamage = calcBaseDamage + offsetDamage;
    // Number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(enemy.end / 10) / 2) + 1;
    let enemyAttackValues = [calcOutputDamage, numberOfHits];
    return enemyAttackValues;
}


// Player mouvements
let PlayerMoves = {
    // Attack
    calcAttack: function () {
        // Who attacks first? 
        let getPlayerSpeed = player.end;
        let getEnemySpeed = enemy.end;
        console.log("calcAttack"); 

        // Get player/enemy health 
        let getPlayerHealth = document.querySelector(".health-player");
        let getEnemyHealth = document.querySelector(".health-enemy");
        // Initiate attacks
        let playerAttackValues = playerAttack();
        if (getPlayerSpeed >= getEnemySpeed) {
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];
            enemy.hp = enemy.hp - totalDamage;
            alert("You hit " + playerAttackValues[0] + " damages" + playerAttackValues[1] + " times");
        }else{
            enemyAttack();        }
            if (enemy.hp <= 0) {
                alert("You won!!!");
                getPlayerHealth.innerHTML = 'HP: ' + player.hp;
                getEnemyHealth.innerHTML = 'HP: 0';
                alert("Next fight");
                player.xp +1;
                GameManager.setFight();
            } else {
                getEnemyHealth.innerHTML = 'HP: ' + enemy.hp;
                // Enemy attacks
                let enemyAttackValues = enemyAttack();
                let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
                player.hp = player.hp - totalDamage;
                alert("Enemy hit " + playerAttackValues[0] + " damages" + enemyAttackValues[1] + " times");
                playerAttack();
                if (player.hp <= 0) {
                    alert("You Lose Muahahahaaaaaaaa!!!");
                    getPlayerHealth.innerHTML = 'HP: ' + enemy.hp;
                    getEnemyHealth.innerHTML = 'HP: ' + enemy.hp;
                    window.location.reload();
                } else {
                    getPlayerHealth.innerHTML = 'HP: ' + player.hp;
                    playerAttack();
                }
            }
    }
    
}

