# CHANGELOG

* v1.0.1 2025-6-30

  * fix: 由于元素高度获取不到导致水印没有绘制出来
  
    在 iOS 16.1.1 测试时 getComputedStyle(span).height 获取到的值为 'auto'
    导致 textHeight 得出 NaN, 进而无法绘制出水印
    因此读取一下布局属性(如 offsetHeight、offsetWidth、clientHeight、clientWidth 等)
    强制浏览器计算当前布局, 让 getComputedStyle(span).height 获取到正确值

* v1.0.0 2021-4-23

  * 初始版本
