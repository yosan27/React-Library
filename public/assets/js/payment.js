const list1 = document.querySelector('.container .list-1 .denda');
const list2 = document.querySelector('.container .list-2 .denda');
const list3 = document.querySelector('.container .list-3 .denda');
const list4 = document.querySelector('.container .list-4 .denda');
const list5 = document.querySelector('.container .list-5 .denda');
const list6 = document.querySelector('.container .list-6 .denda');
const total = document.querySelector('.container .list-total .total');
const listBox = document.querySelector('body .list-box');
const minimum = document.querySelector('.top-up-box .min-nominal');
const inputNominal = document.querySelector('.top-up-box #input-saldo');
const topUpBtn = document.querySelector('#topUP');
const topUpBox = document.querySelector('.top-up-box');
const debit = document.getElementById('debit');
const atm = document.getElementById('atm');
const mbank = document.getElementById('mbank');
const payBtn = document.getElementById('pay');
const payModal =document.getElementById('payModal');
const iconPayModal = document.querySelector(' #payModal .modal-body i');
const pPayModal = document.querySelector(' #payModal .modal-body p');
const noBill = document.getElementById('no-bill');
const atmBox = document.querySelector('.atm-box');
const mbankBox = document.querySelector('.mbank-box');
const mbankCollapse = document.querySelector('.mbank-collapse');
const internetCollapse = document.querySelector('.internet-collapse');
const mbankBtn = document.getElementById('mbank-btn');
const internetBtn = document.getElementById('internet-btn');
const icon1 = document.querySelector('#icon1');
const icon2 = document.querySelector('#icon2');
const historyPayment = document.querySelector('.history-payment');
const historyBtn = document.getElementById('history-btn');
const btn10000 = document.getElementById('10000');
const btn25000 = document.getElementById('25000');
const btn50000 = document.getElementById('50000');
const btn75000 = document.getElementById('75000');
const btn100000 = document.getElementById('100000');
const totalDebit = document.getElementById('total-debit');
const debitPayBtn = document.getElementById('debit-pay-btn');

// saldo
const saldo = document.querySelector('.header-logo-bar .saldo');
saldo.innerHTML = 100000;

// list denda
const telat = 2000;
const kosong = 0;

list1.innerHTML = telat;
list2.innerHTML = telat;
list3.innerHTML = telat;
list4.innerHTML = telat;
list5.innerHTML = telat;
list6.innerHTML = telat;

// jumlah total denda
let sum = parseInt(list1.innerHTML)+parseInt(list2.innerHTML)+parseInt(list3.innerHTML)+parseInt(list4.innerHTML)+parseInt(list5.innerHTML)+parseInt(list6.innerHTML);
total.innerHTML = sum;

// top up
inputNominal.addEventListener('input', function(){
  if(parseInt(inputNominal.value) < 10000){
    minimum.classList.remove('hide');
    totalDebit.innerHTML = '0';
    
  }else{
    minimum.classList.add('hide');
    totalDebit.innerHTML = inputNominal.value;
  }
});

btn10000.addEventListener('click', function(){
  inputNominal.value = '10000';
  totalDebit.innerHTML = '10000';
});

btn25000.addEventListener('click', function(){
  inputNominal.value = '25000';
  totalDebit.innerHTML = '25000';
});

btn50000.addEventListener('click', function(){
  inputNominal.value = '50000';
  totalDebit.innerHTML = '50000';
});

btn75000.addEventListener('click', function(){
  inputNominal.value = '75000';
  totalDebit.innerHTML = '75000';
});

btn100000.addEventListener('click', function(){
  inputNominal.value = '100000';
  totalDebit.innerHTML = '100000';
});

topUpBtn.addEventListener('click', function(){
  mbankBox.classList.add('hide');
  atmBox.classList.add('hide');
  historyPayment.classList.add('hide');
  noBill.classList.add('hide');

  if(topUpBtn.innerHTML == "Top Up"){
    topUpBtn.innerHTML = "Payment"
    listBox.classList.add('hide');
    topUpBox.classList.toggle('hide');
  }else{
    topUpBtn.innerHTML = "Top Up"
    listBox.classList.remove('hide');
    topUpBox.classList.add('hide');
  }
});

// metode pembayaran
debit.addEventListener('click', function(){
  atmBox.classList.add('hide');
  mbankBox.classList.add('hide');
});

atm.addEventListener('click', function(){
  atmBox.classList.toggle('hide');
  mbankBox.classList.add('hide');
});

mbank.addEventListener('click', function(){
  mbankBox.classList.toggle('hide');
  atmBox.classList.add('hide');
});

mbankBtn.addEventListener('click', function(){
  mbankCollapse.classList.toggle('hide');
  internetCollapse.classList.add('hide');
  icon2.className = 'fa fa-plus';

  if(internetCollapse.classList.contains('hide') && icon1.className == 'fa fa-plus'){
    icon1.className = 'fa fa-minus';
  }else{
    icon1.className = 'fa fa-plus';
  }
});

internetBtn.addEventListener('click', function(){
  internetCollapse.classList.toggle('hide');
  mbankCollapse.classList.add('hide');
  icon1.className = 'fa fa-plus';

  if(mbankCollapse.classList.contains('hide') && icon2.className == 'fa fa-plus'){
    icon2.className = 'fa fa-minus';
  }else{
    icon2.className = 'fa fa-plus';
  }
});

debitPayBtn.addEventListener('click', function(){
  saldo.innerHTML = parseInt(saldo.innerHTML) + parseInt(totalDebit.innerHTML);
  inputNominal.value = '';
});

// pay
payBtn.addEventListener('click', function(){
  if(parseInt(saldo.innerHTML) >= parseInt(total.innerHTML)){
    saldo.innerHTML = parseInt(saldo.innerHTML)-parseInt(total.innerHTML);
    listBox.classList.toggle('hide');
    noBill.classList.toggle('hide');
  }else{
    pPayModal.innerHTML = "Pembayaran Gagal!";
    iconPayModal.className = "fa fa-ban";
    iconPayModal.style.color = 'red';
  }
});

// History Payment
historyBtn.addEventListener('click', function(){
  noBill.classList.add('hide');
  listBox.classList.add('hide');
  topUpBox.classList.add('hide');
  historyPayment.classList.toggle('hide');
  mbankBox.classList.add('hide');
  atmBox.classList.add('hide');

  if(historyPayment.classList.contains('hide')){
    noBill.classList.remove('hide');
  }else{
    noBill.classList.add('hide');
  }
});