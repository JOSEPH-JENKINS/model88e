<template>
  <div class="gallery">
    <div class="first---image image---box">
      <img :src="'29960027.jpg'" alt="G" />
    </div>
    <div class="second---image image---box">
      <img :src="'29960027.jpg'" alt="G" />
    </div>
  </div>
</template>

<script>
import { createClient } from "contentful";
export default {
  data() {
    return {
      images: [],
      count: 0,
    };
  },
  mounted() {
    this.loadImages();
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
          box.children[0].src = `${this.getNextImage()}`;
        });

        box.addEventListener("click", () => {
          box.children[0].src = `/${this.getNextImage()}`;
        });
      });
    },
    loadImages() {
      const client = createClient({
        space: "ill4609f6jw1",
        accessToken: "nXeiaTRVAzeqvXDfYrLaC-eGKtmcaDWNFOc2pTf1psI",
      });
      client.getAssets().then((assets) => {
        assets.items.map((image) => {
          let imageURL = `https:${image.fields.file.url}`;
          this.images.push(imageURL);
          console.log("done");
        });
      });
    },
  },
};
</script>
