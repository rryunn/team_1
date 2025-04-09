<template>
  <div class="top">
    <!-- 뒤로가기 버튼 -->
    <button @click="goBack" class="back-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="back-icon"
      >
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
    </button>
    <button class="edit-button" @click="editProfile">수정</button>
    <button class="done-button" @click="editProfileDone" style="display: none">
      완료
    </button>
  </div>
  <header class="profile-area">
    <!-- 상단 프로필 이미지 영역 -->
    <div class="profile-pic-wrapper">
      <!-- 프로필 이미지 -->
      <div
        class="profile-pic"
        :style="{ backgroundImage: `url(${user_profile})` }"
      >
        <button @click="editProfileImage" class="profile-edit">Edit</button>
      </div>
    </div>
    {{ user_name }}
  </header>
  <!-- 사용자 정보 영역 -->
  <section class="info-area">
    <div class="profile-info">
      <div class="infos">
        <p>이름</p>
        <input
          type="text"
          :value="user_name"
          class="info-text"
          style="border: none"
          disabled
        />
      </div>
      <div class="infos">
        <p>이메일</p>
        <input
          type="text"
          :value="user_email"
          class="info-text"
          style="border: none"
          disabled
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useProfileStore } from '@/stores/profile.js';

const router = useRouter();
const profileStore = useProfileStore(); // Pinia 스토어 사용
profileStore.fetchProfile();

const user_name = computed(() => profileStore.user.name); // Pinia 스토어에서 사용자 이름 가져오기
const user_email = computed(() => profileStore.user.email); // Pinia 스토어에서 사용자 이메일 가져오기
const user_profile = computed(() => profileStore.user.profileImage); // Pinia 스토어에서 사용자 프로필 가져오기

// 뒤로가기 함수
const goBack = () => {
  router.back(); // 이전 페이지로 이동
};

// 프로필 Edit 함수
const editProfile = () => {
  const editButton = document.querySelector('.edit-button');
  editButton.style.display = 'none';
  const doneButton = document.querySelector('.done-button');
  doneButton.style.display = 'block';

  const inputs = document.querySelectorAll('.info-text');
  inputs.forEach((input) => {
    input.disabled = false;
  });
};

// 프로필 Edit 완료 함수
const editProfileDone = async () => {
  const editButton = document.querySelector('.edit-button');
  editButton.style.display = 'block';
  const doneButton = document.querySelector('.done-button');
  doneButton.style.display = 'none';

  const inputs = document.querySelectorAll('.info-text');
  const updatedUser = {
    name: inputs[0].value,
    email: inputs[1].value,
    profileImage: user_profile.value, // 기존 프로필 이미지 값을 유지
  };
  profileStore.handleEditProfile(updatedUser); // Pinia 스토어의 updateUser 메서드 호출

  inputs.forEach((input) => {
    input.disabled = true;
  });
};

const editProfileImage = () => {
  alert('구현 중인 기능입니다.');
};
</script>
<style scoped>
@import '@/styles/profile.css';
</style>
