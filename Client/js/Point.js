function Point(point) {
    if (typeof point == 'object') {
        this.x = point.x;
        this.y = point.y;
    } else {
        this.x = Math.cos(point * Math.PI / 180);
        this.y = Math.sin(point * Math.PI / 180);
    }
}


Point.prototype.sub = function (p) {
    this.x -= p.x;
    this.y -= p.y;

};

Point.prototype.angle = function () {
    return  Math.atan2(this.y, this.x)*180/Math.PI;
};

Point.prototype.dot = function (v) {

    return this.x * v.x + this.y * v.y;
};


Point.prototype.mul = function (p) {
    if (typeof p == 'object') {
        this.x *= p.x;
        this.y *= p.y;
    }
    else {
        this.x *= p;
        this.y *= p;

    }
};

Point.prototype.add = function (p) {

    this.x += p.x;
    this.y += p.y;
};

function reflect(vector1, vector2) {
    var n=new Point(vector2);

//    Vnew = -2*(V dot N)*N + V

//    return vector +dot * normal;

    var dot = -2*vector1.dot(n);


    n.mul(dot);
    n.add(vector1);
    return n;

/*
    var reflection = new Point({
        x: vector1.x - ((2 * dot) * vector2.x),
        y: vector1.y - ((2 * dot) * vector2.y)
    })
    return reflection;*/
}
