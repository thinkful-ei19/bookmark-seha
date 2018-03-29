// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp

const bookmarkapp = (function () {

  function addBookmarkButtonHandler() {
    $('.add-button-holder').on('click', function (event) {
      event.preventDefault();
      store.showModal = !store.showModal;
      $('#hiddenform').html(newBookmarkForm({hidden: 'active'}));
      // submitBookmarkToList();
      render();
    });
  }

  function addFilterButtonHandler() {
    $('#rating').on('change', function (event) {
      var items = store.findByRating(event.currentTarget.value);
      if (items) {
        render(items);
      }
    });
  }

  function checkValidity(newItem) {
    if (newItem.title == '' || newItem.url == '' || newItem.desc == '' || newItem.rating == '') {
      alert('Please provide the missing information!');
      return false;
    }
    if (!newItem.url.startsWith('http')) {
      alert('Please enter valid URL that begins with http!');
      return false;
    }
    if (isNaN(newItem.rating) || newItem.rating < 1 || newItem.rating > 5) {
      alert('Please enter number between 1 and 5!');
      return false;
    }
    return true;
  }


  function deleteBookmarkHandler() {
    $('#app').on('click', '.delete-button', event => {
      event.stopPropagation();
      const id = getBookmarkId(event.currentTarget);
      api.deleteItem(id, function () {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function expandBookmarkWindow() {
    $('.hiddenformForm').on('click', '.bookmark-container', event => {
      const id = $(event.currentTarget).data('bookmark-id');
      console.log(id);
      const bookmark = store.items.find(item => item.id === id);
      item.expanded = !item.expanded;
      render();
    });
  }


  function generateAddButton() {
    const button = '<button class="add-button" type="submit">Add Bookmark</button>';
    return button;
  }

  
  function generateBookmark(item) {
    let _class = item.active ? 'active' : '';
    return `<li role="button" class="bookmark-item-expanded" data-item-id="${item.id}">
              <h2 class="h2-title">${item.title}</h2>
              <div class="rating-expanded">${getRatingStars(item.rating)}</div>
              <div class="bookmark-hidden-area${_class}">
                <p>${item.desc === '' ? 'No Description' : item.desc}</p>
                <a href="${item.url}" target="_blank">
                  <button class="link-button" name="link-button">Visit Site</button>
                </a>
                <button class="delete-button" name="button">Delete</button>
              </div>
            </li>`;
  }

  function generateBookmarks(items) {
    const generateBookmarks = items.map(item => generateBookmark(item)).join('');
    return `
      <ul class="bookmark-list">${generateBookmarks}</ul>
    `;
  }


  function generateInitialList() {
    store.items.forEach(function (item) {
      var newItem = { title: item.title, url: item.url, desc: item.desc, rating: item.rating };
      api.createItem(newItem, function (createdItem) {
        item.id = createdItem.id;
        render();
      });
    });
  }

  function getBookmarkId(item) {
    return $(item)
      .closest('.bookmark-item-expanded')
      .attr('data-item-id');
  }


  function hideBoomarkForm() {
    $('#hiddenform').html(newBookmarkForm({ hidden: 'hidden' }));
  }

  function getRatingStars(rating) {
    return `
    <span class="fa fa-star ${rating >= 1 ? 'checked' : ''}"></span>
    <span class="fa fa-star ${rating >= 2 ? 'checked' : ''}"></span>
    <span class="fa fa-star ${rating >= 3 ? 'checked' : ''}"></span>
    <span class="fa fa-star ${rating >= 4 ? 'checked' : ''}"></span>
    <span class="fa fa-star ${rating >= 5 ? 'checked' : ''}"></span>
    `;
  }
  function newBookmarkForm(data) {
    return `
      
      <form role= "role" class="hiddenformForm" method="post">
     <h2>${data && data.title ? data : 'Create Bookmark'}</h2>
             <label for="title-entry">Title</label>
             <input placeholder='Enter Title' required class='title-entry' type="text" name='title-entry' />
             <label for="url-entry">URL</label>
             <input placeholder='Enter Url' required class='url-entry' type="href" name='url' />
             <label for="rating-entry">Ratings</label>
             <input type="text" name="rating-entry" class="rating-entry" placeholder="Enter Rating" />
             <label for="description-entry">Description</label>
             <input placeholder='Detailed Description' class='description-entry' type="text" maxlength="150" name='Description' />
             <button class="submit-bookmark" type="submit">Submit</button>
      </form>`;
  }  

  function ratingsFilter() {
    return `
      <form id="add-bookmark-form">
          <label for="rating">Rating Filter</label>
          <select id="rating" name="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
      </form>
    `;
  }


  function render(items) {
    let _bookmarks = generateBookmarks(items ? items : store.items);
    let _newBookmarkForm = newBookmarkForm();
    let _ratings = ratingsFilter();
    if (store.showModal) {
      $('#app').html(`${_newBookmarkForm}${_ratings}${_bookmarks}`);
    } else {
      $('#app').html(`${_ratings}${_bookmarks}`);
    }
    viewBookmark();
    ratingsFilter();
  }


  function submitBookmarkToList() {
    $('.submit-bookmark').on('click', function (event) {
      event.preventDefault();
      const title = $('.title-entry').val();
      const url = $('.url-entry').val();
      const desc = $('.description-entry').val();
      const rating = $('.rating-entry').val();

      $('.add-button-holder').html(generateAddButton());
      addBookmarkButtonHandler();
      var newItem = { title: title, url: url, desc: desc, rating: rating };
      if (checkValidity(newItem)) {
        api.createItem(newItem, function (item) {
          store.addItemToStore(item);
          render();
        });
        hideBoomarkForm();
      }
    });
  }

  function viewBookmark() {
    $('.h2-title').on('click', function (event) {
      const id = getBookmarkId(event.currentTarget);
      let _toggleExpand = store.findById(id);
      _toggleExpand.active = !_toggleExpand.active;
      render();
    });
  }

  return {
    addBookmarkButtonHandler,
    addFilterButtonHandler,
    deleteBookmarkHandler,
    expandBookmarkWindow,
    generateAddButton,
    generateBookmark,
    generateInitialList,
    getBookmarkId,
    newBookmarkForm,
    submitBookmarkToList,
    viewBookmark
  };
})();
