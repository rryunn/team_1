<template>
  <div class="profile-container">
    <!-- 프로필 이미지 -->
    <div
      class="profile-image"
      :style="{ backgroundImage: `url(${user_profile})` }"
    ></div>
    <!-- 유저 이름 -->
    <span>{{ user_name }}님</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProfileStore } from '@/stores/profile.js';

const profileStore = useProfileStore(); // Pinia 스토어 사용
profileStore.fetchProfile();

const user_name = computed(() => profileStore.user_name); // Pinia 스토어에서 사용자 이름 가져오기
const user_profile = computed(() => profileStore.user_profile); // Pinia 스토어에서 사용자 프로필 가져오기
</script>

<style scoped>
.profile-container {
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 5px;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: 0 5px;
  border: 1px solid #ccc;
}

.profile-container span {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
</style>
