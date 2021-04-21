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

水印

## 示例

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