export function setupModal() {
    const level = document.getElementById("level");
    const modal = document.getElementById("levelModal");

    if (level && modal) {
        level.addEventListener("click", e => {
            e.stopPropagation();
            level.classList.toggle("open");
        });

        modal.addEventListener("click", e => {
            e.stopPropagation();
        });

        document.addEventListener("click", () => {
            level.classList.remove("open");
        });
    }
}
