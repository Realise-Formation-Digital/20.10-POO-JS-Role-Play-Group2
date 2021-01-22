import Weapon from './class/weapon.js'
import Player from './class/player.js'
import Monster from './class/monster.js'
import NPC from './class/npc.js'

let state = {}
let player1 = null
let npc = null
let npcWeaponFlecha = new Weapon("Flecha", 10) // new weapon for npc
let npcWeaponMisil = new Weapon("Misil", 50) // new weapon for npc
let npcWeaponMachineGun = new Weapon("MachineGun", 60) // new weapon for npc
let npcWeaponRevolver = new Weapon("Revolver", 35) // new weapon for npc
let npcWeaponNuke = new Weapon("Nuke", 75) // new weapon for npc

 // instance of the weapone for the monster 1


 let monsterweapon = new Weapon("weapon1", 30);

let monster1 = new Monster("Werewolf", npcWeaponRevolver);
let monster2 = new Monster("ghost");
let monster3 = new Monster("elf", monsterweapon);
let monster4 = new Monster("vampire", npcWeaponMachineGun);
let monster5 = new Monster("Satan", npcWeaponNuke);
let monster6 = new Monster("Goblin");
 
/** 
let x =  document.getElementById("cont");
x.style.display = "none";

const buttonElement = document.getElementById('test')
buttonElement.addEventListener('click', () => {
 if (x.style.display === "none") {
   x.style.display = "block";
 } else {
   x.style.display = "none";
 }
 showTextNode(1);
})
*/

/**
 * Function that start the game
 */
export async function startGame() {
  try {
    console.log("[Game][StartGame] Starting game")

    // let player1 = null
    // let player2 = null
    // let monster1 = null

    let playerFoundInDatabase = null
    let monster2 = null
    let monster1weapon = null


    // get player from server
    playerFoundInDatabase = await getDataPlayer(1)
    if (!playerFoundInDatabase) await createPlayer('Player1')

    //todo create new instance of player with the data found in the database

    state = {}
    showTextNode(4);

    
    player1 = new Player(); //instance de la class joueur
    player1.show();
    npc = new NPC([npcWeaponFlecha, npcWeaponMisil], player1); // new instance of npc with two weapon already declared 
    // monster2 = new Monster("Monstre2", null); // new monster without weapon

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
  // console.log("[Game][selectOption] Show select option with params", option)
  let nextTextNodeId = option.nextText;
  let listNode = document.getElementById("list");
  if(nextTextNodeId == 5) {
    nextTextNodeId = player1.nextEncounter();
  }

  //if (nextTextNodeId <= 0) {
  //   return startGame() }

  switch (nextTextNodeId) {
    case 1: {
      listNode.innerHTML = "";
      break
    }
    case 2: {
      npc.showBuy();
      break
    }

    case 3: {
      npc.showSell(player1);
      break
    }

    case 4 : {
      listNode.innerHTML= "";
      break
    }

    case 5 : {
      listNode.innerHTML = ""
      listNode.innerHTML = monster1._name + "<br>" + monster1._xp;
      break
    }

    case 6 : {
      listNode.innerHTML = ""
      listNode.innerHTML = player1.fight(monster1);
      player1.show();
      break
    } 

    
      case 7 : {
        listNode.innerHTML = ""
        player1.run();
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
  text: "Find next encounter",
  options: [

    {
      text: "Let's GO!",
      nextText: 5
    },
  ]
},
{
  id: 5,
  text: "You see a monster",
  options: [

    {
      text: "Fight!",
      nextText: 6
    },
    {
      text: "Run!",
      nextText: 7
    },
  ]
},

{
  id: 6,
  text: "Result:",
  options: [
    {
      text: "Find next encounter",
      nextText: 4
    },
  ]
},

{
  id: 7,
  text: "Coward!",
  options: [
    {
      text: "Find next encounter",
      nextText: 5
    },
  ]
}


]

async function createPlayer (name) {
  try{
    console.log("[Game][createPlayer] Creating player on server with params", name)
    player1 = new Player(name)
    const result = await window.fetch('/player')
  }catch (e) {
    console.error("[Game][createPlayer] An error occured when creating player on server", e)
  }
}

async function getDataPlayer (id) {
  try{
    console.log("[Game][getDataPlayer] Getting data from server with params", id)
    let playerFoundInTheDatabase = null
    playerFoundInTheDatabase = await window.fetch('/player?id=' + id.toString()).toJSON()
    return playerFoundInTheDatabase
  }catch (e) {
    console.error("[Game][getDate] An error occurred", e)
  }
}

async function saveData () {
  try {
    console.log("[Game][saveData] Saving data on server with params")

  }catch (e) {
    console.error("[Game][saveData] An error occurred when saving data on server", e)
  }
}

startGame();
