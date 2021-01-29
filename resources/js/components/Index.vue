<template>
    <v-app id="inspire">
        <v-app id="inspire">
            <v-navigation-drawer v-model="drawer" app>
                <v-list dense>
                    <v-list-item link>
                        <v-list-item-action>
                          <router-link to='/home'>

                            <v-icon>mdi-home</v-icon>
                          </router-link>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-action>
                            <!-- <router-link to='/articles'> -->

                                <v-icon>article</v-icon>
                            <!-- </router-link> -->
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Articles</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link @click='logout()'>
                        <v-list-item-action>
                            <v-icon>mdi-power</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Log Out</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar app color="indigo" dark class='d-flex justify-space-between mb-6'>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>FeliCRUD </v-toolbar-title>
                
            </v-app-bar>
            <v-main>
                <v-container>
                    <v-row align="center" justify="center">
                        <v-col class="text-center">

                            <div class="crud">
                                <h1> CRUD ARTICLES </h1>
                                <hr>

                              
                               

                                

                            </div>

                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
            <v-footer color="indigo" app>
                <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-app>
    </v-app>

</template>
<script>
    export default {
        data() {
            return {
                             drawer: null,
            }
        },
        methods: {
            async logout() {
               const Response = await axios.post('/logout')
               window.location.href = 'login'
            
            },
        }


    }
</script>
<style>
 
</style>