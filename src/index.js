(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Watermark = factory();
    }
}(typeof self !== 'undefined' ? self : this, function() {

/**
 * 水印
 * 
 * @param {object} [options]
 * @param {string} [options.text] 水印文字, 可以通过空格增加间距
 * @param {string} [options.font] 文字样式(同 css font 属性)
 * @param {string} [options.fillStyle] 文字颜色
 * @param {string} [options.degree] 水印旋转角度(顺时针方向)
 * @param {Node} [options.dom] 挂载水印的 DOM 元素
 * @param {string} [options.zIndex] 水印层的 z-index 值
 * 
 * @see <a href="https://github.com/ant-design/pro-components/blob/master/packages/layout/src/components/WaterMark/index.tsx">ant-design/pro-components/WaterMark</a>
 */
function Watermark(options) {
    this._el;
    this._canvas = document.createElement('canvas');
    this._context = this._canvas.getContext('2d');

    this.render(options);
}
Watermark.prototype.render = function(options) {
    this._initOptions(options);
    this._initElement();
    this._draw();
    this._mount();
};
Watermark.prototype._initOptions = function(options) {
    this._options = options || {};
    this._options.text = this._options.text || '          水印          ';
    this._options.font = this._options.font || '12px -apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif';
    this._options.fillStyle = this._options.fillStyle || 'rgba(0,0,0,0.1)';
    this._options.degree = this._options.degree || -22;
    this._options.dom = this._options.dom || window.document.body;
    this._options.zIndex = this._options.zIndex || 9999;
};
Watermark.prototype._initElement = function() {
    if (this.el) {
        this.el.parentNode && this.el.parentNode.removeChild(this.el);
    }

    var el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.top = 0;
    el.style.right = 0;
    el.style.bottom = 0;
    el.style.left = 0;
    el.style.pointerEvents = 'none';
    el.style.zIndex = this._options.zIndex;
    el.style.backgroundRepeat = 'repeat';

    this.el = el;
};
Watermark.prototype._initCanvas = function() {
    // 测量文字宽高
    this._context.font = this._options.font;
    var textWidth = this._context.measureText(this._options.text).width;
    var textHeight = this._getTextHeight(this._options.text, this._options.font);
    var halfHeight = textHeight / 2;

    // 计算画布的宽高刚好放得下文字内容
    var result = this._getRightAngledTriangleLength(textWidth, Math.abs(this._options.degree));
    this._canvas.width = result.adjacent + textHeight;
    this._canvas.height = result.opposite + textHeight + halfHeight;

    // 设置文字样式
    this._context.font = this._options.font;
    this._context.fillStyle = this._options.fillStyle;

    // 调整画布(移动到画布最底下, 偏移 1/2 行高避免文字被遮挡)
    this._context.translate(halfHeight, this._canvas.height - halfHeight);
    this._context.rotate(this._options.degree * Math.PI / 180);
};
/**
 * 根据斜边长度和角度获取直角三角形对边和邻边的长度
 * 
 * 直角三角形对边比邻边是（正切）。
 * 直角三角形一个角的对边（不组成这个角的另外一个直角三角形边）叫对边，构成这个角的两个边叫邻边。
 * 
 * 在直角三角形中，当平面上的三点A、B、C的连线，AB、AC、BC，构成一个直角三角形，其中∠ACB为直角。
 * 对∠BAC而言，对边（opposite）a=BC、斜边（hypotenuse）c=AB、邻边（adjacent）b=AC，则存在以下关系：
 * 
 * ∠A的对边比斜边=sinA=a/c（即正弦）
 * ∠A的邻边比斜边=cosA=b/c（即余弦）
 * ∠A的对边比邻边=tanA=a/b（即正切）
 * ∠A的邻边比对比=cotA=b/a（即余切）
 * 
 * @param {number} hypotenuse 斜边长度
 * @param {number} degree 角度
 * @see https://zhidao.baidu.com/question/808006945738104972.html
 */
Watermark.prototype._getRightAngledTriangleLength = function(hypotenuse, degree) {
    // 角度转弧度
    var radian = degree * (2 * Math.PI / 360);
    return {
        /**
         * 对边
         */
        opposite: Math.sin(radian) * hypotenuse,
        /**
         * 邻边
         */
        adjacent: Math.cos(radian) * hypotenuse,
    };
};
/**
 * 获取文本的高度
 * 
 * @param {string} text
 * @param {string} font
 * @return {number}
 */
Watermark.prototype._getTextHeight = function(text, font) {
    var span = document.createElement('span');
    span.style.font = font;
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.appendChild(document.createTextNode(text));

    document.body.appendChild(span);
    var textHeight = parseInt(getComputedStyle(span).height);
    document.body.removeChild(span);

    return textHeight;
};
Watermark.prototype._draw = function() {
    this._initCanvas();
    this._context.fillText(this._options.text, 0, 0);
};
Watermark.prototype._mount = function() {
    this.el.style.backgroundImage = 'url(' + this._canvas.toDataURL() + ')';
    this._options.dom.appendChild(this.el);
};

return Watermark;

}));