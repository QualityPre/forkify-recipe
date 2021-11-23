import icons from 'url:../../img/icons.svg';
import View from './view';

class PagniationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkUpButton(curPage, btn) {
    if (btn === 'next') {
      return ` <button data-goto = "${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    if (btn === 'prev') {
      return `<button data-goto = "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
    }
    return ` <button data-goto = "${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
  <button data-goto = "${
    curPage - 1
  }" class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>Page ${curPage - 1}</span>
</button>`;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    //1 renders page1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      const btn = 'next';
      return this._generateMarkUpButton(curPage, btn);
    }
    //2 renders page 1 only
    if (curPage === 1 && numPages === curPage) {
      return ``;
    }
    //3 Renders last page
    if (curPage === numPages) {
      const btn = 'prev';
      return this._generateMarkUpButton(curPage, btn);
    }
    //4 other
    return this._generateMarkUpButton(curPage);
  }
}

export default new PagniationView();
