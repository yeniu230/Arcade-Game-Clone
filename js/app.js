// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    //敌人超出屏幕停止渲染
    if (this.x < 600) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    //敌人超出屏幕后重置位置（位置随机）
    if (this.x >= 600) {
        this.x = position[randomNum(4)];
        this.y = 83*row[randomNum(3)]+55;
        this.speed = speed[randomNum(4)];
    }
    this.checkCollision(player);
};

Enemy.prototype.checkCollision = function(player) {
    //碰撞后回到随机起点
    if(this.y == player.y && this.x <= player.x + 30 && this.x >= player.x - 55) {
        playerPositin();
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};
//通过键盘移动人物
Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'left':
            if(this.x > 0) this.x += -101; break;
        case 'right':
            if(this.x < 404) this.x += 101; break;
        case 'up':
            if(this.y > 50) this.y += -83; break;
        case 'down':
            if(this.y < 387) this.y += 83; break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(this.y < 50) {
        playerPositin();
    }
};

//建立敌人起始x,y,速度集合
var position = [-60, -100, -200, -550],
    row = [0, 1, 2],
    speed = [80, 120, 200, 260],
    randomNum = function(n) {
        let number = Math.floor(Math.random()*n);
        return number;
    };//随机数
    // 现在实例化你的所有对象
    // 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
    // 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var player = new Player(202,83*4+55);
//初始化玩家位置
var playerPositin = function (){
    player.x = 0+101*randomNum(5);
    player.y = 83*4+55;
}

//随机位置和速度创建敌人（个数可调节）
for(let i = 0; i < 6; i++) {
    allEnemies.push(new Enemy(position[randomNum(4)], 83*row[randomNum(3)]+55, speed[randomNum(4)]));
};
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
