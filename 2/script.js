const btn = document.querySelector('.screen-button')
const width = window.screen.width
const height = window.screen.height

btn.addEventListener('click', () => {
    alert(`Ширина экрана: ${width}, высота экрана: ${height}`)
})