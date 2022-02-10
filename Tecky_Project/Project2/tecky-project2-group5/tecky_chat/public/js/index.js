// const e = require("express")

window.onload = async () => {
    // const socket = io.connect();
    // initRegisterForm()
    // await loadMemoData()
    // initMessage()
    // initLoginForm()

    // socket.on('new-memo', () => {
    //     loadMemoData()
    // })
}

function initLoginForm() {
    const form = document.getElementById('login-form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formObject = {}
        formObject.username = form.username.value
        formObject.password = form.password.value
        form.reset()

        const resp = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject),
        })
        if (resp.status === 200) {
            window.location = '/admin.html'
        } else if (resp.status === 400) {
            const errMessage = (await resp.json()).message
            alert(errMessage)
        }
    })
}


// function initMessage() {
//     const form = document.getElementById('messageInput')
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault()          //停止預設功能
//         const form = event.target;
//         const formData = new FormData()
//         formData.append('content', form.content.value)
//         // formData.append('image', form.image.files[0])
//         // console.log(formData)
//         form.reset()

//         const resp = await fetch('/message', {
//             method: 'POST',
//             body: formData,
//         })
//         if (resp.status === 200) {
//             console.log('MessageInput is OK')

//             // loadMemoData()
//         }
//     })
// }

// async function loadMessage() {
//     const resp = await fetch('/messageOutput')
//     const memos = (await resp.json()).data;
//     // console.log(memos)

//     let htmlStr = ``
//     for (const memo of memos) {
//         const image = memo.image
            // ? `<img src="/images/${memo.image}" alt="" srcset="">`
//             : ``
//         htmlStr += /*HTML*/ `
//         <div id="memo-${memo.id}" class="memo" contenteditable="false">
//         ${memo.content}
//         ${image}
//         <div class="trash-button" onclick="deleteMemo(${memo.id})">
//             <i class="fas fa-trash"></i>
//         </div>
//         <div class="edit-button" onclick="editMemo(${memo.id})">
//             <i class="fas fa-edit"></i>
//         </div>
//     </div>
//         `
//     }
//     document.querySelector('.memo-container').innerHTML = htmlStr
// }

// async function deleteMemo(mid) {
//     const resp = await fetch(`/memos/${mid}`, {
//         method: 'DELETE',
//     })
//     if (resp.status === 200) {
//         loadMemoData()
//     }
// }

// async function editMemo(mid) {
//     const memo = document.getElementById(`memo-${mid}`)
//     console.log(memo.textContent)
// }
