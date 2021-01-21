import Weapon from './class/weapon.js'
import Player from './class/player.js'
import Monster from './class/monster.js'
import NPC from './class/npc.js'
import Game from './class/game.js'

let state = {}
let game = null
let player1 = null
let monster1 = null

const buttonElement = document.getElementById('test')
buttonElement.addEventListener('click', () => {
  player1.fight(monster1);
  console.log(player1)
})
/**
 * Function that start the game
 */
export async function startGame() {
  try {
    console.log("[Game][StartGame] Starting game")

    // let player1 = null
    // let player2 = null
    // let monster1 = null
    let monster2 = null
    let monster1weapon = null
    let npcWeaponFlecha = null
    let npcWeaponMisil = null

    // Create a game
    game = new Game()
    // get player from server
    player1 = game.getPlayer(1)//await getDataPlayer(1)
    if (!player1) {
      player1 = await createPlayer('Player1')
    }

    //todo create new instance of player with the data found in the database
   
    state = {}
    showTextNode(1);

    // player1 = new Player(); //instance de la class joueur
    // player1.show();
    console.log(player1)
    monster1weapon = new Weapon("Espada", 30); // instance of the weapone for the monster 1
    monster1 = new Monster("Monstre1", monster1weapon); // new monster with weapon created
    // monster2 = new Monster("Monstre2", null); // new monster without weapon
    player1.fight(monster1) // play against monster 1
    npcWeaponFlecha = new Weapon("Flecha", 10) // new weapon for npc
    npcWeaponMisil = new Weapon("Misil", 50) // new weapon for npc
    const npc = new NPC([npcWeaponFlecha, npcWeaponMisil]); // new instance of npc with two weapon already declared

  }catch (e) {
    console.error(e)
  }

}

/**
 * Show the right envriroment
 * @param {Number} textNodeIndex - index to search
 */
function showTextNode(textNodeIndex) {
  console.log("[Game][ShowTextNode] Show text node with params", textNodeIndex)
  let textElement = null
  let textNode = null
  let optionButtonsElement = []

  textElement = document.getElementById('text')
  if (!textElement) console.error("Tag not found")

  optionButtonsElement = document.getElementById('option-buttons')
  if (optionButtonsElement.length === 0) console.error("No buttons found")

  //replace text element with textNode
  textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  if (!textNode) console.error("No node found")
  if (textNode && !textNode.options) console.log("No Option found for a given text node")
  textElement.innerText = textNode.text

  // remove all the options
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  // add options from nodes
  textNode.options.forEach(option => {
    //if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    //}
  })
}

function showOption(option) {
  return option.requiredState === null || option.requiredState(state)
}

/**
 *
 * @param option
 */
function selectOption(option) {
  console.log("[Game][selectOption] Show select option with params", option)
  const nextTextNodeId = option.nextText
  //if (nextTextNodeId <= 0) {
  //   return startGame() }

  switch (nextTextNodeId) {
    case 5: {
      player1._gold -= 20;
      player1.show();
      break
    }
    case 6: {
      player1._gold += 20;
      player1.show();
      break
    }
  }

  state = Object.assign(state, option.setState)
  console.log("State", state)
  showTextNode(nextTextNodeId)
}

/**
 *
 * @type {({options: [{nextText: number, text: string}, {nextText: number, text: string}, {nextText: number, text: string}], id: number, text: string}|{options: [{nextText: number, text: string}, {nextText: number, text: string}, {nextText: number, text: string}], id: number, text: string}|{options: [{nextText: number, text: string}, {nextText: number, text: string}, {nextText: number, text: string}], id: number, text: string}|{id: number, text: string}|{options: [{nextText: number, text: string}, {nextText: number, text: string}], id: number, text: string})[]}
 */
const textNodes = [

  {
    id: 1,
    text: 'Welcome.. Got a selection of good things on sale, stranger!',
    options: [
      {
        text: 'Buy',
        nextText: 2
      },
      {
        text: 'Sell',
        nextText: 3
      },
      {
        text: 'Leave',
        nextText: 4
      }
    ]
  },

  {
    id: 2,
    text: "What're ya buyin?",
    options: [
      {
        text: 'Buy',
        nextText: 5
      },
      {
        text: 'Back',
        nextText: 1
      },
      {
        text: 'Leave',
        nextText: 4
      }
    ]
  },

  {
    id: 3,
    text: "What're ya sellin'?",
    options: [
      {
        text: 'Sell',
        nextText: 6
      },
      {
        text: 'Back',
        nextText: 1
      },
      {
        text: 'Leave',
        nextText: 4
      }
    ]
  },

  {
    id: 4,
    text: "...",
  },

  {
    id: 5,
    text: "Stranger, stranger, stranger... now that's a weapon!",
    options: [
      {
        text: 'Back',
        nextText: 1
      },
      {
        text: 'Leave',
        nextText: 4
      }
    ]
  },

  {
    id: 6,
    text: "Is that all, stranger?",
    options: [
      {
        text: 'Back',
        nextText: 1
      },
      {
        text: 'Leave',
        nextText: 4
      }
    ]
  },
]



// #player;

//   start() {
//     this.#player = new Player();
//   }

//   save() {
//     const data = {
//       life: this.#player.getLife(),
//       xp: this.#player.getXp(),
//       str: this.#player.getStr(),
//       sta: this.#player.getSta(),
//       weapon: this.#player.getWeapon(),
//       inventory: this.#player.getInventory(),
//       gold: this.#player.getGold(),
//     };

//     fetch("/database.php", {
//       method: "POST",
//       body: JSON.stringify(data),
//       mode: "same-origin",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }).then(function (response) {
//       console.log('response', response);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
//   }

async function createPlayer (name) {
  try{
    console.log("[Game][createPlayer] Creating player on server with params", name)
    player1 = await game.createPlayer(name)

    console.log("[Game][createPlayer] Saving player on server with params", name)
    await game.save()
    //const result = await window.fetch('/player')
  }catch (e) {
    console.error("[Game][createPlayer] An error occured when creating player on server", e)
  }
}



async function saveData () {
  try {
    console.log("[Game][saveData] Saving data on server with params")
    await game.save()
  }catch (e) {
    console.error("[Game][saveData] An error occurred when saving data on server", e)
  }
}


startGame();
