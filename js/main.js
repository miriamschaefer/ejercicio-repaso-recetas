'use strict';

const elemList = document.querySelector('#recipes-list');
const elemFavList = document.querySelector('#favourites-recipes-list');
const urlBase = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian';
const counter = document.querySelector('.counter');

let recipes = null;
let favoriteRecipes = [];

function getRecipesFromApi() {
  fetch(urlBase)
    .then((response) => response.json())
    .then((data) => {
      recipes = data.meals;
      renderRecipes(recipes);
      addListeners();
    });
}

function renderRecipes(arr) {
  let codeHTML = '';
  for (const elem of arr) {
    codeHTML += `<li class="recipe-container id=${recipes.idMeal}>`;
    codeHTML += `<div class="img-container">`;
    codeHTML += `<img src="${elem.strMealThumb}"/>`;
    codeHTML += `</div>`;
    codeHTML += `<h2 class="recipe-title">${elem.strMeal}</h2>`;
    codeHTML += `</li>`;
    elemList.innerHTML = codeHTML;
  }
}

function addListeners() {
  const fav = document.querySelectorAll('.recipe-container');

  for (const elem of fav) {
    if (elem !== undefined) {
      elem.addEventListener('click', addToFavs);
    }
  }
}

function addToFavs(ev) {
  const clickOnRecipe = event.currentTarget;
  clickOnRecipe.classList.toggle('change-background');

  if (clickOnRecipe.classList.contains('change.background')) {
    favoriteRecipes.push(clickOnRecipe);
  } else {
    let index = favoriteRecipes.indexOf(clickOnRecipe);
    if (index >= 0) {
      favoriteRecipes.splice(index, 1);
    }
  }

  counter.innerHTML = `${favoriteRecipes.length} favs`;

  const newFav = document.createTextNode(`<li>${recipe.strMeal}</li>`);
  elemFavList.appendChild(newFav);
  console.log(favoriteRecipes.length);
}

getRecipesFromApi();
