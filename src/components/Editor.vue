<template>
    <div>
        <div>
            <select v-model="paper_type" name="" id="" @change="changePaperType">
                <option value="a4">A4</option>
                <option value="a5">A5</option>
            </select>
            |
            <button title="Save File" @click="print">Save</button>
            |
            <button title="Italic" @click="exec('italic')">Italico</button>
            <button title="Bold" @click="exec('bold')">Bold</button>
            <button title="Underline" @click="exec('underline')">Underline</button>
            |
            <button title="Justify Left" @click="exec('justifyLeft')">tl</button>
            <button title="Justify Right" @click="exec('justifyRight')">tr</button>
            <button title="Justify Center" @click="exec('justifyCenter')">tc</button>
            <button title="Justify Full" @click="exec('justifyFull')">tf</button>
            |
            <button title="Undo" @click="exec('undo')">undo</button>
            <button title="Redo" @click="exec('redo')">redo</button>
            |
            <button title="Ordered List" @click="exec('insertOrderedList')">ol</button>
            <button title="Unordered List" @click="exec('insertUnorderedList')">ul</button>
            |
            <button title="BackColor" @click="exec('backColor', 'red')">back</button>
            <button title="ForColor" @click="exec('foreColor', 'red')">fore</button>
            |
            <select v-model="value" @change="exec('fontName',value)">
                <option value="null">Select Font Style</option>
                <option value="Arial">Arial</option>
                <option value="Calibri">Calibri</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
            |
            <button title="Insert Image">
                <label for="image">Img</label>
            </button>
            <input  type="file" v-if="image.uploadRead" id="image" ref="image" @change="insertImage">
            |
            <button title="H1" @click="exec('formatBlock', 'h1')">h1</button>
            <button title="H6" @click="exec('formatBlock', 'h6')">h6</button>
        </div>
        <hr>
        <div id="documentContent">
            <div :class="paper_type_obj" ref="editor" id="editor" rows="5" contenteditable="" @input="updateHTML"></div>
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
                image: {
                    uploadRead:true,
                },
                paper_type: 'a4',
                paper_type_obj: { a4: true, a5: false, },
                num: 0,
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
                var reader = new FileReader();
                reader.readAsDataURL(this.$refs.image.files[0]);
                reader.onload = () => {
                    this.image.uploadRead = false;
                    this.$nextTick(() => {
                        this.image.uploadRead = true
                    })
                    this.exec('insertImage', reader.result);
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
            changePaperType(){
                for (let key in this.paper_type_obj) {
                    if(key == this.paper_type) {
                        this.paper_type_obj[key] = true;
                    } else {
                        this.paper_type_obj[key] = false;
                    }
                }
            }
        }
    };
</script>

<style scoped>
    #documentContent{
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
