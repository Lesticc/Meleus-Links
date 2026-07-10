function MoneyFormatter(number) {
  return number.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}