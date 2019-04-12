		$(function(){
				$.ajax({
			    type: "get",
			    dataType: "text",
			    url:encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geDocument"), //查凭证
			    data:{
					user_username:$.session.get('user_username'),
				},
			    cache:false,
				async:false,
			    dataType:"json",
			    success: function (msg){
						// alert(JSON.stringify(msg));
							for (x in msg) {
							var obj = JSON.parse(msg[x]); //还要再转一次json对象
							$("#addvocher").append(
								"<tr>"+
									"<td>"+ 
										obj.document_group+
									"</td>"+
									"<td>"+ 
										obj.document_note+
									"</td>"+
									"<td>"+ 
										obj.account_name+
									"</td>"+
									"<td>"+ 
										obj.document_debitside+
									"</td>"+
									"<td>"+ 
										obj.document_creditside+
									"</td>"+
								"</tr>");
						}
				}
			});
		})