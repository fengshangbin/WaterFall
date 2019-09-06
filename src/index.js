import { extend, C3Event, C3EventDispatcher } from './utils';

var _config = {
  minWidth: null,
  columns: null,
  width: null,
  gap: null,
  minGap: null,
  itemSelector: null,
  scrollParent: window
};
//宽度单位支持 px % rem em
/* 
三种配置模式
1, {minWidth:300px, gap:10px}
2, {columns:3, gap:10px}
3, {width:300px, minGap:10px} 
*/
export default function WaterFall(container, options) {
  C3EventDispatcher.call(this);
  var config = extend(_config, options);
  var scrollParent = config.scrollParent;
  function getPixel(value, contaierWidth, rootFontSize, contaierFontSize) {
    if (value == null) return 0;
    var group = /(^\d+(\.\d+)?)px$/i.exec(value);
    if (group) {
      return parseFloat(group[1]);
    }
    group = /(^\d+(\.\d+)?)%$/.exec(value);
    if (group) {
      return (contaierWidth * parseFloat(group[1])) / 100;
    }
    group = /(^\d+(\.\d+)?)rem$/i.exec(value);
    if (group) {
      return rootFontSize * parseFloat(group[1]);
    }
    group = /(^\d+(\.\d+)?)em$/i.exec(value);
    if (group) {
      return contaierFontSize * parseFloat(group[1]);
    }
    return parseFloat(value) == NaN ? 0 : parseFloat(value);
  }

  this.update = function() {
    var contaierWidth = container.innerHeight || container.clientWidth;
    var rootFontSize = getComputedStyle(document.documentElement)['font-size'];
    var contaierFontSize = getComputedStyle(container)['font-size'];
    var childrens = config.itemSelector ? container.querySelectorAll(config.itemSelector) : container.children;
    var columns = 0;
    var gap = 0;
    var vGap = 0;
    var itemWidth = 0;
    if (config.columns != null) {
      columns = config.columns;
      gap = getLocalPixel(config.gap);
      vGap = gap;
      itemWidth = (contaierWidth - gap * (columns - 1)) / columns;
    } else if (config.minWidth != null) {
      gap = getLocalPixel(config.gap);
      vGap = gap;
      columns = Math.floor((container + gap) / (getLocalPixel(config.minWidth) + gap));
      itemWidth = (contaierWidth - gap * (columns - 1)) / columns;
    } else if (config.width != null) {
      itemWidth = getLocalPixel(config.width);
      var minGap = getLocalPixel(config.minGap);
      vGap = minGap;
      columns = Math.floor((contaierWidth + minGap) / (itemWidth + minGap));
      gap = (contaierWidth - itemWidth * columns) / (columns - 1);
    }
    var arr = [];
    for (var i = 0; i < columns.length; i++) {
      arr.push({
        top: 0,
        col: i
      });
    }
    for (var i = 0; i < childrens.length; i++) {
      var item = childrens[i];
      arr.sort(function(a, b) {
        if (a.top > b.top) return 1;
        else if (a.top < b.top) return -1;
        else return 0;
      });
      var left = arr[0].col * (itemWidth + gap) - gap;
      var top = arr[0].top;
      item.style.transform = 'translate(' + left + ',' + top + ')';
      arr[0].top += item.offsetHeight + vGap;
      if (arr[0].top >= arr[columns.length - 1].top) container.style.height = arr[0].top;
    }
    function getLocalPixel(value) {
      return getPixel(value, contaierWidth, rootFontSize, contaierFontSize);
    }
  };

  container.addEventListener('resize', function() {
    this.update();
  });
}
(function() {
  var Super = function() {};
  Super.prototype = C3EventDispatcher.prototype;
  WaterFall.prototype = new Super();
})();
