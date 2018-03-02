'use strict';
// global $
// eslint-disable-next-line no-unused-vars
function renderApp() {
  bookmarkapp.render();
  bookmarkapp.addBookmarkButtonHandler();
  bookmarkapp.submitBookmarkToList();
  bookmarkapp.addFilterButtonHandler();
  
  api.getItems(items => {
    items.forEach(item => store.addItemToStore(item));
    bookmarkapp.render();
  });
}

$(renderApp);