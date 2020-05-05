import { parseParams } from './utils/parse.js';

const posts = document.querySelectorAll('.post-list li');
const postsHeader = document.querySelector('.post-list-heading');

const params = parseParams(document.location.search);

if (params) {
  const { search } = params;
  document.querySelector('#search-input').value = search;
  searchPosts(search);
}

document.querySelector('#search-input').addEventListener('keyup', (e) => {
  searchPosts(e.target.value);
});

function searchPosts(value) {
  let count = 0;
  posts.forEach((cur) => {
    if (!cur.innerText.toUpperCase().includes(value.toUpperCase())) cur.classList.add('unshow');
    else {
      count += 1;
      cur.classList.remove('unshow');
    }
  });
  postsHeader.innerText = `${count}개의 포스트`;
}
