'use strict'
const device = {};
const userAgent = window.navigator.userAgent.toLowerCase();
const find = needle => userAgent.indexOf(needle) !== -1;

device.ios = () => device.iphone() || device.ipod() || device.ipad();
device.iphone = () => !device.windows() && find('iphone');
device.ipod = () => find('ipod');
device.ipad = () => find('ipad');
device.android = () => !device.windows() && find('android');
device.androidPhone = () => device.android() && find('mobile');
device.androidTablet = () => device.android() && !find('mobile');
device.blackberry = () => find('blackberry') || find('bb10') || find('rim');
device.blackberryPhone = () => device.blackberry() && !find('tablet');
device.blackberryTablet = () => device.blackberry() && find('tablet');
device.windows = () => find('windows');
device.windowsPhone = () => device.windows() && find('phone');
device.windowsTablet = () => device.windows() && (find('touch') && !device.windowsPhone());
device.fxos = () => (find('(mobile;') || find('(tablet;')) && find('; rv:');
device.fxosPhone = () => device.fxos() && find('mobile');
device.fxosTablet = () => device.fxos() && find('tablet');
device.meego = () => find('meego');
device.cordova = () => window.cordova && location.protocol === 'file:';
device.nodeWebkit = () => typeof window.process === 'object';
device.mobile = () => device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
device.tablet = () => device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
device.desktop = () => !device.tablet() && !device.mobile();
device.television = () => {
    let i = 0;
    const television = [
        'googletv',
        'viera',
        'smarttv',
        'internet.tv',
        'netcast',
        'nettv',
        'appletv',
        'boxee',
        'kylo',
        'roku',
        'dlnadoc',
        'roku',
        'pov_tv',
        'hbbtv',
        'ce-html'
    ];
    while (i < television.length) {
        if (find(television[i])) {
            return true;
        }
        i++;
    }
    return false;
};
device.portrait = () => (window.innerHeight / window.innerWidth) > 1;
device.landscape = () => (window.innerHeight / window.innerWidth) < 1;

const handleOrientation = () => {
    if (window.orientation === 180 || window.orientation === 0) {
        if (location.pathname === '/mobile') {
            location.pathname = '/';
        }
    }
    if (window.orientation === 90 || window.orientation === -90 ){
        if (location.pathname !== '/mobile') {
            location.pathname = '/mobile';
        }
    }
}

device.handleOrientation = () => {
    handleOrientation();
    if (window.addEventListener) {
        window.addEventListener('orientationchange', handleOrientation, false);
    } else if (window.attachEvent) {
        window.attachEvent('orientationchange', handleOrientation);
    } else {
        window.onorientationchange = handleOrientation;
    }
}

export default device;
