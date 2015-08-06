/******
维护：吴海晶(451404370@qq.com)

使用方法
$('#elemant').emailVer({
	list : ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"],
	reg : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,6}){1,2})$/,
	errorTextGoal : $("span[data-tips=\"inp_email\"]"),
	errorText:"你输入的邮箱地址有误，请修改",
	callback : null	
});

参数说明：以下参数均为可选
list : 	//可传入需要提示的后缀邮箱地址，数组形式
reg : 	//验证邮箱的正则
errorTextGoal : //显示错误提示的地址
errorText: 		//显示提示 数组形式["错误提示的文字","正确提示的文字"]
callback : null	//回调函数
******/

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

					//输入框的状态
					domName.keyup(function(){

						var thisV = $(this).val();

						_t.showList(thisV);

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


					}).focus(function(){						

						if(options.errorTextGoal){
							domName.removeClass("bc_red");
							options.errorTextGoal.html("");
						};

						var thisV = $(this).val();
						_t.showList(thisV);

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
				showList:function(thisV){
					var _t = this;

					if(thisV.length > 0){
						var DOM = _t.listDOM(thisV);
						if(DOM.length > 0){
							objs.list.html("<ul>" + DOM + "</ul>").slideDown("fast");

						} else{
							objs.list.hide();
						}
					} else{
						objs.list.hide();
					};
				}


			}
			
		};

		dfunc.C.init();
	};


})(jQuery);