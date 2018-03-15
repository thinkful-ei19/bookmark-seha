'use strict';
// global $
// eslint-disable-next-line no-unused-vars
function renderApp() {
  bookmarkapp.render();
  bookmarkapp.addBookmarkButtonHandler();
  bookmarkapp.submitBookmarkToList();
  bookmarkapp.addFilterButtonHandler();
  bookmarkapp.deleteBookmarkHandler();
  bookmarkapp.expandBookmarkWindow();
  bookmarkapp.getBookmarkId();
  bookmarkapp.viewBookmark();


  

  api.getItems(items => {
    items.forEach(item => store.addItemToStore(item));
    bookmarkapp.render();
  });
}

$(renderApp);