/** @type {HTMLCanvasElement} */
// var canvasWidth = 800
// var canvasHeight = 600
// 适应移动端
var canvasWidth = window.innerWidth
var canvasHeight = window.innerHeight
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
canvas.width = canvasWidth
canvas.height = canvasHeight
var image = new Image()
// 半径
var radius = 50
// 定义剪裁区域为圆形，x,y,及半径
var clippingRegion = { x: 400, y: 200, r: radius }
var leftMargin = 0, topMargin = 0
image.src = 'a3c.jpg'
image.onload = function (e) {
    // // 适应移动端
    $('#blur-div').css("width", canvasWidth + "px")
    $('#blur-div').css("height", canvasHeight + "px")
    $('#blur-image').css("width", image.width + "px")
    $('#blur-image').css("height", image.height + "px")
    leftMargin = (image.width - canvas.width) / 2
    topMargin = (image.height - canvas.height) / 2
    // 适应移动端
    $('#blur-image').css("top", "-" + topMargin + 'px')
    $('#blur-image').css("left", "-" + leftMargin + 'px')
    initCanvas()
}
// 把image图像绘制在canvas
function initCanvas () {
    // // 0到700 加50 ， 0到500 加50
    clippingRegion = { x: Math.random() * (canvas.width - 2 * radius) + radius, y: Math.random() * (canvas.height - 2 * radius) + radius, r: radius }
    draw(image, clippingRegion)
}
// 设置剪裁区域
function setClippingRegion (clippingRegion) {
    // 开始一段路径
    context.beginPath()
    // 0, Math.PI * 2 圆弧起始位置  false逆时针或顺时针
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false)
    context.clip()

}
// 绘制函数
function draw (image, clippingRegion) {
    // 每次绘制canvas前进行清空内容
    context.clearRect(0, 0, canvas.width, canvas.height)
    // 每次存储canvas当前状态
    context.save()
    setClippingRegion(clippingRegion)
    // 绘制在左上角的位置
    // context.drawImage(image, 0, 0)
    // 适应移动端
    //  原点  x，y, image,leftMargin,topMargin, canvas.width,canvas.height,
    //  原点  x，y, 0,0,canvas.width,canvas.height
    context.drawImage(image, leftMargin, topMargin, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height)
    // 每次结束后进行一次canvas状态的恢复 
    context.restore()
}

// 重置图像     
function reset () {
    initCanvas()
}
// 显示清晰图像
function show () {
    // 原理：只要让剪裁区域够大就可，600x800，大于800就行
    // clippingRegion.r = 1000
    // draw(image, clippingRegion)
    // 开启动画
    var theAnimation = setInterval(
        function () {
            console.log('Animation');
            clippingRegion.r += 20
            // 取canvas中宽和高的最大值
            if (clippingRegion.r > 1000) {
                // 清除动画
                clearInterval(theAnimation)
            }
            draw(image, clippingRegion)
        },
        30
    );
}
