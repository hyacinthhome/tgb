var e1,e2,e3,e4,e5,e6,e7,e8,e9,e10=0;
$(function() {
	$("#un").append($.session.get('user_username'));
	// alert($.session.get('user_username'));
	// 这个session是可用的
	//实时动态时间
	setInterval("showTime()", 500);
	// 侧边栏的hover管理
	$("#list_vocher").hover(
		function() {
			$("#slider_vocher").css("display", "block")
		},
		function() {
			$("#slider_vocher").css("display", "none")
		},
		function() {}
	)
	$("#list_receive").hover(
		function() {
			$("#slider_receive").css("display", "block")
		},
		function() {
			$("#slider_receive").css("display", "none")
		},
	)
	$("#list_subject").hover(
		function() {
			$("#slider_subject").css("display", "block")
		},
		function() {
			$("#slider_subject").css("display", "none")
		},
	)
	$("#list_personal").hover(
		function() {
			$("#slider_personal").css("display", "block")
		},
		function() {
			$("#slider_personal").css("display", "none")
		},
	)

	$("#go_vocher_record").click(function() {
		$("#side_vocher_record").click();
	})

	$("#go_vocher_do").click(function() {
		$("#side_vocher_do").click();
	})

	$("#go_vocher_do2").click(function() {
		$("#side_vocher_do").click();
	})

	$("#go_receive_record").click(function() {
		$("#side_receive_record").click();
	})

	$("#go_subject").click(function() {
		$("#side_subject").click();
	})

	$("#go_set_subject").click(function() {
		$("#side_subject_init").click();
	})

	$(".go_set_personcenter").click(function() {
		$("#side_personcenter").click();
	})

	$.ajax({
	    type: "get",
	    dataType: "text",
	    url:encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geAccount"), //查科目
	    data:{
			user_username:$.session.get('user_username'),
		},
	    cache:false,
		async : false,
	    dataType:"json",
	    success: function (msg){
				// alert(JSON.stringify(msg));
					for (x in msg) {
					var obj = JSON.parse(msg[x]); //还要再转一次json对象
					if(obj.account_name=="1001库存现金"){
						e1=obj.account_debitside_final;
					}else if(obj.account_name=="1002银行存款"){
						e2=obj.account_debitside_final;
					}else if(obj.account_name=="1003应收账款"){
						e3=obj.account_debitside_final;
					}else if(obj.account_name=="1004原材料"){
						e4=obj.account_debitside_final;
					}else if(obj.account_name=="1005库存商品"){
						e5=obj.account_debitside_final;
					}else if(obj.account_name=="2001短期借款"){
						e6=obj.account_creditside_final;
					}else if(obj.account_name=="2002交易性金融负债"){
						e7=obj.account_creditside_final;
					}else if(obj.account_name=="2003应付票据"){
						e8=obj.account_creditside_final;
					}else if(obj.account_name=="2004应付账款"){
						e9=obj.account_creditside_final;
					}else if(obj.account_name=="2005预付账款"){
						e10=obj.account_creditside_final;
					}
				}
	}
})


// 路径配置
require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});

// 使用
require(
	[
		'echarts',
		'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	],
	function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('data-show'));

		var option = {
			title: {
				text: '资产类科目所占比重图',
				subtext: '重要科目',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['1001库存现金', '1002银行存款', '1003应收账款', '1004原材料', '1005库存商品']
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 1548
							}
						}
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			series: [{
				name: '科目余额表',
				type: 'pie',
				radius: '55%',
				center: ['50%', '55%'],
				data: [{
						value: e1,
						name: '1001库存现金'
					},
					{
						value: e2,
						name: '1002银行存款'
					},
					{
						value: e3,
						name: '1003应收账款'
					},
					{
						value: e4,
						name: '1004原材料'
					},
					{
						value: e5,
						name: '1005库存商品'
					}
				]
			}]
		};

		// 为echarts对象加载数据 
		myChart.setOption(option);
	}
);

require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});

require(
	[
		'echarts',
		'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
	],
	function(ec2) {
		// 基于准备好的dom，初始化echarts图表
		var myChart2 = ec2.init(document.getElementById('data-show2'));

		var option = {
			title: {
				text: '负债类科目所占比重图',
				subtext: '重要科目',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				x: 'left',
				data: ['2001短期借款', '2002交易性金融负债', '2003应付票据', '2004应付账款', '2005预付账款']
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					magicType: {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 1548
							}
						}
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			calculable: true,
			series: [{
				name: '科目余额表',
				type: 'pie',
				radius: '55%',
				center: ['50%', '55%'],
				data: [{
						value: e6,
						name: '2001短期借款'
					},
					{
						value: e7,
						name: '2002交易性金融负债'
					},
					{
						value: e8,
						name: '2003应付票据'
					},
					{
						value: e9,
						name: '2004应付账款'
					},
					{
						value: e10,
						name: '2005预付账款'
					}
				]
			}]
		};

		// 为echarts对象加载数据 
		myChart2.setOption(option);
	}
);


})
function showTime() {
	nowtime = new Date();
	year = nowtime.getFullYear();
	month = nowtime.getMonth() + 1;
	date = nowtime.getDate();
	document.getElementById("mytime").innerText = "现在的时间是: " + year + "年" + month + "月" + date + "日 " + nowtime.toLocaleTimeString();
}



