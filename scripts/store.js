// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp 
const store = (function() {
  let items = [
    { id: '1', title: 'New York Times', rating: '4', expanded: false },
    { id: '2', title: 'HuffingtonPost', rating: '4', expanded: false},
    { id: '3', title: 'CNN', rating: '3', expanded: false },
    { id: '4', title: 'Washington Post', rating: '5', expanded: false }
  ];
  let adding = false;

  const toggleAddItem= function() {
    this.adding = !this.adding;
  };

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
      if(this.items[i].rating === rating) {
        items.push(this.items[i]);
      }
    }
    return items;
  };



  return {
    items,
    adding,
    ratingFilter: null,
    toggleAddItem,
    addItemToStore,
    toggleHiddenButton,
    findByRating
  };
}());


