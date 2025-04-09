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
    // 이름 또는 이메일에 값이 없을 경우 에러 alert 표시
    if (!updatedUser.name || !updatedUser.email) {
      alert('이름 또는 이메일을 입력해주세요.');
      return false;
    }
    // 이름 유효성 검사
    const regName = /^[가-힣]{2,5}$/; // 한글 2~5자 정규식
    if (!regName.test(updatedUser.name)) {
      alert('이름은 한글로 2자 이상 5자 이하로 입력해주세요.');
      return false;
    }
    // 이메일 형식 검사 정규식 추가
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regEmail.test(updatedUser.email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    try {
      const response = await axios.put(BASEURI, updatedUser);
      user.value = response.data;
      console.log('업데이트 된 유저 정보: ', user.value);
      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      return false;
    }
  };

  return {
    user,
    fetchProfile,
    handleEditProfile,
  };
});
