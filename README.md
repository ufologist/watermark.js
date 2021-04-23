# watermark.js

[![NPM version][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/watermark.js.svg?style=flat-square
[npm-url]: https://npmjs.org/package/watermark.js
[license-image]: https://img.shields.io/github/license/ufologist/watermark.js.svg
[license-url]: https://github.com/ufologist/watermark.js/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/watermark.js/blob/master/CHANGELOG.md

[![npm-image](https://nodei.co/npm/watermark.js.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/package/watermark.js)

## 功能

给页面打上全屏的文字水印

↓↓ 水印在这里 ↓↓

![watermark.png](https://user-images.githubusercontent.com/167221/115845474-76f5e780-a453-11eb-8741-9e780b4da4ac.png)

↑↑ 要仔细看看 ↑↑

## 选项

| 属性    | 类型 | 默认值            | 描述                               |
| --------- | ------ | -------------------- | ------------------------------------ |
| text      | string | 水印               | 水印文字, 可以通过空格增加间距 |
| fillStyle | string | rgba(0,0,0,0.05)     | 文字颜色                         |
| font      | string | 12px                 | 文字样式(同 CSS font 属性)    |
| degree    | number | -22                  | 水印文字的旋转角度(顺时针方向为正数) |
| zIndex    | number | 9999                 | 水印层的 z-index 值             |
| dom       | Node   | window.document.body | 挂载水印的 DOM 元素           |

## 示例

### npm 包

```javascript
import Watermark from 'watermark.js';

// 创建水印
var watermark = new Watermark({
    text: '水印',
});

// 更新水印
watermark.render({
    text: '新水印',
});
```

### `<script>`

```html
<script src=""></script>
<script>
// 创建水印
new Watermark({
    text: '          我是水印          你看不到我          ',
});
</script>
```

## 绘制示意图

![canvas-width-height](https://user-images.githubusercontent.com/167221/115840383-334caf00-a44e-11eb-9acd-cad08c0b657d.jpg) by [@iUUCoder](https://github.com/iUUCoder)