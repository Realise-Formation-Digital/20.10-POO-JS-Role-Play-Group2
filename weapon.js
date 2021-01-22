function Store(inventory) { 
// inventory is an object whose keys are item names, 
// and whose values are item objects. For example, 
// { sword: new weapon("sword", 10, 15) }

    this.purchase = function(buy, observer) { 
    // see my note below about what that "observer" argument is for.

        const item = inventory[buy]; 
        // since `inventory` is an object, I can
        // look up the value of the requested
        // item. If that name isn't in `inventory`,
        // `item` will be undefined.

        if(!item) {
        observer.itemIsNotInStock(); // Tell the observer that the store
        // doesn't have that item.
        return;
        }

        if(player1.gold < item.gold) {
        observer.itemIsTooExpensive(item.gold); // tell the observer that the customer
                    // didn't have enough gold for the item.
        } else {
        player1.gold -= item.gold;
        observer.successfullyPurchased(item) // tell the observer the item was purchased
        } 
    }
}


function Warrior(initialGold, initialHealth) {
    this.gold = initialGold;
    this.health = initialHealth;
  }
  let warrior = new Warrior(15, 50);

  
function weapon(name, gold, attack) { 
    this.name = name; 
    this.gold = gold; 
    this.attack = attack; 
}

// Create a store with an inventory of weapons 
const weaponStore = new Store({ dagger: new weapon("dagger", 10, 15), sword: new weapon("sword", 20, 25) });

const equipment = [];

// In order to purchase things, I need an observer to give the store. 
const purchaseObserver = { 
    itemIsTooExpensive: function(cost) {
         alert("You can't afford that! It costs " + cost + " gold."); 
        },
    itemIsNotInStock: function() { 
        alert("This store doesn't sell those."); 
    },
    successfullyPurchased: function(item) { 
        equipment.push(item);
        alert("Congratulations! You are now the proud owner of a " + item.name + "."); 
    }
}


  function healingService(name, gold, healthBonus) {
    this.name = name;
    this.gold = gold;
    this.healthBonus = healthBonus;
  }
  
  // This "store" is a healer who knows how to perform certain healing services!
  const healer = new Store({
    "basic healing": new healingService("basic healing", 10, 15),
    "serious healing": new healingService("serious healing", 30, 50),
  });
  

  
  // I need to create an appropriate observer for this new healer "store".    
  const healerObserver = {
    itemIsTooExpensive: function(cost) {
      alert("You can't afford that service! It costs " + cost + " gold.");
    },
  
    itemIsNotInStock: function() {
      alert("The healer doesn't know how to do that.");
    },
  
    successfullyPurchased: function(item) {
      warrior.health += item.healthBonus;
      alert("Whew! You gained " + item.healthBonus + " health.");
    }
  };
  
// Now I can purchase stuff! 
   // weaponStore.purchase("hammer", warrior, purchaseObserver); 

  //healer.purchase("serious healing", warrior, healerObserver); // "You can't afford that service!"
  //healer.purchase("acupuncture", warrior, healerObserver); // "The healer doesn't know how to do that."
  //healer.purchase("basic healing", warrior, healerObserver); // "Whew! You gained 15 health."
  //console.log(warrior.health); // 65
  //console.log(warrior.gold);  // 5