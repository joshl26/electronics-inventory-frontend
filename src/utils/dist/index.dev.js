Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.arraySearch = undefined;

const arraySearch = function arraySearch(array, keyword) {
  const searchTerm = keyword.toLowerCase();
  return array.filter((value) => value.col1.toLowerCase().match(new RegExp(searchTerm, 'g')));
};

exports.arraySearch = arraySearch;
