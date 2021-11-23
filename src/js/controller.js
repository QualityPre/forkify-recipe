import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import bookmarkView from './views/bookmarkView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE__MILLISEC } from './config';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept;
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  // Getting ID from the hash
  const id = window.location.hash.slice(1);

  if (!id) return;
  try {
    recipeView.renderSpinner();
    //Step 0:update results view to make selected recipe
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    // step 1 LOADING RECIPE
    await model.loadRecipe(id);

    // Step 2 rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    //1 get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2 load results
    await model.loadSearchResults(query);
    //3 render results
    resultView.renderSpinner();
    resultView.render(model.getSearchResultsPage(1));
    //4 render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (gotoPage) {
  //1 Render new results
  resultView.render(model.getSearchResultsPage(gotoPage));
  //2 render new pagination buttons
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // 1.Update the recipe servings in state
  model.updateServings(newServings);
  // 2. Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.recipe);
  //Update the recipe view
  recipeView.update(model.state.recipe);
  // render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // upload recipe data
    await model.uploadRecipe(newRecipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // add sucess message
    addRecipeView.renderMessage();
    // render bookmark
    bookmarkView.render(model.state.bookmarks);
    // Change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close form automatically
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE__MILLISEC);
    console.log(model.state.recipe);
  } catch (err) {
    console.error('RECIPE ERROR');
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarkView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
