// SPDX-License-Identifier: GPLv3
pragma solidity ^0.6.12;

library SafeMath {
    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint c = a - b;

        return c;
    }

    function mul(uint a, uint b) internal pure returns (uint) {
        if (a == 0) {
            return 0;
        }

        uint c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint a, uint b) internal pure returns (uint) {
        require(b > 0, "SafeMath: division by zero");
        uint c = a / b;

        return c;
    }
}

interface ERC20 {
    function balanceOf(address who) external view returns (uint);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
}

contract Ownable {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "address is null");
        owner = newOwner;
    }
}

contract BridgeFarm is Ownable {
    using SafeMath for uint;
    uint  daily_reward = 5 * (10 ** 18);

    struct user{
        bool actived;
        address ref;

        uint stake_amount;
        uint stake_date;
        uint settle_date;
        uint ref_amount;
        uint reward;
    }
    mapping(address => user) users;

    uint total_amount;
    uint total_users;

    ERC20 erc20_token;
    ERC20 erc20_reward;

    constructor(address _stake_token_addr, address _reward_token_addr) public {
        erc20_token = ERC20(_stake_token_addr);
        erc20_reward = ERC20(_reward_token_addr);
        users[msg.sender].actived = true;
        users[msg.sender].ref = address(0);
        users[msg.sender].stake_amount = 1;
        users[msg.sender].stake_date = block.timestamp;
        users[msg.sender].settle_date = block.timestamp;
        total_amount = 1;
        total_users = 1;
    }

    // 质押DFC方法
    // amount 质押的DFC数量
    // ref 推荐者的地址
    function deposit(uint amount, address ref) public returns (bool){
        require(amount > 0, "amount need more than zero");
        require(users[msg.sender].actived || users[ref].actived, "ref is not actived");

        if(users[msg.sender].actived == false){
            users[msg.sender].actived = true;
            users[msg.sender].ref = ref;
            total_users = total_users.add(1);
        }

        erc20_token.transferFrom(msg.sender, address(this), amount);
        total_amount = total_amount.add(amount);

        if(users[msg.sender].stake_amount > 0 && block.timestamp > users[msg.sender].settle_date){
            uint reward = calc_reward(msg.sender);
            if(reward > 0){
                users[msg.sender].reward = users[msg.sender].reward.add(reward);
            }
        }

        users[msg.sender].settle_date = block.timestamp;
        users[msg.sender].stake_date = block.timestamp;
        users[msg.sender].stake_amount = users[msg.sender].stake_amount.add(amount);

        address _ref = users[msg.sender].ref;

        for(uint i = 0; i < 2; i++){
            if(users[_ref].actived){
                if(users[_ref].stake_amount > 0 && block.timestamp > users[_ref].settle_date){
                    uint reward = calc_reward(_ref);
                    if(reward > 0){
                        users[_ref].reward = users[_ref].reward.add(reward);
                        users[_ref].settle_date = block.timestamp;
                    }
                }

                uint ref_amount;
                if(i == 0){ref_amount = amount.mul(7).div(100);}
                if(i == 1){ref_amount = amount.mul(3).div(100);}

                users[_ref].ref_amount = users[_ref].ref_amount.add(ref_amount);

                _ref = users[_ref].ref;
            }
        }

        return true;
    }

    // 采集挖到的BRIDGE币
    function claim() public returns(bool) {
        require(users[msg.sender].actived, "not actived user");
        require(users[msg.sender].stake_amount > 0, "not yet stake token");

        uint reward = users[msg.sender].reward.add(calc_reward(msg.sender));
        users[msg.sender].reward = 0;
        users[msg.sender].settle_date = block.timestamp;
        if(reward > 0){
            erc20_reward.transfer(msg.sender, reward);
        }

        return true;
    }

    // 取消质押DFC，退回DFC币给用户
    function withdraw() public returns (bool){
        require(users[msg.sender].actived, "not actived user");
        require(users[msg.sender].stake_amount > 0, "not yet stake token");

        bool result = claim();
        require(result == true, "transfer reward fail");

        uint stake_amount = users[msg.sender].stake_amount;
        uint ref_amount = users[msg.sender].ref_amount;

        users[msg.sender].stake_amount = 0;
        users[msg.sender].stake_date = 0;
        users[msg.sender].ref_amount = 0;

        total_amount = total_amount.sub(stake_amount);

        erc20_token.transfer(msg.sender, stake_amount.mul(90).div(100).add(ref_amount));

        return true;
    }

    // 查询用户基本信息
    // addr 用户地址
    function query_account(address addr)public view returns(bool, address, uint, uint, uint, uint){
        return (users[addr].actived,  //是否激活
                users[addr].ref,  // 他的推荐者地址
                erc20_token.allowance(addr, address(this)), // 合约授权的金额数量
                addr.balance,  // 当前地址的BNB或TRX余额
                erc20_token.balanceOf(addr),  // 当前地址的DFC余额
                erc20_reward.balanceOf(addr)); // 当前地址的BRIDGE余额
    }

    // 查询质押信息
    // addr 用户地址
    function query_stake(address addr)public view returns(uint, uint, uint, uint){
        return (users[addr].stake_amount, // 当前地址质押的DFC金额
                users[addr].stake_date,  // 质押开始时间
                users[addr].ref_amount,  // 推荐奖励的DFC金额
                users[addr].reward.add(calc_reward(addr))); // 挖到的BRIDGE金额
    }

    function query_summary()public view returns(uint, uint, uint) {
        return (total_users, total_amount, daily_reward);
    }

    function collect_token(address addr, uint amount) public onlyOwner returns (bool){
        require(addr != address(0), "address is null");
        erc20_token.transfer(addr, amount);
        return true;
    }

    function collect_reward(address addr, uint amount) public onlyOwner returns (bool){
        require(addr != address(0), "address is null");
        erc20_reward.transfer(addr, amount);
        return true;
    }

    function update_daily_reward(uint new_daily_reward) public onlyOwner returns (bool){
        require(new_daily_reward > 0, "need great than zero");
        daily_reward = new_daily_reward;
        return true;
    }

    function calc_reward(address addr) private view returns(uint){
        uint all_amount = users[addr].stake_amount.mul(90).div(100).add(users[addr].ref_amount);

        uint settle_time = block.timestamp.sub(users[addr].settle_date);

        return daily_reward.mul(all_amount).div(total_amount).mul(settle_time).div(1 days);
    }
}