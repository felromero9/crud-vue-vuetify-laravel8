<template>
    <div class="crud">
        <h1> CRUD ARTICLES </h1>
        <hr>

        <!-- Button to Open the Modal -->
        <button @click=" modify = false; openModal(article)" type="button" class="btn btn-primary my-4">
            New Article
        </button>

        <!-- The Modal -->
        <div class="modal" :class="{ showModal : modal }">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> {{ modalTitle }} </h4>
                        <button @click="closeModal()" type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="card-body ">
                            <form>
                                <div class="form-group">
                                    <label for="tittle">Title</label>
                                    <input v-model="article.title" type="text" class="form-control" name='title'
                                        id='nameId'>
                                </div>
                                <div class="form-group">
                                    <label for="content">Content</label>
                                    <input v-model="article.content" type="text" class="form-control" name='content'
                                        id='contentId'>
                                </div>
                                <div class="form-check form-switch">
                                                                        
                                    <input 
                                      v-model="article.active"
                                      type="checkbox" 
                                      name='active'>

                                    <label for="active" class="form-check-label">Active
                                    </label>
                                </div>
                                
                            </form>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button @click="closeModal()" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Cancel</button>
                        <button @click="saveArticle(id)" type="button" class="btn btn-success"
                            data-dismiss="modal">Save</button>
                    </div>

                </div>
            </div>
        </div>


        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Action</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col">Active</th>
                    <th scope="col">Created </th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="article in articles" :key="article.id">
                    <th>
                        <button @click="deleteArticle(article.id)" class='btn btn-danger btn-sm'>Delete</button>
                        <button @click="modify = true; openModal(article)  "
                            class='btn btn-warning btn-sm'>Modify</button>
                    </th>
                    <td>{{ article.title }}</td>

                    <td>{{ article.content }}</td>
                    <td v-if="article.active == 0"> No Active </td>
                    <td v-if="article.active == 1"> Active </td>
                    <td>{{ article.created_at }}</td>
                </tr>
            </tbody>
        </table>



    </div>

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

    

            }
        },
        created() {
            this.showList()
        },

        methods: {
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
        },

    }
</script>

<style>
    .showModal {
        display: list-item;
        opacity: 1;
        background: rgba(rgb(51, 49, 49), green, blue, alpha);
    }
</style>