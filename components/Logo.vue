<template>
  <NuxtLink to="/">
    <div class="logo">
      <img src="/logo.svg" alt="logo" />
    </div>
  </NuxtLink>
</template>

<script>
export default {
  mounted() {
    document.querySelector(".logo").addEventListener("click", () => {
      useModal().value = false;
      useAboutSection().value = false;
    });
  },
};
</script>
