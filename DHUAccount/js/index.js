			$(function() {
				$("#a_register").click(function() {
						document.getElementById("set_nav_login").classList.remove("active");
						document.getElementById("set_nav_register").classList.add("active");
						document.getElementById("login_request").classList.remove("active");
						document.getElementById("register_request").classList.add("active");
					}),
					$("#a_login").click(function() {
						document.getElementById("set_nav_login").classList.add("active");
						document.getElementById("set_nav_register").classList.remove("active");
						document.getElementById("login_request").classList.add("active");
						document.getElementById("register_request").classList.remove("active");
					});

				$("#form_button_login").click(function() {
					    $.ajax({
					        type: "post",
					        // dataType: "text",
					        url:encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_login"),
					        data: $('#login_form').serialize(),
					        cache:false,
							async : false,
					        dataType:"json",
					        success: function (msg){
								for (x in msg) {
								var obj = JSON.parse(msg[x]); //还要再转一次json对象
								if (obj.status=="Success") {
									alert("登陆成功");
									$.session.set('user_username',$("#login_inputText").val());
									window.location.href = "foreground.html";
								}
					        	else if(obj.status=="NoUser"){
					        		alert("没有此用户");
					        	}
					        	else if(obj.status=="Fail"){
					        		alert("密码不正确");
					        	}
								}
							}
						});
				});

				
				$("#form_button_register").click(function() {
				    $.ajax({
				        type: "get",
				        dataType: "text",
				        url:encodeURI("http://47.96.87.249:8080/dhufore/dhufore/ks_register"),
				        data: $('#register_form').serialize(),
				        cache:false,
						async : false,
				        dataType:"json",
				        success: function (msg){
				        	// alert(JSON.stringify(msg));
				        	if(msg.status=="Success"){
								alert("注册成功!请登录");
								document.getElementById("set_nav_login").classList.add("active");
								document.getElementById("set_nav_register").classList.remove("active");
								document.getElementById("login_request").classList.add("active");
								document.getElementById("register_request").classList.remove("active");
				        	}
							else if(msg.status=="UserExist"){
								alert("用户名已存在");
							}
				   		}
					});
				});    
			
			}); 