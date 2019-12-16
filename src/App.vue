<template>
  <v-app>
    <Timer />
  </v-app>
</template>

<script>
import Timer from './components/Timer'

export default {
  name: 'App',
  components: {
    Timer
  },

  data: () => ({
    //
  }),
};
</script>
