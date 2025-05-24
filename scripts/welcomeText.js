const texts = document.querySelectorAll('.welcome-text');
const description = document.getElementById('wlcome-description');
const descriptions = [
    "The fuselage is made of aluminum alloy with an anodized surface.",
    "A custom microcontroller board based on the RP2040 controls the robot.",
    "Our robot uses multiple fisheye and wide-angle cameras to explore its surroundings.",
    "A printed circuit board designed in a unique shape is mounted on the robot."
];
const positions = [
    { top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }, // 上
    { top: '50%', left: '10%', transform: 'translate(-50%, -50%)' }, // 右
    { top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }, // 下
    { top: '50%', left: '90%', transform: 'translate(-50%, -50%)' }  // 左
];

let currentIndex = 0;

function rotateTexts() {
    texts.forEach((text) => {
        text.classList.remove('active');
    });

    // テキストの位置を更新
    texts.forEach((text, index) => {
        const position = positions[(index + currentIndex) % positions.length];
        text.style.top = position.top;
        text.style.left = position.left;
        text.style.transform = position.transform;

        // 現在「上」にあるテキストにactiveクラスを付与
        if ((index + currentIndex) % positions.length === 0) {
            text.classList.add('active');
        }
    });

    // 説明文を更新
    description.textContent = descriptions[currentIndex];

    // インデックスを更新
    currentIndex = (currentIndex + 1) % positions.length;
}
rotateTexts();

// 5秒ごとに回転
setInterval(rotateTexts, 7000);