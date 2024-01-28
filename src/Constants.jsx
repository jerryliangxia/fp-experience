export const Gravity = 30;

const resolution = window.innerWidth;
export const isMobile = resolution >= 320 && resolution <= 480;
export const isTablet = resolution >= 768 && resolution <= 1024;
export const isDesktop = !isMobile && !isTablet;

export const bw = isTablet ? document.body.clientWidth / 6 : 200;
export const bh = isTablet ? document.body.clientHeight / 6 : 200;
