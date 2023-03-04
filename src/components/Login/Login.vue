<template>
    <div class="container h-100">
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="https://media.licdn.com/dms/image/C4D0BAQGGa3SCSlXvCg/company-logo_200_200/0/1659638029088?e=2147483647&v=beta&t=NU28cFMOVQE59Pw2dNUIc9swfqEh1iEnslPFOwjrwdc" class="brand_logo" alt="Logo">
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input type="text" name="" class="form-control input_user" value="" placeholder="username" v-model.trim="form.username">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input type="password" name="" class="form-control input_pass" value="" placeholder="password" v-model.trim="form.password">
						</div>
						<!-- <div class="form-group">
							<div class="custom-control custom-checkbox">
								<input type="checkbox" class="custom-control-input" id="customControlInline">
								<label class="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div> -->
							<div class="d-flex justify-content-center mt-3 login_container">
				 	<button type="button" name="button" class="btn login_btn" @click="logineo">Login</button>
				   </div>
					</form>
				</div>
		
				<!-- <div class="mt-4">
					<div class="d-flex justify-content-center links">
						Don't have an account? <a href="#" class="ml-2">Sign Up</a>
					</div>
					<div class="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import backendRouter from  '../BackendRouter/BackendRouter'



export default{
    data(){
        return{
            form : {
                username:'',
                password:'',
            }
        }
    },
    methods:{
        logineo(){
            const path = backendRouter.data+'users/login'
            const access = {
                'user': this.form.username,
                'password': this.form.password
            }
			
            axios.post(path, access).then((response)=>{
				this.$cookies.set('jwt', response.data.jwt);
				if (response.data.cc == this.form.password){
					router.push('/clave')
				}
				else{
					console.log(response.data.cc)
					router.push('/')
				}
                
                
            })
            .catch((error)=>{
                this.$swal(error.response.data.detail)
            })
        }
    }
}
</script>

<style>
		body,
		html {
			margin: 0;
			padding: 0;
			height: 100%;
			background: #d2d5d6 !important;
		}
		.user_card {
			height: 400px;
			width: 350px;
			margin-top: auto;
			margin-bottom: auto;
			background: #ffff;
			position: relative;
			display: flex;
			justify-content: center;
			flex-direction: column;
			padding: 10px;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			-moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			border-radius: 5px;

		}
		.brand_logo_container {
			position: absolute;
			height: 170px;
			width: 170px;
			top: -75px;
			border-radius: 50%;
			background: #db8023;
			padding: 10px;
			text-align: center;
		}
		.brand_logo {
			height: 150px;
			width: 150px;
			border-radius: 50%;
			border: 2px solid white;
		}
		.form_container {
			margin-top: 100px;
		}
		.login_btn {
			width: 100%;
			background: #db8023 !important;
			color: white !important;
		}
		.login_btn:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.login_container {
			padding: 0 2rem;
			
		}
		.input-group-text {
			background: #db8023 !important;
			color: white !important;
			border: 0 !important;
			border-radius: 0.25rem 0 0 0.25rem !important;
		}
		.input_user,
		.input_pass:focus {
			box-shadow: none !important;
			outline: 0px !important;
		}
		.custom-checkbox .custom-control-input:checked~.custom-control-label::before {
			background-color: #db8023 !important;
		}

</style>