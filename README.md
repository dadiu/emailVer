# emailVer

<h3>兼容性</h3>
<p>IE7+(IE6未测，目测不行，懒得理它了#_#)</p>
<h4>目前支持：</h4>
<p>1.支持正则验证email;<br/>
	2.支持正确错误提示;<br/>
	3.支持使用回调方法</p>
<h4>待优化：</h4>
<p>1.使用鼠标上下键可以直接在下拉框中滑动</p>
<h3>线上地址</h3>
<p><a href="http://whj.fayfox.com/demo/plugIn.emailVer/" target="_blank">戳这里</a></p>
<h3>参数说明：以下参数均为可选</h3>
<pre>
list : 	//可传入需要提示的后缀邮箱地址，数组形式
reg : 	//验证邮箱的正则
errorTextGoal : //显示错误提示的地址
errorText: 		//显示提示 数组形式["错误提示的文字","正确提示的文字"]
callback : null	//回调函数
</pre>

<h3>使用方法</h3>
<strong>1. html</strong>
<pre>
&lt; div style="margin-bottom:20px;">
	&lt; p> 
		&lt; label for="inp_email">email:</label>
		&lt; span data-tips="inp_email"></span>
	&lt; /p>
	&lt; input type="text" id="inp_email" class="inp_normal"/>
&lt; /div>
</pre>
<strong>2. js</strong>
<pre>
$('#elemant').emailVer({
	list : ["qq.com","gmail.com","126.com","163.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com","sina.com"],
	reg : /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,6}){1,2})$/,
	errorTextGoal : $("span[data-tips=\"inp_email\"]"),
	errorText:"你输入的邮箱地址有误，请修改",
	callback : null	
});
</pre>