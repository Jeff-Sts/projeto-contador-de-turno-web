let intervalo;
let tocou = false;
let fimTurno = null;
let finalizado = false;

function iniciar() {
  clearInterval(intervalo);

  tocou = false;
  finalizado = false;

  document.body.classList.remove('modo-vermelho');
  document.getElementById('final').style.display = 'none';
  document.getElementById('resultado').innerText = '---';

  const personagem = document.getElementById('personagem');
  const fala = document.getElementById('fala');

  personagem.classList.remove('comemorar');
  fala.classList.remove('mostrar');
  fala.innerText = '';

  const saida = document.getElementById('saida').value;
  if (!saida) return alert('Informe a hora de saída');

  const agora = new Date();
  const [h, m] = saida.split(':');

  // 🔒 calcula o fim UMA única vez
  fimTurno = new Date();
  fimTurno.setHours(h, m, 0, 0);

  // 🌙 turno noturno
  if (fimTurno <= agora) {
    fimTurno.setDate(fimTurno.getDate() + 1);
  }

  intervalo = setInterval(atualizar, 1000);
}

function atualizar() {
  if (finalizado) return;

  const agora = new Date();
  const diff = fimTurno - agora;

  const personagem = document.getElementById('personagem');
  const fala = document.getElementById('fala');

  // 🎉 FINAL DO TURNO
  if (diff <= 0) {
    clearInterval(intervalo);
    finalizado = true;

    document.getElementById('resultado').innerText = '🎉 Turno encerrado!';
    document.getElementById('final').style.display = 'block';

    document.body.classList.remove('modo-vermelho');
    personagem.classList.add('comemorar');

    fala.innerText = 'Bom trabalho! Hora de descansar 😎';
    fala.classList.add('mostrar');

    return;
  }

  // 🔴 últimos 60s
  if (diff <= 60000) {
    document.body.classList.add('modo-vermelho');
    fala.innerText = 'É agora… prepara o coração ❤️';
    fala.classList.add('mostrar');
  } else {
    fala.innerText = 'Foco… ainda falta um pouco 😌';
    fala.classList.add('mostrar');
  }

  // 🎵 música só nos últimos 20s
  if (diff <= 20000 && !tocou) {
    const audio = document.getElementById('musicaFinal');
    audio.currentTime = 88; // começa no meio da música
    audio.play();
    tocou = true;

    fala.innerText = 'Chegou a hora… 👏';
  }

  const total = Math.floor(diff / 1000);
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;

  document.getElementById('resultado').innerText =
    `${horas}h ${minutos}m ${segundos}s para ir embora`;
}
