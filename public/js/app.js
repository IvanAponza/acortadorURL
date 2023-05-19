console.log("Hola estoy aquí😁😁");

document.addEventListener("click", (e) => {
  //console.log(e.target.dataset.short);
  if (e.target.dataset.short) {
    const url = `http://localhost:4000/${e.target.dataset.short}`;
    navigator.clipboard //copia en el porta papeles
      .writeText(url)
      .then(() => {
        console.log("Texto copiado...");
      })
      .catch((err) => {
        console.log("!Algo salio mal¡", err);
      });
  }
});
