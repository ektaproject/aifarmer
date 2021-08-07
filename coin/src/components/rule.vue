<template>
    <div class="bg">
      <div class="box">
                <van-nav-bar
                    title=""
                    right-text=""
                    left-arrow
                    @click-left="onClickLeft"

                />
                    <h2>{{this.$t('view.rule1title')}}</h2>
                
                    <p style="margin-top:20px">
                        <span>
                        {{this.$t('view.rulecontent1')}}
                         </span>
                    </p>
                    <p>
                    <span>
                        {{this.$t('view.rulecontent2')}}</span>
                    </p>
                    <p>
                    <span>
                         {{this.$t('view.rulecontent3')}}</span>
                    </p>    
                    <p>
                    <span>
                         {{this.$t('view.rulecontent4')}}
                    </span>
                  
                    </p>  
                    <p>
                        <span>
                             {{this.$t('view.rulecontent5')}}
                         </span>
                    </p>
            <p>

                    <span>
                         {{this.$t('view.rulecontent6')}}
                    </span>
                
            </p>
            <p>
                    <span>
                         {{this.$t('view.rulecontent7')}}
                       
                    </span>
                    <span>
                         {{this.$t('view.rulecontent8')}}
                       
                    </span>
                    <span>
                         {{this.$t('view.rulecontent9')}}
                       
                    </span>
                    <span>
                         {{this.$t('view.rulecontent10')}}
                       
                    </span>
                    <span>
                         {{this.$t('view.rulecontent11')}}
                       
                    </span>
            </p>
            <p>
                 <span>
                         {{this.$t('view.rulecontent12')}}
                       
                 </span>
            </p>
    </div>
</div>
</template>

<script>
export default {
    name: "rule",
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