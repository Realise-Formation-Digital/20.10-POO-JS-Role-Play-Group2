let player;

// Create player:
function Player(classType, hp, xp, str, spd, gold, wpns) {
    this.classType = classType;
    this.hp = hp;
    this.xp = xp;
    this.str = str;
    this.spd = spd;
    this.gold = gold;
    this.wpns = wpns;
}

// Functions:
function playerAttack() {
    let calcBaseDamage;
    calcBaseDamage = player.str + player.xp;
    console.log("calcBaseDamage");

    // Number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(3) + player.spd);
    let playerAttackValues = [calcBaseDamage, numberOfHits];
    return playerAttackValues;
}


function enemyAttack() {
    let calcBaseDamage;
    calcBaseDamage = enemy.str + enemy.xp;

    // Number of hits
    let numberOfHits = Math.floor(Math.random() * Math.floor(3) + enemy.spd);
    let enemyAttackValues = [calcBaseDamage, numberOfHits];
    return enemyAttackValues;
}


// Player mouvements
let PlayerMoves = {
    // Attack
    calcAttack: function () {
        // Who attacks first? 
        let getPlayerSpeed = player.spd;
        let getEnemySpeed = enemy.spd;
        console.log("calcSpd");

        // Get player/enemy HP XP GOLD
        let getPlayerHealth = document.querySelector(".health-player");
        let getPlayerXp = document.querySelector(".xp-player");
        let getPlayerGold = document.querySelector(".gold-player");

        let getEnemyHealth = document.querySelector(".health-enemy");

        // Initiate attacks
        let playerAttackValues = playerAttack();
        if (getPlayerSpeed >= getEnemySpeed) {
            let totalDamage = playerAttackValues[0] * playerAttackValues[1];
            enemy.hp = enemy.hp - totalDamage;
            alert("You hit " + playerAttackValues[0] + " damages" + playerAttackValues[1] + " times");

        } else {
            enemyAttack();
        }
        if (enemy.hp <= 0) {
            alert("You won!!!");
            player.xp = player.xp + enemy.xp;
            player.gold = player.gold + enemy.gold;
            getPlayerHealth.innerHTML = 'HP: ' + player.hp;
            getEnemyHealth.innerHTML = 'HP: 0';
            getPlayerXp.innerHTML = 'XP: ' + player.xp;
            getPlayerGold.innerHTML = 'Gold: ' + player.gold;
            GameManager.setFight();
            alert("Next fight");
        } else {
            getEnemyHealth.innerHTML = 'HP: ' + enemy.hp;
            // Enemy attacks
            let enemyAttackValues = enemyAttack();
            let totalDamage = enemyAttackValues[0] * enemyAttackValues[1];
            player.hp = player.hp - totalDamage;
            alert("Enemy hit " + playerAttackValues[0] + " damages" + enemyAttackValues[1] + " times");
            enemyAttack();
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

