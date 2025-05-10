document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const inputs = {
        nome: document.getElementById('nome'),
        email: document.getElementById('email'),
        senha: document.getElementById('senha'),
        cpf: document.getElementById('cpf'),
        telefone: document.getElementById('telefone')
    };

    // Padrões de validação (RegEx)
    const patterns = {
        nome: /^[A-Z][a-z]+ [A-Z][a-z]+$/,
        email: /^[a-z]+@[a-z]+\.br$/,
        senha: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8}$/,
        cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        telefone: /^(\(\d{2}\) \d{5}-\d{4}|\(\d{2}\) \d{9}|\d{2} \d{9})$/
    };

    // Validação em tempo real
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', function() {
            validateField(this, patterns[key], key + 'Feedback');
        });
    });

    // Máscaras
    inputs.cpf.addEventListener('input', maskCPF);
    inputs.telefone.addEventListener('input', maskTelefone);

    // Função de validação
    function validateField(input, pattern, feedbackId) {
        const feedback = document.getElementById(feedbackId);
        
        if (input.value === '') {
            input.classList.remove('valid', 'invalid');
            feedback.textContent = '';
            return;
        }

        if (pattern.test(input.value)) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            feedback.textContent = '✓ Válido';
            feedback.style.color = 'var(--success)';
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            feedback.textContent = '✗ Formato inválido';
            feedback.style.color = 'var(--error)';
        }
    }

    // Máscara para CPF
    function maskCPF(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
        }
        
        e.target.value = value;
        validateField(e.target, patterns.cpf, 'cpfFeedback');
    }

    // Máscara para Telefone
    function maskTelefone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length > 10) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{4})/, '($1) $2');
        }
        
        e.target.value = value;
        validateField(e.target, patterns.telefone, 'telefoneFeedback');
    }

    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Formulário válido! Cadastro realizado.');
    });
});
