<template>
    <div class="box">
         <van-nav-bar
                    title="标题"
                    right-text=""
                    left-arrow
                    @click-left="onClickLeft"
        />
   <h2>{{this.$t('view.page2Title')}}</h2>
     
        <p style="margin-top:20px">
            <span>
               

            </span>
        </p>
        <p>
        <span>
          {{this.$t('view.page2Content1')}} </span>
        </p>
        <p>
        <span>
          {{this.$t('view.page2Content2')}}
          
        </span>
        </p>    
        <p>
        <span>
              {{this.$t('view.page2Content3')}}
 </span>
        </p>  
        <p>
            <span>
               {{this.$t('view.page2Content4')}}
 </span>
        </p>
<p>

        <span>          {{this.$t('view.page2Content5')}}
 </span>
</p>
</div>
</template>

<script>
export default {
    name: "page2",
        methods:{
        onClickLeft(){
            this.$router.push('/tta/farm')
        }
    }
}
</script>

<style scoped>
      *,body{
        width:100%;
        height:100%;
        color: white;
        background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
        background-color: rgb(44, 49, 59) !important;
        overflow: hidden;
        text-align: left;
    }
    h2{
        margin-left:20px;
    }
    p{
            text-indent:2em !important;
            margin-left: 2px;
            margin-top: 30px;
    }
    span{
        line-height: 1.2em;
        word-break: normal;
        font-size: 1.2rem;
    }
</style>