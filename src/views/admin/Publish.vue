<template>
    <div>
        <el-breadcrumb style="margin-bottom: 20px;">
            <el-breadcrumb-item>文章</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
            <span class="label">标题：</span>
            <el-input placeholder="请输入文章标题" v-model="title"></el-input>
        </div>
        <div class="introduce">
            <span class="label">简介：</span>
            <el-input type="textarea" :autosize="{minRows: 4, macRows: 10}" placeholder="请输入文章简介"
                      v-model="introduce"></el-input>
        </div>
        <div class="tabs">
            <span class="label">标签：</span>
            <el-tag
                    closable
                    :key="tag"
                    effect="dark"
                    v-for="tag in tags"
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="tagValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        <div class="count">
            <p style="margin-bottom: 20px">内容：</p>
            <mavon-editor
                    v-model="content"
                    ref="md"
                    @imgAdd="imgAdd"
                    @imgDel="imgDel"
                    @save="saveEditor"
                    @change="changeEditor"
                    style="min-height: 600px"
            />
        </div>
        <div style="text-align: right;">
            <el-button type="primary" @click="saveEditor">存稿</el-button>
        </div>
    </div>
</template>

<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import {uploadImg, addArticle, updateArticle, getDetailArticle} from "../../apis";

    export default {
        name: "",
        components: {
            mavonEditor,
        },
        data() {
            return {
                title: '', //文章标题
                introduce: '', //文章简介
                content: '',
                html: '', //文章html
                tags: ['Javascript', 'Vue', 'Node', 'Express'], //文章标签
                inputVisible: false,
                tagValue: '',
                articleId: '', //文章ID
            }
        },
        mounted() {
            let id = this.$route.query.id;
            if (id) {
                this.getDetail(id);
                this.articleId = id;
            }
        },
        methods: {
            //获取文章详情
            getDetail(id) {
                getDetailArticle({
                    id: id
                }).then((res) => {
                    if (res.data.status) {
                        this.title = res.data.data.title;
                        this.introduce = res.data.data.introduce;
                        this.content = res.data.data.content;
                        this.tags = res.data.data.tags.split(',');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            // 将图片上传到服务器，返回地址替换到md中
            imgAdd(pos, file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                    return false;
                }
                if (!isLt1M) {
                    this.$message.error('上传头像图片大小不能超过 1MB!');
                    return false;
                }
                let params = new FormData();
                params.append('imgFile', file);
                uploadImg(params).then((res) => {
                    if (res.data.status) {
                        this.$refs.md.$img2Url(pos, res.data.data);
                        this.$message.success(res.data.msg);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            imgDel() {

            },
            // 所有操作都会被解析重新渲染
            changeEditor(value, render) {
                this.html = render;
            },
            // 存稿
            saveEditor() {
                if (!this.title) {
                    this.$message.info('请填写文章标题');
                    return false;
                }
                if (!this.introduce) {
                    this.$message.info('请填写文章简介');
                    return false;
                }
                if (this.tags.length === 0) {
                    this.$message.info('请至少选择一个标签');
                    return false;
                }
                if (!this.html) {
                    this.$message.info('请填写文章内容');
                    return false;
                }
                let params = {
                    title: this.title,
                    introduce: this.introduce,
                    tags: this.tags,
                    content: this.content,
                    html: this.html,
                    status: 2, //存稿
                }
                let request = addArticle;
                if(this.articleId){
                    request = updateArticle;
                    params.id = this.articleId;
                }else{
                    request = addArticle;
                }
                request(params).then((res) => {
                    if (res.data.status) {
                        this.$message.success(res.data.msg);
                        this.$router.push({path: '/article'});
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let tagValue = this.tagValue;
                if (tagValue) {
                    this.tags.push(tagValue);
                }
                this.inputVisible = false;
                this.tagValue = '';
            }
        }
    }
</script>

<style scoped>
    .title {
        display: flex;
    }

    .introduce {
        display: flex;
        margin: 20px 0;
    }

    .tabs {
        display: flex;
    }

    .count {
        margin: 20px 0;
    }

    .label {
        display: block;
        width: 80px;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
