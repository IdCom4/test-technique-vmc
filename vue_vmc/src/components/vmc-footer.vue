<template>
  <div id="footer">
    <div id="slogan">
      <h4>ValueMyCar</h4>
      <p>L'entreprise automobile du future</p>
    </div>
    <p><small>© ValueMyCar - 2018-2022, tous droits réservés.</small></p>
  </div>
</template>

<script>
export default {
  name: 'VmcFooter'
}
</script>

<style>
#footer {
  max-width: 100%;
  padding: 25px 0;
  background-color: var(--main-clr);
  display: flex;
  justify-content: space-evenly;
}

#footer #slogan h4, #footer #slogan p, #footer p, #footer small {
  text-align: center;
  color: white;
}

#footer #slogan {
  display: flex;
  align-items: center;
}

#footer #slogan h4, #footer #slogan p {
  margin: 0;
}

#footer #slogan h4 {
  margin-right: 10px;
}

@media screen and (max-width: 600px) {
  #footer {
    padding: 20px 10px;
    flex-direction: column;
    justify-content: space-evenly;
  }

  #footer #slogan {
    flex-direction: column;
    margin-bottom: 15px;
  }
}
</style>