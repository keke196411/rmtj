
$.fn.dropdownList = function(option) {
    var option = $.extend({ifScroll:false,'multiple':false},option);
    var $btn = $(this).children(".btn-arrow-down");
    var $ipt = $(this).children(".form-control");
    if(option.multiple){
        $btn.on("click",function(){
            var values = [];
            var $ul = $btn.next(".select-content"),
                $body = $btn.prev(".select-body"),
                st = $ul.data("status");
            $ul.on("click","li",function(){
                $(this).toggleClass("stay")
            });
            if(!st){
                $ul.css("display", "block").data("status", "visible");
                $btn.removeClass("btn-arrow-down").addClass("btn-arrow-up");
                if(option.changeBorder){
                    $ipt.removeClass("withoutBorder")
                }
            }
            else{
                if(option.changeBorder){
                    $ipt.addClass("withoutBorder")
                };
                $ul.children("li").each(function(){
                    if($(this).hasClass("stay")) {
                        values.push($(this).text());
                        $(this).removeClass("stay")
                    }
                }).end().css("display", "none").data("status", false);
                $btn.removeClass("btn-arrow-up").addClass("btn-arrow-down");
                $body.val(values);
            };
            option.ifScroll && $that.parents(".nano").first().nanoScroller();
        })
    }else{
        $btn.on("click",function(){
            var $ul = $btn.next(".select-content"),
                $body = $btn.prev(".select-body"),
                st = $ul.data("status");
            $(".select-content").css("display", "none");
            if (!st) {
                $ul.css("display", "block").data("status", "visible");
                $btn.removeClass("btn-arrow-down").addClass("btn-arrow-up");
                if(option.changeBorder){
                    $ipt.removeClass("withoutBorder")
                }
            }
            else {
                if(option.changeBorder){
                    $ipt.addClass("withoutBorder")
                };
                $ul.css("display", "none").data("status", false);
                $btn.removeClass("btn-arrow-up").addClass("btn-arrow-down");
            };
            option.ifScroll && $btn.parents(".nano").first().nanoScroller();
            var $root = document.all?$("body"):$(window);
            setTimeout(function () {
                $root.one("click", function (event) {
                    var $target = $(event.target);
                    var $options = $ul.find("li");
                    if ($target.is($options)) {
                        $target.siblings().removeClass("selected").end().addClass("selected");
                        $body.val($target.text());
                    } else if ($target.is($btn)) return;
                    $ul.css("display", "none").data("status", false);
                    $btn.removeClass("btn-arrow-up").addClass("btn-arrow-down");
                    if(option.changeBorder){
                        $ipt.addClass("withoutBorder")
                    };
                    option.ifScroll && $btn.parents(".nano").nanoScroller();
                })
            }, 0)
        })
    }
};

function sortObject(target,type){
	if(type=="asc"){
		return target.sort((a,b)=>{
			if(a.value==b.value){
				return a.name - b.name
			}else{
				return a.value - b.value
			}
		})
	}else{
		return target.sort((a,b)=>{
			if(a.value==b.value){
				return b.name - a.name
			}else{
				return b.value - a.value
			}
		})
	}
	
}

$.fn.scroller = function(liHeight,digits) {   //值,行高,位数
    let _this = this;
    function Scroller(){
        this.init = function(){
            let _ol="", _li="";
            for(var j=0;j<digits;j++){
                for(var i=0;i<10;i++){
                    _li+="<li>"+i+"</li>"
                };
                _ol+="<ol>"+_li+"</ol>";
                _li="";
            };
            $(_this).append(_ol);
            this.$scroller = $(_this).find("ol");
            this.length = this.$scroller.length
        }
        this.init()
    }
    Scroller.prototype.evaluate = function(value){
        let newValues = value.toString().split(""),
            oldValues = new Array(),
            numLength = newValues.length,
            d = this.length - numLength;
        for(var i=0;i<this.length;i++) {
          oldValues.push(parseInt(this.$scroller.eq(i).css("top").match(/\d+/g)[0])/liHeight);
        };
        for(var i=0;i<newValues.length;i++) {
          newValues[i] = parseInt(newValues[i])
        };
        if(d>=0) {
            for(var i=0;i<numLength;i++) {
                var newBit=newValues[i],
                    oldBit=oldValues[i],
                    top;
                if(oldBit){
                    if(newBit<oldBit){
                        this.$scroller.eq(i).css({"top":0});
                        top = -newBit*liHeight
                    }else if(newBit>oldBit) {
                        top = -newBit*liHeight
                    } else continue;
                }else {
                    this.$scroller.eq(i).css({"top":0});
                    top = -newBit*liHeight
                };
                this.$scroller.eq(i).animate({
                    "top": top + "px"
                },666)
            };
            for(var i=numLength;i<this.length;i++){
                this.$scroller.eq(i).css("top",liHeight);
            }
        }else return
    }
    return new Scroller()
}

$(document).on("click",".btn-back",()=>{
    window.location.href="../index.html"
}).on("click",".btn-fake",()=>{
    window.location.href="../index.html"
})