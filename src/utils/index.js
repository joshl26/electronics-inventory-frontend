const arraySearch = (array, keyword) => {
  const searchTerm = keyword.toLowerCase();
  return array.filter((value) => value.col1.toLowerCase().match(new RegExp(searchTerm, 'g')));
};

export default arraySearch;
