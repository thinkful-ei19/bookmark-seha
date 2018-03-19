// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp

const bookmarkapp = (function () {
  function generateBookmark(item) {
    return `<div role="button" class="bookmark-item-expanded" data-item-id="${item.id}">
            <h2 class="h2-title"> ${item.title} </h2>
            <div class="rating-expanded">${getRatingStars(item.rating)}</div>
            <div class="bookmark-hidden-area">
              <p>${item.desc === '' ? 'No Description' : item.desc }</p>
              <a href="${item.url}" target="_blank"><button class="link-button" name="link-button">Visit Site</button></a>
              <button class="delete-button" name="button">Delete</button>
            </div>
            </div>
            </div>`;
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
  function generateHiddenForm(data) {
    return `
           <form role= "role" class="hiddenformForm" method="post">
             <fieldset>
               <legend>
                 <h2>${data ? data : 'Create Bookmark'}</h2>
               </legend>
               <label for="title-entry">Title</label>
               <input placeholder='Enter Title' required class='title-entry' type="text" name='title-entry' />
               <label for="url-entry">URL</label>
               <input placeholder='Enter Url' required class='url-entry' type="href" name='url' />
               <label for="rating-entry">Ratings</label>
               <input type="text" name="rating-entry" class="rating-entry" placeholder="Enter Rating" />
               <label for="description-entry">Description</label>
               <input placeholder='Detailed Description' class='description-entry' type="text" maxlength="150" name='Description' />
               <button class="submit-bookmark" type="submit">Submit</button>
             </fieldset>
           </form>`;
  }

  function generateAddButton() {
    const button = '<button class="add-button" type="submit">Add Bookmark</button>';
    return button;
  }

  function addBookmarkButtonHandler() {
    $('.add-button-holder').on('click', function (event) {
      event.preventDefault();
      $('#hiddenform').html(generateHiddenForm());
      $('#hiddenform').css('display', 'block');
      submitBookmarkToList();
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

  function hideBoomarkForm() {
    $('#hiddenform').css('display', 'none');
  }

  function generateBookmarks(items) {
    const generateBookmarks = items.map(item => generateBookmark(item));
    return generateBookmarks.join('');
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
          viewBookmark();
        });
        hideBoomarkForm();
      }
    });
  }

  function checkValidity(newItem) {
    if(newItem.title == '' || newItem.url == '' || newItem.desc == '' || newItem.rating == '') {
      alert('Please fill the field!');
      return false;
    }
    return true;
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



  function getBookmarkId(item) {
    return $(item)
      .closest('.bookmark-item-expanded')
      .attr('data-item-id');
  }

  function deleteBookmarkHandler() {
    $('.bookmark-list').on('click', '.delete-button', event => {
      event.stopPropagation();
      const id = getBookmarkId(event.currentTarget);
      api.deleteItem(id, function () {
        store.findAndDelete(id);
        render();
        viewBookmark();
      });
    });
  }

  function render(items) {
    const bookmarkHtml = generateBookmarks(items ? items : store.items);
    $('.bookmark-list').html(bookmarkHtml);
  }


  function viewBookmark() {
    $('.h2-title').on('click', function() {
      let _target = $(this).parent().find('.bookmark-hidden-area');
      _target.toggleClass('active');
    });
  }

  return {
    render,
    addBookmarkButtonHandler,
    generateBookmark,
    generateAddButton,
    generateHiddenForm,
    submitBookmarkToList,
    getBookmarkId,
    addFilterButtonHandler,
    expandBookmarkWindow,
    deleteBookmarkHandler,
    viewBookmark
  };
})();
