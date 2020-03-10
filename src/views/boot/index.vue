<template>
</template>

<script >
import { Loading } from 'element-ui';

export default {
  props: {
    
  },
  created() {
    this.showLoading();
  },
  methods: {
    showLoading() {
      this.lo = Loading.service({fullscreen: true});
        this.$router.push({path: '/main'}, () => {
          this.lo.close();
        });
        
    }
  }

}
</script>

<style>

</style>
