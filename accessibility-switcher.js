function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(name) {
    const cookies = document
        .cookie
        .split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}

const contrastItem = document.getElementById('contrast');
const fontsize1xItem = document.getElementById('fontsize1x');
const fontsize2xItem = document.getElementById('fontsize2x');
const fontsize3xItem = document.getElementById('fontsize3x');

function handleItemClick(itemId, className) {
    return() => {
        const bodyClassList = document.body.classList;
        if (itemId === 'contrast') {
            if (bodyClassList.contains(className)) {
                bodyClassList.remove(className);
            } else {
                bodyClassList.add(className);
            }
        } else if (itemId === 'fontsize1x') {
            bodyClassList.remove('fontsize2x', 'fontsize3x');
        } else if (itemId === 'fontsize2x' || itemId === 'fontsize3x') {
            bodyClassList.remove('fontsize1x', 'fontsize2x', 'fontsize3x');
            if (className) {
                bodyClassList.add(className);
            }
        }
        setCookie('accessibilityChoice', className, 365);
    };
}
contrastItem.addEventListener(
    'click',
    handleItemClick('contrast', 'contrast-mode')
);
fontsize1xItem.addEventListener('click', handleItemClick('fontsize1x', ''));
fontsize2xItem.addEventListener(
    'click',
    handleItemClick('fontsize2x', 'fontsize2x')
);
fontsize3xItem.addEventListener(
    'click',
    handleItemClick('fontsize3x', 'fontsize3x')
);

const savedAccessibilityChoice = getCookie('accessibilityChoice');
if (savedAccessibilityChoice) {
    document
        .body
        .classList
        .add(savedAccessibilityChoice);
}