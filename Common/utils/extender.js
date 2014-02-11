define([], function () {
    Function.prototype.extend = function (parent) {
        var child = this;
        var realChild = child;

        if (parent != Object) {//extends nothing

            realChild = (function (child, parent) {
                return function () {
                    this.$super = parent.prototype.constructor.bind(this);
                    var ret = child.prototype.constructor.apply(this, arguments);
                    this.$super = null;
                    return ret;
                };
            })(child, parent);

            realChild.prototype = child.prototype;

            child = realChild;


            for (var func in parent.prototype) {
                if (!child.prototype[func]) {
                    (function (func, child, parent) {
                        child.prototype[func] = function () {
                            var oldMeth = this.$super;
                            this.$super = null;
                            ret = parent.prototype[func].apply(this, arguments);
                            this.$super = oldMeth;
                            return ret;
                        };

                    })(func, child, parent);
                } else {
                    (function (func, child, parent) {
                        var origFunc = child.prototype[func];
                        child.prototype[func] = function () {
                            var oldMeth = this.$super;
                            this.$super = parent.prototype[func].bind(this);
                            var ret = origFunc.apply(this, arguments);
                            this.$super = oldMeth;
                            return ret;
                        };

                    })(func, child, parent);
                }
            }
        }

        realChild.prototype.base = parent;
        if (!realChild.prototype.instanceOf) {
            realChild.prototype.instanceOf = function (other) {
                if (this instanceof other) {
                    return true;
                }
                if (this.base === other) {
                    return true;
                }
            };
        }


        return realChild;
    };


    /*


     function Parent(val1) {
     this.val1 = val1;
     this.val4 = 12;
     }

     Parent.prototype.meth1 = function (foo) {
     this.val1 = foo;
     };
     Parent.prototype.meth2 = function (foo) {
     this.val4 = foo;

     };
     Parent.prototype.meth5 = function (foo) {
     this.val4 = foo;

     };

     function Child(val1, val2) {
     this.$super(val1);
     this.val2 = val2;
     }

     Child.prototype.meth1 = function (foo, bar) {
     this.$super(foo);
     this.val2 += bar;
     };
     Child.prototype.meth3 = function (foo) {
     this.val3 = foo;
     };

     Child.prototype.meth4 = function (foo) {
     this.val3 = foo;
     this.meth5(foo * 4);
     };
     Child.prototype.meth5 = function (foo) {
     this.$super(foo * 12, 645);
     this.val6 = foo;

     };

     Child = Child.extend(Parent);

     var chi = new Child(17, 23);
     chi.meth1(12, 43);
     chi.meth2(13);
     chi.meth3(14);
     chi.meth4(15);
     chi.meth5(16);
     */


});