const deleteArticleBtn = document.querySelector("#deleteArticle");


deleteArticleBtn.addEventListener("click", async () => {
    const confirmDelete = confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
        try {
            const slug = deleteArticleBtn.getAttribute("data-slug");
            const response = await fetch(`/articles/${slug}`, {
                method: "DELETE"
            });

            if (response.status === 200) {
                window.location.href = "/articles";
            } else {
                throw new Error("Failed to delete article");
            }
        } catch (error) {
            console.error(error);
        }
    }

});