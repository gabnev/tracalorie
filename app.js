// ******************
// Storage controller
// ******************

// ***************
// Item controller
// ***************

const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //data structure / state
  const data = {
    items: [
      // maybe experiment with fetch api here?
      // {id: 0, name: 'Steak Dinner', calories: 1200},
      // {id: 1, name: 'Cookie', calories: 400},
      // {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null, //item selected to update in the form 
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items;
    },
    addIem: function(name, calories) {
      // Create ID
      let ID;
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item - call constructor
      newItem = new Item(ID, name, calories);

      // Push newItem to data items
      data.items.push(newItem);

      return newItem;
    },
    logData: function() {
      return data;
    }
    
  }
})();

// *************
// UI controller
// *************

const UICtrl = (function() {
  const UISelectors = {
    // Manage our DOM selectors
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach((item) => {
        html += `
          <li class="collection-item" id="item-${this.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fas fa-edit right"></i>
            </a>
          </li>
        `;
      });
      //Insert List Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },    
    getItemInput: function() {
      return { 
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      // Show list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // create li element
      const li = document.createElement('li');
      //add class
      li.className = 'collection-item';
      // add ID
      li.id = `item-${item.id}`;
      //add html
      li.innerHTML = `        
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fas fa-edit right"></i>
        </a>
      `;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
  
})();

// **************
// App Controller
// **************
const App = (function(ItemCtrl, UICtrl) {
  // load event listerners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();

    // Check for name and calorie input
    if(input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addIem(input.name, input.calories);
      
      // Add Item to UI List
      UICtrl.addListItem(newItem);

      // Clear field
      UICtrl.clearInput();
    };

    e.preventDefault();
  }
  
  return {
    init: function() {
      console.log('Initiating app . . .');
      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }

      // populate list with items

      // Load Event Listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App

App.init();