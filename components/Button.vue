<template>
  <NuxtLink
    :to="linked ? linked : ''"
    class="nav---link"
    @click="clickFunction"
  >
    <div
      :class="
        useAboutSection().value && about ? 'nav---button close' : 'nav---button'
      "
    >
      <h3 class="nav---text">{{ placeholder }}</h3>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    linked: "",
    clickFunction: null,
    placeholder: "",
    about: null,
  },
};
</script>
