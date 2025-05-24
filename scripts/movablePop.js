document.querySelectorAll('.movable-pop').forEach(pop => {
    // 初期位置をstyle属性またはdata属性から設定
    if (pop.dataset.initTop) pop.style.top = pop.dataset.initTop;
    if (pop.dataset.initLeft) pop.style.left = pop.dataset.initLeft;

    let offsetX, offsetY, dragging = false;

    // 閉じるボタン
    pop.querySelector('.pop-close-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();  
        pop.style.display = 'none';
    });

    // PCドラッグ
    pop.addEventListener('mousedown', function(e) {
        dragging = true;
        offsetX = e.clientX - pop.offsetLeft;
        offsetY = e.clientY - pop.offsetTop;
        pop.style.cursor = 'grabbing';

        // ドラッグ中のポップだけmousemove/upを監視
        function onMouseMove(e) {
            if (dragging) {
                pop.style.left = (e.clientX - offsetX) + 'px';
                pop.style.top = (e.clientY - offsetY) + 'px';
            }
        }
        function onMouseUp() {
            dragging = false;
            pop.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // スマホタッチ
    pop.addEventListener('touchstart', function(e) {
        dragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - pop.offsetLeft;
        offsetY = touch.clientY - pop.offsetTop;

        function onTouchMove(e) {
            if (dragging) {
                const touch = e.touches[0];
                pop.style.left = (touch.clientX - offsetX) + 'px';
                pop.style.top = (touch.clientY - offsetY) + 'px';
            }
        }
        function onTouchEnd() {
            dragging = false;
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
        document.addEventListener('touchmove', onTouchMove, {passive: false});
        document.addEventListener('touchend', onTouchEnd);
    });
});

document.querySelectorAll('.movable-pop-link').forEach(link => {
    let dragMoved = false;
    const pop = link.querySelector('.movable-pop');

    // ドラッグ開始時
    pop.addEventListener('mousedown', () => { dragMoved = false; });
    pop.addEventListener('mousemove', () => { dragMoved = true; });
    pop.addEventListener('mouseup', () => { setTimeout(() => { dragMoved = false; }, 100); });

    // タッチ対応
    pop.addEventListener('touchstart', () => { dragMoved = false; });
    pop.addEventListener('touchmove', () => { dragMoved = true; });
    pop.addEventListener('touchend', () => { setTimeout(() => { dragMoved = false; }, 100); });

    // クリック時にドラッグしていたらリンク遷移を防ぐ
    link.addEventListener('click', function(e) {
        if (dragMoved) {
            e.preventDefault();
        }
    });
});