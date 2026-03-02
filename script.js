const images = [
  "alaska-810433_1280.jpg",
  "moorente-8783210_1280.jpg",
  "anime-8788959_1280.jpg",
  "sea-2563389_1280.jpg",
  "atmosphere-8752835_1280.png",
  "snow-bunting-6781122_1280.jpg",
  "blue-tit-8521052_1280.jpg",
  "snow-leopard-cubs-8039138_1280.jpg",
  "hurricane-92968_1280.jpg",
  "travel-8785493_1280.jpg",
  "lake-2896379_1280.jpg",
  "winter-1675197_1280.jpg",
];
let newModalImgIdx = 0;

function render() {
  const container = document.querySelector(".main_content");
  if (container) {
    const imgContent = images
      .map((src, idx) => {
        return /*html*/ `
          <div 
            onclick="openModal('${src}', ${idx})"
            onkeydown="openModalOnEnter(event, '${src}', ${idx})"
            class="gallery-item" 
            tabindex="0" 
            role="button"
            aria-label="Open photo">
              <img src="./assets/img/main_grid/${src}"/>
          </div>
        `;
      })
      .join("");
    container.innerHTML = imgContent;
  }
}

function openModalOnEnter(event, src, idx) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault(); // чтобы страница не скроллилась от пробела
    openModal(src, idx);
  }
}

function openModal(src, idx) {
  document.body.innerHTML += `<div class="modal" onclick="closeModal()"></div>`;
  document.addEventListener("keydown", handleKeyboard);
  setModalContent("modal", idx, src);
  newModalImgIdx = idx;
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    document.removeEventListener("keydown", handleKeyboard);
    modal.remove();
  }
}

function switchModalImg(idx, isPrew) {
  if (idx === 0 && isPrew) {
    newModalImgIdx = images.length - 1;
  } else if (idx === images.length - 1 && !isPrew) {
    newModalImgIdx = 0;
  } else {
    newModalImgIdx = isPrew ? idx - 1 : idx + 1;
  }
  setModalContent("modal", newModalImgIdx, images[newModalImgIdx]);
}

function setModalContent(className, idx, src) {
  const modal = document.querySelector("." + className);
  if (modal) {
    modal.innerHTML = /*html*/ `
      <div class="modal_content" onclick="event.stopPropagation()">
        <header class="modal_header">
          <p>${src}</p>
          <button onclick="closeModal()" class="close_btn">
            <img class="close_img" src="./assets/img/icons/close.png" alt="close modal"/>
          </button>
        </header>
        <img class="modal_main_img" src="./assets/img/main_grid/${src}" alt="modal img"/>
        <div class="modal_footer">
          <button onclick="switchModalImg(${idx}, ${true})" class="btn_left">
            <img src="./assets/img/icons/Union.png" alt="left arrow"/>
          </button>
          <p class="modal_slides_info">
            ${idx + 1} / ${images.length}
          </p>
          <button onclick="switchModalImg(${idx})" class="btn_right">
            <img src="./assets/img/icons/Union.png" alt="right arrow"/>
          </button>
        </div>
      </div>
    `;
  }
}

function handleKeyboard(event) {
  if (event.key === "Escape") {
    closeModal();
  } else if (event.key === "ArrowRight") {
    switchModalImg(newModalImgIdx);
  } else if (event.key === "ArrowLeft") {
    switchModalImg(newModalImgIdx, true);
  }
}
