import { refs } from '../refs';
import { onKeyEscLeftRightPress } from './rend-cards-of-members';
import { teamItems } from './info-about-team';
import { hangScrollBtn } from '../top-btn-scroll';
import { hideButton, showButton } from '../common/conditionOfScrollBtn';
import icons from '../../images/sprite.svg';
const gitIcon = `${icons}#git_icon`;
const mailIcon = `${icons}#mail_icon`;
const linkedInIcon = `${icons}#icon-linkedin`;
const phoneIcon = `${icons}#mobile-phone_icon`;

//! Создание разметки команды

const createTeamElements = teamItems
  .map(
    ({
      photoLink,
      teamItemName,
      teamPosition,
      gitLink,
      emailLink,
      linkedinLink,
      telNumber,
      mainDuties,
      id,
    }) => {
      return `<li class="team-item">
            <img
            src="${photoLink}"
            alt="member"
            width="150"
            height="150"
            class="team-item__photo"
            data-id="${id}"
          />
          <h3 class="team-item__name">${teamItemName}</h3>
          <p class="team-item__position">${teamPosition}</p>
          <div class="team-item__social">
            <a href="${gitLink}" target="_blank" class="team-item__social-link"
              ><svg class="team-social__icon" width="18" height="18">
                <use width="18" height="18" href="${gitIcon}"></use>
              </svg>
            </a>
            <a href="mailto:${emailLink}" class="team-item__social-link"
              ><svg class="team-social__icon" width="18" height="18">
                <use width="18" height="18" href="${mailIcon}"></use></svg
            ></a>
            <a href="${linkedinLink}" target="_blank" class="team-item__social-link"
              ><svg class="team-social__icon" width="18" height="18">
                <use width="18" height="18" href="${linkedInIcon}"></use></svg
            ></a>
            <a href="tel:${telNumber})" class="team-item__social-link"
              ><svg class="team-social__icon" width="18" height="18">
                <use width="18" height="18" href="${phoneIcon}"></use></svg
            ></a>
          </div>
        </li>`;
    },
  )
  .join('');

refs.teamList.insertAdjacentHTML('beforeend', createTeamElements);

//открытие модалки
refs.developerLink.addEventListener('click', onDeveloperLinkClick);
function onDeveloperLinkClick(e) {
  e.preventDefault();
  refs.backdropFooter.classList.remove('backdrop--is-hidden');
  refs.modalFooter.classList.remove('modal--close');
  refs.backdropFooter.addEventListener('click', onFootBackdropClick);
  document.body.classList.add('modal-open');
  window.removeEventListener('scroll', hangScrollBtn);
  window.addEventListener('keydown', onKeyEscLeftRightPress);
  hideButton();

  changeToDarkTheme();

  refs.body.style.overflow = 'hidden';
}

// Применение темной темы
function changeToDarkTheme() {
  if (document.body.classList.contains('dark-theme')) {
    refs.modalFooter.classList.add('theme-dark');
    refs.modalFooter.classList.remove('theme-light');
  } else {
    refs.modalFooter.classList.add('theme-light');
    refs.modalFooter.classList.remove('theme-dark');
    document.querySelector('.team-item__container').classList.remove('item-color');
  }
}

//Закрытие модалки по крестику
refs.closeModalBtn.addEventListener('click', footModalClose);

function footModalClose(e) {
  refs.backdropFooter.classList.add('backdrop--is-hidden');
  refs.modalFooter.classList.add('modal--close');
  refs.backdropFooter.removeEventListener('click', onFootBackdropClick);
  document.body.classList.remove('modal-open');
  window.addEventListener('scroll', hangScrollBtn);
  window.removeEventListener('keydown', onKeyEscLeftRightPress);
  refs.body.style.overflow = 'visible';
  showButton();
}
//Закрытие модалки по бэкдропу
refs.backdropFooter.addEventListener('click', onFootBackdropClick);

function onFootBackdropClick(e) {
  if (e.target === e.currentTarget) {
    footModalClose();
  }
}

export { onDeveloperLinkClick, changeToDarkTheme, footModalClose, onFootBackdropClick };
