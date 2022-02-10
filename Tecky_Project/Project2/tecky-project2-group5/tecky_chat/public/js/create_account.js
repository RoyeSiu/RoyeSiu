// console.log("open create_acount js")

// const form = document.getElementById("create-account-form");
// form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formObject = {};
//     formObject.inputUsername = form.inputUsername.value;
//     formObject.inputPassword = form.inputPassword.value;
//     formObject.inputConfirmPassword = form.inputConfirmPassword.value;
//     formObject.inputNickname = form.inputNickname.value;
//     formObject.profile = form.profile.files[0]
//     if (
//         formObject.inputPassword != formObject.inputConfirmPassword ||
//         formObject.inputUsername != "" ||
//         formObject.inputPassword != "" ||
//         formObject.inputNickname != ""
//     ) {
//         form.reset();
//         const resp = await fetch('./create_account', {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formObject),
//         });
//         if (resp.status === 200) {
//             window.location = "/admin.html";
//         } else if (resp.status === 400) {
//             const errMessage = (await resp.json()).message;
//             alert(errMessage);
//         }
//     } else {
//     }
// });

const craeteAccountForm = document.getElementById("create-account-form");
// craeteAccountForm.querySelector("#create-account-form-form")
craeteAccountForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formData = new FormData();
    if (form.inputPassword.value != form.inputConfirmPassword.value) {
        console.log("create fail");
        return;
    }
    console.log("create send");
    formData.append("inputUsername", form.inputUsername.value);
    formData.append("inputPassword", form.inputPassword.value);
    formData.append("inputNickname", form.inputNickname.value);
    formData.append("profile", form.profile.files[0]);
    console.log(formData);
    const res = await fetch("/create_account", {
        method: "POST",
        body: formData,
    });
    const result = await res.json();

    if (res.status == 200) {
        document.querySelector("#login-card").style.display = "block";
    } else {
        window.alert("create account fail;");
    }
});
