'use strict';

const due = document.querySelector('.due');
const past = document.querySelector('.past');
const monthlyEl = document.querySelector('.monthly');
const btn = document.querySelector('.check');
const errMsg = document.querySelector('.error');

//modal buttons
const myModalBtn = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const overlayBtn = document.querySelector('.overlay');
const overAllEl = document.querySelector('.total-payment');
const monthlyPayEl = document.querySelector('.monthly-result');

const delayedDaysEl = document.getElementById('delayed-days');
const percentageEl = document.getElementById('percentage');
const totalPayEl = document.getElementById('total-payment');

//ms to days conversion
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (due.value === '' || past.value === '') {
    alert('Please fill up the blank!');
  } else if (due.value > past.value) {
    alert('Due date must not be greater than past date!');
  } else if (monthlyEl.value == '') {
    alert('Please enter your monthly payment!');
  } else if (monthlyEl.value == 0) {
    alert('Opps! Please enter a valid payment!');
  } else if (monthlyEl.value.length > 5 || monthlyEl.value.length <= 3) {
    alert(
      'Mothly Payments must be in 4 digits and should not exceed by 6 digits!'
    );
  } else {
    calcDate();
    openModal();
    monthlyAmo();
    totalPay();
  }
});

//modal close-button function
closeBtn.addEventListener('click', function () {
  closeModal();
});

function calcDate() {
  const dueValue = due.value;
  const pastValue = past.value;
  const dueDate = new Date(dueValue).getTime();
  const pastDate = new Date(pastValue).getTime();
  const gap = pastDate - dueDate;
  const daysValue = gap / 1000 / 60 / 60 / 24;

  delayedDaysEl.textContent = daysValue;
}

function monthlyAmo() {
  const monthlyPay = monthlyEl.value.toLocaleString();
  const monthlyCompute = ((monthlyPay * 0.05) / 30).toFixed(2);

  percentageEl.textContent = `₱${monthlyCompute}`;
}

function totalPay() {
  const dueValue = due.value;
  const pastValue = past.value;
  const dueDate = new Date(dueValue).getTime();
  const pastDate = new Date(pastValue).getTime();
  const gap = pastDate - dueDate;
  const daysValue = gap / 1000 / 60 / 60 / 24;
  const monthlyPay = monthlyEl.value;
  const monthlyCompute = ((monthlyPay * 0.05) / 30).toFixed(2);

  const totalValue = (daysValue * monthlyCompute).toFixed(2);

  const overAllPayment = parseFloat(monthlyPay) + parseFloat(totalValue);

  totalPayEl.textContent = `₱${totalValue}`;
  overAllEl.textContent = `₱${overAllPayment.toLocaleString()}`;
  monthlyPayEl.textContent = `₱${monthlyPay}`;
}

//modal function
function openModal() {
  myModalBtn.classList.remove('hidden');
  overlayBtn.classList.remove('hidden');
}

function closeModal() {
  myModalBtn.classList.add('hidden');
  overlayBtn.classList.add('hidden');
}

function isError() {
  monthlyPay.style.border = 'red';
}
