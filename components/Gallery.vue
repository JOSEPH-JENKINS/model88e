<template>
  <div class="gallery">
    <div class="first---image image---box">
      <img src="/29960038.jpg" alt="G" />
    </div>
    <div class="second---image image---box">
      <img src="/29960038.jpg" alt="G" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "/29960038.jpg",
        "/29980028.jpg",
        "/29950003.jpg",
        "/29960027.jpg",
        "/29980035.jpg",
        "/000408180019.jpg",
        "/000408180021.jpg",
        "/000408190017.jpg",
      ],
      count: 0,
    };
  },
  mounted() {
    this.addImageEventListeners();
  },
  methods: {
    getNextImage() {
      const maxNumberofImages = this.images.length;
      this.count++;

      if (this.count >= maxNumberofImages) {
        this.count = 0;
      }

      return this.images[this.count];
    },
    addImageEventListeners() {
      const imageBox = document.querySelectorAll(".image---box");

      imageBox.forEach((box) => {
        box.addEventListener("mouseover", () => {
          box.children[0].src = this.getNextImage();
        });

        box.addEventListener("click", () => {
          box.children[0].src = this.getNextImage();
        });
      });
    },
  },
};
</script>
