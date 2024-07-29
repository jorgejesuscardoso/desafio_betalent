let counts = 0;

// Função para contar quantas vezes foi chamada no teste de carga
const count = () => {
  counts += 1;
  console.log('Chamada no Auth middleware nº: ', counts);
}

export default count;