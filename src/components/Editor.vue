<template>
    <div>
        <div>
            <select v-model="tipo_folha" name="" id="" @change="trocarTipoFolha">
                <option value="a4">A4</option>
                <option value="a5">A5</option>
            </select>
            |
            <button @click="print">Save</button>
            |
            <button @click="exec('italic')">Italico</button>
            <button @click="exec('bold')">Bold</button>
            <button @click="exec('underline')">Underline</button>
            |
            <button @click="exec('justifyLeft')">tl</button>
            <button @click="exec('justifyRight')">tr</button>
            <button @click="exec('justifyCenter')">tc</button>
            <button @click="exec('justifyFull')">tj</button>
            |
            <button @click="exec('undo')">undo</button>
            <button @click="exec('redo')">redo</button>
            |
            <button @click="exec('insertOrderedList')">ol</button>
            <button @click="exec('insertUnorderedList')">ul</button>
            |
            <button @click="exec('backColor', 'red')">back</button>
            <button @click="exec('foreColor', 'red')">fore</button>
            |
            <select v-model="value" @change="exec('fontName',value)">
                <option value="null">Selecione a fonte</option>
                <option value="Arial">Arial</option>
                <option value="Calibri">Calibri</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
            |
            <button>
                <label for="image">Img</label>
            </button>
            <input type="file" v-if="image.uploadRead" id="image" ref="image" @change="insertImage">
            |
            <button @click="exec('formatBlock', 'h1')">h1</button>
            <button @click="exec('formatBlock', 'h6')">h6</button>
        </div>
        <hr>
        <div id="documento">
            <div :class="tipo_folha_obj" ref="editor" id="editor" rows="5" contenteditable="" @input="updateHTML">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Editor",
        data(){
            return {
                divisor:297,
                value:null,
                html:'null',
                image:{
                    uploadRead:true,
                },
                tipo_folha:'a4',
                tipo_folha_obj:{
                    a4:true,
                    a5:false,
                },
                num:0,
            };
        },
        methods:{
            print(){
                window.print();
            },
            exec( command, value = null ){
                document.execCommand(command, false, value);
            },
            insertImage(){
                //console.log(this.$refs.image.files);
                var reader = new FileReader();
                reader.readAsDataURL(this.$refs.image.files[0]);
                reader.onload = () => {
                    this.image.uploadRead = false;
                    this.$nextTick(() => {
                        this.image.uploadRead = true
                    })
                }
            },
            updateHTML(e){
                this.html = e.target.innerHTML;
                let pxHeight = parseInt(e.target.offsetHeight);
                let mmHeight = Math.floor(pxHeight * 0.264583);

                if(mmHeight <= 297){
                    this.divisor = 297;
                }
            },
            trocarTipoFolha(){
                for (var key in this.tipo_folha_obj) {
                    if(key == this.tipo_folha){
                        this.tipo_folha_obj[key] = true;
                    }else{
                        this.tipo_folha_obj[key] = false;
                    }
                }
            }
        }
    };
</script>

<style scoped>
    #documento{
        margin: 10px;
        padding: 10px;
        background: rgb(204,204,204);
        height: 30em;
        overflow: auto;
    }

    #editor{
        background-color: white;
        margin: 0px auto;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    }

    .a4{
        width: 210mm;
        min-height: 297mm;
    }

    .a5{
        width: 148mm;
        min-height: 210mm;
    }

    #image{
        display: none;
    }


    @media print {

        footer {page-break-after: always;}

        body * {
            visibility: hidden;
            margin: 0;
            padding: 0;
        }
        #editor, #editor * {
            visibility: visible;
        }
        #editor {
            position: absolute;
            left: 0;
            top: 0;
            border: 0px solid black;
        }
    }

    @page {
        margin: 0cm;
    }

    /*@media print and (max-width: 210mm) and (max-height: 297mm){
        @page {
            size: a4;
        }
    }*/

    /*@media print and (min-width: 148mm) and (min-height: 210mm){
        @page {
            size: a4;
        }
    }*/

</style>
