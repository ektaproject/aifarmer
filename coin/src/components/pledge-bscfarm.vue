<template>
  <div class="content-box contenter-box">
    <div class="head-box">
      <transition name="van-slide-left">
        <!-- <div class="logo">{{$t('home.Title')}}</div> -->
      </transition>
    </div>

       <nav class="navbar navbar-expand-lg navbar-light">
        <div class="sc-eGJWMs gQYBcx navbar-nav">
         <a href="#" class="sc-gsWcmt iPuEOf nav-link active" role="button">{{$t('home.Nav1')}}</a>
         <a href="#" class="sc-gsWcmt iPuEOf nav-link " 
           role="button" 
            @click="toRule('rule')">
             {{$t('home.Nav2')}}
          </a>
         <a href="#" class="sc-gsWcmt iPuEOf nav-link " role="button"  @click="showCodes()">{{$t('home.Nav3')}}</a>
         <a href="#" class="sc-gsWcmt iPuEOf nav-link " role="button"   @click="showTeamProfits()">{{$t('home.Nav5')}}</a>
         <a href="#" class="sc-gsWcmt iPuEOf nav-link " role="button"  @click="showTeams()">{{$t('home.Nav4')}}</a>
        </div>
          <van-dropdown-menu :change="changeLang()" title="筛选">
                <van-dropdown-item v-model="value" :options="option1" />
          </van-dropdown-menu>
      </nav>


    <div class="inter-box" >
      <div class="content-title">Compensation Pool</div>
      <div class="cell-box" @click="showTask(0)">
          <div class="div1">
            <span class="s1 imgbox"><img src="@/assets/img/USDT.svg" alt=""> {{$t('home.HomeTitle')}} </span>
          </div>
          <div class="div2">
            <span class="s1">{{$t('home.TotalDeposit')}}</span>
            <span class="s2">{{ido1.total_amount}}</span>
          </div>
          <div class="div2">
            <span class="s1">{{$t('home.USDTBalance')}}</span>
            <span class="s2">{{ido1.dfc_balance}}</span>
          </div>
          <div class="div2">
            <span class="s1">{{$t('home.FtDeposit')}}</span>
            <span class="s2">{{ido.dfc_balance}}</span>
          </div>
      </div>


      <div class="intrBox" @click="toPage(1)">
                {{$t('home.PageTitle1')}}
      </div>
      <div class="intrBox intrBox2" @click="toPage(2)">      
                 {{$t('home.PageTitle2')}}
      </div>
    </div>

      <van-overlay :show="showCode" @click="showCode = false">
        <div class="wrapper" @click="showCode = false">
                     <div class="sg-qrcode" >
                        <vue-qr :text="qrcodeText"
                                :correctLevel="3"
                                :size="200"
                                :margin="10"
                                colorDark="#2ba245"
                                colorLight="white"
                                backgroundColor="white"
                                backgroundDimming="white"
                                :logoScale=".2"
                                :logoMargin="5"
                                logoBackgroundColor="white"
                        >
                        </vue-qr>
                         <van-button type="primary" 
                             class="copy" 
                              v-clipboard:error ="onError"
                              v-clipboard:copy ="address" 
                              v-clipboard:success="onCopy">
                             {{$t('home.Copy')}}
                          </van-button>
                </div>
        </div>
    </van-overlay>

    <van-overlay :show="showTeam" @click="showTeam = false">
        <div class="wrapper" @click="showTeam = false">
                     <div  >
                    <van-image
  width="340"
  height="170"
  :src="require('@/assets/img/team.jpg')"
