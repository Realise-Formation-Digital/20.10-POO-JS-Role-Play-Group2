import Player from './class/player.js'
import Weapon from './class/weapon.js'
import Monster from './class/monster.js'
import NPC from './class/npc.js'
import DataManager from './class/manager.js'

let state = {}
let manager = null
let player1 = null
let monster1 = null

const buttonElement = document.getElementById('test')
buttonElement.addEventListener('click', () => {
  player1.fight(monster1);
  console.log(player1)
})
/**
 * Function starGame qui toujours retourne le dernier ID de joueur que j'ai inserté dans la BD 
 */
export async function startGame() {
  try {
    console.log("[Game][StartGame] Starting game")
    let monster2 = null
    var player1 = null
    let monster1weapon = null
    let npcWeaponFlecha = null
    let npcWeaponMisil = null

    // la funcion DataManager est en manager.js 
    manager = new DataManager()    //creer un Manager qui va s'en ocuper de tous les donnes (Save ou Load depuis la BD)
    //get player from server
    player1 = await manager.getPlayer()//await getDataPlayer(1)
    console.log(player1)      // vient de manager.js (line 46)
    //json = JSON.parse(response.responseText)
    if (player1 == null) {     // si il n'est pas dans la BD donc il faut le creer
      await createPlayer('Player1')     // se va a créér avec la function qui est a la line 231
    }

    //todo create new instance of player with the data found in the database
   
    state = {}
    showTextNode(1);
    console.log(player1);

    // player1.show();
    monster1weapon = new Weapon(1, "Espada", 30); // instance of the weapone for the monster 1
    monster1 = new Monster("Monstre1", monster1weapon); // new monster with weapon created
    // monster2 = new Monster("Monstre2", null); // new monster without weapon
    //player1.fight(monster1) // play against monster 1
    npcWeaponFlecha = new Weapon(2, "Flecha", 10) // new weapon for npc
    npcWeaponMisil = new Weapon(3, "Misil", 50) // new weapon for npc
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


async function createPlayer (name) {      // creer le jouer avec la function qui es en maneger.js (line 54)  et l'enregistrer
  try{
    player1 = await manager.createPlayer(name);     // en player1 est le joueur qui se a créé

    await manager.save()     // enregister le jouer (qui on vient de creer)  dans la BD avec la function save qui est en manager (line 97)

    //const result = await window.fetch('/player')
  }catch (e) {
    console.error("[Game][createPlayer] An error occured when creating player on server", e)
  }
}

async function saveData () {
  try {
    console.log("[Game][saveData] Saving data on server with params")
    await manager.save()
  }catch (e) {
    console.error("[Game][saveData] An error occurred when saving data on server", e)
  }
}


startGame();
