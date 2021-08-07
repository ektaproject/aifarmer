// SPDX-License-Identifier: GPLv3
pragma solidity ^0.6.12;

interface ERC20 {
    function balanceOf(address who) external view returns (uint);
    function decimals() external view returns (uint);
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

contract BridgeTransfer is Ownable {
    struct Transaction{
        address token_address;
        address from_address;
        string  to_address;
        uint    to_chain;
        uint    amount;
        uint    decimals;
        uint    time;
    }
    struct User{
        Transaction[] trans;
    }
    mapping(address => User) users;
    Transaction[] all_trans;

    // 存入要转账的token
    // token_address token的合约地址
    // to_address 收款目标地址的字符串
    // to_chain 收款目标链的编号
    // amount 转账的金额
    function deposit(address token_address, string memory to_address, uint to_chain, uint amount) public returns (bool){
        require(token_address != address(0), "token_address is null");
        require(amount > 0, "amount must great than zero");

        ERC20 token = ERC20(token_address);
        bool result = token.transferFrom(msg.sender, address(this), amount);
        require(result == true, "transferFrom fail");
        uint decimals = token.decimals();
        Transaction memory tran = Transaction(token_address, msg.sender, to_address, to_chain, amount, decimals, block.timestamp);

        users[msg.sender].trans.push(tran);
        all_trans.push(tran);

        return true;
    }

    // 查询账户信息
    // addr 账户的地址
    function query_account(address addr)public view returns(uint, uint){
        return (addr.balance,              // 当前账户的BNB或TRX余额
                users[addr].trans.length); // 当前账户总共有多少次跨链转账
    }

    // 查询token的余额鹅和授权情况
    // addr 要查询的地址
    // token_address token的合约地址
    function query_token(address addr, address token_address)public view returns(uint, uint){
        ERC20 token = ERC20(token_address);

        return (token.balanceOf(addr),                 // token的余额
                token.allowance(addr, address(this))); // token的授权情况
    }

    // 查询用户指定编号的跨链转账详情
    // addr 查询的用户地址
    // index 查询转账的索引编号，不能大于等于query_account返回的总共跨链转账次数
    function query_user_tran(address addr, uint index)public view returns(address, string memory, uint, uint, uint, uint){
        require(index < users[addr].trans.length, "index out of bounds");

        return (users[addr].trans[index].token_address, // token的合约地址
                users[addr].trans[index].to_address,    // 转账目标地址
                users[addr].trans[index].to_chain,      // 收款目标链的编号
                users[addr].trans[index].amount,        // 转账的金额
                users[addr].trans[index].decimals,      // 转账的金额小数位
                users[addr].trans[index].time);         // 转账发起时间（秒），unix timestamp
    }

    // 查询合约总共的跨链转账次数
    function query_all_trans_length()public view returns(uint) {
        return all_trans.length;
    }

    // 查询整个合约指定编号的跨链转账详情
    // index 查询转账的索引编号，不能大于等于query_all_trans_length返回的总共跨链转账次数
    function query_tran(uint index)public view returns(address, address, string memory, uint, uint, uint, uint) {
        require(index < all_trans.length, "index out of bounds");

        return (all_trans[index].token_address, // token的合约地址
                all_trans[index].from_address,  // 转账发起的用户地址
                all_trans[index].to_address,    // 转账目标地址
                all_trans[index].to_chain,      // 收款目标链的编号
                all_trans[index].amount,        // 转账的金额
                all_trans[index].decimals,      // 转账的金额小数位
                all_trans[index].time);         // 转账发起时间（秒），unix timestamp
    }

    function collect(address token_address, address collect_address, uint amount) public onlyOwner returns (bool){
        require(token_address != address(0), "token_address is null");
        require(collect_address != address(0), "collect_address is null");
        require(amount > 0, "amount must great than zero");

        ERC20 token = ERC20(token_address);
        token.transfer(collect_address, amount);

        return true;
    }
}