<template>
    <main class="main">
        <div class="login_register">
            <div class="base_form">
                <div class="title">
                    <label for="">Inscreva-se</label>
                </div>
                <div class="form_login">
                    <div class="input_group">
                        <label class="group_label">Nome completo</label>
                        <input class="group_input" v-model="name" type="text" name="name"
                            placeholder="Digite seu nome">
                    </div>
                    <div class="input_group">
                        <label class="group_label">Endereço de e-mail</label>
                        <input class="group_input" v-model="email" type="email" name="email"
                            placeholder="email@main.com.br">
                    </div>
                    <div class="input_group">
                        <label class="group_label">Senha de acesso</label>
                        <input class="group_input" v-model="password" type="password" name="password"
                            placeholder="********">
                    </div>
                    <div class="submit_forget">
                        <router-link class="link" to="/login">Já tenho conta</router-link>
                        <button @click="create" class="btn-submit btn-dark">
                            Cadastrar
                        </button>
                    </div>
                </div>
            </div>
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
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        clean() {
            this.name = '';
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
        create() {
            var data = {
                name: this.name,
                email: this.email,
                password: this.password
            };

            fetch(this.$apiUrl + 'users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 201) {
                        this.clean();
                    }
                    this.showAlert('success', data.msg);
                })
                .catch(error => {
                    console.error(error);
                });
            }

    }
};
</script>