//modules
import { DrawerMenu, setViewPort,loadedAnimation } from "./components/common";
import { Loading } from "./components/loading";

function init() {
  
  setViewPort();

  const drawerMenu = new DrawerMenu(".drawer-button", ".drawer-nav",".drawer-nav__inner", ".drawer-nav a",".drawer-close");
}


window.addEventListener('load', async() => {
  let isFirstAccess;
  try {
    isFirstAccess = !sessionStorage.getItem('firstAccess');
    document.body.classList.add('firstAccess');
  } catch (e) {
    console.alert('sessionStorage is not accessible: ', e);
  }

  if (isFirstAccess) {
    try {
      sessionStorage.setItem('firstAccess', 'true');
    } catch (e) {
      console.alert('sessionStorage is not accessible: ', e);
    }
  } else {
    document.body.classList.remove('firstAccess');
  }

  init()

  if(document.querySelector('.loading')) {
    const loading = new Loading(
      document.querySelectorAll('#loading'),
      document.querySelector('#log'),
      document.querySelector('#progress'),
      document.querySelector('#counter'),
      );
      
      await loading.init();

      loadedAnimation()
  }

});