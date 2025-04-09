import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProfileStore = defineStore('profile', () => {
  const BASEURI = '/api/profile';
  const user = ref({});

  const fetchProfile = async () => {
    try {
      // 기본 get 테스트
      const response = await axios.get(BASEURI);
      user.value = response.data;
      console.log('유저 정보: ', user.value);
    } catch (error) {
      console.error('오류: ', error);
    }
  };

  const handleEditProfile = async (updatedUser) => {
    try {
      const response = await axios.put(BASEURI, updatedUser);
      user.value = response.data;
      console.log('업데이트 된 유저 정보: ', user.value);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  return {
    user,
    fetchProfile,
    handleEditProfile,
  };
});
