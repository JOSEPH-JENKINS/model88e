<template>
  <div
    :class="useAboutSection().value ? 'about---modal open' : 'about---modal'"
    id="about"
  >
    <h2 class="about---text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
      rerum consectetur eos, suscipit eveniet qui fuga quae a deserunt
      repellendus, aut nihil harum soluta? Voluptate?
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
    };
  },
  mounted() {
    this.addEventListeners(document.querySelector("#about"));
  },
  methods: {
    getAboutText() {
      const { $contentfulClient } = useNuxtApp();

      $contentfulClient
        .getEntry("6JMUVxmhmXV8pJPqMjJWAl")
        .then((entry) => console.log(entry));
    },
    mouseDownEventListener(element) {
      element.addEventListener("mousedown", (e) => {
        this.isDragging = true;
        this.posX = e.clientX - element.offsetLeft;
        this.posY = e.clientY - element.offsetTop;
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
        // e.preventDefault();
        console.log("yeah");
        if (this.isDragging) {
          this.mouseX = e.clientX - this.posX;
          this.mouseY = e.clientY - this.posY;
          element.style.left = this.mouseX + "px";
          element.style.top = this.mouseY + "px";
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
