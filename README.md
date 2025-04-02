# 🌌 Futuro Website Wiki do Jogo **Apogea**

Este projeto tem como objetivo centralizar todo o conteúdo do jogo **Apogea** em um website simples, acessível e de fácil navegação. A proposta é criar uma wiki oficial, organizada por administradores dedicados e curadores da comunidade.

---

## 💡 Proposta

Criar um website fã do jogo **Apogea** com todo o conteúdo do jogo de forma:

- ✅ **Simples**
- ✅ **Autoexplicativa**
- ✅ **Centralizada**
- ✅ **Mantida por administradores sérios e curadores da comunidade**

---

## 🛠️ Afazeres / Problemas Conhecidos

| ✅ | Status | Tarefa | Observações |
|----|--------|--------|-------------|
| ⬜ | 🔧 | **Código não está totalmente otimizado** | Melhorar performance geral |
| ⬜ | 🧠 | **Revisar biblioteca de partículas** (`@tsparticles/react`) | Possível vazamento de memória; investigar e corrigir |
| ⬜ | ✍️ | **Corrigir campos `textarea` no `FormattedInput`** | Ajustar criação/comportamento |
| ⬜ | ⏳ | **Adicionar `Spinners` de carregamento (reactstrap)** | Implementar feedback visual em todo o projeto |
| ⬜ | 🧭 | **Corrigir identificação de rota ativa no React Router** | Quando há URLs poluídas, os botões não refletem o estado atual |
| ✅ | 💾 | **Implementar sistema de snapshot no formulário** | Criar código que gere e carregue _snapshots_ de campos chave-valor via Provider Context. O `saveSnapshot` salvará o estado atual, e o `loadSnapshot` restaurará os valores quando uma ação específica for disparada. |
| ⬜ | 🔒 | **Restringir seleção de valores com `forbiddenIds` no Elasticsearch** | Implementar lógica que evita seleção/exibição de valores com base em `forbiddenIds`, refletindo a restrição de IDs compostos em relações N:N. Backend deve enviar essa informação, e o frontend deve validar. |
| ⬜ | 🌐 | **Traduções aninhadas nos passos das missões não detectam traduções existentes** | Implementar a requisição e criação dinâmica de campos de tradução caso seja adicionado novo idioma na atualização dos passos da missão, garantindo sincronia com a base de dados. |
| ⬜ | 🧹 | **Refatorar ações de persistência no painel admin** | Substituir `_.forEach(onlyTouchedTranslationFields, async (value) => {` por `for` tradicional, garantindo melhor compatibilidade com assincronismo e eliminando erros de requests não aguardadas. |
| ⬜ | 🧩 | **Relacionar `item_id` ao formulário de `abilities`** | Aguardando finalização do sistema de cadastro na rota de `items`; vincular campo ao formulário de habilidades assim que disponível. |


---

Sinta-se à vontade para contribuir, sugerir melhorias ou apontar problemas abrindo uma _issue_ ou fazendo um _pull request_.

🚀 *Em construção... rumo ao conhecimento centralizado de Apogea!*