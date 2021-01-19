// Display de base: Par quoi remplir les champs"images, text et option sur index.html

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById("image")

// Mettre le status de base vide

let state = {}

// FUNCTIONS



function startGame() {
  state = {}
  console.log("startGame")
  showTextNode(1)
}

function image() {
  var x = document.createElement("image");
  x.setAttribute("src", "image");
  x.setAttribute("width", "304");
  x.setAttribute("height", "228");
  x.setAttribute("alt", "image");
  document.body.appendChild(x);
}

function showImageNode(imageNodeIndex) {  
  console.log("ShowImageNode")
  const imageNode = imageNodes.find(imageNode => imageNode.id === imageNodeIndex)
  console.log("ShowImageNode", imageNode)
  imageElement.innerImage = imageNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
}



function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  const imageNode = imageNodes.find(imageNode => imageNode.id === imageNodeIndex)
  imageElement.innerText = imageNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }
  

  textNode.options.forEach(option => {

console.log("Option", option)
console.log("Option", showOption(option))

    if (showOption(option)) {
      console.log("1")
      const button = document.createElement('button')
      console.log("2")
      button.innerText = option.text
      console.log("3")

      button.classList.add('btn')
      console.log("4")
      button.addEventListener('click', () => selectOption(option))
      console.log("5")
      optionButtonsElement.appendChild(button)
    }else{
      console.log("NO!")
    }
  })
}



function showOption(option) {
  console.log("showOption", option)
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  console.log("selectOption")
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  console.log("est-ce que on arrive ici?")
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
  console.log("est-ce que on arrive ici? 2")
  showImageNode(nextImageNodeId)
}

// Nodes

const textNodes = [
  {
    id: 1,
    imageElement,
    text: 'Vous arrivez devant un portaille lugubre on est inscrit: Lasciate ogne speranza, voi ch intrate',
    options: [
      {
        text: 'Passer le portaille',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    image: "img/marchant.jpg",
    text: 'A peine l entrée passé une forme commence à se distinguer devant vous qui en ricannant vous demande: Besoin de quelques chose l ami?',
    options: [
      
      {
        text: "Acheter/Vendre",
        //onclick=stats() id=statsBtn,
        //text: 'Prendre l épée',
        //setState: { arme: true },
        nextText: 3
      },
      {
        text: 'Partir à l aventure',
        nextText: 5
      },
      {
        text: 'Tenter de dépouiller le marchand',
        nextText: 4
      },

    ]
  },
  {
    id: 3,
    text: 'J ai de belles choses en stoque',
    options: [
      {
        text: 'Acheter une épée',
        setState: { blueGoo: false, sword: true },
        nextText: 5
      },
      {
        text: 'Acheter un bouclier',
        setState: { blueGoo: false, shield: true },
        nextText: 5
      },
      {
        text: 'Partir à l aventure',
        nextText: 5
      },
    ]
  },
        
  {
    id: 4,
    text: 'Pas un rigolo ce marchand, le temps de voir ses yeux devenir rouge, VOUS ETES MORT!!!.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Les cris des corbeaux s étouffe à fur et à mesure que vous avancer dans la grotte, quand soudain: UN MONSTRE!!!',
    options: [
      {
        text: 'Attaquer',
        nextText: 6
      },
      {
        text: 'Fuire',
        nextText: 8
      },
      {
        text: 'Attaquer avec votre épée',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Se cacher derrière votre bouclier',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Fuire devant votre premier monstre... Dans votre panique vous trébucher et vous briser la nuque, VOUS ETES MORT!!!',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]


startGame()

