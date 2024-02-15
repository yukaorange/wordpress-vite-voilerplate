// import Swiper from "swiper/bundle";
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

export function SwiperGenerate(swiper, slide, prev, next) {
  const slideLength = [...slide].length;

  const params = {
    slidesPerView: 'auto',
    loop: false,
    freeMode: {
      enabled: true,
      momentum: false,
    },
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    on: {
      init: function () {
        // 初期化時に最後のスライドの幅を取得して、それをもとにslidesOffsetAfterを計算
        let lastSlideWidth = this.slides[this.slides.length - 1].clientWidth;
        this.params.slidesOffsetAfter = this.width - lastSlideWidth;
        this.update();
      },
      resize: function () {
        // ウィンドウサイズが変更されたときも、slidesOffsetAfterを再計算
        let lastSlideWidth = this.slides[this.slides.length - 1].clientWidth;
        this.params.slidesOffsetAfter = this.width - lastSlideWidth;
        this.update();
      },
    },
  };

  return new Swiper(swiper, {
    ...params,
  });
}

export function SwiperSpGenerate(swiper, slide, indicator) {
  const slideLength = [...slide].length;

  const params = {
    slidesPerView: 'auto',
    loopedSlides: slideLength,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    freeMode: {
      enabled: false,
      momentum: false,
    },
    pagination: {
      el: indicator,
      type: 'bullets',
      clickable: true,
    },
  };

  return new Swiper(swiper, {
    ...params,
  });
}

//this class requires classList has js-swiper, js-swiper__slide, js-swiper__nav.
//this class has media query.
export class SwiperManager {
  constructor(selectors, breakpoint) {
    this.selectors = selectors;
    this.breakpoint = breakpoint;
    this.swiperInstances = {};


    this.checkedSelectors = this.selectors.filter((selector) => {
      return document.querySelector(`${selector}`);
    });

    if (this.checkedSelectors.length > 0) {
      const mql = window.matchMedia(`(max-width: ${this.breakpoint}px)`);
      mql.addEventListener('change', () => {
        this.handleMediaChange(mql);
      });
      this.handleMediaChange(mql);
    }
  }

  handleMediaChange(event) {
    if (event.matches) {
      this.initSwiper();
    } else {
      this.destroySwiper();
    }
  }

  initSwiper() {
    this.selectors.forEach((selector) => {
      const swiperDom = document.querySelector(`${selector}`);
      const swiperSlide = document.querySelectorAll(`${selector}__slide`);
      const swiperIndicator = document.querySelector(`${selector}__nav`);
      const nextButton = document.querySelector(`${selector}__button-next`);
      const prevButton = document.querySelector(`${selector}__button-prev`);
      this.swiperInstances[selector] = this.generateSwiper(
        swiperDom,
        swiperSlide,
        swiperIndicator,
        nextButton,
        prevButton
      );
    });
  }

  destroySwiper() {
    this.selectors.forEach((selector) => {
      if (this.swiperInstances[selector]) {
        this.swiperInstances[selector].destroy();
        this.swiperInstances[selector] = null;
      }
    });
  }

  generateSwiper(swiper, slide, indicator, nextButton, prevButton) {
    const slideLength = [...slide].length;

    const params = {
      slidesPerView: 'auto',
      loopedSlides: slideLength,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      freeMode: {
        enabled: false,
        momentum: false,
      },
    };
    if (indicator) {
      params.pagination = {
        el: indicator,
        type: 'bullets',
        clickable: true,
      };
    }
    if (nextButton && prevButton) {
      params.navigation = {
        nextEl: nextButton,
        prevEl: prevButton,
      };
    }

    return new Swiper(swiper, { ...params });
  }
}