/** @type {import('tailwindcss').Config} */

const baseSizeNum = 2;

function concatSizeFn(sizeNum) {
  return `${sizeNum}px`;
}

const size = {
  x: concatSizeFn(baseSizeNum),
  xxs: concatSizeFn(baseSizeNum * 2), // 4
  xs: concatSizeFn(baseSizeNum * 4), // 8
  sm: concatSizeFn(baseSizeNum * 8), // 16
  md: concatSizeFn(baseSizeNum * 12), // 24
  lg: concatSizeFn(baseSizeNum * 16), // 32
  xl: concatSizeFn(baseSizeNum * 24), // 48
  xxl: concatSizeFn(baseSizeNum * 32), // 64
  128: concatSizeFn(baseSizeNum * 64), // 128
  256: concatSizeFn(baseSizeNum * 128) // 256
};

module.exports = {
  content: ['./src/**/*.{js,jsx, ts,tsx}'],
  theme: {
    fontFamily: {
      bold: ['Ubuntu-Bold'],
      medium: ['Ubuntu-Medium'],
      regular: ['Ubuntu-Regular'],
      light: ['Ubuntu-Light']
    },
    fontSize: {
      // 16
      sm: '1rem',
      // 24
      md: '1.5rem',
      // 32
      lg: '2rem',
      // 48
      xl: '3rem',
      // 64
      xxl: '4rem'
    },
    borderWidth: {
      ...size,
      0: 0,
      1: '1px'
    },
    borderRadius: {
      ...size,
      full: '50%'
    },
    gap: { ...size },
    spacing: {
      ...size,
      0: 0,
      1: '1px'
    },
    maxHeight: {
      0: 0
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      100: 100
    },
    extend: {}
  },
  plugins: []
};
