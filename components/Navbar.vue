<template>
  <div class="nav---container">
    <div class="nav">
      <Button placeholder="Shop" linked="/shop" />
      <Button
        :placeholder="useContactSection().value ? 'Close' : 'Contact'"
        :clickFunction="contactFunction"
        :contact="true"
      />
      <Button
        :placeholder="
          useAboutSection().value && useModal().value ? 'Close' : 'About'
        "
        :clickFunction="aboutFunction"
        :about="true"
        id="about---button"
      />
    </div>
  </div>
</template>

<script setup>
import { useContactSection } from "~/composables/states";

const aboutFunction = (e) => {
  e.preventDefault();
  useAboutSection().value = !useAboutSection().value;
  useModal().value = !useModal().value;
};

const contactFunction = (e) => {
  e.preventDefault();
  useContactSection().value = !useContactSection().value;
};
</script>
