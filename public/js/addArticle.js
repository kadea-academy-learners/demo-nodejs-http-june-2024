const addForm = document.querySelector("#add-article-form");


const cloudName = "dvrppkins"
const uploadPreset = "usvwphjt"

const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;


async function uploadImage() {
    try {
        const formData = new FormData();
        const file = addForm.elements[0].files[0];

        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        return data.url
    } catch (error) {
        alert("Failed to upload image")
    }

}

async function addArticle(article) {
    try {
        const response = await fetch("/articles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })



        if (response.status === 201) {
            window.location.href = "/articles";
        } else {
            const {errors} = await response.json()
            console.log(errors)
            const errorsBloc = document.querySelector("#errors")
            errorsBloc.innerHTML = ''
            errorsBloc.innerHTML = errors.map(error => `<li>${error.msg}</li>`).join("")
            alert("Failed to add article");
        }
    } catch (error) {
        console.error(error)
    }

}



addForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    e.target.querySelector("button").disabled = true;

    try {
        const urlToImage = await uploadImage()
        await addArticle({
            author: formData.get("author"),
            title: formData.get("title"),
            description: formData.get("description"),
            urlToImage,
            content: formData.get("content"),
        })


        e.target.reset();
        e.target.querySelector("button").disabled = false;

    }catch (error) {
        console.error(error)
    }


})