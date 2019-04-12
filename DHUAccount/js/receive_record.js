		$(function(){
				$.ajax({
			    type: "get",
			    dataType: "text",
			    url:encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_geAccountReceivable"), //查应收帐
			    data:{
					user_username:$.session.get('user_username'),
				},
			   cache:false,
				async:false,
			    dataType:"json",
			    success: function (msg){
						// alert(msg);
							for (x in msg) {
							var obj = JSON.parse(msg[x]); //还要再转一次json对象
							$("#addreceive").append(
								"<tr>"+
									"<td>"+ 
										obj.customerinfo_name+
									"</td>"+
									"<td>"+ 
										obj.customerinfo_company+
									"</td>"+
									"<td>"+ 
										obj.customerinfo_phone+
									"</td>"+
									"<td>"+ 
										obj.document_group+
									"</td>"+
									"<td>"+ 
										obj.account_name+
									"</td>"+
									"<td>"+ 
										obj.accountreceivable_debitside+
									"</td>"+	
									"<td>"+
										obj.accountreceivable_creditside+
									"</td>"+
								"</tr>");
						}
				}
			});
		})