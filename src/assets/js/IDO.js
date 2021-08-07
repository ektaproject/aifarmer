class IDO{
    constructor(_web3, _account) {
        this.web3           = _web3;
        this.account        = _account;
        this.contract_dfc   = new this.web3.eth.Contract(DFC_ABI, DFC_ADDR);
        this.contract_ttb   = new this.web3.eth.Contract(DFC_ABI, TTB_ADDR);
        this.contract_farm  = new this.web3.eth.Contract(FARM_ABI, FARM_ADDR);

    }

    async index_page(type) {
        
        let that = this;
        const result = await this.contract_farm.methods.query_account(this.account).call();
        const resultTotal = await this.contract_farm.methods.query_summary().call();
        const stake_result = await this.contract_farm.methods.query_stake(this.account).call();
        this.ref_addr       = result[0]; // 他的推荐者地址

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
          obj.account = window.location.href+'?ref='+this.account
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
            ref = USER_REF
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

export default IDO