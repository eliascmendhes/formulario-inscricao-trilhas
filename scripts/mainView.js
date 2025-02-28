document.addEventListener('DOMContentLoaded', () => {
  const botaoInscrever = document.querySelector('.subscribe__button')

  botaoInscrever.addEventListener('mouseover', () => {
    botaoInscrever.style.transform = 'scale(1.05)'
  })

  botaoInscrever.addEventListener('mouseout', () => {
    botaoInscrever.style.transform = 'scale(1)'
  })

  botaoInscrever.addEventListener('click', () => {
    window.location.href = './formView.html'
  })
})
