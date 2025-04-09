<template>
  <section class="not-found-container">
    <div class="container-404">
      <p class="error-404">404 ERROR</p>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <p>존재하지 않는 주소를 입력하셨거나,</p>
      <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
      <img
        src="@/assets/images/lamu_404.png"
        alt="404 Not Found"
        class="image-404"
      />
      <br />
      <router-link to="/" class="to-home">메인으로 이동</router-link>
    </div>
  </section>
</template>
<script setup></script>
<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-family: 'Spoqa Han Sans';
}
.container-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* width: 100%;
  height: 100%; */
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
.not-found-container p {
  font-size: 12px;
  line-height: 1;
  font-weight: 400;
  color: #000;
}

.image-404 {
  width: 50%;
}

.not-found-container .error-404 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.to-home {
  color: #000;
  font-size: 12px;
}
</style>
