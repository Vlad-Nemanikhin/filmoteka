import './sass/main.scss';
import ApiService from './js/movies-API-service';
import article from './handlebars/article.hbs';
import cards from './handlebars/grid-cards.hbs';
import axios from 'axios';
import Notiflix from "notiflix";
import debounce from 'lodash.debounce';
import * as APIs from './js/movies-API-service';

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('#search-input');
let inputValue = '';

searchInput.addEventListener('input', oninputChange);

async function getGenres() {
   try {
       const result = await APIs.fetchGenres();
       const genres = result.genres;
       const id = genres.map(id => id.id);
       const name = genres.map(name => name.name);
       localStorage.setItem(`${id}`, `${name}`);
       console.log(genres);
   } catch (error) {
       console.log('OOOOOPS!');
   }
}   

getGenres();

async function fetchTopMovies() {
    try {
        const response = await APIs.fetchTopMovies();
        const movies = response.results;
        const genres = movies.map(r => r.genre_ids);

        renderGenres(genres);
        renderTopMovies(movies);
        console.log(movies);
        console.log(response);
    } catch (error) {
        console.log('Something went wrong!');
    }
}

fetchTopMovies();

function renderTopMovies(movies) {
    const markup = cards(movies);
    // const releaseDate = movies.map(date => date.release_date);
    // console.log(releaseDate);

    gallery.insertAdjacentHTML('beforeend', markup);
}

function renderGenres(genres) {
    // console.log(genres);
}



// ----------------Функция по поиску фильма с инпута-----------------------

function oninputChange(event) {
    inputValue = event.target.value;
    console.log(inputValue);
}

// нужно в разметке доделать кнопку с ID button-search
const buttonSearch = document.querySelector('#button-search');
// и повесить слушатель на нее
buttonSearch.addEventListener('click', getMoviesByInput);

async function getMoviesByInput(event) {
    event.preventDefault();
    try {
        const response = await APIs.fetchMoviesByQuery(inputValue);
        const movies = response.results;
        console.log(movies);
    } catch (error) {
        console.log('ERROR');
    }
}

