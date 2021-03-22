// ============
// Methods
// ============
module.exports = {
  findID(db, id) {
    const item = db.find((item) => item.id === Number(id));
    return item ? item : { message: `Error, can't find item with id ${id}` };
  },
  randomID(db) {
    const random = Math.floor(Math.random() * db.length);
    return db[random];
  },
  modifyID(db, id, values) {
    const index = db.indexOf(db.find((item) => item.id === Number(id)));
    if (index === -1) {
      return false;
    }
    db[index] = { ...db[index], ...values };
    return true;
  },
  pushID(db, values) {
    // ID generator
    function* idGenerator() {
      let id = db.length + 1;
      while (true) {
        yield id;
        id++;
      }
    }
    const generator = idGenerator();
    db.push({ id: generator.next().value, ...values });
  },
  deleteID(db, id) {
    const index = db.indexOf(db.find((item) => item.id === Number(id)));
    if (index === -1) {
      return false;
    }
    db.splice(-Number(index), 1);
    return true;
  },
};
