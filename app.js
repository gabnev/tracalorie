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
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null, //item selected to update in the form 
    totalCalories: 0
  }

  return {
    getItems: function() {
      return data.items;
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
    itemList: '#item-list' // in case our IDs change along the production
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
    }
  }
  
})();

// **************
// App Controller
// **************
const App = (function(ItemCtrl, UICtrl) {  
  
  return {
    init: function() {
      console.log('Initiating app . . .');
      // fetch items from data structure
      const items = ItemCtrl.getItems();

      // populate list with items
      UICtrl.populateItemList(items);
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App

App.init();