/>
                     
                </div>
        </div>
    </van-overlay>


        <van-overlay :show="showTeamProfit" @click="showTeamProfit = false" >
        <div class="wrapper" @click="showTeamProfit = false">
                <div   class="teamBox">
                    <div class="teamBoxContent">
                      <p>{{$t('team.L1')}} <span>{{stake_result[6]}}</span> </p>
                      <p>{{$t('team.TotalL1')}} <span>{{stake_result[7]}}</span> </p>
                      <p>{{$t('team.PowerBonus')}} <span> {{ Number(stake_result[7])*0.02*0.3}}</span> </p>
                      <p>{{$t('team.L2')}} <span>{{stake_result[8]}}</span> </p>
                      <p>{{$t('team.TotalL2')}} <span>{{stake_result[9]}}</span> </p>
                      <p>{{$t('team.PowerBonus')}} <span> {{ Number(stake_result[9])*0.02*0.3}}</span> </p>
                     
                     
                      <template v-if='agentType'>
                        <van-divider dashed>{{$t('team.agentTitle')}}</van-divider>
                        <div>
                          <p>{{$t('team.agent1')}} <span>{{agent_result[0]}}  </span></p>
                          <p>{{$t('team.agent2')}}<span>{{agent_result[1]}}  </span></p>
                          <p>{{$t('team.agent3')}}<span>{{agent_result[2]}}  </span></p>
                          <p>{{$t('team.agent4')}}<span>{{Number(agent_result[0])-Number(agent_result[1]-Number(agent_result[2]))}}</span> </p>
                        </div>
                      </template>
                    </div>
                </div>
        </div>zong
    </van-overlay>

 
    
    <van-action-sheet v-model="show" class="action-box" :round="false" close-icon="revoke" title="BACK">
      <div class="content">
        <div class="title1">
           <span v-if="showType == 1"> USDT</span>
           <span v-else> Farmer Token</span>
        </div>
        <!-- <div class="title2">Auto-Compounding</div> -->
        <div class="cell-box">
          <div class="div2">
            <div class="d1">{{$t('home.Apy')}}</div>
            <div class="d2">
              <span class="s1">> 1.8%</span>
              <!-- <span class="s2">Pool 102.12% + BUNNY 56.98%</span> -->
            </div>
          </div>
          <div class="div2">
            <div class="d1">{{$t('home.Deposit')}}</div>
            <div class="d2">
              <span class="s1">{{ido.stake_amount}} USDT </span>
              <!-- <span class="s2"></span> -->
            </div>
          </div>
          <div class="div2 div3">
            <div class="d1">{{$t('home.Earned')}}</div>
            <div class="d2">
                <span class="s1">{{ido.reward_amount}} USDT</span>
            </div>
          </div>
          <div class="botton-box">
            <van-button icon="replay" type="default" @click="getNewData" />
            <van-button type="default" :disabled="claimDisabled" @click="claim">CLAIM</van-button>
          </div>
        </div>
        <div class="tag-box">
          <van-tabs v-model="tagActive">
            <van-tab :title="$t('home.Deposit')">
              <div class="tip">{{$t('home.FeeTips')}}</div>
                  <van-field
                    v-model="num"
                    center
                    clearable
                    type="number"
                    label=""
                    placeholder= "0"
                  >
                <template #button>
                  <van-button size="small" @click="maxDepositNum">MAX</van-button>
                </template>
              </van-field>
              <div class="b-x">{{$t('home.Balance')}}
                <span class="s1" > USDT</span>
              </div>
            </van-tab>
            <van-tab :title="$t('home.Withdraw')">
              <div class="tip">{{$t('home.FeeTips')}}</div>
              <van-field
                v-model="ido.stake_amount"
                center
                clearable
                label=""
                type="number"
                placeholder="0"
                :disabled="true"
              >    
              </van-field>
            </van-tab>
          </van-tabs>
        </div>
        <div class="bottom-box">
          <!-- <div class="num-box">
            <span class="s1">YOUR BALANCE</span>
            <span class="s2">$0.000</span>
          </div> -->
          <van-button type="primary" size="small" v-if="tagActive == 0" @click="approve">{{$t('home.Stake')}}</van-button>
          <van-button type="primary" size="small" v-if="tagActive == 1" @click="withdraw">{{$t('home.Withdraw')}}</van-button>
        </div>
      </div>
    </van-action-sheet>


  </div>
</template>

