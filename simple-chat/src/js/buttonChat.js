
document.querySelectorAll('.container-button-chat').forEach(button=>{button.addEventListener( 'click', function(){
    window.location.href = 'index.html';
    const buttonId = this.id;
    let numberId = buttonId.match(/\d+/);
    let currentNumber = parseInt(numberId[0], 10);  
    localStorage.setItem('activeChat', `chat${currentNumber}`);
});});
