import imageItemsCard from './templates/image-items.hbs';
import ImageApiSearchService from './api/api';
import './styles.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load_more-js'),
};

const imageApiSearchService = new ImageApiSearchService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imageApiSearchService.query = e.currentTarget.elements.query.value;

  if ((e.currentTarget.elements.query.value = '')) {
    return alert('Please sumit valid text!');
  }

  imageApiSearchService.resetPage();
  clearImagesFormItem();
  fetchImages();
}

function fetchImages() {
  imageApiSearchService.fetchImages().then(responce => {
    appendImagesCardItems(responce);
    if (responce.length > 12) {
    }
  });
}

function appendImagesCardItems(responce) {
  refs.gallery.insertAdjacentHTML('beforeend', imageItemsCard(responce));
}

function clearImagesFormItem() {
  refs.gallery.innerHTML = '';
}
