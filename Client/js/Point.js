function DVec2(point) {
    this.x = point.x;
    this.y = point.y;
}

DVec2.prototype.sub = function (p) {
    this.x -= p.x;
    this.y -= p.y;

}

DVec2.prototype.dot = function (v) {

    return this.x * v.x + this.y * v.y;
}

DVec2.prototype.mul = function (p) {

    this.x *= p.x;
    this.y *= p.y;
}

DVec2.prototype.mul = function (p) {
    if (typeof p == 'object') {
        this.x *= p.x;
        this.y *= p.y;
    }
    else {
        this.x *= p;
        this.y *= p;

    }
}

DVec2.prototype.add = function (p) {

    this.x += p.x;
    this.y += p.y;
}

