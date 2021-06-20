const getPostPath = (slug) => {
  const uselessDateLength = 11;
  /**
   * [year, fileName]
   * slug ex) /2019/2019-02-24-markdown_drawup/ 
   */
  const [, fileName] = slug.slice(1, slug.length - 1).split('/');
  return fileName.slice(uselessDateLength);
};

const getMainCategory = (categories) => {
  return categories.split(' ')[0].toLowerCase();
};

module.exports = {
  getPostPath,
  getMainCategory
};