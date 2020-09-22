const imageContainer = document.querySelector('.image')
const titleContainer = document.querySelector('.title')
const likesContainer = document.querySelector('.likes')
const commentsContainer = document.querySelector('.comments')
const likeButton = document.querySelector('.like-button')

fetch('http://localhost:3000/images/1')
    .then(response => response.json())
    .then(response => getImageInfo(response) )


    function getImageInfo(response){
        imageContainer.src = response.image
        titleContainer.textContent = response.title
        likesContainer.textContent = response.likes + " likes"
        commentsContainer.innerHTML = ""
        response.comments.forEach(comment => {
            const commentItem = document.createElement('li')
            commentItem.textContent = comment.content
            commentsContainer.appendChild(commentItem)
        })
    }

likeButton.addEventListener('click', (event) => increaseLikes(event))

function increaseLikes(event){
    console.log(event)
}

