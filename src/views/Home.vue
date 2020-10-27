<template>
    <div class="home">
         <div class="content">

             <router-view></router-view>

         </div>    

         <!-- 底部组件 -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer"
export default {
    components:{
       Footer
    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.home{
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
}
.content{
 
 flex: 1;
 background:#F0F2F5 ;
 overflow: auto;

}
</style>
