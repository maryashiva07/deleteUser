// Write your code below:

const API_URL = "https://crudcrud.com/api/5fac1bd58204b76a7ee9a3a044386aa/users";

document.addEventListener("DOMContentLoaded", () => {
    axios.get(API_URL).then((res) => {
        res.data.forEach((user) => {
            showUserOnScreen(user);
        });
    })
        .catch((err) => console.log(err));
});

function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    axios.post(API_URL, userDetails).then((res) => {
        showUserOnScreen(res.data);
    })
        .catch((err) => console.log(err));
}

function showUserOnScreen(user) {
    const parentNode = document.getElementById("listOfItems");

    const child = document.createElement("li");
    child.id = user._id;

    child.textContent = `${user.username} - ${user.email} - ${user.phone}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        axios.delete(`${API_URL}/${user._id}`).then(() => {
            parentNode.removeChild(child);
        })
            .catch((err) => console.log(err));
    };

    child.appendChild(deleteBtn);
    parentNode.appendChild(child);
}

// Do not touch the code below
module.exports = handleFormSubmit;
