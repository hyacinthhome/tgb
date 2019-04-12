$(function() {
				$("#sub_do_submit").click(function() {
					//$.session.get('user_username')
					$.ajax({
						type: "post",
						url: encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_adAccountMoney"), //添加科目余额 TODO
						data: {
							user_username:$.session.get('user_username'), //cookie得到用户
							account_name: $("#subject_option option:selected").val(), //传送第一个科目框返回得到的数据
							account_debitside_base: $("#sub_debitside_base").val(),
							account_creditside_base: $("#sub_creditside_base").val(),
						},
						cache: false,
						dataType: "json",
						async : false,
						success: function(msg) {
							// alert(msg.status);
							if (msg.status == "NoUser") {
								alert("服务器未响应！请刷新页面（设置科目余额时没有得到用户）");
							} else if (msg.status == "success") {
								alert("添加成功，请刷新页面");
							} else {
								alert("服务器未响应！请刷新页面（设置科目余额时时发生未知错误）");
							}
						}
					});
				})
			})
