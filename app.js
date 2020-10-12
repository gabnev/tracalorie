// Sotrage controller (last thing to do)

// Item controller
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
      {id: 0, name: 'Steak Dinner', calories: 1200},
      {id: 1, name: 'Cookie', calories: 400},
      {id: 2, name: 'Eggs', calories: 300},
    ],
    currentItem: null, //item selected to update in the form 
    totalCalories: 0
  }

  return {
    logData: function() {
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function() {

  return {

  }
  
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {  
  
  return {
    init: function() {
      console.log('Initiating app . . .');
    }
  }

})(ItemCtrl, UICtrl);

// Initialize App

App.init();