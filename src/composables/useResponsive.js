import { ref, onMounted, onUnmounted } from 'vue';

export default function useResponsive() {
  const isSmallScreen = ref(false);

  const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 960;
  };

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });

  return {
    isSmallScreen,
    checkScreenSize,
  };
}