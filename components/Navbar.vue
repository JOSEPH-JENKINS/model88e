<template>
  <div class="nav---container">
    <div class="nav">
      <Button placeholder="Shop" linked="/shop" />
      <Button placeholder="Contact" />
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
const aboutFunction = (e) => {
  e.preventDefault();
  useAboutSection().value = !useAboutSection().value;
  useModal().value = !useModal().value;
};
</script>
