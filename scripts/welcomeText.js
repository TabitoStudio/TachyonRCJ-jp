const texts = document.querySelectorAll('.welcome-text');
            const description = document.getElementById('wlcome-description');
            const descriptions = [
                "The fuselage is made of aluminum alloy, the surface of which is anodized.",
                "A printed circuit board designed in a unique shape is mounted on the robot.",
                "Search all around the robot using multiple cameras, fisheye lenses, and wide-angle lenses",
                "A proprietary microcontroller board using RP2040 controls the robot."
            ];
            
            let currentIndex = 0;
            
            function updateText() {
                // 全てのテキストをリセット
                texts.forEach((text, index) => {
                    text.classList.remove('active');
                });
                texts[currentIndex].classList.add('active');
                description.textContent = descriptions[currentIndex];
                currentIndex = (currentIndex + 1) % texts.length;
            }
            
            // 5秒ごとに更新
            setInterval(updateText, 8000);
            
            // 初期化
            updateText();