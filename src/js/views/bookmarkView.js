import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class BookmarkViews extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'No bookmarks found, try adding some!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false));
  }
}
export default new BookmarkViews();
