const baseURL = "http://localhost:3000/images/1"
const imageContainer = document.querySelector('.image')
const titleContainer = document.querySelector('.title')
const likesContainer = document.querySelector('.likes')
const commentsContainer = document.querySelector('.comments')
const likeButton = document.querySelector('.like-button')
let amountOfLikes = 0

fetch(baseURL)
    .then(response => response.json())
    .then(response => getImageInfo(response) )


    function getImageInfo(response){
        imageContainer.src = response.image
        titleContainer.textContent = response.title
        amountOfLikes = response.likes
        likesContainer.textContent = amountOfLikes + " likes"
        commentsContainer.innerHTML = ""
        response.comments.forEach(comment => {
            const commentItem = document.createElement('li')
            commentItem.textContent = comment.content
            commentsContainer.appendChild(commentItem)
        })
    }

likeButton.addEventListener('click', (event) => increaseLikes(event))

function increaseLikes(event){
    amountOfLikes += 1
    likesContainer.textContent = amountOfLikes + " likes"
    fetch(baseURL, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ likes: amountOfLikes })
    })
}

