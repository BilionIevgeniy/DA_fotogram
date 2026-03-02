const images = [
  {
    src: "alaska",
    titel: "Alaska",
  },
  {
    src: "moorente",
    titel: "Moorente",
  },
  {
    src: "anime",
    titel: "Anime",
  },
  {
    src: "sea",
    titel: "Sea",
  },
  {
    src: "atmosphere",
    titel: "Atmosphere",
  },
  {
    src: "snow-bunting",
    titel: "Anow Bunting",
  },
  {
    src: "blue-tit",
    titel: "Blue Tit",
  },
  {
    src: "snow-leopard-cubs",
    titel: "Snow Leopard Cubs",
  },
  {
    src: "hurricane",
    titel: "Hurricane",
  },
  {
    src: "travel",
    titel: "Travel",
  },
  {
    src: "lake",
    titel: "Lake",
  },
  {
    src: "winter",
    titel: "Winter",
  },
];
let newModalImgIdx = 0;

function render() {
  const container = document.querySelector(".main_content");
  if (container) {
    const imgContent = images
      .map(({ src, titel }, idx) => {
        return generateGaleryImgTemplate(idx, src, titel);
      })
      .join("");
    container.innerHTML = imgContent;
  }
}

function openModalOnEnter(event, src, idx) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault(); // чтобы страница не скроллилась от пробела
    openModal(idx);
  }
}

function openModal(idx) {
  document.body.innerHTML += generateModalWrapperTemplate();
  document.addEventListener("keydown", handleKeyboard);
  setModalContent("modal", idx);
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
  setModalContent("modal", newModalImgIdx);
}

function setModalContent(className, idx) {
  const modal = document.querySelector("." + className);
  if (modal) {
    const { src, titel } = images[idx];
    modal.innerHTML = generateModalContentTemplate(idx, titel, src);
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

function generateGaleryImgTemplate(idx, src, titel) {
  return /*html*/ `
          <div 
            onclick="openModal(${idx})"
            onkeydown="openModalOnEnter(event, '${src}', ${idx})"
            class="gallery-item" 
            tabindex="0" 
            role="button"
            aria-label="Open photo"
          >
            <img 
              loading="lazy"
              width="150" 
              height="150" 
              src="./assets/img/main_grid_compress/${src}.jpg" 
              alt='${titel}'
            />
          </div>
        `;
}

function generateModalContentTemplate(idx, titel, src) {
  return /*html*/ `
      <div class="modal_content" onclick="event.stopPropagation()">
        <header class="modal_header">
          <p>${titel}</p>
          <button onclick="closeModal()" class="close_btn" aria-label="Close modal">
            <img class="close_img" src="./assets/img/icons/close.png" alt="close modal"/>
          </button>
        </header>
        <div class="modal_main_img">
          <img
            width="300" 
            height="150"  
            src="./assets/img/main_grid/${src}.webp" 
            alt="${titel}"
          />
        </div>
        <div class="modal_footer">
          <button onclick="switchModalImg(${idx}, ${true})" class="btn_left" aria-label="Open prev photo">
            <img src="./assets/img/icons/Union.png" alt="Open prev photo"/>
          </button>
          <p class="modal_slides_info">
            ${idx + 1} / ${images.length}
          </p>
          <button onclick="switchModalImg(${idx})" class="btn_right" aria-label="Open next photo">
            <img src="./assets/img/icons/Union.png" alt="Open next photo"/>
          </button>
        </div>
      </div>
    `;
}

function generateModalWrapperTemplate() {
  return `<dialog class="modal" onclick="closeModal()"></dialog>`;
}
