// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp 
const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/seha';

  const getItems = function (callback) {
    $.getJSON(BASE_URL + '/bookmarks');
  };

  const createItem = function(data, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback 
    });
  };

  function updateItem (id, updateData, callback) {
    // const jsonData = JSON.stringify(updateData);
    $.ajax({
      url:BASE_URL + '/bookmarks/' + id,
      method:'PATCH',
      contentType:'application/json',
      data:JSON.stringify(updateData),
      success:callback
    });
  }

  const deleteItem = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      data: '',
      success: callback
    });
  };



  return {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
}());