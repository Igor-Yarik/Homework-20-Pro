document.querySelector("#postButton").addEventListener("click", getURL);

const comButton = document.querySelector("#comments_button");
const input = document.querySelector("#postId");

function getURL() {
    const containers = document.getElementsByClassName("container");

    if (containers.length > 0) {
        const containersArray = Array.from(containers);

        containersArray.forEach(element => {
            element.remove();
        });
    }

    const id = input.value;
    console.log(id);
    if (Number.isInteger(+id) && +id > 0) {
        const postURL = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const commentsURL = postURL + "/comments";
        comButton.setAttribute("data-url", commentsURL);
        getPost(postURL);
        input.value = "";
    } else {
        alert("Ви не вказали номер поста, який хочете знайти");
    }
}

function getPost(requestURL) {

    fetch(requestURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Помилка: " + response.status)
            }
        })
        .then(currentPost => {
            showPost(currentPost);
        })
        .catch(error => alert(error));

}

function showPost(post) {
    const postCont1 = document.querySelector("#post_container");
    const postCont = document.createElement("div");
    postCont.classList.add("container")

    const h = document.createElement("h1");
    h.insertAdjacentText("afterbegin", post.title);
    postCont.insertAdjacentElement('afterbegin', h);

    const div = document.createElement("div");
    div.insertAdjacentText("afterbegin", post.body);
    postCont.insertAdjacentElement('beforeend', div);
    postCont1.insertAdjacentElement('afterbegin', postCont);

    comButton.style.display = "block";
}

comButton.addEventListener('click', getComments);

function getComments() {
    fetch(this.getAttribute("data-url"))
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Помилка: " + response.status)
            }
        })
        .then(currentComments => {
            showComments(currentComments);
        })
}

function showComments(comments) {
    comButton.style.display = "none";
    const commentsContainer = document.querySelector("#comments_container");
    comments.forEach(element => {
        const comItem = document.createElement("div");
        const comBody = document.createElement("div");
        const comName = document.createElement("div");
        comName.className = "name";
        const comEmail = document.createElement("div");
        comEmail.className = "email";

        comBody.insertAdjacentText("afterbegin", element.body);
        comName.insertAdjacentText("afterbegin", element.name);
        comEmail.insertAdjacentText("afterbegin", element.email);

        comItem.insertAdjacentElement("beforeend", comName);
        comItem.insertAdjacentElement("beforeend", comEmail);
        comItem.insertAdjacentElement("beforeend", comBody);
        comItem.className = "container";

        commentsContainer.insertAdjacentElement("beforeend", comItem);
    });
}