<template>
  <div class="profile-container">
    <!-- 프로필 이미지 -->
    <div
      class="profile-image"
      :style="{ backgroundImage: `url(${user_profile})` }"
    ></div>
    <!-- 유저 이름 -->

    <router-link to="/profile" class="to-profile">
      <span>{{ user_name }}님</span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        class="arrow-icon"
      >
        <path
          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
        />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProfileStore } from '@/stores/profile.js';

const profileStore = useProfileStore(); // Pinia 스토어 사용
profileStore.fetchProfile();

const user_name = computed(() => profileStore.user.name); // Pinia 스토어에서 사용자 이름 가져오기
const user_profile = computed(() => profileStore.user.profileImage); // Pinia 스토어에서 사용자 프로필 가져오기
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

.to-profile {
  text-decoration: none;
}

.to-profile:hover {
  background: none;
}

.arrow-icon {
  width: 9px;
  margin-left: 3px;
  fill: #333;
}
</style>
