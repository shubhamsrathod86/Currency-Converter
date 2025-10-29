const from = document.getElementById('from');
const to = document.getElementById('to');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const button = document.getElementById('convert');

const BASE_API = "https://api.exchangerate-api.com/v4/latest/USD";

// 🌍 Complete list of countries and their currencies
const currencyData = [
  { country: "Afghanistan", code: "AFN" },
  { country: "Albania", code: "ALL" },
  { country: "Algeria", code: "DZD" },
  { country: "Andorra", code: "EUR" },
  { country: "Angola", code: "AOA" },
  { country: "Argentina", code: "ARS" },
  { country: "Armenia", code: "AMD" },
  { country: "Australia", code: "AUD" },
  { country: "Austria", code: "EUR" },
  { country: "Azerbaijan", code: "AZN" },
  { country: "Bahamas", code: "BSD" },
  { country: "Bahrain", code: "BHD" },
  { country: "Bangladesh", code: "BDT" },
  { country: "Barbados", code: "BBD" },
  { country: "Belarus", code: "BYN" },
  { country: "Belgium", code: "EUR" },
  { country: "Belize", code: "BZD" },
  { country: "Benin", code: "XOF" },
  { country: "Bhutan", code: "BTN" },
  { country: "Bolivia", code: "BOB" },
  { country: "Bosnia and Herzegovina", code: "BAM" },
  { country: "Botswana", code: "BWP" },
  { country: "Brazil", code: "BRL" },
  { country: "Brunei", code: "BND" },
  { country: "Bulgaria", code: "BGN" },
  { country: "Burundi", code: "BIF" },
  { country: "Cambodia", code: "KHR" },
  { country: "Cameroon", code: "XAF" },
  { country: "Canada", code: "CAD" },
  { country: "Chile", code: "CLP" },
  { country: "China", code: "CNY" },
  { country: "Colombia", code: "COP" },
  { country: "Costa Rica", code: "CRC" },
  { country: "Croatia", code: "EUR" },
  { country: "Cuba", code: "CUP" },
  { country: "Cyprus", code: "EUR" },
  { country: "Czech Republic", code: "CZK" },
  { country: "Denmark", code: "DKK" },
  { country: "Dominican Republic", code: "DOP" },
  { country: "Ecuador", code: "USD" },
  { country: "Egypt", code: "EGP" },
  { country: "El Salvador", code: "USD" },
  { country: "Estonia", code: "EUR" },
  { country: "Ethiopia", code: "ETB" },
  { country: "Fiji", code: "FJD" },
  { country: "Finland", code: "EUR" },
  { country: "France", code: "EUR" },
  { country: "Gabon", code: "XAF" },
  { country: "Gambia", code: "GMD" },
  { country: "Georgia", code: "GEL" },
  { country: "Germany", code: "EUR" },
  { country: "Ghana", code: "GHS" },
  { country: "Greece", code: "EUR" },
  { country: "Guatemala", code: "GTQ" },
  { country: "Haiti", code: "HTG" },
  { country: "Honduras", code: "HNL" },
  { country: "Hong Kong", code: "HKD" },
  { country: "Hungary", code: "HUF" },
  { country: "Iceland", code: "ISK" },
  { country: "India", code: "INR" },
  { country: "Indonesia", code: "IDR" },
  { country: "Iran", code: "IRR" },
  { country: "Iraq", code: "IQD" },
  { country: "Ireland", code: "EUR" },
  { country: "Israel", code: "ILS" },
  { country: "Italy", code: "EUR" },
  { country: "Jamaica", code: "JMD" },
  { country: "Japan", code: "JPY" },
  { country: "Jordan", code: "JOD" },
  { country: "Kazakhstan", code: "KZT" },
  { country: "Kenya", code: "KES" },
  { country: "Kuwait", code: "KWD" },
  { country: "Laos", code: "LAK" },
  { country: "Latvia", code: "EUR" },
  { country: "Lebanon", code: "LBP" },
  { country: "Liberia", code: "LRD" },
  { country: "Libya", code: "LYD" },
  { country: "Lithuania", code: "EUR" },
  { country: "Luxembourg", code: "EUR" },
  { country: "Malaysia", code: "MYR" },
  { country: "Maldives", code: "MVR" },
  { country: "Mali", code: "XOF" },
  { country: "Malta", code: "EUR" },
  { country: "Mauritius", code: "MUR" },
  { country: "Mexico", code: "MXN" },
  { country: "Moldova", code: "MDL" },
  { country: "Monaco", code: "EUR" },
  { country: "Mongolia", code: "MNT" },
  { country: "Morocco", code: "MAD" },
  { country: "Mozambique", code: "MZN" },
  { country: "Myanmar", code: "MMK" },
  { country: "Namibia", code: "NAD" },
  { country: "Nepal", code: "NPR" },
  { country: "Netherlands", code: "EUR" },
  { country: "New Zealand", code: "NZD" },
  { country: "Nicaragua", code: "NIO" },
  { country: "Nigeria", code: "NGN" },
  { country: "North Korea", code: "KPW" },
  { country: "Norway", code: "NOK" },
  { country: "Oman", code: "OMR" },
  { country: "Pakistan", code: "PKR" },
  { country: "Palestine", code: "ILS" },
  { country: "Panama", code: "PAB" },
  { country: "Paraguay", code: "PYG" },
  { country: "Peru", code: "PEN" },
  { country: "Philippines", code: "PHP" },
  { country: "Poland", code: "PLN" },
  { country: "Portugal", code: "EUR" },
  { country: "Qatar", code: "QAR" },
  { country: "Romania", code: "RON" },
  { country: "Russia", code: "RUB" },
  { country: "Rwanda", code: "RWF" },
  { country: "Saudi Arabia", code: "SAR" },
  { country: "Senegal", code: "XOF" },
  { country: "Serbia", code: "RSD" },
  { country: "Singapore", code: "SGD" },
  { country: "Slovakia", code: "EUR" },
  { country: "Slovenia", code: "EUR" },
  { country: "Somalia", code: "SOS" },
  { country: "South Africa", code: "ZAR" },
  { country: "South Korea", code: "KRW" },
  { country: "Spain", code: "EUR" },
  { country: "Sri Lanka", code: "LKR" },
  { country: "Sudan", code: "SDG" },
  { country: "Sweden", code: "SEK" },
  { country: "Switzerland", code: "CHF" },
  { country: "Syria", code: "SYP" },
  { country: "Taiwan", code: "TWD" },
  { country: "Tanzania", code: "TZS" },
  { country: "Thailand", code: "THB" },
  { country: "Tunisia", code: "TND" },
  { country: "Turkey", code: "TRY" },
  { country: "Uganda", code: "UGX" },
  { country: "Ukraine", code: "UAH" },
  { country: "United Arab Emirates", code: "AED" },
  { country: "United Kingdom", code: "GBP" },
  { country: "United States", code: "USD" },
  { country: "Uruguay", code: "UYU" },
  { country: "Uzbekistan", code: "UZS" },
  { country: "Venezuela", code: "VES" },
  { country: "Vietnam", code: "VND" },
  { country: "Yemen", code: "YER" },
  { country: "Zambia", code: "ZMW" },
  { country: "Zimbabwe", code: "ZWL" }
];

// Load dropdowns
async function loadCurrencies() {
  const response = await fetch(BASE_API);
  const data = await response.json();
  const available = Object.keys(data.rates);

  currencyData.forEach(item => {
    if (available.includes(item.code)) {
      const opt1 = document.createElement("option");
      const opt2 = document.createElement("option");
      opt1.value = opt2.value = item.code;
      opt1.textContent = `${item.country} (${item.code})`;
      opt2.textContent = `${item.country} (${item.code})`;
      from.appendChild(opt1);
      to.appendChild(opt2);
    }
  });

  from.value = "USD";
  to.value = "INR";
}

// Convert
async function convertCurrency() {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from.value}`);
  const data = await response.json();
  const rate = data.rates[to.value];
  const converted = (amount.value * rate).toFixed(2);

  const fromC = currencyData.find(c => c.code === from.value)?.country || from.value;
  const toC = currencyData.find(c => c.code === to.value)?.country || to.value;

  result.textContent = `${amount.value} ${fromC} (${from.value}) = ${converted} ${toC} (${to.value})`;
}

button.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
