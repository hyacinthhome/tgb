var has_receive1 = false;
var has_receive2 = false;
var has_receive3 = false;
var has_receive4 = false;
var nowtime = new Date();
var can_submit1 = false;
var can_submit2 = false;
var can_submit3 = false;
var can_submit4 = false;
var can_type1 = false;
var can_type2 = false;
var can_type3 = false;
var can_type4 = false;
var vocher_id = 0; //这里先默认为1,TODO 先请求ajax 得到已知的凭证数再进行编号

$(function() {

//ajax获得凭证组号
	$.ajax({
		type: "post",
		url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geDocument"), //获取凭证信息
		data: {
			user_username: $.session.get('user_username'), //cookie得到用户
		},
		cache: false,
		async : false,
		dataType: "json",
		success: function(data) {
			if (data.status == "NoUser") {
				alert("服务器未响应！请刷新页面（获取凭证组号时没有得到用户)");
			} else {
				for (x in data) {
					// alert(data[x]);
					var obj = JSON.parse(data[x]); //还要再转一次json对象
					if (obj.document_group > vocher_id) {
						vocher_id = obj.document_group;
					}
				}
				vocher_id = vocher_id + 1;
				// alert("凭证组号为:" + vocher_id);
				// getcustomer();
			}
		}
	});

	// ajax获得已有客户 防止同时提交导致达到后台连接数，崩溃 现在在找到凭证组号后通过函数方式得到
	//async : false,  TMD! ajax竟然还有这个属性！ 牛逼！
	$.ajax({
		type: "post",
		url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geCustomerInfo"), //得到客户信息
		data: {
			user_username: $.session.get('user_username'), //cookie得到用户
		},
		cache: false,
		async : false,
		dataType: "json",
		success: function(data) {
			// alert(data);
			if (data.status == "NoUser") {
				alert("服务器未响应！请刷新页面（获取客户时没有得到用户)");
			} else {
				for (x in data) {
					// alert(data[x]);
					var obj = JSON.parse(data[x]); //还要再转一次json对象
					$("#customer_list").append("<option value=\'" + obj.customerinfo_name + "\'>" + obj.customerinfo_name +
						"</option>");
				}
				// alert("服务器响应客户表单成功！");
			}
		}
	});



    //表格不能同时出现两个应收账款的格式控制
	$("#subject_option1").change(function() {
		if ($("#subject_option1 option:selected").val() == "1003应收账款") {
			if (has_receive1 == false && has_receive2 == false && has_receive3 == false && has_receive4 == false) {
				$("#receive_modal").click();
				has_receive1 = true;
			} else {
				alert("警告：凭证中出现了两个应收账款科目");
			}
		} else if (has_receive1 == true) {
			has_receive1 = false;
		}
	});

	$("#subject_option2").change(function() {
		if ($("#subject_option2 option:selected").val() == "1003应收账款") {
			if (has_receive1 == false && has_receive2 == false && has_receive3 == false && has_receive4 == false) {
				$("#receive_modal").click();
				has_receive2 = true;
			} else {
				alert("警告：凭证中出现了两个应收账款科目");
			}
		} else if (has_receive2 == true) {
			has_receive2 = false;
		}
	});

	$("#subject_option3").change(function() {
		if ($("#subject_option3 option:selected").val() == "1003应收账款") {
			if (has_receive1 == false && has_receive2 == false && has_receive3 == false && has_receive4 == false) {
				$("#receive_modal").click();
				has_receive3 = true;
			} else {
				alert("警告：凭证中出现了两个应收账款科目");
			}
		} else if (has_receive3 == true) {
			has_receive3 = false;
		}
	});

	$("#subject_option4").change(function() {
		if ($("#subject_option4 option:selected").val() == "1003应收账款") {
			if (has_receive1 == false && has_receive2 == false && has_receive3 == false && has_receive4 == false) {
				$("#receive_modal").click();
				has_receive4 = true;
			} else {
				alert("警告：凭证中出现了两个应收账款科目");
			}
		} else if (has_receive4 == true) {
			has_receive4 = false;
		}
	});
	
	//持续调用sum_money()函数，该函数作用为计算合计
	setInterval("sum_money()", 500);
	
	//点击提交后触发的函数
	$("#vocher_do_submit").click(function() {
		//先检查整个表单的格式
		if ($("#subject_option1 option:selected").val() != "" && $("#positive_money1").val() != "" && $(
				"#negative_money1").val() != "") {
			can_submit1 = true;
			can_type1 = true;
		} else if ($("#document_note1").val() == "" && $("#subject_option1 option:selected").val() == "" && $(
				"#positive_money1").val() == "" && $("#negative_money1").val() == "") {
			can_type1 = true;
			can_submit1 = false;
		} else {
			alert("格式错误！请填完整第一行的金额或科目");
			can_type1 = false;
			can_submit1 = false;
		}

		if ($("#subject_option2 option:selected").val() != "" && $("#positive_money2").val() != "" && $(
				"#negative_money2").val() != "") {
			can_submit2 = true;
			can_type2 = true;
		} else if ($("#document_note2").val() == "" && $("#subject_option2 option:selected").val() == "" && $(
				"#positive_money2").val() == "" && $("#negative_money2").val() == "") {
			can_type2 = true;
			can_submit2 = false;
		} else {
			alert("格式错误！请填完整第二行的金额或科目");
			can_type2 = false;
			can_submit2 = false;
		}

		if ($("#subject_option3 option:selected").val() != "" && $("#positive_money3").val() != "" && $(
				"#negative_money3").val() != "") {
			can_submit3 = true;
			can_type3 = true;
		} else if ($("#document_note3").val() == "" && $("#subject_option3 option:selected").val() == "" && $(
				"#positive_money3").val() == "" && $("#negative_money3").val() == "") {
			can_type3 = true;
			can_submit3 = false;
		} else {
			alert("格式错误！请填完整第三行的金额或科目");
			can_type3 = false;
			can_submit3 = false;
		}

		if ($("#subject_option4 option:selected").val() != "" && $("#positive_money4").val() != "" && $(
				"#negative_money4").val() != "") {
			can_submit4 = true;
			can_type4 = true;
		} else if ($("#document_note4").val() == "" && $("#subject_option4 option:selected").val() == "" && $(
				"#positive_money4").val() == "" && $("#negative_money4").val() == "") {
			can_type4 = true;
			can_submit4 = false;
		} else {
			alert("格式错误！请填完整第四行的金额或科目");
			can_type4 = false;
			can_submit4 = false;
		}

		//再进行选取正确的格式提交
		if (can_type1 == true && can_type2 == true && can_type3 == true && can_type4 == true) {
			submit_flag=true;
			if ($("#text1").text() != $("#text2").text()) {
				alert("借贷不一致！无法提交");	//当合计的两项不一致时
			} else if (vocher_id < 0) {
				alert("服务器未响应！请刷新页面（没有得到凭证组号）"); //当没有get凭证组号时,会报这个错
			} else {
				var submit_year = nowtime.getFullYear();
				var submit_month = nowtime.getMonth();
				var submit_day = nowtime.getDate();
				var submit_hour = nowtime.getHours();
				var submit_min = nowtime.getMinutes();
				var submit_sec = nowtime.getSeconds();
				
				//不包含应收帐的单条凭证
				if (can_submit1 == true && has_receive1 == false) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option1 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money1").val(),
							document_creditside: $("#negative_money1").val(),
							document_note:$("#document_note1").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
						},
						async : false,
						cache: false,
						dataType: "json",
						success: function(msg) {
							// alert(msg.status);
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("1添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}
				
				if (can_submit2 == true && has_receive2 == false) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option2 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money2").val(),
							document_creditside: $("#negative_money2").val(),
							document_note:$("#document_note2").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("2添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				if (can_submit3 == true && has_receive3 == false) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option3 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money3").val(),
							document_creditside: $("#negative_money3").val(),
							document_note:$("#document_note3").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("3添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				if (can_submit4 == true && has_receive4 == false) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option4 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money4").val(),
							document_creditside: $("#negative_money4").val(),
							document_note:$("#document_note4").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							// alert(msg);
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("4添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				//包含应收帐的单条凭证
				if (can_submit1 == true && has_receive1 == true) {
					// alert($.session.get('user_username'));
					// alert($("#customer_list option:selected").val());
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option1 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money1").val(),
							document_creditside: $("#negative_money1").val(),
							document_note:$("#document_note1").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
							customerinfo_name: $("#customer_list option:selected").val(),
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							// alert("提交的是应收帐1");
							// alert(msg.status);
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("1添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				if (can_submit2 == true && has_receive2 == true) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option2 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money2").val(),
							document_creditside: $("#negative_money2").val(),
							document_note:$("#document_note2").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
							customerinfo_name: $("#customer_list option:selected").val(),
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("2添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				if (can_submit3 == true && has_receive3 == true) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option3 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money3").val(),
							document_creditside: $("#negative_money3").val(),
							document_note:$("#document_note3").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
							customerinfo_name: $("#customer_list option:selected").val(),
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("3添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}

				if (can_submit4 == true && has_receive4 == true) {
					// alert($.session.get('user_username'));
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adDocument"), //添加凭证
						data: {
							user_username: $.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option4 option:selected").val(), //传送第一个科目框返回得到的数据
							document_debitside: $("#positive_money4").val(),
							document_creditside: $("#negative_money4").val(),
							document_note:$("#document_note4").val(),
							document_group: vocher_id,
							YEAR: submit_year,
							MONTH: submit_month,
							DAY_OF_MONTH: submit_month,
							HOUR_OF_DAY: submit_day,
							MINUTE: submit_min,
							SECOND: submit_sec,
							customerinfo_name: $("#customer_list option:selected").val(),
						},
						cache: false,
						async : false,
						dataType: "json",
						success: function(msg) {
							// alert(msg);
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（添加凭证时没有得到用户）");
							} else if (msg.status == "NoCustomerInfo") {
								alert("请检查应收帐信息");
							} else if (msg.status == "NoAccount") {
								alert("请检查科目信息");
							} else if (msg.status == "success") {
								// alert("4添加成功，接下来页面刷新");
							} else {
								alert("服务器未响应！请刷新页面（添加凭证时发生未知错误）");
							}
						}
					});
				}
					alert("成功即可刷新页面！");
					//TODO 重定向到首页
					// window.location.replace("www.baidu.com");
			}
		}
	});

	//模态框中点击添加后触发的函数
	$("#customer_modal_submit").click(function() {
		// alert($.session.get('user_username'));
		// alert($("#customerinfo_name_inputText").val());
		$.ajax({
			type: "post",
			url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adCustomerInfo"), //添加客户
			data: {
				user_username: $.session.get('user_username'), //cookie得到用户
				customerinfo_name: $("#customerinfo_name_inputText").val(), //传送客户名
				customerinfo_company:$("#customerinfo_company_inputText").val(),
				customerinfo_phone:$("#customerinfo_phone_inputText").val(),
			},
			cache: false,
			async : false,
			dataType: "json",
			success: function(msg) {
				// alert(msg.status);
				if (msg.status == "Success") {
					$("#customer_list").append("<option value=\'" + $("#customerinfo_name_inputText").val() + "\'>" + $(
						"#customerinfo_name_inputText").val() + "</option>");
						alert("添加客户成功");
				} else if (msg.status == "NoUser") {
					alert("服务器未响应！请刷新页面（添加客户时没有得到用户)");
				}
			},

		});
	});

	//模态框中点击确认后触发的函数
	$("#receive_modal_submit").click(function() {
		$("#document_note1").val("欠款人姓名：" + $("#customer_list option:selected").val());
		$(".close").click();
	});

});

//这个函数的作用时计算合计
function sum_money() {
	var sum_positive_money = 0;
	var sum_negative_money = 0;
	if ($("#positive_money1").val() != "") {
		sum_positive_money += Number($("#positive_money1").val())
	}
	if ($("#negative_money1").val() != "") {
		sum_negative_money += Number($("#negative_money1").val())
	}
	if ($("#positive_money2").val() != "") {
		sum_positive_money += Number($("#positive_money2").val())
	}
	if ($("#negative_money2").val() != "") {
		sum_negative_money += Number($("#negative_money2").val())
	}
	if ($("#positive_money3").val() != "") {
		sum_positive_money += Number($("#positive_money3").val())
	}
	if ($("#negative_money3").val() != "") {
		sum_negative_money += Number($("#negative_money3").val())
	}
	if ($("#positive_money4").val() != "") {
		sum_positive_money += Number($("#positive_money4").val())
	}
	if ($("#negative_money4").val() != "") {
		sum_negative_money += Number($("#negative_money4").val())
	}
	$("#text1").text(sum_positive_money);
	$("#text2").text(sum_negative_money);
}

function getcustomer(){
		$.ajax({
		type: "post",
		url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geCustomerInfo"), //得到客户信息
		data: {
			user_username: $.session.get('user_username'), //cookie得到用户
		},
		cache: false,
		dataType: "json",
		async : false,
		success: function(data) {
			// alert(data);
			if (data.status == "NoUser") {
				alert("服务器未响应！请刷新页面（获取客户时没有得到用户)");
			} else {
				for (x in data) {
					// alert(data[x]);
					var obj = JSON.parse(data[x]); //还要再转一次json对象
					$("#customer_list").append("<option value=\'" + obj.customerinfo_name + "\'>" + obj.customerinfo_name +
						"</option>");
				}
				alert("服务器响应客户表单成功！");
			}
		}
	});
}