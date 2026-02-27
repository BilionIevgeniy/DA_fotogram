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

function render() {
  const container = document.querySelector(".main_content");
  if (container) {
    const imgContent = images
      .map(
        (src, idx) => /*html*/ `
          <div onclick="openModal('${src}', ${idx})" class="gallery-item">
              <img src="./assets/img/main_grid/${src}"/>
          </div>
        `,
      )
      .join("");
    container.innerHTML = imgContent;
  }
}

function openModal(src, idx) {
  document.body.innerHTML += /*html*/ `
        <div class="modal" onclick="closeModal(event)">
            
        </div>
      `;
  setModalContent("modal", idx, src);
}

function closeModal(e) {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
}

function switchModalImg(idx, isPrew) {
  let next;
  if (idx === 0 && isPrew) {
    next = images.length - 1;
  } else if (idx === images.length - 1 && !isPrew) {
    next = 0;
  } else {
    next = isPrew ? idx - 1 : idx + 1;
  }
  setModalContent("modal", next, images[next]);
}

function setModalContent(className, idx, src) {
  const modal = document.querySelector("." + className);
  if (modal) {
    modal.innerHTML = /*html*/ `
  <div class="modal_content" onclick="event.stopPropagation()">
    <div class="modal_header">
      <h3>${src}</h3>
      <button onclick="closeModal(event)" class="close_btn">
        <img class="close_img" src="./assets/img/icons/close.png" />
      </button>
    </div>
    <img class="modal_img" src="./assets/img/main_grid/${src}" />
    <div class="modal_footer">
      <button onclick="switchModalImg(${idx}, ${true})" class="btn_left">
        <img src="./assets/img/icons/Union.png" />
      </button>
      <p class="modal_slides_info">
        ${idx + 1} / ${images.length}
      </p>
      <button onclick="switchModalImg(${idx})" class="btn_right">
        <img src="./assets/img/icons/Union.png" />
      </button>
    </div>
  </div>`;
  }
}
