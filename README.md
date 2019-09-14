# WaterFall

masonry layout JS Component 瀑布流排版
GitHub Pages: [https://github.com/fengshangbin/WaterFall](https://github.com/fengshangbin/WaterFall)

# 设计理念

不依赖第三方框架，也无侵入，功能全面，使用简单。

# 特点及优势

原生脚本，不依赖第三方框架  
多种排版模式，支持各种实际排版需求  
兼容 px em rem %多种宽度单位  
支持下拉到底时追加下一页视图  
使用简单

### 在线测试

[https://www.fengshangbin.com/html/waterfall/](https://www.fengshangbin.com/html/waterfall/)

# 如何使用

### 1, 引入 waterfall 脚本

```
<script src="waterfall.js"></script>
```

### 2, 构建 waterfall 实例

```
var waterFall = WaterFall.builder(container, options);
```

container 瀑布流容器  
options 配置参数  
完整默认值如下

```
{
  minWidth: null,
  columns: null,
  width: null,
  gap: null,
  minGap: null,
  itemSelector: null,
  scrollParent: window,
  loading:
    '<div class="water-fall-loading"><svg viewBox="0 0 50 50" class="loading"><defs><linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#000" stop-opacity="1.0" /><stop offset="90%" stop-color="#000" stop-opacity="0" /></linearGradient></defs><circle cx="25" cy="25" r="20" stroke-width="5" stroke="url(#linear)" fill="none" /></svg><div>'
};
```

### 3, 三种排版模式

1, 指定子项最小宽度

```
{minWidth:"300px", gap:"10px"}
```

2, 指定子项列数

```
{columns:3, gap:"10px"}
```

3, 指定子项宽度，和最小间距

```
{width:"300px", minGap:"10px"}
```

### 4， 兼容 px em rem %多种宽度单位

```
{width:"300px", minGap:"10em"}
```

```
{width:"300rem", minGap:"1%"}
```

### 5, 监听滑动到底事件

```
waterFall.addEventListener("touchbottom", function(e) {})
```

### 6, 显示隐藏 loading

```
waterFall.showLoading();
waterFall.hideLoading();
```

### 7, 更新视图

```
waterFall.update();
```

### 8, 使用示例

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>waterfall test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      #container .water-fall-item {
        border: 1px solid #f00;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script src="../dist/waterfall.js"></script>
    <script>
      var txt =
        "因遭受该男子暴打，吴巨轮面部有血迹，头部出现明显不适，随后被送往医院进行医疗。据接诊的湖南航天医院急诊科主任黄扩军介绍，吴巨轮头部软组织损伤，有脑震荡体现，需住院观察医治。横遭此祸，吴巨轮感觉很冤枉，因为按照有关规定，他实在不能在同一个站点进行二次停泊。387路公交所属的长沙众旺有限责任公司运营科科长戴勇表示，按照行业规章，在同一个站点进行二次停泊或站外停靠都是违纪行为，因为这样会影响其他公交车进出站和一般车辆的通畅。针对年轻男子的打人行为，该公司选择了报警。20日，岳麓公安分局公布通知称，11月18日上午，一男子在搭乘387路公交时，因不满司机的服务态度，置车上乘客的性命于不顾，在车辆行进过程中暴打公交司机吴某，随后逃离现场。接到报警后，岳麓公安分局观沙岭派出所迅速展开初步调查，于11月20日8时将肇事男子夏某智归案。潇湘晨报记者了解到，夏某智是长沙本地人，也是公共交通行业的工作者，是一名的士司机。夏某智在警局内接受媒体采访时称，“我们上车看到司机的表情很不情愿，那个年纪大的乘客一直在跟他吵，司机说话也不好听”，“现在特别后悔，确实是自己太冲动了，没事找事似的”。现在夏某智涉案以危险方法危害公共安全犯罪被刑事拘留，案件还在进一步处理中。";
      function getTxt() {
        var len = Math.floor(Math.random() * txt.length);
        var start = Math.floor(Math.random() * (txt.length - len));
        return txt.substr(start, len);
      }
      var pageSize = 16;
      function initContent() {
        var container = document.getElementById("container");
        container.innerHTML = "";
        addPageContent();
      }
      function addPageContent() {
        for (var i = 0; i < pageSize; i++) {
          container.insertAdjacentHTML("beforeend", "<div></div>");
          var item = container.lastChild || container.lastElementChild;
          item.innerHTML = getTxt();
        }
      }
      initContent();

      var waterFall = WaterFall.builder(document.getElementById("container"), {
        minWidth: "300px",
        gap: "10px"
      });
      waterFall.addEventListener("touchbottom", function(e) {
        waterFall.showLoading();
        setTimeout(function() {
          addPageContent();
          waterFall.update();
          waterFall.hideLoading();
        }, 1000);
      });
    </script>
  </body>
</html>
```
