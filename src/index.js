import './sass/main.scss';
import article from './handlebars/article.hbs';
import axios from 'axios';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import * as APIs from './js/movies-API-service';
import modalHidden from './js/close-modal';
import * as renderFilms from './js/renderFilmsFromSubmit';
import { getYear } from 'date-fns';
import changeHeader from './js/change-view-header';
import './js/footer_modal';
import switchTheme from './js/switch-theme';
import renderTopMovies from './js/renderTopMovies';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import './js/top-btn-scroll';

APIs.fetchGenres();
