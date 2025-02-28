document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('form')
  const inputCPF = document.querySelector('sl-input[placeholder="Cpf"]')
  const inputTelefone = document.querySelector('sl-input[placeholder="Telefone"]')
  const inputCEP = document.querySelector('sl-input[placeholder="Cep"]')

  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  function mascaraTelefone(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }

  function mascaraCEP(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1')
  }

  inputCPF.addEventListener('sl-input', (e) => {
    e.target.value = mascaraCPF(e.target.value)
  })

  inputTelefone.addEventListener('sl-input', (e) => {
    e.target.value = mascaraTelefone(e.target.value)
  })

  inputCEP.addEventListener('sl-input', (e) => {
    e.target.value = mascaraCEP(e.target.value)
  })

  inputCEP.addEventListener('sl-blur', async () => {
    const cep = inputCEP.value.replace(/\D/g, '')

    if (cep.length === 8) {
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const dados = await resposta.json()

        if (!dados.erro) {
          document.querySelector('sl-input[placeholder="Rua"]').value = dados.logradouro
          document.querySelector('sl-input[placeholder="Cidade"]').value = dados.localidade
          document.querySelector('sl-input[placeholder="Estado"]').value = dados.uf
        }
      } catch (erro) {
        console.error('Erro ao buscar CEP:', erro)
      }
    }
  })

  formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const todosPreenchidos = [...formulario.querySelectorAll('[required]')].every(
      (campo) => campo.value
    )

    if (todosPreenchidos) {
      alert('Formulário enviado com sucesso!')
      window.location.href = './mainView.html'
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.')
    }
  })
})
