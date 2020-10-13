// ******************
// Storage controller
// ******************


// ******************************************
//              ITEM CONTROLLER
// ******************************************


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
    getItemById: function(id) {
      let found = null;

      data.items.forEach((item) => {
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updatedItem: function(name, calories) {
      // turn calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach((item) => {
        // updates the DATA STRUCTURE
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      // return updated item
      console.log('Item updated in DB');
      return found;
    },
    deleteItem: function(id) {
      // Get Ids
      const ids = data.items.map((item) => {
        return item.id;
      });

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);  
    },
    clearAllItems: function() {
      data.items = [];
    },
    getTotalCalories: function() {
      let total = 0;

      data.items.forEach((item) => {
        total += item.calories;
      })

      // Set total cal in data structure
      data.totalCalories = total;

      // return total
      return data.totalCalories;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    logData: function() {
      return data;
    }
    
  }
})();


// ******************************************
//                UI controller
// ******************************************


const UICtrl = (function() {
  const UISelectors = {
    // Manage our DOM selectors
    itemList: '#item-list',
    itemsList: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    removeBtn: '.remove-btn',
    backBtn: '.return-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
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
    updateListItem: function(item) {
      // Get the current node list
      let listItems = document.querySelectorAll(UISelectors.itemsList);
      console.log(listItems);

      // Convert node list to array
      listItems = Array.from(listItems);
      console.log(listItems);

      listItems.forEach((listItem) => {
        const itemID = listItem.getAttribute('id');

        // check IDs to find correct one
        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
          <i class="edit-item fas fa-edit right"></i>
          </a>
          `;
        }
      });
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;

      const item =  document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput). value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput). value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();      
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.itemsList);

      // convert node list to aarray
      listItems = Array.from(listItems);

      listItems.forEach((item) => {
        item.remove();
      });
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.removeBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.removeBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
  
})();


// ******************************************
//              App Controller
// ******************************************


const App = (function(ItemCtrl, UICtrl) {
  // load event listerners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
       
      if(e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Back btn event
    document.querySelector(UISelectors.removeBtn).addEventListener('click', itemDeleteSubmit);

    // Back btn event
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    // Clear all btn event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
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

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
      
      // Clear field
      UICtrl.clearInput();
    };
    
    e.preventDefault();
  }

  // Click Item Edit
  const itemEditClick = function(e) {

    // Specify JS created class item
    if(e.target.classList.contains('edit-item')) {
      // Get list item id(item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;
      
      // Break into an array
      const listIdArray = listId.split('-');

      // Get actual ID
      const id = parseInt(listIdArray[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function(e) {

    // Get item input
    const input = UICtrl.getItemInput();

    // Update Item 
    const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();
    
    e.preventDefault();
  }

  // Delete btn event

  const itemDeleteSubmit = function(e) {
    
    // Get current item through ID
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    // Remove from UI
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();    

    e.preventDefault();
  }

  // Clear All Event
  const clearAllItemsClick = function(e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add totalCalories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    // Hide UL
    UICtrl.hideList();


  }
  
  return {
    init: function() {

      // Set initial state
      UICtrl.clearEditState();

      // fetch items from data structure
      const items = ItemCtrl.getItems();
      
      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        // populate list with items
        UICtrl.populateItemList(items);
      }      

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
    
      // Add totalCalories to UI
      UICtrl.showTotalCalories(totalCalories);
      
      // Load Event Listeners
      loadEventListeners();
    }
  }
  
})(ItemCtrl, UICtrl);

// Initialize App

App.init();