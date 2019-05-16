// const todoModel = {
//   id,
//   description,
//   creationDate,
//   dueDate,
//   priority,
//   complete
// };

const todoList = [
  {
    id: 1,
    description: "Sleep early",
    creationDate: "2019-05-12",
    dueDate: "2019-05-12",
    priority: true,
    complete: true
  },
  {
    id: 2,
    description: "Go to bootcamp",
    creationDate: "2019-05-12",
    dueDate: "2019-05-17",
    priority: true,
    complete: false
  },
  {
    id: 3,
    description: "Study ReactJS",
    creationDate: "2019-05-12",
    dueDate: "2019-05-19",
    priority: true,
    complete: false
  }
];

const orderList = (array, key, status) => {
  return array.sort(function(a, b) {
    if (key == "creationDate" || key == "dueDate") {
      return status == 1
        ? new Date(b[key]) - new Date(a[key])
        : new Date(a[key]) - new Date(b[key]);
    } else {
      return status == 1 ? b[key] - a[key] : a[key] - b[key];
    }
  });
};
