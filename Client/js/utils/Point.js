function Vector(Vector) {
    if (typeof Vector == 'object') {
        this.x = Vector.x;
        this.y = Vector.y;
    } else {

        Vector = (Vector + 360) % 360;

        this.x = Math.cos(Vector * Math.PI / 180);
        this.y = Math.sin(Vector * Math.PI / 180);
    }
}


Vector.prototype.sub = function (p) {
    this.x -= p.x;
    this.y -= p.y;

};

Vector.prototype.angle = function () {
    return  Math.atan2(this.y, this.x) * 180 / Math.PI;
};

Vector.prototype.dot = function (v) {

    return this.x * v.x + this.y * v.y;
};


Vector.prototype.mul = function (p) {
    if (typeof p == 'object') {
        this.x *= p.x;
        this.y *= p.y;
    }
    else {
        this.x *= p;
        this.y *= p;

    }
};

Vector.prototype.add = function (p) {

    this.x += p.x;
    this.y += p.y;
};
