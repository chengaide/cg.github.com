window.Pcontrols = (function () {
    var mobilePopup = function () {
        if (!(this instanceof mobilePopup)) {
            //防止没有使用new调用此函数时污染全局环境
            return new mobilePopup();
        }
    }
    mobilePopup.prototype = {
        init: function (params) {
            this.params = params || {};
            this.gearArea;
            this.startX;
            this.startY;
            this.endX;
            this.endY;
            this.transformY = 60;
            this.value;
            this.trigger = document.querySelector(params.trigger);
            this.target = document.querySelector(params.target);
            this.data = params.data || [];
            this.bindEvent();
        },
        bindEvent: function () {
            console.log(this);
            var _self = this;
            var popupArea = function (e) {
                _self.gearArea = document.createElement("div");
                _self.gearArea.innerHTML = '<div class="mask"></div>' +
                    '<div class="popup">' +
                    '<div class="popupbutton"><div class="cancel">取消</div><div class="sure">确定</div><div class="clear"></div></div>' +
                    '<div class="picker"><div class="picker-mask"></div>' +
                    '<div class="popup-items">' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                document.body.appendChild(_self.gearArea);
                var popup_items = _self.gearArea.querySelector(".popup-items");
                //var transformY = popup_items.style["-webkit-transform"].split(',')[1];
                popup_items.style["-webkit-transform"] = 'translate3d(0,' + parseInt(_self.transformY) + 'px,0)';
                areaCtrlInit();
                var popup_item = _self.gearArea.querySelectorAll(".popup-item")[0];
                popup_item.classList.add("popup-item-action");
                _self.value = popup_item.innerHTML;
                var cancel = _self.gearArea.querySelector(".cancel");
                var sure = _self.gearArea.querySelector(".sure");
                var picker = _self.gearArea.querySelector(".picker");
                cancel.addEventListener('touchstart', function (e) {
                    _self.closePop(e);
                });
                sure.addEventListener('touchstart', function (e) {
                    _self.sureResult(e);
                });
                picker.addEventListener('touchstart', getTouchStart);
                picker.addEventListener('touchmove', getTouchMove);
                picker.addEventListener('touchend', getTouchEnd);
            };
            _self.trigger.addEventListener('click', popupArea);
            function areaCtrlInit() {
                var popupitems = document.querySelector(".popup-items");
                var l = _self.data.length;
                var item = '';
                for (var i = 0; i < l; i++) {
                    item += '<div class="popup-item">' + _self.data[i] + '</div>'
                }
                popupitems.innerHTML = item;
            }
            //触摸开始
            function getTouchStart(e) {
                e.preventDefault();
                
                var target = e.target;
                var touch = e.targetTouches[0];
                _self.startX = touch.pageX;
                _self.startY = touch.pageY;
                //console.log(_self.transformY);
                var popup_items = _self.gearArea.querySelector(".popup-items");
                popup_items.classList.remove("popend");
                _self.transformY = popup_items.style["-webkit-transform"].split(',')[1];
                console.log(parseInt(_self.transformY));
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            }
            function getTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                var touch = e.targetTouches[0];
                _self.endX = touch.pageX;
                _self.endY = touch.pageY;
                var num = _self.endY - _self.startY;
                var popup_items = _self.gearArea.querySelector(".popup-items");
                //var transformY = popup_items.style["-webkit-transform"].split(',')[1];
                //console.log(parseInt(_self.transformY)+num);
                //console.log(typeof num);
                var movenum = parseInt(_self.transformY) + num;
                popup_items.style["-webkit-transform"] = 'translate3d(0,' + movenum + 'px,0)';

            }
            function getTouchEnd(e) {
                e.preventDefault();

                if (_self.endY) {
                    var numend = _self.endY - _self.startY;
                    var movenumend = parseInt(_self.transformY) + numend;
                    //console.log("movenumend"+movenumend,numend);
                    var popup_items = _self.gearArea.querySelector(".popup-items");
                    var round = Math.round((60 - movenumend) / 30);
                    var length = _self.data.length;
                    var trans = Math.round(movenumend / 30) * 30;
                    if (movenumend > 60) {
                        round = 0;
                        trans = 60;
                    }
                    if (movenumend < ((length - 3) * (-30))) {
                        round = length - 1;
                        trans = (length - 3) * (-30);
                    }
                    popup_items.classList.add("popend");
                    popup_items.style["-webkit-transform"] = 'translate3d(0,' + trans + 'px,0)';
                    var popup_item = _self.gearArea.querySelectorAll(".popup-item")[round];
                    popup_item.classList.add("popup-item-action");
                    _self.value = popup_item.innerHTML;
                    console.log(_self.value);
                }

            }
        },
        closePop: function (e) {
            var _self = this;
            e.preventDefault();
            _self.transformY = 60;
            document.body.removeChild(_self.gearArea)
        },
        sureResult: function (e) {
            var _self = this;
            e.preventDefault();
            _self.target.innerHTML = _self.value;
            document.body.removeChild(_self.gearArea)
        }
    }

    return mobilePopup
})()
