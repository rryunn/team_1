import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProfileStore = defineStore('profile', () => {
  const BASEURI = '/api/profile';
  const user_name = ref([]);
  const user_email = ref([]);
  const user_profile = ref([]);

  const fetchProfile = async () => {
    try {
      // 기본 get 테스트
      const response = await axios.get(BASEURI);
      user_name.value = response.data.name;
      user_email.value = response.data.email;
      user_profile.value = response.data.profileImage;
      console.log('유저: ', response.data);
      console.log('유저 이름: ', user_name.value);
      console.log('유저 이메일: ', user_email.value);
      console.log('유저 프로필: ', user_profile.value);
    } catch (error) {
      console.error('오류: ', error);
    }
  };

  const handleEditProfile = async (updatedUser) => {
    try {
      const response = await axios.put(BASEURI, updatedUser);
      user_name.value = response.data.name;
      user_email.value = response.data.email;
      console.log('업데이트 된 유저 이름: ', user_name.value);
      console.log('업데이트 된 유저 이메일: ', user_email.value);
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
    }
  };

  return {
    user_name,
    user_email,
    user_profile,
    fetchProfile,
    handleEditProfile,
  };
});
