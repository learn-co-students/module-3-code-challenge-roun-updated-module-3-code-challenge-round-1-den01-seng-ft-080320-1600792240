const baseURL = "http://localhost:3000/images/1"
const commentURL = "http://localhost:3000/comments"
const imageContainer = document.querySelector('.image')
const titleContainer = document.querySelector('.title')
const likesContainer = document.querySelector('.likes')
const commentsContainer = document.querySelector('.comments')
const likeButton = document.querySelector('.like-button')
const form = document.querySelector('.comment-form')
const inputContainer = document.querySelector('.comment-input')
let commentsList = []


form.addEventListener('submit', addComment)
likeButton.addEventListener('click', increaseLikes)

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
            commentsList.push(comment.content)
            commentItem.textContent = comment.content
            const deleteButton = document.createElement('button')
            deleteButton.classList.add('delete')
            deleteButton.textContent = "Delete"
            commentsContainer.appendChild(commentItem)
            commentItem.append(deleteButton)
            deleteButton.addEventListener('click', (event) => deleteComment(event, commentItem))
        })
    }

function deleteComment(event, commentItem){
    console.log(commentItem.textContent)
    console.log(commentsList)
}

function increaseLikes(){
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

function addComment(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const comment = formData.get('comment')
    const commentItem = document.createElement('li')
    commentItem.textContent = comment
    commentsContainer.appendChild(commentItem)
    inputContainer.value = ""
    fetch(commentURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({imageId: 1, content: comment})
    })
}
