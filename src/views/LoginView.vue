<template>
    <main class="main">
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

export default {
  data() {
    return {
        email: '',
        password: ''
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

    auth() {
    var data = {
        email: this.email,
        password: this.password
    };

    fetch(this.$apiUrl + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(response => {
        // this.showAlert(response.status, response.msg);

        if (response.status === 'success') {
            if (response.access_token) {
                localStorage.setItem('userLogin', response.user);
                // this.clean(); 
                this.$router.push({name:'home'}); 
            } else {
                this.$router.push('/');
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}

      
  }
};
</script>