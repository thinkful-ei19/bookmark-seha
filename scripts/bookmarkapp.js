// eslint-disable-next-line no-unused-vars
'use strict';
// global $, store, api, bookmarkapp 

const bookmarkapp = (function() {
  function generateBookmark(item){
    console.log('generating bookmark app');
    return `<li class="bookmark-id" data-item-id="${item.id}">
           <header>
               <span class="header-title">${item.title}</span>
           </header>
           <article>
            <div>

              ${getRatingStars(item.rating)}  
               </div>
               <div class="description ${item.expanded ? 'expanded' : 'collapsed'}">
              <p class="item-description">${item.desc}</p>
              <a class="site-link" href="${item.url}" class="item-link">Visit Site</a> 
               </div>
           </article>
           <div class="item__buttons">
               <button class="delete-bookmark">Delete</button>
           </div>
           </li>`;
  }

  function getRatingStars(rating) {
    return `
    <span class="fa fa-star ${rating >= 1 ? 'checked' : '' }"></span>
    <span class="fa fa-star ${rating >= 2 ? 'checked' : '' }"></span>
    <span class="fa fa-star ${rating >= 3 ? 'checked' : '' }"></span>
    <span class="fa fa-star ${rating >= 4 ? 'checked' : '' }"></span>
    <span class="fa fa-star ${rating >= 5 ? 'checked' : '' }"></span>
    `;
  }
  function generateHiddenForm() {
    return `
           <form role= "role" class="hiddenformForm" method="post">
           <fieldset>
           <legend>
           <h2>Create Bookmark</h2>
           </legend>
           <label for="title-entry">Title</label>
           <input placeholder='NewYorkTimes' class='title-entry' type="text" name='title-entry' value='NewYorkTimes'>
           <label for="url-entry">URL</label>
           <input placeholder='newyorktimes.com' class='url-entry' type="href" name='url' value='http://wwww.nytimes.com'/>
           <label for="rating-entry">Ratings</label>
           <input type="text" name="rating-entry" class="rating-entry" placeholder="5" value="5">
           <label for="description-entry">Description</label>
           <input placeholder='Detailed Description' class='description-entry' type="text" name='Description' value='The New York Times: 
           '/>
           <button class="submit-bookmark" type="submit">Submit</button>
           </fieldset>
           </form>`;
  }

  function generateAddButton(){
    const button = '<button class="add-button" type="submit">Add Bookmark</button>';
    return button;
  }

  function addBookmarkButtonHandler(){
    $('.add-button-holder').on('click', function(event){
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
    $('.submit-bookmark').on('click', function(event) {
      event.preventDefault();
      const title = $('.title-entry').val();
      const url = $('.url-entry').val();
      const desc = $('.description-entry').val();
      const rating = $('.rating-entry').val();

      $('.add-button-holder').html(generateAddButton());
      addBookmarkButtonHandler();
      var newItem = {title: title, url: url, desc: desc, rating: rating};
      api.createItem(newItem, function(item) {
        store.addItemToStore(item);
        render();
      });
      hideBoomarkForm();
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



  function getBookmarkId(item) {
    return $(item)
      .closest('.bookmark-container')
      .data('.bookmark-id');
  }

  function deleteBookmarkHandler() {
    $('.bookmark-list').on('click', '.delete-button', event => {
      event.stopPropagation();
      const id = getBookmarkId(event.currentTarget);
      api.deleteItem(id, function() {
        store.findAndDelete(id);
        render();
      });
    });
  }
  
  function render (items) {
    const bookmarkHtml = generateBookmarks(items ? items : store.items);
    $('.bookmark-list').html(bookmarkHtml);
    addExpandHandler();
  }

  function addExpandHandler() {
    $('.headertitle')
  }

  return{
    render,
    addBookmarkButtonHandler,
    generateBookmark,
    generateAddButton,
    generateHiddenForm,
    submitBookmarkToList,
    getBookmarkId,
    addFilterButtonHandler,
    expandBookmarkWindow,
    deleteBookmarkHandler
  };


})();
