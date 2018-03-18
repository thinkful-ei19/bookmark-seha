// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp 
const store = (function() {
  let items = [];
  let adding = false;

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndToggleChecked = function(id) {
    const item = this.findById(id);
    item.adding = !item.adding;
  };

  //   const toggleAddItem= function() {
  //     this.adding = !this.adding;
  //   };

  const addItemToStore= function(item) {
    this.items.push(item);
  };

  const toggleHiddenButton= function() {
    const item = this.items.find(item => item.id === id);
    item.expanded = !item.expanded;
  };

  const findByRating = function(rating) {
    var items = [];
    for(let i=0; i<this.items.length; i++) {
      if(this.items[i].rating >= rating) {
        items.push(this.items[i]);
      }
    }
    return items;
  };

  //   function findAndUpdate(id, newData) {
  //     Object.assign(findById(id), newData);
  //   }
  function findAndDelete(id) {
    this.items = this.items.filter(item => item.id !== id);
  }


  return {
    items,
    adding,
    ratingFilter: null,
    // toggleAddItem,
    addItemToStore,
    toggleHiddenButton,
    findByRating,
    findAndDelete,
    // findAndUpdate
    findById,
    findAndToggleChecked
  };
}());


