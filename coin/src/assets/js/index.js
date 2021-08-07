const DFC_ABI = [{"inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_symbol","type": "string"},{"internalType": "uint256","name": "_decimals","type": "uint256"},{"internalType": "uint256","name": "_totalSupply","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Burn","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Issue","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"}],"name": "Redeem","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "address","name": "_spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_spender","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "burn","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "issue","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "redeem","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_from","type": "address"},{"internalType": "address","name": "_to","type": "address"},{"internalType": "uint256","name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];
const FARM_ABI = [{"inputs": [{"internalType": "address","name": "_stake_token_addr","type": "address"},{"internalType": "address","name": "_reward_token_addr","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "claim","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "addr","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "collect_reward","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "addr","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "collect_token","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"},{"internalType": "address","name": "ref","type": "address"}],"name": "deposit","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "addr","type": "address"}],"name": "query_account","outputs": [{"internalType": "bool","name": "","type": "bool"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "addr","type": "address"}],"name": "query_stake","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "query_summary","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_daily_reward","type": "uint256"}],"name": "update_daily_reward","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdraw","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];

const DFC_ADDR = "0x9894da337D3Ba4F166AB6A3f0b6051293e5132a1";
const FARM_ADDR = "0x03129c20963AB7cF0885433b320435D517E76B83";

class IDO{
    constructor(_web3, _account) {
        this.web3           = _web3;
        this.account        = _account;
        this.contract_dfc   = new this.web3.eth.Contract(DFC_ABI, DFC_ADDR);
        this.contract_farm  = new this.web3.eth.Contract(FARM_ABI, FARM_ADDR);
    }

    async index_page() {
        let that = this;
        $("#addr").text(this.account);
        let result = await this.contract.methods.query_account(this.account).call();
        // 0 addr.balance,
        // 1 token.balanceOf(addr),
        // 2 token.allowance(addr, address(this)),
        // 3 users[addr].stake_amount,
        // 4 users[addr].stake_date,
        // 5 users[addr].ref_count

        this.bnb_balance     = Number(this.web3.utils.fromWei(result[0]));
        this.token_balance   = Number(this.web3.utils.fromWei(result[1]));
        this.token_allowance = Number(this.web3.utils.fromWei(result[2]));
        this.stake_amount    = Number(this.web3.utils.fromWei(result[3]));
        this.stake_date      = Number(result[4]) * 1000;
        this.ref_count       = Number(result[5]);

        if(this.token_allowance == 0){
            alert("授权合约访问你的账户");
            this.contract_token.methods.approve(CONTRACT_ADDR, this.web3.utils.toWei("100000000")).send({from: this.account}).then((tx) => {
                alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
                that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                    alert("result: " + receipt.status);
                    that.index_page(); // reload
                });
            });
        } else {
            $("#user_bnb").text(this.bnb_balance);
            $("#user_token").text(this.token_balance);
            $("#user_stake").text(this.stake_amount);
            $("#user_stake_date").text(new Date(this.stake_date).toLocaleString());
            $("#user_ref_count").text(this.ref_count);
        }
    }

    stake() {
        let that = this;
        let amount = $("#stake_amount").val();
        let ref = $("#ref").val();
        if(ref != ""){
            if(!this.web3.utils.isAddress(ref)){
                alert("推荐人地址错误");
                return;
            }
        } else {
            ref = CONTRACT_ADDR;
        }

        this.contract.methods.stake(this.web3.utils.toWei(amount), ref).send({from: this.account}).then((tx) => {
            alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
            that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                alert("result: " + receipt.status);
                that.index_page(); // reload
            });
        });
    }

    unstake() {
        let that = this;
        let amount = $("#unstake_amount").val();
        this.contract.methods.unstake(this.web3.utils.toWei(amount)).send({from: this.account}).then((tx) => {
            alert("Waiting for confirmation,the hash is：" + tx.transactionHash);
            that.waitForReceipt(tx.transactionHash, 6, (receipt) => {
                alert("result: " + receipt.status);
                that.index_page(); // reload
            });
        });
    }

    async waitForReceipt(tx_hash, max_try, cb) {
        if(max_try <= 0){
            alert("waitForReceipt timeout");
            return;
        }

        let receipt = await this.web3.eth.getTransactionReceipt(tx_hash);
        if (receipt != null) {
            cb(receipt);
            // receipt struct:
            // {
            // "status": true,
            // "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
            // "transactionIndex": 0,
            // "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
            // "blockNumber": 3,
            // "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
            // "cumulativeGasUsed": 314159,
            // "gasUsed": 30234,
            // "logs": [{
            //     // getPastLogs 等返回的日志对象
            // }, ...]}
        } else {
            await sleep(1500);
            thius.waitForReceipt(tx_hash, max_try - 1, cb);
        }
    }

    init() {
        let that = this;
        this.index_page();
        $("#stake").on("click", () => {
            that.stake();
        });
        $("#unstake").on("click", () => {
            that.unstake();
        });
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

window.addEventListener("load", () => {
    if (window.ethereum) {
        try {
            // Request account access if needed
            window.ethereum.enable().then(accounts => {
                let web3 = new Web3(window.ethereum);
                let ido = new IDO(web3, accounts[0]);
                ido.init();
            });
        } catch (error) {
            alert(error);
        }
    } else {
        alert("need dapp browser");
    }
});