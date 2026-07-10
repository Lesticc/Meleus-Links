const params = new URLSearchParams(window.location.search);
let page = params.get("page");
let error = params.get("error");
const body = document.body

let nomesDePagina = () => {
  let lista = []
    pages.forEach(element => {
    lista.push(element.name.toLowerCase().replaceAll(' ', ''))
  });
  return lista
}

const carregarPagina = () => {
  lista = nomesDePagina()

  if(error){
      const div = document.createElement('div')
      const titulo = document.createElement('h2')
      const hr = document.createElement('hr')
      const p = document.createElement('p')
      const button = document.createElement('button')
      titulo.innerText = `Erro ${error.toUpperCase()}`
      p.innerText = Erros[error.toLowerCase()]
      button.innerText = 'OK'
      div.append(titulo, hr, p, button)
      body.append(div)

      div.className = 'ErrorBox'
      titulo.className = 'ErrorTitle'
      p.className = 'ErrorParagraph'
      button.className = 'ErrorButton'

      button.onclick = () => {
        body.innerHTML = '<h1 id="titulo">Meleus Links</h1><hr>'
        error=undefined;
        carregarPagina()
      }
    }

  if(lista.find((element) => element === page)){
    let index = pages.findIndex((element) => element.name.toLowerCase().replaceAll(' ', '') == page)
    
    element = pages[index]
    const main = document.createElement('main')
    const name = document.createElement('h2')
    const hr = document.createElement('hr')
    name.innerText = element.name
    name.className = 'nomePagina'

    main.append(name, hr)
    body.append(main)

    sections = element.sections

    sections.forEach(element => {
      const title = document.createElement('h3')
      title.innerText = element.title
      title.className = 'titleSection'

      const lista = document.createElement('div')
      lista.className = 'Section'

      let total = 0;

      const totalPrice = document.createElement('p')

      lista.append(title)
      element.links.forEach(innerElement => {

        const Link = document.createElement('div')
        const Name = document.createElement('p')
        const Nome = document.createElement('span')
        const Desc = document.createElement('p')
        const link = document.createElement('a')
        Nome.innerText = innerElement.name
        Name.append(Nome)
        
        Desc.innerText = innerElement.desc
        link.innerText = 'Clique aqui para acessar o link!'

        link.className = 'linkLink'
        link.href = innerElement.link
        link.target = '_blank'

        Link.className = 'Link'
        Name.className = 'linkName'
        Desc.className = 'linkDesc'


        Link.style.borderLeft = `5px ${element.color} solid`

        const BrilhoDoDjabo = document.createElement('div')
        BrilhoDoDjabo.className = 'BrilhoDoDjabo'
        BrilhoDoDjabo.style.boxShadow = `0 0 20px 5px color-mix(in srgb, ${element.color} 50%, transparent)`

        if(element.prices){
          const Price = document.createElement('span')
          Price.innerText = `( ${MoneyFormatter(innerElement.price)} ) `
          Price.style.color = 'rgb(0, 134, 11)'
          Name.innerHTML = ''
          Name.append(Price, Nome)
          total += innerElement.price
        }

        Link.append(Name, Desc, link, BrilhoDoDjabo)
        lista.append(Link)
      })

      if(element.links.prices){
        totalPrice.innerText = `Total: ${MoneyFormatter(total)}`
        totalPrice.style.fontFamily = 'Roboto'
        totalPrice.style.fontWeight = '500'
        totalPrice.style.marginLeft = '15px'
        lista.append(totalPrice)
      }

      main.append(lista)
    });
    return;
  }

  const main = document.createElement('main')
  
  lista.forEach((element, index) => {
    if(!pages[index].menu){
      return console.log(`Menu [${pages[index].name}] retornando...`);
    }

    const button = document.createElement('button')

    button.innerText = pages[index].name
    button.className = 'paginasBotao'
    main.append(button)
    main.style = 'width:55vw;max-width:460px;'
    button.onclick = () => {
      window.location.href = `./?page=${element}`
    }
  });
  body.append(main)
}

const botaovoar = () => {
  if(!lista.find((element) => element === page)) return;

  const botao = document.createElement('button')
  botao.onclick = () => {
    window.location.href = `./`
  }
  botao.className = 'botaoVoltar'
  botao.innerText = 'Voltar ao Início'
  body.append(botao)
}

let count = 0

document.getElementById('titulo').onclick = () => {
  count++
  if(count>=7){
    document.getElementById('titulo').style.animation = 'rainbowColor 4s linear infinite'
  }
}

carregarPagina()
botaovoar()