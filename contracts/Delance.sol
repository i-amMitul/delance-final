// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
// allows to pass arrays, structs, dynamic and nested variables to function and return same from functions
// after latest solidity update, pragmra abicoder v2 is included by default.
// pragma experimental ABIEncoderV2;

contract Delance {
  // properties of freelancer-employee contract
  address public employer;
  address public freelancer;
  uint256 public deadline; // deadline will start counting from time of uploading the block
  uint256 public price;
  uint256 public contract_balance;

  constructor (address payable _address, uint256 _deadline, uint256 _price) payable {
    require(_address != msg.sender, "employer cannot hire himself");
    require(msg.value == _price, "Deposit amount = price of ether");
    employer = payable(msg.sender);
    freelancer = _address;
    deadline = block.timestamp + _deadline;
    price = _price;
    contract_balance = _price;
  }

  // this function is used if anyone wants to send ether to the contract.
  // It could be employer, freelancer, or even you, or me :)
  receive() external payable {}

  // implementing the freelencer sending request part of the contract.
  // struct to store payment request of freelancer.
  struct Request {
    string title;
    uint256 amount; // why uint256?? - same as uint, no difference
    bool locked;  // initialially request will be locked, employer will unlock it and transfer required ether.
    bool paid;
  }

  // creating a modifier - function restrictor so only freelancer can call certain functions
  // it is useful if you do not want to repeat require statement again and again.
  modifier onlyFreelancer() {
    require(msg.sender == freelancer, 'only freelancer');
    _;
  }
  modifier onlyEmployer(){
    require(msg.sender == employer, 'only employer');
    _;
  }

  // event is same as javascript console.log() function.
  // It prints the event to the console. These events can checked
  // to see if a transaction actually happened or not.
  event RequestCreated(string _title, uint256 _amount, bool locked, bool paid);
  event RequestUnlocked(bool locked);
  event RequestPaid(address payable freelancer, uint256 amount);
  event DeadlineChanged(uint new_deadline);
  event Withdraw_All_Ether();

  Request[] public requests;
  function createRequest(string memory _title, uint256 _amount) public onlyFreelancer {
    require(_amount>=0, 'amount should be >=0');  // should be handled by uint itself
    require(_amount <= contract_balance, "amount cannot be > contract balance");

    requests.push(Request(_title, _amount, true, false));
    emit RequestCreated(_title, _amount, true, false);
  }
  function getAllRequest() public view returns(Request[] memory) {
    return requests;
  }

  function unlockRequest(uint256 _index) public onlyEmployer {
    require(_index < requests.length && _index>=0, "Invalid index");

    // storage keyword makes variable "request" behaves as a pointer
    Request storage request = requests[_index];
    require(request.locked == true, 'already unlocked');
    request.locked = false;

    emit RequestUnlocked(request.locked);
  }

  // sending money to the freelancer for the request
  bool locked = false;
  function withdraw(uint _index) public onlyFreelancer {
    require(_index < requests.length && _index>=0, "Invalid index");
    require(locked == false, 'contract locked/reentrant call');

    Request storage request = requests[_index];
    require(request.locked == false, 'unlock request first');
    require(request.paid == false, 'already paid');

    locked = true;
    (bool success, ) = freelancer.call{value: request.amount}('');

    require(success, 'Transfer failed');
    contract_balance -= request.amount;
    request.paid = true;
    locked = false;
    emit RequestPaid(payable(msg.sender), request.amount);
  }

  function ChangeDeadline (uint256 new_deadline) public onlyEmployer {
    require(deadline < block.timestamp + new_deadline, "new deadline should be after original deadline");
    deadline = block.timestamp + new_deadline;
    emit DeadlineChanged(new_deadline);
  }

  bool locked2 = false;
  function WithdrawAll() public onlyEmployer {
    require(locked2 == false, "function is locked");
    require(block.timestamp > deadline, "you cannot withdraw ether before deadline");

    locked2 = true;
    (bool success, ) = employer.call{value: address(this).balance }('');
    require(success, "trasfer failed");

    contract_balance = 0;
    locked2 = false;
    emit Withdraw_All_Ether();
  }

}
