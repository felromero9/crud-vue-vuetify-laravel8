<template>
    <v-app id="inspire">
        <v-app id="inspire">
            <v-navigation-drawer v-model="drawer" app>
                <v-list dense>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
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

                                <!-- Button to Open the Modal -->
                                <button @click=" modify = false; openModal(article)" type="button"
                                    class="btn btn-primary my-4">
                                    New Article
                                </button>

                                <!-- The Modal -->
                                <div class="modal" :class="{ showModal : modal }">
                                    <div class="modal-dialog">
                                        <div class="modal-content">

                                            <!-- Modal Header -->
                                            <div class="modal-header">
                                                <h4 class="modal-title"> {{ modalTitle }} </h4>
                                                <button @click="closeModal()" type="button" class="close"
                                                    data-dismiss="modal">&times;</button>
                                            </div>

                                            <!-- Modal body -->
                                            <div class="modal-body">
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <v-text-field v-model="article.title" :counter="20" 
                                                        label="Title">
                                                    </v-text-field>
                                                    <v-text-field v-model="article.content" label="Content">
                                                    </v-text-field>
                                                    <v-checkbox v-model="article.active" label="Active"></v-checkbox>
                                                </v-form>
                                            </div>
                                            <!-- Modal footer -->
                                            <div class="modal-footer">
                                                <v-btn @click="closeModal()"  class="mr-4"
                                                    data-dismiss="modal">Cancel</v-btn>
                                                <v-btn @click="saveArticle(id)"  
                                                    data-dismiss="modal">Save</v-btn>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left"> Action </th>
                                                <th class="text-left"> Title </th>
                                                <th class="text-left"> Content </th>
                                                <th scope="col">Active</th>
                                                <th class="text-left"> Created </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="article in articles" :key="article.id">
                                                <th>
                                                    <v-icon small @click="modify = true; openModal(article)"> edit
                                                    </v-icon>
                                                    <v-icon small @click="deleteArticle(article.id)"> delete </v-icon>
                                                </th>
                                                <td>{{ article.title }}</td>

                                                <td>{{ article.content }}</td>
                                                <td v-if="article.active == 0"> No Active </td>
                                                <td v-if="article.active == 1"> Active </td>
                                                <td>{{ new Date(article.created_at).toLocaleString() }}</td>

                                            </tr>
                                        </tbody>

                                    </template>

                                </v-simple-table>

                            </div>

                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
            <v-footer color="indigo" app>
                <span class="white--text">&copy; Feli</span>
            </v-footer>
        </v-app>
    </v-app>

</template>
<script>
    export default {
        data() {
            return {
                article: {
                    title: '',
                    content: '',
                    active: Boolean,
                },
                id: 0,
                modify: true,
                modal: 0, // close buttom boolean
                modalTitle: '',
                articles: [],
                drawer: null,
            }
        },

        created() {
            this.showList()
        },

        methods: {
            async logout() {
               const Response = await axios.post('/logout')
               window.location.href = 'login'
            },
            async showList() {
                const Response = await axios.get('/articles')
                this.articles = Response.data
            },

            async saveArticle() {
                if (this.modify) {
                    const Response = await axios.put('/articles/' + this.id, this.article)
                } else {
                    const Response = await axios.post('/articles/', this.article)
                }
                this.closeModal()
                this.showList()
            },

            async deleteArticle(id) {
                const Response = await axios.delete('/articles/' + id)
                this.showList()
            },

            openModal(data = {}) {
                this.modal = 1
                if (this.modify) {
                    this.id = data.id,
                        this.modalTitle = 'Modify Article'
                    this.article.title = data.title
                    this.article.content = data.content
                    this.article.active = data.active
                } else {
                    this.id = 0,
                        this.modalTitle = 'Create Article'
                    this.article.title = ''
                    this.article.content = ''
                    this.article.active = ''
                }
            },

            closeModal() {
                this.modal = 0
            },
        }

    }
</script>
<style>
    .showModal {
        display: list-item;
        opacity: 1;
        background: rgba(rgb(51, 49, 49), green, blue, alpha);
    }
</style>