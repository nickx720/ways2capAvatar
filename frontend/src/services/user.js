export const getAllUsers = () => {
  return fetch("http://localhost:4000/users")
    .then((val) => val.json())
    .catch((err) => console.log(err));
};

export const updateUserId = (id, data) => {
  console.log(data);
  let form = new FormData();
  for (let item in data) {
    form.append(item, data[item]);
  }
  return fetch(`http://localhost:4000/users/${id}`, {
    method: "Post",
    body: form,
  });
};
