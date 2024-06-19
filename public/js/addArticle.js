const form = document.querySelector("form");
const addColor = document.getElementById ("form-color");

const cloudName = "dzcuoxidd";
const presetName = "mxvteo84";


addColor.style.color= "yellow";

// https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload

async function uploadImage(image) {
  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetName);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data.secure_url;
  } catch (error) { 
    alert("Le chargement de l'image a echoue");
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const btnSubmit = event.target.querySelector("#btn-submit");
  btnSubmit.disabled = true;

  const formData = new FormData(event.target);
  const urlToImage = await uploadImage(formData.get("img"));

  // const data = {
  //   author: formData.get("author"),
  //   title: formData.get("title"),
  //   description: formData.get("description"),
  //   urlToImage,
  //   "content": formData.get("content")
  // }

  const data = Object.fromEntries(formData.entries());
  data.urlToImage = urlToImage;
  delete data.img;
  console.log(data);
  btnSubmit.disabled = false;
  event.target.reset();
});
