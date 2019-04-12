				$(function(){
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
							$("#addAccount").append(
								"<tr>"+
									"<td>"+ 
										obj.account_name+
									"</td>"+
									"<td>"+ 
										"2019-4"+
									"</td>"+
									"<td>"+ 
										obj.account_debitside_base+
									"</td>"+
									"<td>"+ 
										obj.account_creditside_base+
									"</td>"+
									"<td>"+ 
										obj.account_debitside_occur+
									"</td>"+
									"<td>"+ 
										obj.account_creditside_occur+
									"</td>"+
									"<td>"+ 
										obj.account_debitside_final+
									"</td>"+
									"<td>"+ 
										obj.account_creditside_final+
									"</td>"+
								"</tr>");
						}
				}
			});
		})