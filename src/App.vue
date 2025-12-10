<template>
  <div class="container">
    <h2>Satıcı Üyelik Paketleri</h2>

    <SellerPlans />
    <BuyerPlans />
  </div>
</template>

<script>
import SellerPlans from './components/SellerPlans.vue';
import BuyerPlans from './components/BuyerPlans.vue';

export default {
  name: 'App',
  components: {
    SellerPlans,
    BuyerPlans
  }
};
</script>

<style>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}
</style>
