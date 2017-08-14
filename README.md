# emailVer

### 优化
20160226-优化失焦功能。
20160225-优化keyup键，出现不属于列表提示内邮箱后缀时，显示输入的内容。


### 兼容性
IE7+(IE6未测)


#### 目前支持：
1. 支持正则验证email;
2. 支持正确错误提示;
3. 支持使用回调方法；

### 线上地址
<a href="http://whj.fayfox.com/demo/plugIn.emailVer/" target="_blank">戳这里</a>


### 参数说明：以下参数均为可选


	list : 			//可传入需要提示的后缀邮箱地址，数组形式
	reg : 			//验证邮箱的正则
	errorTextGoal :		//显示错误提示的地址
	errorText: 		//显示提示 数组形式["错误提示的文字","正确提示的文字"]
	callback : null		//回调函数


### 使用方法
1. html


		<div style="margin-bottom:20px;">
			<p> 
				<label for="inp_email">email:</label>
				<span data-tips="inp_email"></span>
			</p>
			<input type="text" id="inp_email" class="inp_normal"/>
		</div>



2. js

		$('#elemant').emailVer({
			list : ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"],
			reg : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,6}){1,2})$/,
			errorTextGoal : $("span[data-tips=\"inp_email\"]"),
			errorText:["你输入的邮箱地址有误，请修改","&radic;"],
			callback : null	
		});