<script>
import vueQr from 'vue-qr'
import QRCode from 'qrcodejs2' // 引入qrcode
const DFC_ABI = [{"inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_symbol","type": "string"},{"internalType": "uint256","name": "_decimals","type": "uint256"},{"internalType": "uint256","name": "_totalSupply","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Burn","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Issue","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Redeem","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_spender","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "burn","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "issue","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "redeem","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];
const FARM_ABI =[{"inputs":[{"internalType":"contract ERC20","name":"_usdtToken","type":"address"},{"internalType":"contract ERC20","name":"_stakedToken","type":"address"},{"internalType":"address","name":"_payee","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"tokenRecovered","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"AdminTokenRecovery","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCollectionRate","type":"uint256"}],"name":"NewCollectionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"freeBlockNimber","type":"uint256"}],"name":"NewFreeBlockNimber","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newPayee","type":"address"}],"name":"NewPayee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rewardPerBlock","type":"uint256"}],"name":"NewRewardPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"collect_token","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"collect_usdt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_ref","type":"address"},{"internalType":"bool","name":"isUsdt","type":"bool"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"query_account","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"query_agent","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"query_owner","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"query_settle","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"query_stake","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"query_summary","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"uint256","name":"_tokenAmount","type":"uint256"}],"name":"recoverWrongTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"refRewardRates","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"settle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakedToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_collectionRate","type":"uint256"}],"name":"updateCollectionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_freeBlockNimber","type":"uint256"}],"name":"updateFreeBlockNimber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_payee","type":"address"}],"name":"updatePayee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"updateRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"usdtToken","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"activated","type":"bool"},{"internalType":"address","name":"ref","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"avgDepositBlock","type":"uint256"},{"internalType":"uint256","name":"recommendNum1","type":"uint256"},{"internalType":"uint256","name":"recommendAmount1","type":"uint256"},{"internalType":"uint256","name":"recommendNum2","type":"uint256"},{"internalType":"uint256","name":"recommendAmount2","type":"uint256"},{"internalType":"address","name":"top","type":"address"},{"components":[{"internalType":"uint256","name":"inTotal","type":"uint256"},{"internalType":"uint256","name":"rewardTotal","type":"uint256"},{"internalType":"uint256","name":"withdrawTotal","type":"uint256"}],"internalType":"struct AIFarmer.Agent","name":"agent","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
//测试
const USDT_ADDR = "0xDb01C008015364c8A76971843c9866e5a0c44A81";
const TTB_ADDR = "0x9f266FDC27Cb580174F01260cc944D18d3411139"
const FARM_ADDR = "0x71ed25B4261E35EEfd2F83D9EEb4cCBf58152767";
const USER_REF = "0x719795b92Ec33ECA233fb2a4C5aC888F28D5E82d"



// const USDT_ADDR = "0x55d398326f99059ff775485246999027b3197955";  //TTA
// const TTB_ADDR = "0xa0e4587B3a2AD3c7C01e543E3df9B905d63Ca827";
// const FARM_ADDR = "0x051410F5774CD9EC0226D32B81668902d5BfC95c";
// const USER_REF = "0x6B447fB50485aE7eb009e08AFEF6092d261088b5"


class IDO{
    constructor(_web3, _account) {
        this.web3           = _web3;
        this.account        = _account;
        this.contract_dfc   = new this.web3.eth.Contract(DFC_ABI, USDT_ADDR);
        this.contract_ttb   = new this.web3.eth.Contract(DFC_ABI, TTB_ADDR);
        this.contract_farm  = new this.web3.eth.Contract(FARM_ABI, FARM_ADDR);

    }

    async index_page(type) {
        
        let that = this;

        const result = await this.contract_farm.methods.query_account(this.account).call();
        const resultTotal = await this.contract_farm.methods.query_summary().call();
        const stake_result = await this.contract_farm.methods.query_stake(this.account).call();
        let agent_result = ''
        let agentType = false
        this.ref_addr       = stake_result[1]; // 他的推荐者地址
        

        if(String(this.ref_addr)===String(USER_REF)){
           agentType= true
           agent_result = await this.contract_farm.methods.query_agent(this.account).call();
        }

        // console.log('推荐人',this.ref_addr)
        // console.log('钱包',this.account)
        
        // console.log('agent',stake_result)
        

        if(type == 1){ //USDT
            this.farm_allowance = Number(this.web3.utils.fromWei(result[3])); // 合约授权的金额数量
            this.dfc_balance    = this.toNonExponential(Number(this.web3.utils.fromWei(result[4])));   // 当前地址的DFC余额
            this.balance        = this.toNonExponential(Number(this.web3.utils.fromWei(result[4])))
      
        }else{
            this.farm_allowance = Number(this.web3.utils.fromWei(result[1])); // 合约授权的金额数量
            this.dfc_balance    = this.toNonExponential(Number(this.web3.utils.fromWei(result[2])));   // 当前地址的DFC余额
            this.balance        = this.toNonExponential(Number(this.web3.utils.fromWei(result[2])))
        }
        // this.activation     = result[0]; //是否激活
     
        // this.bridge_balance = this.toNonExponential(Number(this.web3.utils.fromWei(result[4])));  // 当前地址的BRIDGE余额
        // this.balance        = this.toNonExponential(Number(this.web3.utils.fromWei(result[3]))); // 当前地址的BNB或TRX余额

        this.amount = this.toNonExponential(Number(this.web3.utils.fromWei(stake_result[2]))); // 当前地址质押的DFC金额
        this.stake_amount = this.toNonExponential(Number(this.web3.utils.fromWei(stake_result[2]))); // 当前地址质押的DFC金额
        this.shares = stake_result[3] //质押开始时间
        this.rewardDebt = Number(this.web3.utils.fromWei(stake_result[4]));  // rewardDebt：用户奖励负债
        this.reward_amount = this.toNonExponential(Number(this.web3.utils.fromWei(stake_result[4]))); // 挖到的BRIDGE金额

        this.total_amount = this.toNonExponential(Number(this.web3.utils.fromWei(resultTotal[1]))); //质押总额


      
        let obj = {}
          let url =window.location.href;
          obj.balance = this.balance
          obj.total_amount = this.total_amount
          obj.bridge_balance = this.bridge_balance
          obj.dfc_balance = this.dfc_balance
          obj.farm_allowance = this.farm_allowance
          obj.ref_addr = this.ref_addr
          obj.rewardDebt = this.rewardDebt
          obj.reward_amount = this.reward_amount
          obj.stake_amount = this.stake_amount
          obj.shares = this.shares

          if(url.indexOf('?ref=') != -1){ //筛选当前连接是否已有邀请码
           let  urlArr = url.split('?ref=')
           url  = urlArr[0]
          }

          obj.account = url+'?ref='+this.account

          obj.agent_result = agent_result
          obj.stake_result = stake_result
          obj.agentType = agentType
          return obj
    }

    approve(amount){
      
    }

    getQueryVariable(variable) {
        let href = window.location.href
        let query = href.substring(href.indexOf('?')+1);
        let vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }

    toNonExponential(num) {
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    }

    async deposit(amount,type) {
      if(amount >= 0){
        let that = this;
       
        let amount1 = amount
        let ref = ''
        if(this.activation){
          ref = this.ref_addr
        } else{

          if(this.getQueryVariable('ref')){
            ref = this.getQueryVariable('ref')
          } else{
            if(amount>0){
              return 'refFail'
            }
          }
        }
        let boolType  =  type == 1 ? true :false
        await this.contract_farm.methods.deposit(this.web3.utils.toWei(amount1), ref,boolType).send({from: this.account})
        .then((tx) => {
            alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
            that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                console.log("result: " + receipt.status);
                return true
                // that.index_page(); // reload
            });
        });
      } else{
        alert("质押数量要大于0");
      }
    }

    async withdraw() {
        let that = this;
        let amount1 = this.stake_amount.toString()
        let ref = ''
        if(this.activation){
          ref = this.ref_addr
        } else{
          if(this.getQueryVariable('ref')){
            ref = this.getQueryVariable('ref')
          } else{
            ref = USER_REF
          }
        }
        await this.contract_farm.methods.withdraw().send({from: this.account}).then((tx) => {
     
            alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
            that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                console.log("result: " + receipt.status);
                return true
                // that.index_page(); // reload
            });
        });
    }

    // async claim() {
    //   let that = this;
      
    //   console.log(1111)
    //   await this.contract_farm.methods.deposit(0, ref).send({from: this.account}).then((tx) => {
    //     alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
    //     that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
    //       console.log("result: " + receipt.status);
    //       return true
    //     });
    //   });
    // }

    async waitForReceipt(tx_hash, max_try, cb) {
        if(max_try <= 0){
            alert("waitForReceipt timeout");
            return;
        }
        let receipt = await this.web3.eth.getTransactionReceipt(tx_hash);
        if (receipt != null) {
            cb(receipt);
        } else {
            await this.sleep(1500);
            this.waitForReceipt(tx_hash, max_try - 1, cb);
        }
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    init() {
        // let that = this;
        // this.index_page();
        // $("#stake").on("click", () => {
        //     that.stake();
        // });
        // $("#unstake").on("click", () => {
        //     that.unstake();
        // });
    }
}
export default {
  name: "pledge",
  components: {
            vueQr //二维码生成组件
  },
  data() {
    return {
      agent_result:{},
      
      showTeamProfit:false,
      agentType:false,
      show: false,
      showType:0,
      tagActive: 0,
      num: '',
      num1: '',
      active: 2,
      activeObj:{},
      showCode: false,
      showTeam : false,
      address: '',
      ido: {},
      ido1: {},
      stake_result:{},
      claimDisabled: true,
      idoBolle: null,
      langvalue: true,
      qrcodeText: "", //二维码内容（扫码识别后需要访问的网址）
      value: 1,
       option1: [
        { text: 'English', value: 1 },
         { text: '繁體中文', value: 2 },
        { text: '日本語', value: 3 },
       ],

    };
  },
  props: {},
  mounted() {
      this.initfarm(0)
      this.initfarm(1)
  },
  watch: {
   
  },
  created(){
   
  },
  methods: {
    cp(){
      console.log(this.address)
    },
    toRule(view){
    
        this.$router.push('/tta/'+view)
    },
    showCodes(){
      this.showCode = true
    },
    showTeams(){
      this.showTeam = true
    },
    showTeamProfits(){
      this.showTeamProfit = true
    },
    changeLang(){
         switch(this.value){
            case 1:
                 this.$i18n.locale = 'en'
            break
            case 3:
                 this.$i18n.locale = 'jpn'
            break
            case 2:
                 this.$i18n.locale = 'cn'
            break
            default:
                 this.$i18n.locale = 'en'
            break
         }
      // this.langvalue = !this.langvalue
      // console.log(this.langvalue)
      // if(this.langvalue === false){
      //   
      // }else{
      //   this.$i18n.locale = 'en'
      // }
    },
     toPage(type){
       this.$router.push('/tta/page'+type)
     },
     maxDepositNum(){
          this.$nextTick(() =>{
            this.num = this.activeObj.dfc_balance
          }) 
    },
    initfarm(type){
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: this.$t('Tips.Connect'),
        forbidClick: true,
      });
    if(type == 0){
       
                    if (window.ethereum) {
                    try {
                        // Request account access if needed
                        window.ethereum.enable().then(accounts => {
                            let web3 = new Web3(window.ethereum);
                            let ido = new IDO(web3, accounts[0]);
                            
                            return new Promise((resolve, reject) => {
                              let data = ido.index_page(0);
                              resolve(data);
                            }).then(data =>{
                              this.ido = data
                              this.agent_result = data.agent_result
                              this.stake_result = data.stake_result
                              this.agentType = data.agentType
                              console.log(data.account)    

                              this.address = data.account
                              this.qrcodeText = data.account
                              console.log('ces',this.agentType,this.agent_result)
                              this.$toast.clear();
                              if(data.reward_amount > 0){
                                this.claimDisabled = false
                              }
                              this.idoBolle = ido
                            }).catch(() => {
                              this.$toast(this.$t("Tips.Error"))
                            })
                        });
                    } catch (error) {
                        alert(error);
                    }
                } else {
                    alert(this.$t("Tips.BrowserTips"));
                }
    }else{
               if (window.ethereum) {
                    try {
                        // Request account access if needed
                        window.ethereum.enable().then(accounts => {
                            let web3 = new Web3(window.ethereum);
                            let ido = new IDO(web3, accounts[0]);
                            
                            return new Promise((resolve, reject) => {
                              let data = ido.index_page(1);
                              resolve(data);
                            }).then(data =>{
                              this.ido1 = data
                              this.$toast.clear();
                              if(data.reward_amount > 0){
                                this.claimDisabled = false
                              }
                              this.idoBolle = ido
                    
                            }).catch(() => {
                              this.$toast(this.$t("Tips.Error"))
                            })
                        });
                    } catch (error) {
                        alert(error);
                    }
                } else {
                    alert(this.$t("Tips.BrowserTips"));
                }
    }
  
    },
    maxApproveNum(){
      this.$nextTick(() =>{
        this.num1 = this.activeObj.stake_amount
      })
    },
    initData(){
      return new Promise((resolve, reject) => {
        let data = this.idoBolle.index_page(this.showType)
        resolve(data);
      }).then(data =>{
        this.ido = data
        this.$toast.clear();
        if(data.reward_amount > 0){
          this.claimDisabled = false
        }
        this.show = false
      })
    },
    getNewData(){
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: this.$t('Tips.Wait'),
        forbidClick: true,
      });
      return new Promise((resolve, reject) => {
         let data = this.idoBolle.index_page(this.showType)
         resolve(data);
      }).then(data =>{
        this.ido = data
        if(data.reward_amount > 0){
          this.claimDisabled = false
        }
        setTimeout(() =>{
          this.$toast.success(this.$t('Tips.Success'));
        },3000)
      })
    },
    approve(){
          if(this.num <= 0){
            this.$toast(this.$t('Tips.MoreAmount'))
            return false;
          }
          if(this.showType == 0){
              if(Number(this.num) > Number(this.ido.dfc_balance)){
                   this.$toast(this.$t('Tips.MoreUsdt'))
                  return false;
          }       
              return new Promise((resolve, reject) => {
                this.$toast.loading({
                  duration: 0, // 持续展示 toast
                  message: this.$t('Tips.Load'),
                  forbidClick: true,
                });
                if(this.ido.balance == 0 || this.ido.dfc_balance == 0){
                  alert(this.$t('Tips.Failed'));
                  return
                } else{
                  let allowanceType = true;
                  console.log('授权金额'+this.ido.farm_allowance)
                  if(this.ido.farm_allowance < this.ido.balance){
                            allowanceType = false;
                            //alert("This operation authorises"+this.num+"USDT to smart contract");
                            alert(this.$t('Tips.Tip1')+this.num+this.$t('Tips.Tip2'));
                            this.$toast.loading({
                              duration: 0, // 持续展示 toast
                              message:  this.$t('Tips.Wait'),
                              forbidClick: true,
                            });
                            this.idoBolle.contract_ttb.methods
                            .approve(FARM_ADDR, this.idoBolle.web3.utils
                            .toWei('9999999999')).
                            send({from: this.idoBolle.account})
                            .then((tx) => {
                              //alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
                              alert(this.$t('Tips.WaitConnect') + tx.transactionHash);

                              this.idoBolle.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                                console.log("result: " + receipt.status);
                                this.$toast.clear();
                                this.$dialog.confirm({
                                  //message: 'Confirming deposit？',
                                  message: this.$t('Tips.ConfirmingTips'),
                                  confirmButtonText: this.$t('Tips.Yes'),
                                  cancelButtonText: this.$t('Tips.No'),
                                  theme: 'round-button',
                                }).then(() => {
                                  this.deposit()
                                })
                                .catch(() => {
                                  this.$toast.clear();
                                  // on cancel
                                });
                              });
                            }).catch(() => {
                                // on cancel
                            }); 
                  }
                    if(allowanceType){
                      this.$toast.clear();
                      this.$dialog.confirm({
                      message: this.$t('Tips.ConfirmingTips'),
                      confirmButtonText: this.$t('Tips.Yes'),
                      cancelButtonText:this.$t('Tips.No'),
                      theme: 'round-button',
                    }).then(() => {
                        this.deposit()
                      })
                      .catch(() => {
                        this.$toast.clear();
                      });
                  }

                }
                
              }).then(key =>{
                
              })  
        }else{
               if(Number(this.num) > Number(this.ido1.dfc_balance) ){
                  this.$toast(this.$t('Tips.MoreUsdt'))
                  return false;
              }       
              return new Promise((resolve, reject) => {
                this.$toast.loading({
                  duration: 0, // 持续展示 toast
                  message: this.$t('Tips.Load'),
                  forbidClick: true,
                });
                if(this.ido1.balance == 0 || this.ido1.dfc_balance == 0){
                  //alert("Failed to connect to wallet, please confirm current account balance");
                  alert(this.$t('Tips.Failed'));
                  return
                } else{
                  let allowanceType = true;
                  console.log('授权金额'+this.ido1.farm_allowance)
                  if(this.ido1.farm_allowance < this.ido1.balance){
                            allowanceType = false;
                            // alert("This operation authorises"+this.num+"DFC to smart contract");
                            alert(this.$t('Tips.Tip1')+this.num+this.$t('Tips.Tip2'));
                            this.$toast.loading({
                              duration: 0, // 持续展示 toast
                              message:this.$t('Tips.Load'),
                              forbidClick: true,
                            });
                            this.idoBolle.contract_dfc.methods
                            .approve(FARM_ADDR, this.idoBolle.web3.utils
                            .toWei('9999999999')).
                            send({from: this.idoBolle.account})
                            .then((tx) => {
                              // alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
                            alert(this.$t('Tips.WaitConnect') + tx.transactionHash);
                             this.idoBolle.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                                console.log("result: " + receipt.status);
                                this.$toast.clear();
                                this.$dialog.confirm({
                                  message:this.$t('Tips.ConfirmingTips'),
                                  confirmButtonText:this.$t('Tips.Yes'),
                                  cancelButtonText: this.$t('Tips.No'),
                                  theme: 'round-button',
                                }).then(() => {
                                  this.deposit()
                                })
                                .catch(() => {
                                  this.$toast.clear();
                                  // on cancel
                                });
                              });
                            }).catch(() => {
                                // on cancel
                            }); 
                  }
                    if(allowanceType){
                      this.$toast.clear();
                      this.$dialog.confirm({
                      message:this.$t('Tips.ConfirmingTips'),
                      confirmButtonText: this.$t('Tips.Yes'),
                      cancelButtonText: this.$t('Tips.No'),
                      theme: 'round-button',
                    }).then(() => {
                        this.deposit()
                      })
                      .catch(() => {
                        this.$toast.clear();
                      });
                  }

                }
                
              }).then(key =>{
                
              })  
        }
    },
    withdraw(){
      return new Promise((resolve, reject) => {
            this.$toast.loading({
              duration: 0, // 持续展示 toast
              message:  this.$t('Tips.Load'),
              forbidClick: true,
            });
            let key = this.idoBolle.withdraw()
            resolve(key);
          }).then(key =>{
            this.$toast.clear();
            this.num1 = 0
            this.initData()
          }).catch(() =>{
            // this.$toast.fail('Withdraw Fail')
             this.$toast.fail(this.$t('Tips.WiFail'))
          })
    },
    claim(){
      return new Promise((resolve, reject) => {
            this.$toast.loading({
              duration: 0, // 持续展示 toast
              message: 'Claim...',
              forbidClick: true,
            });
            let key = this.idoBolle.deposit('0')
            resolve(key);
          }).then(key =>{
            this.$toast.clear();
            this.initData()
          })
          // .catch(() =>{
          //   this.$toast.fail('Claim Fail')
          // })
    },
    deposit(){
       return new Promise((resolve, reject) => {
            this.$toast.loading({
              duration: 0, // 持续展示 toast
              message: 'Please Wait...',
              forbidClick: true,
            });
            let key = this.idoBolle.deposit(this.num,this.showType)
            resolve(key);
          }).then(key =>{
            if(key === 'refFail'){
                  this.$toast(this.$t('Tips.RefTips'));
            }else{
              this.$toast.clear();
              this.num = ''
              this.initData()
            }
            
          })
    },
    qrcode(QRCodetext) {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: QRCodetext,
          width: 160,
          height: 160,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
    },
    // COPYED
    onCopy(e){
      this.$toast.success(this.$t('Tips.Copyed'))
    },
    // FAIL
    onError(e){
      this.$toast.fail(this.$t('Tips.Fail'))
    },
    changeTab(index){
      if(index == 0 || index == 2){
        return
      } else{
        this.$router.push({path: '/tron/staking'})
      }
      // this.active = index
    },
    showTask(type){
       this.num=0
       this.$dialog.confirm({
          message: this.$t('Tips.SelectTip'),
          confirmButtonText: 'USDT',
          cancelButtonText: 'FT',
          theme: 'round-button',
        }).then(() => {
            this.showType = 1
            this.activeObj = this.ido1
            this.show = true
        })
        .catch(() => {
            this.activeObj = this.ido
            this.showType = 0
            this.show = true
        });
       
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
body{
  background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
  background-color: rgb(44, 49, 59) !important;
}
   /deep/ .van-dropdown-menu__bar{
      .van-ellipsis,.van-dropdown-menu__title{
          color:white  !important;
      }
        background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
        background-color: rgb(44, 49, 59) !important;
    }
    .teamBox{
      background-color: white;
      width: 100%;
      height:100%;
        background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
  background-color: rgb(44, 49, 59) !important;
      .teamBoxContent{
        width:80%;
        height:80%;
        margin:150px auto;
          p{
            color: white;
            font-size:1em;
            text-align: left;
            span{
              color:red
            }
          }
      }
    }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
.intrBox{
  width:98%;
  height:150px;
  margin:0 auto;
  line-height:150px;
  border-radius:15px;
  margin-top:70px;
  font-size:1.2rem;
  color: white;
  border: 1px solid #4ed8de;
  background:url('../assets/img/bg1.png') center no-repeat;
  background-size:100% 100%; 
}
.intrBox2{
  background:url('../assets/img/bg2.png') center no-repeat;
  background-size:100% 100%; 
}
.content-box{
  font-family: "Ubuntu","Roboto",sans-serif;
    .imgbox>img{
        width:1rem !important;
        height: 1rem  !important;
  }
  .eSyZIh {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}
  //   .nav-link{
  //   color: white !important;
  //   font-size:16px;
  // }
  .head-box{
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo{
      font-size: 1rem;
      color: #fff;
    }
  }
  .swich-box{
    width: 90vw;
    margin: 0 auto;
    border-radius: 0.9rem;
    background-color: #6d2c45;
    box-shadow: 0 2px 4px 0 rgba(138,31,31,.3), 0 0 6px 0 rgba(88,27,27,.1);
    display: flex;
    align-items: center;
    span{
      color: #fff;
      font-size: 0.8rem;
      line-height: 2.6rem;
      width: 30vw;
      position: relative;
    }
    .s1{
      background-color: #8f2650;
      border-radius: 0.92rem;
      width: 35vw;
      z-index: 9;
      box-shadow: 0 4px 4px 0 rgba(138,31,31,.3), 0 0 6px 0 rgba(88,27,27,.1);
    }
    .s2{
      border-radius: 0 0.9rem 0.9rem 0;
      width: 40vw;
      margin-left: -1rem;
      z-index: 8;
      box-shadow: 0 4px 4px 0 rgba(138,31,31,.3), 0 0 6px 0 rgba(88,27,27,.1);
    }
    .s3{
      background-color: #8f2650;
      border-radius: 0 0.92rem 0.92rem 0;
      width: 35vw;
      z-index: 7;
      box-shadow: 0 4px 4px 0 rgba(138,31,31,.3), 0 0 6px 0 rgba(88,27,27,.1);
      margin-left: -1rem;
    }
    .active{
      background-color: #e66799;
    }
  }
  .inter-box{
    width: 90vw;
    margin: 0 auto;
    margin-top: 2rem;
    .content-title{
      font-size: 1rem;
      color: #4ed8de;
      text-shadow: 0 0 12px #4ed8de;
      text-align: left;
      font-weight: unset;
      text-indent: 1rem;
      margin-bottom: 0.6rem;
    }
    .cell-box{
      width: 100%;
      border: 1px solid #757575;
      border-radius: 0.8rem;
      padding: 1rem;
      box-sizing: border-box;
      .div1{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 0.6rem;
        img{
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          overflow: hidden;
        }
        .s1{
          font-size: 0.8rem;
          color: #e66799;
          margin-left: 0.6rem;
          font-weight: 600;
        }
        .s2{
          margin-left: auto;
          font-size: 1.2rem;
          color: #4ed8de;
          text-shadow: 0 0 12px #4ed8de;
          font-weight: unset;
        }
      }
      .div2{
        width: 100%;
        display: flex;
        align-items: center;
        color: #fff;
        margin-bottom: 0.2rem;
        .s1{
          font-size: 0.6rem;
          color: #dedddd;
        }
        .s2{
         color: #4ed8de;
          text-shadow: 0 0 12px #4ed8de;
          font-size: 0.8rem;
          margin-left: auto;
        }
      }
    }
  }
  .action-box{
    background-image: radial-gradient(50% 50% at 50% 50%, rgba(255, 0, 0, 0.1) 10%, rgba(255, 255, 255, 0) 100%);
    background-color: #14171f !important;
    color: #fff;
    height: 100vh;
    max-height: 100%;
    /deep/ .van-action-sheet__header{
      text-align: left;
      padding-left: 3rem;
      box-sizing: border-box;
      font-weight: 200;
      font-size: 0.8rem;
      .van-action-sheet__close{
        left: 0;
        right: inherit;
        color: #fff;
      }
    }
    .content{
      .title1{
        font-size: 1.1rem;
        color: #e66799;
      }
      .title2{
        font-size: 0.8rem;
        color: #4ed8de;
        text-shadow: 0 0 12px #4ed8de;
        font-weight: unset;
        text-indent: 1rem;
        margin-top: 0.2rem;
      }
      .cell-box{
        width: 80%;
        margin: 0 auto;
        border-top: 1px solid #a09b9b;
        border-bottom: 1px solid #a09b9b;
        padding: 0.6em 0;
        margin-top: 2rem;
        .div1{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .s1{
            font-size: 0.8rem;
            color: #d8d5d5;
          }
          .s2{
            margin-left: auto;
            display: flex;
            flex-direction: column;
            /deep/ .van-icon{
              font-size: 1rem;
            }
            span{
              font-size: 0.6rem;
              color: #d8d5d5;
            }
          }
        }
        .div2{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: 0.6rem 0;
          .d1{
            font-size: 0.8rem;
            color: #d8d5d5;
            display: flex;
            align-items: center;
            .van-icon{
              font-size: 0.6rem;
              margin-left: 0.2rem;
            }
          }
          .d2{
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            span{
              font-size: 0.6rem;
              color: #d8d5d5;
            }
            .s1{
              font-size: 0.8rem;
              color: #fff;
              margin-bottom: 0.2rem;
            }
          }
        }
        .div3{
          align-items: flex-start;
          margin-bottom: 0;
        }
        .botton-box{
          display: flex;
          width: 100%;
          justify-content: flex-end;
          margin-top: 0.2rem;
          /deep/ .van-button{
              height: 1.6rem;
              padding: 0 0.4rem;
              margin-left: 0.2rem;
              .van-button__text{
                color: #666;
              }
            }
        }
      }
      .tag-box{
        width: 80%;
        margin: 0 auto;
        border-bottom: 1px solid #a09b9b;
        padding-bottom: 1rem;
        /deep/ .van-tabs__nav{
          background-color: transparent;
          .van-tab{
            flex: inherit;
            .van-tab__text{
              color: #d8d5d5;
              font-size: 0.8rem;
              line-height: 1rem;
            }
          }
          .van-tab:first-child{
            .van-tab__text{
              border-right: 1px solid #ccc;
              padding-right: 0.4rem;
            }
          }
          .van-tab--active{
            .van-tab__text{
              color: #e66799;
            }
          }
          .van-tabs__line{
            display: none;
          }
        }
        /deep/ .van-tabs__content{
          .tip{
            text-align: right;
            color: #d8d5d5;
          }
          .van-cell{
            background-color: #777070;
            border-radius: 2rem;
            padding: 0.2rem 0.8rem;
            margin-top: 1rem;
            .van-field__control{
              color: #333;
              text-align: right;
            }
            .van-field__control::placeholder {
              color: #ccc;
            }
            .van-button{
              border-radius: 1rem;
              background-color: #dad6d6;
              border: none
            }
          }
          .van-cell::after{
            display: none;
          }
          .b-x{
            text-align: right;
            font-size: 0.6rem;
            color: #d8d5d5;
            margin-top: 0.4rem;
            span{
              font-size: 0.8rem;
            }
          }
        }
      }
      .bottom-box{
        width: 100%;
        margin-top: 1rem;
        text-align: center;
        padding-bottom: 2rem;
        /deep/ .van-button{
          width: 80%;
          margin: 0 auto;
          font-size: 1.2rem;
        }
        span{
          width: 100%;
          display: block;
        }
        .s1{
          color: #fff;
          font-size: 0.6rem;
        }
        .s2{
          color: #fff;
          font-size: 1.2rem;
          margin-top: 0.6rem;
        }
        .van-button{
          // background-color: #676363;
          border: none;
          border-radius: 2rem;
          // color: #d8d5d5;
          color: #fff;
          margin-top: 2rem;
        }  
      }
    }
  }
  .dialog-box{
  background: #212429;
  /deep/ .num-box{
    margin-top: 2rem!important;
    padding: 0;
    .van-field__control{
      color: #fff;
    }
    span{
      font-size: 1.2rem;
      color: #fff;
    }
  }
  /deep/ .van-button--default{
    background: #212429;
    color: #fff!important;
  }
  /deep/ .van-hairline--top::after{
    display: none;
  }
  /deep/ [class*=van-hairline]::after{
    display: none;
  }
}
.copy{
  display: block;
  margin: 30px auto;
  padding: 0 0.5rem;
  height: 2rem;
}
.eSyZIh {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}
.navbar, .navbar .container, .navbar .container-fluid, .navbar .container-lg, .navbar .container-md, .navbar .container-sm, .navbar .container-xl {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.navbar {
    position: relative;
    padding: .5rem 1rem;
}
.navbar-light .navbar-brand, .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover {
    color: rgba(0,0,0,.9);
}
.navbar-brand {
    display: inline-block;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
}
.kSqeJg {
    width: 30px;
    height: 30px;
}
.navbar-nav {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    margin-right: 0px !important;
    flex-direction: row !important;
}
.elGnVD {
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(108, 114, 132) !important;
    margin-left: 10px;
    font-size: 17px;
}
.iPuEOf {
    font-size: 18px;
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(255, 255, 255) !important;
    margin-left: 10px;
    font-size: 17px;
    padding-right: 0;
    padding-left: 0;
}
.nav-link {
    display: block;
    padding: .5rem 0.2rem;
}
.content1-box{
    width: 90%;
    height: 18rem;
    margin: 0 auto;
    border-radius: 1rem;
    background: rgb(33, 36, 41);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    margin-top: 1rem;
    .code-box{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      img{
        width: 10rem;
        height: 10rem;
      }
    }
    /deep/ .num-box{
      width: 100%;
      background: rgb(33, 36, 41);
      margin-top: 0.4rem;
      flex-direction: column;
      .van-field__label{
        width: 100%;
        font-size: 0.6rem;
        text-align: center;
      }
      .van-field__value{
        width: 100%;
        input{
          font-size: 0.5rem;
          text-align: center;
        }
      }
    }
  }
}
</style>