// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp
const store = (function() {
  let items = [
    {
      title: 'New York Times',
      rating: '4',
      expanded: false,
      desc: "Breaking News, World News & Multimedia",
      url: "https://www.nytimes.com"
    },
    {
      title: 'HuffingtonPost',
      rating: '4',
      expanded: false,
      desc: "Breaking News, U.S. and World News | HuffPost",
      url: "https://www.huffingtonpost.com/"
    },
    {
      title: 'CNN',
      rating: '3',
      expanded: false,
      desc: "Breaking News, Latest News and Videos",
      url: "https://www.cnn.com"
    },
    {
      title: 'Washington Post',
      rating: '5',
      expanded: false,
      desc: "Democracy dies in darkness",
      url: "https://www.washingtonpost.com/"
    },
  ];
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
