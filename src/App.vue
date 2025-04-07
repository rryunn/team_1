<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('@/assets/fonts/SpoqaHanSansNeo-Regular.ttf') format('trueType');
  font-weight: 400;
}
@font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('@/assets/fonts/SpoqaHanSansNeo-Bold.ttf') format('trueType');
  font-weight: 700;
}
@font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('@/assets/fonts/SpoqaHanSansNeo-Light.ttf') format('trueType');
  font-weight: 300;
}
@font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('@/assets/fonts/SpoqaHanSansNeo-Thin.ttf') format('trueType');
  font-weight: 100;
}
@font-face {
  font-family: 'SpoqaHanSansNeo';
  src: url('@/assets/fonts/SpoqaHanSansNeo-Medium.ttf') format('trueType');
  font-weight: 500;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'SpoqaHanSansNeo';
  font-weight: 400;
  font-size: 30px;
}
</style>
