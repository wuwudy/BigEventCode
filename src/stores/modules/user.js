import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, updateUserProfile } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    //用户信息
    const userInfo = ref({})

    //调用接口设置个人信息
    const setUserInfo = async () => {
      const { data } = await getUserInfo()
      userInfo.value = data
    }

    //更新个人信息
    const updateUserInfo = async (newUserInfo) => {
      await updateUserProfile(newUserInfo)
      //刷新userInfo值
      setUserInfo()
    }

    //移除个人信息
    const removeUserInfo = () => {
      userInfo.value = {}
    }

    //token
    const token = ref('')
    //设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    //移除token
    const removeToken = () => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken,
      userInfo,
      setUserInfo,
      updateUserInfo,
      removeUserInfo
    }
  },
  {
    persist: {
      key: 'BE',
      debug: true
    }
  }
)
