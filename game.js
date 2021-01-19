import Weapon from './class/weapon.js'
import Player from './class/player.js'
import Monster from './class/monster.js'
import NPC from './class/npc.js'

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1);

//instance de la class joueur
var player = new Player('Player1');
var player2 = new Player('Player2');

player.show();
  
//instance de la class nonstre avec 2 paramètres: name du monstre et array arme (name, prix) OU name et array null si le monstre n'a pas d'arme
let monster = new Monster("Monstre1", new Weapon("Espada", 30));
var monster1 = new Monster("Monstre2", null);
  
player.fight(monster)

// instance de la clase pnj avec 2 armes (chaque arme a un name et un prix)
var npc = new NPC([new Weapon("Flecha", 10), new Weapon("Misil", 50)]);
      
}


function showTextNode(textNodeIndex) {

    //replace text element with textNode
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text

  // remove all the options
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  // add options from nodes
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  //if (nextTextNodeId <= 0) {
 //   return startGame() }
 if (nextTextNodeId == 5) {
  player._gold -=20;
  player.show();
 } else if(nextTextNodeId == 6) {
  player._gold +=20;
  player.show();
 }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

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