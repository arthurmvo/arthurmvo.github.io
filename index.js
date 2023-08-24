const temp_msg = document.getElementById("temp-msg");
const msg1 = document.getElementById("msg1");
const msg3 = document.getElementById("msg3");
const msg_resultado = document.getElementById("msg_resultado");
const msg_resultado2 = document.getElementById("msg_resultado2");
const msg_resultado3 = document.getElementById("msg_resultado3");
const convert_btn = document.getElementById("convert-btn");
const input_dolar = document.getElementById("preco-dolar");
const input_peso = document.getElementById("preco-peso");

// gets exchange rate for specific currencies
const getExRate = async () => {
  let proxyUrl = "https://api.allorigins.win/get?url=";
  let req_url = `https://www.cronista.com/MercadosOnline/moneda.html?id=ARSMEP`;
  let res = await fetch(proxyUrl +encodeURIComponent( req_url));
  let html = await res.text();
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
//   console.log(doc);
  let buyValue = doc.querySelector(".buy-value").textContent;
//   console.log(buyValue);
  msg3.textContent = `A cotação atual do dolar MEP é ${buyValue}`;
  temp_msg.hidden = true;
  convert_btn.hidden = false;
  return buyValue;
};

setInterval(getExRate, 1000);

const analyze = async () => {
  let preco_dolar = input_dolar.value;
  let preco_peso = input_peso.value;
  let cotacaostr = await getExRate();
  let cotacao = parseFloat(cotacaostr.replace(",", ".").replace("$", ""));
  let dolar = parseFloat(preco_dolar);
  let peso = parseFloat(preco_peso);
  // console.log(dolar, peso, cotacao);            
  let preco_convertido = peso / cotacao;
  // console.log(preco_convertido);
  // console.log (dolar/preco_convertido);
  msg_resultado.hidden = false;
  msg_resultado2.hidden = false;
  msg_resultado3.hidden = false;

  if (dolar/preco_convertido > 1){
    msg_resultado.textContent = `O preço na Argentina é $${preco_convertido.toFixed(2)} e nos EUA está $${dolar.toFixed(2)} (com a taxa).`;
    msg_resultado2.textContent = `Na Argentina está ${Math.round(100*(dolar/preco_convertido)- 100)}% mais barato`
    msg_resultado3.textContent = `Vale mais a pena comprar na Argentina`;
  } else {
    msg_resultado.textContent = `O preço na Argentina é $${preco_convertido.toFixed(2)} e nos EUA está $${dolar.toFixed(2)} (com a taxa).`;
    msg_resultado2.textContent = `Nos EUA está ${Math.round((1- dolar/preco_convertido)*100)}% mais barato`
    msg_resultado3.textContent = `Vale mais a pena comprar nos EUA`;
  }
};

convert_btn.addEventListener("click", analyze);


