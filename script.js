// Insira aqui sua URL e CHAVE do projeto Supabase
const supabaseUrl = 'https://bncdwrqlbkoocgpeokiv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuY2R3cnFsYmtvb2NncGVva2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDM2MTQsImV4cCI6MjA2NDQ3OTYxNH0.nUZMqmHQ0BVwZCpQW98umPPcNN7hCJ1GqJCLE2EUtCY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function signUp() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  // Verifica se o usuário já está cadastrado
  const { data: existingUser, error: lookupError } = await supabase
    .from('users')
    .select('*')
    .eq('email', email);

  if (existingUser.length > 0) {
    alert('Usuário já cadastrado!');
    return;
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Erro ao cadastrar: ' + error.message);
  } else {
    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'index.html';
  }
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Usuário ou senha inválidos!');
  } else if (!data || !data.user) {
    alert('Usuário não encontrado!');
  } else {
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'dashboard.html';
  }
}

window.onload = async () => {
  if (window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      document.getElementById('user-email').textContent = user.email;
    } else {
      window.location.href = 'index.html';
    }
  }
};

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}
