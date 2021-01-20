import Weapon from './class/weapon.js'
import Player from './class/player.js'
import Monster from './class/monster.js'
import NPC from './class/npc.js'

let state = {}
let player1 = null
let monster1 = null

/**
 * Function that start the game
 */
export function startGame() {
  console.log("[Game][StartGame] Starting game")

  // let player1 = null
  // let player2 = null
  // let monster1 = null
  let monster2 = null
  let monster1weapon = null
  let npcWeaponFlecha = null
  let npcWeaponMisil = null

  state = {}
  showTextNode(1);

  player1 = new Player('Player1'); //instance de la class joueur
  player1.show();
  monster1weapon = new Weapon("Espada", 30); // instance of the weapone for the monster 1
  monster1 = new Monster("Monstre1", monster1weapon); // new monster with weapon created
  // monster2 = new Monster("Monstre2", null); // new monster without weapon
  player1.fight(monster1) // play against monster 1
  npcWeaponFlecha = new Weapon("Flecha", 10) // new weapon for npc
  npcWeaponMisil = new Weapon("Misil", 50) // new weapon for npc
  const npc = new NPC([npcWeaponFlecha, npcWeaponMisil]); // new instance of npc with two weapon already declared

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

startGame();
