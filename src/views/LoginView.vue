<template>
    <main class="main" :class="{ mobile: isMobile }">
        <div class="login_register">
            <div class="base_info">
                <div class="icon">
                    <img src="@/assets/images/icon.png" alt="">
                </div>
                <div class="description">
                    <label class="title">A fortuna fica ao lado daquele que ousa.</label>
                    <p class="subtitle">Todo progresso ocorre fora da zona de conforto.</p>
                </div>
                <div class="objects">
                    <img src="@/assets/images/objects.png" alt="">
                </div>
            </div>
            <div class="base_form">
                <div class="title">
                    <label for="">Login</label>
                </div>
                <form class="form_login" @submit.prevent="auth">
                    <div class="input_group">
                        <label class="group_label">Endereço de e-mail</label>
                        <input class="group_input" v-model="email" type="email" name="email" placeholder="email@main.com.br">
                    </div>
                    <div class="input_group">
                        <label class="group_label">Senha de acesso</label>
                        <input class="group_input" v-model="password" type="password" name="password" placeholder="********">
                    </div>
                    <div class="submit_forget">
                        <router-link class="link" to="/register">Não tenho conta</router-link>
                        <button class="btn-submit btn-dark" type="submit">
                            Acessar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>

import Cookies from "js-cookie";
import ApiService from "@/services/ApiService";
import { login} from '@/services/index';
export default {
  data() {
    return {
        email: '',
        password: '',
        isMobile: false
    };
  },
  methods: {
    clean(){
      this.email = '';
      this.password = '';
    },
    showAlert(type, msg) {
      this.$swal({
        text: msg,
        icon: type,
        confirmButtonText: 'Confirmar'
      });
    },

    async auth() {
    var data = {
        email: this.email,
        password: this.password
    };

    const resp = await ApiService.post(login.routes.login(),data);

    if(resp.data.status === 'success') {
        localStorage.setItem('userLogin', resp.data.user);
        Cookies.set("access_token", resp.data.access_token);
        this.$router.push({name:'home'});
        // this.$router.push('/dashboard');
    }
  },      
}
};
</script>

<style scoped>
@media(max-width:768px){
    .login_register{
        display: grid;
        justify-content: center;
        padding: 0px;
        height: 90%;
    }

    .objects {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .login_register .base_info .objects {
    width: 100%;
    height: 100px;
}

    .base_info {
        width: 100%;
        padding: 12px 15px   
    }

    .base_form {
        width: 100%;
        align-items: center;
    }

    .submit_forget {
        width: 100% !important;
        gap: 10px

    }

    .group_label {
        width: 100%;
    }

    .input_group .group_input {
    width: 100%;
    }
    .login_register .base_info .description {
        margin-bottom: 20px;
    }

    .login_register .base_form .submit_forget .btn-submit {
    width: 130px;
    height: 50px;
    }

    .form_login {
        width: 95%;
    }

    .login_register .base_info .icon img {
    position: relative;
    top: -90px;
}
}


    

</style>