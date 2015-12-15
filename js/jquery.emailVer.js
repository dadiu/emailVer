/**
 * @url     https://github.com/dadiu/emailVer
 * @data    2015.12.15
 * @author  wuhaijing
 * @mail    1004609378@qq.com
 * @version V1.0.0
 */
/********************* 传参说明 *********************/
/**
 * 以下均为可选参数
 * list : arr				//可传入需要提示的后缀邮箱地址，数组形式
 * reg : regExp				//验证邮箱的正则
 * errorTextGoal : string	//显示错误提示的位置
 * errorText ： arr			//显示提示 数组形式["错误提示的文字","正确提示的文字"]
 * call ：function			//回调方法			默认null
 */
/******************** 开始 ********************/
(function($){

	$.fn.emailVer = function(options){

		var defaults = {
			list : ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"],
			reg : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,6}){1,2})$/,
			errorTextGoal : $("span[data-tips=\"inp_email\"]"),
			errorText:["你输入的邮箱地址有误，请修改","&radic;"],
			callback : null
		},

		options = $.extend(defaults, options),

		objs = {
			bar : $("<div>").addClass("m_emailVer"),
			list : $("<div>").addClass("m_emailVer_list")

		},

		domName = this,
		
		dfunc = {

			V : function(){

				objs.bar.append(objs.list);
				domName.parent().append(objs.bar);
				domName.addClass("m_emailVer_value");
				objs.bar.append(domName);

				objs.list.css({"top" : objs.bar.css("height")});
			},

			C : {

				init : function(){
					var _t = this;

					dfunc.V();
					document.onkeydown=_t.isKey;

					//输入框的状态
					domName.keyup(function(event){
						var thisV = $(this).val();
						if(thisV.indexOf("@")>-1){
							_t.showList(event, thisV);
							return false;
						};
						objs.list.hide();
						
					}).blur(function(){
						var thisV = $(this).val();
						//console.log(objs.list.is(":visible"));

						if(objs.list.is(":visible")){
							return false;
						};

						if(!options.reg.test(thisV)&&options.errorTextGoal){
							options.errorTextGoal.html(options.errorText[0]);
							domName.addClass("bc_red");
							return false;
						};

						if(options.reg.test(thisV)&&options.errorTextGoal){
							options.errorTextGoal.html(options.errorText[1]);
							domName.removeClass("bc_red");
							return false;
						};

					}).focus(function(event){						

						if(options.errorTextGoal){
							domName.removeClass("bc_red");
							options.errorTextGoal.html("");
						};

						var thisV = $(this).val();
						_t.showList(event, thisV);

					}).click(function(){
						return false;
					});

					//提示的后缀
					objs.list.delegate("li", "click", function(){
						domName.val($(this).attr("data-val"));
						objs.list.hide();
					});


					$("body").click(function(){
						objs.list.hide();
						domName.blur();
					});

					if(options.callback){
						options.callback();
					};
				},

				//键盘事件
				isKey : function(event){
					var listLen = objs.list.find("li").length,
						FIRST = objs.list.find("li:eq(0)"),
						END = objs.list.find("li:eq("+(listLen-1)+")"),
						ACTIVE = objs.list.find(".fn_emailActive");
					
						//console.log(listLen);
						//console.log(END.html());
						//console.log(ACTIVE.html());
					if(listLen>0){//判断是否存在
						if (event.keyCode==38){//上
							isKeyUp();
						};

						if (event.keyCode==40){//下
							isKeyDown();
						};

						if(event.keyCode==13){
							isKeyEnter();
						}
					};

					function isKeyUp(){

						if(ACTIVE.html().indexOf(FIRST.html()) > -1){
							ACTIVE = END;
						} else{
							ACTIVE = ACTIVE.prev();
						};
						ACTIVE.addClass("fn_emailActive").siblings().removeClass("fn_emailActive");
						//console.log("up");
						return false;
					};

					function isKeyDown(){
						if(ACTIVE.html().indexOf(END.html()) > -1){
							ACTIVE = FIRST;
						} else{
							ACTIVE = ACTIVE.next();
						};
						ACTIVE.addClass("fn_emailActive").siblings().removeClass("fn_emailActive");
						return false;
					};

					function isKeyEnter(isKeyEnter){
						//如果有提示在
						if(listLen>0){
							domName.val(ACTIVE.html());
							objs.list.hide();
							return false;
						}
					};
				},

				//遍历email地址
				listDOM : function(thisV){

					var i = 0, len = options.list.length, dataVal = "", DOM = "";

					if(thisV.indexOf("@") > 0){

						var dataValArr = thisV.split("@");
						for(; i < len; i++){
							if(options.list[i].indexOf(dataValArr[1]) == 0){
								dataVal = dataValArr[0] + "@" + options.list[i];
								DOM += "<li data-val=\"" + dataVal + "\">" + dataVal + "</li>";
							}
						}

					} else {
						for(; i < len; i++){
							dataVal = thisV + "@" + options.list[i];
							DOM += "<li data-val=\"" + dataVal + "\">" + dataVal + "</li>";
						};
						
					}
					return DOM;
				},

				//显示邮箱后缀列表
				//thisV = 内容长度
				showList:function(event, thisV){
					var _t = this;

					if(thisV.length > 0){
						
						if(event.keyCode==38 || event.keyCode==40 || event.keyCode==13){
							return false;
						};

						var DOM = _t.listDOM(thisV);
						if(DOM.length > 0){
							objs.list.html("<ul>" + DOM + "</ul>").slideDown("fast");
							objs.list.find("li:eq(0)").addClass("fn_emailActive").siblings().removeClass("fn_emailActive");
						};
						return false;
					};
					objs.list.hide();
					
				}


			}
			
		};

		dfunc.C.init();
	};


})(jQuery);