module.exports = (query) => {
  console.log(query);
  const shops = {
    elegantkids: 'elegantKids',
    renner:  'renner'
  };
  const newQuery = query.toString().toLowerCase();
  return shops[newQuery] || 'error'
}
