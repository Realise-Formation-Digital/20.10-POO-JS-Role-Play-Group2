function Store(inventory) { 
// inventory is an object whose keys are item names, 
// and whose values are item objects. For example, 
// { sword: new weapon("sword", 10, 15) }

    this.purchase = function(buy, customer, observer) { 
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

        if(customer.gold < item.gold) {
        observer.itemIsTooExpensive(item.gold); // tell the observer that the customer
                    // didn't have enough gold for the item.
        } else {
        customer.gold -= item.gold;
        observer.successfullyPurchased(item) // tell the observer the item was purchased
        } 
    }
}

// Simple Warrior class 
function Warrior(initialGold) { this.gold = initialGold; }

function weapon(name, gold, attack) { this.name = name; this.gold = gold; this.attack = attack; }

// Create a store with an inventory of weapons 
const weaponStore = new Store({ dagger: new weapon("dagger", 10, 15), sword: new weapon("sword", 20, 25) });

const equipment = [];

const warrior = new Warrior(15); // Enough gold for a dagger, but not a sword!

// In order to purchase things, I need an observer to give the store. 
const purchaseObserver = { 
    itemIsTooExpensive: function(cost) {
       //  alert("You can't afford that! It costs " + cost + " gold."); 
        },
    itemIsNotInStock: function() { 
       // alert("This store doesn't sell those."); 
    },
    successfullyPurchased: function(item) { 
        equipment.push(item);
        //alert("Congratulations! You are now the proud owner of a " + item.name + "."); 
    } 
}

// Now I can purchase stuff! 
weaponStore.purchase("hammer", warrior, purchaseObserver); 
// "This store doesn't sell those." 
weaponStore.purchase("sword", warrior, purchaseObserver); 
// "You can't afford that! It costs 20 gold." 
// "Congratulations! You are now the proud owner of a dagger."
weaponStore.purchase("dagger", warrior, purchaseObserver); 
