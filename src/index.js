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
 * @param {string} [options.fillStyle] 文字颜色
 * @param {string} [options.font] 文字样式(同 CSS font 属性)
 * @param {number} [options.degree] 水印文字的旋转角度(顺时针方向为正数)
 * @param {number} [options.zIndex] 水印层的 z-index 值
 * @param {Node} [options.dom] 挂载水印的 DOM 元素
 * 
 * @see <a href="https://github.com/ant-design/pro-components/blob/master/packages/layout/src/components/WaterMark/index.tsx">ant-design/pro-components/WaterMark</a>
 * @see <a href="https://mp.weixin.qq.com/s/r3YxTiblMErCxq5W_GmXVQ">谈谈前端水印</a>
 */
function Watermark(options) {
    this._options;
    this._el;
    this._canvas = window.document.createElement('canvas');
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
    this._options.fillStyle = this._options.fillStyle || 'rgba(0,0,0,0.05)';
    this._options.font = this._options.font || '12px -apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif';
    this._options.degree = this._options.degree || -22;
    this._options.zIndex = this._options.zIndex || 9999;
    this._options.dom = this._options.dom || window.document.body;
};
Watermark.prototype._initElement = function() {
    if (this._el) {
        this._el.parentNode && this._el.parentNode.removeChild(this._el);
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

    this._el = el;
};
Watermark.prototype._initCanvas = function() {
    // 测量文字宽高
    this._context.font = this._options.font;
    var textWidth = this._context.measureText(this._options.text).width;
    var textHeight = this._getTextHeight(this._options.text, this._options.font);

    // 计算画布尺寸(根据三角形的对边和邻边长度)
    // 示意图片: https://user-images.githubusercontent.com/167221/115840383-334caf00-a44e-11eb-9acd-cad08c0b657d.jpg
    var radian = this._degreeToRadian(this._options.degree);
    var bigTriangle = this._getRightAngledTriangleLength(textWidth, radian);
    var smallTriangle = this._getRightAngledTriangleLength(textHeight, radian);
    this._canvas.width = smallTriangle.opposite + bigTriangle.adjacent;
    this._canvas.height = bigTriangle.opposite + smallTriangle.adjacent;

    // 设置文字样式
    this._context.font = this._options.font;
    this._context.fillStyle = this._options.fillStyle;
    this._context.textBaseline = 'middle';
    this._context.textAlign = 'center';

    // 偏移画布坐标系从顶点到画布中心
    this._context.translate(this._canvas.width / 2, this._canvas.height / 2)
    // 以画布坐标系顶点旋转画布
    this._context.rotate(radian);
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
 * @param {number} radian 弧度
 * @see https://zhidao.baidu.com/question/808006945738104972.html
 */
Watermark.prototype._getRightAngledTriangleLength = function(hypotenuse, radian) {
    return {
        /**
         * 对边
         */
        opposite: Math.abs(Math.sin(radian)) * hypotenuse,
        /**
         * 邻边
         */
        adjacent: Math.abs(Math.cos(radian)) * hypotenuse,
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
/**
 * 角度转弧度
 * 
 * @param {number} degree 
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate">CanvasRenderingContext2D.rotate</a>
 */
Watermark.prototype._degreeToRadian = function(degree) {
    return degree * Math.PI / 180;
};
Watermark.prototype._draw = function() {
    this._initCanvas();
    this._context.fillText(this._options.text, 0, 0);
};
Watermark.prototype._mount = function() {
    this._el.style.backgroundImage = 'url(' + this._canvas.toDataURL() + ')';
    this._options.dom.appendChild(this._el);
};

return Watermark;

}));