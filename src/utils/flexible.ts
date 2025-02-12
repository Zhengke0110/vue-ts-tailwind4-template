import { computed, reactive } from "vue";
import { useWindowSize } from "@vueuse/core";

interface DeviceConfig {
  readonly PC_DEVICE_WIDTH: number;
  readonly TABLET_DEVICE_WIDTH: number;
}

const deviceConfig: DeviceConfig = reactive({
  PC_DEVICE_WIDTH: 1280,
  TABLET_DEVICE_WIDTH: 768,
});

/**
 * @description 判断当前设备类型
 * @returns {Object} 包含设备类型判断的对象
 * isMobile: 是否为移动设备 (<768px)
 * isTablet: 是否为平板设备 (>=768px && <1280px)
 * isDesktop: 是否为桌面设备 (>=1280px)
 */
const { width } = useWindowSize();
export const deviceType = computed(() => ({
  isMobile: width.value < deviceConfig.TABLET_DEVICE_WIDTH,
  isTablet:
    width.value >= deviceConfig.TABLET_DEVICE_WIDTH &&
    width.value < deviceConfig.PC_DEVICE_WIDTH,
  isDesktop: width.value >= deviceConfig.PC_DEVICE_WIDTH,
}));

// 向后兼容的导出
export const isMobileTerminal = computed(() => !deviceType.value.isDesktop);

/**
 * @description 初始化 rem 基准值，最大为 40px
 */
export const useREM = () => {
  const MAX_FONT_SIZE = 24; // 降低最大字体大小
  const MOBILE_FONT_SIZE = 16;
  const TABLET_FONT_SIZE = 20;
  const DESKTOP_FONT_SIZE = 22; // 新增桌面端基准字体大小

  const setREM = () => {
    const html = document.documentElement;
    const currentWidth = window.innerWidth;

    if (currentWidth < deviceConfig.TABLET_DEVICE_WIDTH) {
      // 移动端逻辑保持不变
      let fontSize = (currentWidth / 375) * MOBILE_FONT_SIZE;
      fontSize = Math.min(fontSize, MOBILE_FONT_SIZE * 1.5);
      html.style.fontSize = `${fontSize}px`;
    } else if (currentWidth < deviceConfig.PC_DEVICE_WIDTH) {
      // 平板设备逻辑保持不变
      let fontSize = (currentWidth / 768) * TABLET_FONT_SIZE;
      fontSize = Math.min(fontSize, TABLET_FONT_SIZE * 1.3);
      html.style.fontSize = `${fontSize}px`;
    } else {
      // 桌面端新计算逻辑
      let fontSize = (currentWidth / 1280) * DESKTOP_FONT_SIZE; // 使用 1280px 作为基准宽度
      fontSize = Math.min(fontSize, MAX_FONT_SIZE);
      // 确保字体大小不会小于基准值
      fontSize = Math.max(fontSize, DESKTOP_FONT_SIZE);
      html.style.fontSize = `${fontSize}px`;
    }
  };

  // 立即执行一次
  setREM();

  // 监听窗口变化，动态更新 REM
  window.addEventListener("resize", setREM);

  return () => {
    window.removeEventListener("resize", setREM);
  };
};
