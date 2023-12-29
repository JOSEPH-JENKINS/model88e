<template>
  <div
    :class="useAboutSection().value ? 'about---modal open' : 'about---modal'"
    id="about"
  >
    <h2 v-for="paragraph in aboutText" class="about---text">
      {{ paragraph }}
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      posX: 0,
      posY: 0,
      offsetX: 0,
      offsetY: 0,
      mouseX: 0,
      mouseY: 0,
      aboutText: [],
    };
  },
  mounted() {
    this.getAboutText();
    this.addEventListeners(document.querySelector("#about"));
  },
  methods: {
    getAboutText() {
      const { $contentfulClient } = useNuxtApp();

      $contentfulClient.getEntry("6JMUVxmhmXV8pJPqMjJWAl").then((entry) => {
        const { content } = entry.fields.content;
        content.forEach((data) => {
          data.content.forEach((paragraph) => {
            const value = paragraph.value;

            this.aboutText.push(value);
          });
        });
      });
    },
    mouseDownEventListener(element) {
      element.addEventListener("mousedown", (e) => {
        this.isDragging = true;
        this.posX = e.clientX - parseInt(window.getComputedStyle(element).left);
        this.posY = e.clientY - parseInt(window.getComputedStyle(element).top);
        window.addEventListener(
          "mousemove",
          () => {
            this.mouseMoveEventListener(element);
          },
          false
        );
      });
    },
    mouseMoveEventListener(element) {
      element.addEventListener("mousemove", (e) => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const computedStyle = window.getComputedStyle(element);
        const elementWidth = parseInt(computedStyle.width);
        const elementHeight = parseInt(computedStyle.height);

        if (this.isDragging) {
          let posX = e.clientX - this.posX;
          let posY = e.clientY - this.posY;

          // Check if the element is within the window boundaries
          if (posX < 0) {
            posX = 0;
          } else if (posX + elementWidth > windowWidth) {
            posX = windowWidth - elementWidth;
          }

          if (posY < 0) {
            posY = 0;
          } else if (posY + elementHeight > windowHeight) {
            posY = windowHeight - elementHeight;
          }

          element.style.left = posX + "px";
          element.style.top = posY + "px";
        }
      });
    },
    mouseUpEventListener(element) {
      document.addEventListener("mouseup", () => {
        this.isDragging = false;
        window.removeEventListener("mousemove", element, false);
      });
    },
    addEventListeners(element) {
      this.mouseDownEventListener(element);
      this.mouseUpEventListener(element);

      const aboutButton = document.querySelector("#about---button");
      aboutButton.addEventListener("click", () => {
        if (useModal().value == false) {
          this.isDragging = false;

          element.style.left = "50%";
          element.style.top = "50%";
          element.style.transform = "translate(-50%, -50%)";
        }
      });
    },
  },
};
</script>
