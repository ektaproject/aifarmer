const DFC_ADDR = "TFChegpQrUSEyPWnCj4SCDtgRWsZ7TV3Vn";
const FARM_ADDR = "TPMKN8u9FkbgyE7Z78VdoncPDwQJ2UZRfk";

var dapp = new Vue({
    el: '#troncash_app',
    data: {
        //=== sys =========
        vote_option: 0,
        sys_status: 0,
        vote_restart_count: 0,
        claim_profit: 0,
        //=== common ======
        user_ref: '',
        contract: {},
        usdt_contract: {},
        thh_contract: {},
        claim_contract: {},
        tronWeb: {},
        tips_msg: '',
        isCN: i18n.locale == "cn",
        isEN: i18n.locale == "en",
    },
    mounted() {
        let obj = setInterval(async () => {
            if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
                clearInterval(obj);
                this.address = window.tronWeb.defaultAddress.base58;
                this.tronWeb = window.tronWeb;

                this.contract_dfc = await this.tronWeb.contract().at(CONTRACT_ADDR);
                this.contract_farm = await this.tronWeb.contract().at(CONTRACT_USDT_ADDR);
            }
        }, 10);
    },
    methods: {
        async sys_status_show() {
            let sys_result = await this.contract.query_sys(this.address).call();
            // 0 sys_status, 
            // 1 sys_status_start_timestamp, 
            // 2 vote_restart_count, 
            // 3 vote_liquidate_count,
            // 4 round,
            // 5 users[addr].round,
            // 6 users[addr].vote_round
            this.sys_status           = Number(sys_result[0]);
            this.vote_restart_count   = Number(sys_result[2]);
            this.vote_liquidate_count = Number(sys_result[3]);
            this.round                = Number(sys_result[4]);
            this.user_round           = Number(sys_result[5]);
            this.vote_round           = Number(sys_result[6]);
            
            switch(this.sys_status) {
                case 0: //normal
                    if(this.user_round < this.round){
                        $("#restart_confirm").show();
                    }
                    break;
                case 1: //voting
                    if(this.vote_round < this.round){
                        $("#vote_confirm").show();
                    }
                    break;
                case 2: //restarting
                    if(this.user_round < this.round){
                        $("#restart_confirm").show();
                    }
                    break;
                case 3: //liquidating
                    $("#liquidate_confirm").show();
                    break;
                default:
                    break;
            }
        },
        //=== wallet view ===========================================
        async wallet_page() {
            let page_result = await this.contract.query_wallet_page(this.address).call();
            //  0   users[addr].actived,
            //  1   usdt.allowance(addr, address(this)), 
            //  2   usdt.balanceOf(addr), 
            //  3   thh.balanceOf(addr), 
            //  4   addr.balance,
            //  5   calc_earnings(addr),
            //  6   users[addr].total_earnings);
            this.actived        = page_result[0];
            this.allowance      = Number(this.tronWeb.fromSun(page_result[1]));
            this.usdt_balance   = Number(this.tronWeb.fromSun(page_result[2]));
            this.thh_balance    = Number(this.tronWeb.fromSun(page_result[3]));
            this.trx_balance    = Number(this.tronWeb.fromSun(page_result[4]));
            if(this.allowance > 0){
                if(this.trx_balance < 150){
                    this.show_msg(false, 'no_more_trx');
                }

                this.earnings       = 0;
                this.total_earnings = 0;
                if(this.actived) {
                    this.earnings       = Number(this.tronWeb.fromSun(page_result[5]));
                    this.total_earnings = Number(this.tronWeb.fromSun(page_result[6]));
                    this.sys_status_show();
                }
            } else {
                $("#approve_confirm").show();
            }
        },
        async approve() {
            let that = this;
            this.usdt_contract.approve(CONTRACT_ADDR, this.tronWeb.toSun(100000000)).send().then(tid => {
                that.waitForReceipt(tid, (result) => {
                    if (result == "SUCCESS") {
                        that.wallet_page();
                    }
                });
                $("#approve_confirm").hide();
                that.show_msg(true, 'wait_block');
            }).catch(error => {
                $("#approve_confirm").hide();
                that.show_msg(false, error, true);
            });
        },
        withdraw_earnings() {
            if(this.earnings > 0){
                $("#withdraw_confirm").show();
            } else {
                this.show_msg(false, 'no_earnings');
            }
        },
        async withdraw_confirm() {
            let that = this;
            this.contract_dfc.withdraw_earnings().send().then(tid => {
                that.waitForReceipt(tid, (result) => {
                    if (result == "SUCCESS") {
                        that.wallet_page();
                    }
                });
                $("#withdraw_confirm").hide();
                that.show_msg(true, 'wait_block');
            }).catch(error => {
                $("#withdraw_confirm").hide();
                that.show_msg(false, error, true);
            });
        },
        waitForReceipt(tid, cb) {
            window.setTimeout(function () {
                cb('SUCCESS');
            }, 3500);
        },
    }
});